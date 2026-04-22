import {
  DEFAULT_SNAPSHOT_SAVE_INTERVAL_MS,
  EXECUTION_MODES,
  RESTORABLE_STATUSES,
  SESSION_PHASES,
  SESSION_STATUSES,
  STEP_TYPES,
  TICK_INTERVAL_MS,
} from './model.js';
import { normalizeWorkout } from '../features/workouts.js';
import { playSignal, stopAll as stopAudioSignals } from '../features/audio.js';

export { SESSION_PHASES, SESSION_STATUSES } from './model.js';
export { buildWorkoutSteps } from './steps.js';
export { getSessionSnapshot, saveSessionSnapshot, discardSessionSnapshot } from './snapshot.js';

import { normalizeHooks } from './hooks.js';
import { buildWorkoutSteps } from './steps.js';
import {
  createPersistedSessionSnapshot,
  discardSessionSnapshot,
  getSessionSnapshot,
  normalizeSessionSnapshot,
  saveSessionSnapshot,
} from './snapshot.js';
import {
  asArray,
  clone,
  findLastIndex,
  getPhaseSignature,
  isRestStep,
  nonNegativeInteger,
  nonNegativeNumber,
  nowIso,
  positiveInteger,
} from './utils.js';

// Session persistence is isolated for future timer/recovery logic.
/**
 * Creates a workout session controller without starting its timer.
 * Call start() explicitly so UI hooks are attached before any events fire.
 */
export function createWorkoutSession(workout, exercises = [], options = {}) {
  return new WorkoutSession(workout, exercises, options);
}

/**
 * Rehydrates a persisted active session when the workout structure still matches.
 */
export function restoreWorkoutSession(snapshot = getSessionSnapshot(), exercises = [], options = {}) {
  const normalizedSnapshot = normalizeSessionSnapshot(snapshot);

  if (!normalizedSnapshot) {
    discardSessionSnapshot();
    return null;
  }

  const session = new WorkoutSession(normalizedSnapshot.workout, exercises, options);

  if (!session.restore(normalizedSnapshot, options)) {
    discardSessionSnapshot();
    return null;
  }

  return session;
}

export function restoreActiveWorkoutSession(exercises = [], options = {}) {
  return restoreWorkoutSession(getSessionSnapshot(), exercises, options);
}

/**
 * Expands workout items into executable exercise/rest steps used by the timer.
 */
export class WorkoutSession {
  constructor(workout, exercises = [], options = {}) {
    this.workout = normalizeWorkout(workout);
    this.steps = buildWorkoutSteps(this.workout, exercises);
    this.stepDurations = this.steps.map((step) => step.durationSec);
    this.status = SESSION_STATUSES.IDLE;
    this.phase = this.steps[0]?.phase || SESSION_PHASES.FINISHED;
    this.currentStepIndex = this.steps.length > 0 ? 0 : -1;
    this.remainingSec = this.steps[0]?.durationSec || 0;
    this.elapsedSec = 0;
    this.currentPhase = this.resolveCurrentPhase();
    this.startedAt = null;
    this.endedAt = null;
    this.timerId = null;
    this.intervalMs = nonNegativeInteger(options.intervalMs, TICK_INTERVAL_MS);
    this.setInterval = options.setInterval || globalThis.setInterval?.bind(globalThis);
    this.clearInterval = options.clearInterval || globalThis.clearInterval?.bind(globalThis);
    this.hooks = normalizeHooks(options);
    this.audioEnabled = options.audio !== false;
    this.persistenceEnabled = options.persist !== false;
    this.snapshotSaveIntervalMs = nonNegativeInteger(options.snapshotSaveIntervalMs, DEFAULT_SNAPSHOT_SAVE_INTERVAL_MS);
    this.lastSnapshotSavedAt = 0;
  }

  start() {
    if (this.status !== SESSION_STATUSES.IDLE) {
      return this.getSnapshot();
    }

    this.startedAt = nowIso();

    if (this.steps.length === 0) {
      return this.complete();
    }

    this.status = SESSION_STATUSES.RUNNING;
    this.syncCurrentPhase();
    this.notifyPhaseChange(null, this.currentPhase);
    this.notifyStepChange(null, this.getCurrentStep());
    this.startTimer();
    this.advancePastZeroDurationSteps();
    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  pause() {
    if (this.status !== SESSION_STATUSES.RUNNING) {
      return this.getSnapshot();
    }

    this.status = SESSION_STATUSES.PAUSED;
    this.stopTimer();
    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  resume() {
    if (this.status !== SESSION_STATUSES.PAUSED) {
      return this.getSnapshot();
    }

    this.status = SESSION_STATUSES.RUNNING;
    this.startTimer();
    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  /**
   * Advances from the current exercise/rest step to the next executable step.
   * Used by the Skip button and by timer completion.
   */
  skipCurrentStep() {
    if (!this.isActive()) {
      return this.getSnapshot();
    }

    this.advanceStep();
    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  addTime(seconds) {
    if (!this.isActive()) {
      return this.getSnapshot();
    }

    const amount = positiveInteger(seconds);

    if (amount === 0) {
      return this.getSnapshot();
    }

    this.remainingSec += amount;
    this.stepDurations[this.currentStepIndex] += amount;
    this.syncCurrentPhase();
    this.notifyTick();
    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  subtractTime(seconds) {
    if (!this.isActive()) {
      return this.getSnapshot();
    }

    const amount = positiveInteger(seconds);

    if (amount === 0) {
      return this.getSnapshot();
    }

    const stepElapsedSec = this.getCurrentStepElapsedSec();
    this.remainingSec = Math.max(0, this.remainingSec - amount);
    this.stepDurations[this.currentStepIndex] = stepElapsedSec + this.remainingSec;
    this.syncCurrentPhase();
    this.notifyTick();

    if (this.remainingSec === 0) {
      this.advanceStep();
    }

    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  abort() {
    if (this.status === SESSION_STATUSES.COMPLETED || this.status === SESSION_STATUSES.ABORTED) {
      return this.getSnapshot();
    }

    this.status = SESSION_STATUSES.ABORTED;
    this.endedAt = nowIso();
    this.stopTimer();
    this.stopAudioSignals();
    this.hooks.onWorkoutAbort(this.getSnapshot());
    this.discardPersistedSnapshot();
    return this.getSnapshot();
  }

  getSnapshot() {
    const currentStep = this.getCurrentStep();
    const totalRemainingSec = this.calculateTotalRemainingSec();
    const totalDurationSec = this.elapsedSec + totalRemainingSec;

    return clone({
      status: this.status,
      phase: this.phase,
      currentPhase: this.currentPhase,
      workout: this.workout,
      steps: this.steps.map((step, index) => ({
        ...step,
        durationSec: this.stepDurations[index],
      })),
      currentStep: currentStep
        ? {
          ...currentStep,
          durationSec: this.stepDurations[this.currentStepIndex],
          remainingSec: this.remainingSec,
          elapsedSec: this.getCurrentStepElapsedSec(),
          currentPhase: this.currentPhase,
        }
        : null,
      currentStepIndex: this.currentStepIndex,
      totalSteps: this.steps.length,
      elapsedSec: this.elapsedSec,
      remainingSec: totalRemainingSec,
      totalDurationSec,
      progress: totalDurationSec > 0 ? this.elapsedSec / totalDurationSec : 1,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
    });
  }

  tick() {
    if (this.status !== SESSION_STATUSES.RUNNING || !this.getCurrentStep()) {
      return this.getSnapshot();
    }

    this.remainingSec = Math.max(0, this.remainingSec - 1);
    this.elapsedSec += 1;
    this.syncCurrentPhase();
    this.notifyTick();

    if (this.remainingSec === 0) {
      this.advanceStep();
    }

    this.persistSnapshot(false);
    return this.getSnapshot();
  }

  complete(previousStepOverride = undefined, previousPhaseOverride = undefined) {
    if (this.status === SESSION_STATUSES.COMPLETED) {
      return this.getSnapshot();
    }

    const previousPhase = previousPhaseOverride ?? this.currentPhase;
    const previousStep = previousStepOverride === undefined ? this.getCurrentStep() : previousStepOverride;

    this.status = SESSION_STATUSES.COMPLETED;
    this.phase = SESSION_PHASES.FINISHED;
    this.currentStepIndex = this.steps.length;
    this.remainingSec = 0;
    this.currentPhase = this.createSessionPhase(SESSION_PHASES.FINISHED, null);
    this.endedAt = nowIso();
    this.stopTimer();
    this.notifyPhaseChange(previousPhase, this.currentPhase);
    this.notifyStepChange(previousStep, null);
    this.playAudioSignal('workoutComplete');
    this.hooks.onWorkoutComplete(this.getSnapshot());
    this.discardPersistedSnapshot();
    return this.getSnapshot();
  }

  restore(snapshot, options = {}) {
    const normalizedSnapshot = normalizeSessionSnapshot(snapshot);

    if (!normalizedSnapshot || !this.canRestoreFromSnapshot(normalizedSnapshot)) {
      return false;
    }

    this.status = normalizedSnapshot.status;
    this.currentStepIndex = normalizedSnapshot.currentStepIndex;
    this.stepDurations = normalizedSnapshot.steps.map((step) => step.durationSec);
    this.remainingSec = normalizedSnapshot.remainingSec;
    this.elapsedSec = normalizedSnapshot.elapsedSec;
    this.startedAt = normalizedSnapshot.startedAt;
    this.endedAt = null;
    this.phase = this.getCurrentStep()?.phase || SESSION_PHASES.FINISHED;
    this.currentPhase = this.resolveCurrentPhase();
    this.stopTimer();

    if (this.status === SESSION_STATUSES.RUNNING && options.autoStartTimer !== false) {
      this.startTimer();
    }

    this.persistSnapshot(true);
    return true;
  }

  isActive() {
    return this.status === SESSION_STATUSES.RUNNING || this.status === SESSION_STATUSES.PAUSED;
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex] || null;
  }

  getCurrentStepElapsedSec() {
    if (!this.getCurrentStep()) {
      return 0;
    }

    return Math.max(0, this.stepDurations[this.currentStepIndex] - this.remainingSec);
  }

  calculateTotalRemainingSec() {
    if (!this.getCurrentStep()) {
      return 0;
    }

    const futureStepsSec = this.stepDurations
      .slice(this.currentStepIndex + 1)
      .reduce((total, durationSec) => total + durationSec, 0);

    return this.remainingSec + futureStepsSec;
  }

  advanceStep() {
    const previousPhase = this.currentPhase;
    const previousStep = this.getCurrentStep();

    this.currentStepIndex += 1;

    if (this.currentStepIndex >= this.steps.length) {
      return this.complete(previousStep, previousPhase);
    }

    const nextStep = this.getCurrentStep();
    this.phase = nextStep.phase;
    this.remainingSec = this.stepDurations[this.currentStepIndex];
    this.currentPhase = this.resolveCurrentPhase();
    this.notifyPhaseChange(previousPhase, this.currentPhase);
    this.notifyStepChange(previousStep, nextStep);
    this.advancePastZeroDurationSteps();
    this.persistSnapshot(true);
    return this.getSnapshot();
  }

  advancePastZeroDurationSteps() {
    while (this.status === SESSION_STATUSES.RUNNING && this.getCurrentStep() && this.remainingSec === 0) {
      this.advanceStep();
    }
  }

  startTimer() {
    if (this.timerId || typeof this.setInterval !== 'function') {
      return;
    }

    this.timerId = this.setInterval(() => this.tick(), this.intervalMs);
  }

  stopTimer() {
    if (!this.timerId || typeof this.clearInterval !== 'function') {
      this.timerId = null;
      return;
    }

    this.clearInterval(this.timerId);
    this.timerId = null;
  }

  notifyTick() {
    this.hooks.onTick(this.getSnapshot());
  }

  notifyStepChange(previousStep, currentStep) {
    this.playStepSignals(previousStep, currentStep);
    this.hooks.onStepChange(this.getSnapshot(), clone(previousStep), clone(currentStep));
  }

  notifyPhaseChange(previousPhase, currentPhase) {
    if (getPhaseSignature(previousPhase) === getPhaseSignature(currentPhase)) {
      return;
    }

    this.playPhaseSignal(previousPhase, currentPhase);
    this.hooks.onPhaseChange(this.getSnapshot(), clone(previousPhase), clone(currentPhase));
  }

  playStepSignals(previousStep, currentStep) {
    if (isRestStep(previousStep)) {
      this.playAudioSignal('restEnd');
    }

    if (previousStep?.type === STEP_TYPES.EXERCISE) {
      this.playAudioSignal('exerciseComplete');
    }

    if (isRestStep(currentStep)) {
      this.playAudioSignal('restStart');
    }

    if (currentStep?.type === STEP_TYPES.EXERCISE) {
      this.playAudioSignal('exerciseStart');
    }
  }

  playPhaseSignal(previousPhase, currentPhase) {
    if (
      previousPhase?.type === 'rep'
      && currentPhase?.type === 'rep'
      && previousPhase.stepId === currentPhase.stepId
      && previousPhase.key !== currentPhase.key
    ) {
      this.playAudioSignal('phaseChange');
    }
  }

  playAudioSignal(eventName) {
    if (this.audioEnabled) {
      playSignal(eventName);
    }
  }

  stopAudioSignals() {
    if (this.audioEnabled) {
      stopAudioSignals();
    }
  }

  syncCurrentPhase() {
    const previousPhase = this.currentPhase;
    const currentPhase = this.resolveCurrentPhase();
    this.currentPhase = currentPhase;
    this.notifyPhaseChange(previousPhase, currentPhase);
  }

  resolveCurrentPhase() {
    const step = this.getCurrentStep();

    if (!step) {
      return this.status === SESSION_STATUSES.COMPLETED
        ? this.createSessionPhase(SESSION_PHASES.FINISHED, null)
        : null;
    }

    if (step.type === STEP_TYPES.EXERCISE && step.executionMode === EXECUTION_MODES.REPS) {
      const repPhase = this.resolveCurrentRepPhase(step);

      if (repPhase) {
        return repPhase;
      }
    }

    return this.createSessionPhase(step.phase, step);
  }

  resolveCurrentRepPhase(step) {
    const reps = positiveInteger(step.reps);
    const repDurationSec = nonNegativeNumber(step.effort?.repDurationSec, 0);
    const repPhases = asArray(step.effort?.repPhases);

    if (reps === 0 || repDurationSec === 0 || repPhases.length === 0) {
      return null;
    }

    const stepDurationSec = this.stepDurations[this.currentStepIndex] || 0;
    const stepElapsedSec = Math.min(
      this.getCurrentStepElapsedSec(),
      Math.max(0, stepDurationSec - Number.EPSILON),
    );
    const repIndex = Math.min(Math.floor(stepElapsedSec / repDurationSec), reps - 1);
    const repElapsedSec = stepElapsedSec - repIndex * repDurationSec;
    let phaseStartSec = 0;

    for (let phaseIndex = 0; phaseIndex < repPhases.length; phaseIndex += 1) {
      const phase = repPhases[phaseIndex];
      const durationSec = nonNegativeNumber(phase.durationSec, 0);
      const phaseEndSec = phaseStartSec + durationSec;

      if (durationSec > 0 && repElapsedSec < phaseEndSec) {
        return this.createRepPhase(step, phase, {
          phaseIndex,
          repIndex,
          elapsedSec: Math.max(0, repElapsedSec - phaseStartSec),
          remainingSec: Math.max(0, phaseEndSec - repElapsedSec),
        });
      }

      phaseStartSec = phaseEndSec;
    }

    const lastTimedPhaseIndex = findLastIndex(repPhases, (phase) => nonNegativeNumber(phase.durationSec, 0) > 0);
    return lastTimedPhaseIndex >= 0
      ? this.createRepPhase(step, repPhases[lastTimedPhaseIndex], {
        phaseIndex: lastTimedPhaseIndex,
        repIndex,
        elapsedSec: nonNegativeNumber(repPhases[lastTimedPhaseIndex].durationSec, 0),
        remainingSec: 0,
      })
      : null;
  }

  createRepPhase(step, phase, progress) {
    const repNumber = progress.repIndex + 1;
    const durationSec = nonNegativeNumber(phase.durationSec, 0);
    const scope = {
      exerciseIndex: step.exerciseIndex,
      exerciseId: step.exerciseId,
      workoutItemId: step.workoutItemId,
      setIndex: step.setIndex,
      setNumber: step.setNumber,
      totalSets: step.totalSets,
      repIndex: progress.repIndex,
      repNumber,
      totalReps: step.reps,
      stepId: step.id,
    };

    return {
      id: `${step.id}:rep-${repNumber}:${phase.key}`,
      type: 'rep',
      key: phase.key,
      name: phase.name,
      durationSec,
      elapsedSec: Math.min(durationSec, progress.elapsedSec),
      remainingSec: progress.remainingSec,
      tempoField: phase.tempoField,
      ...scope,
      phaseIndex: progress.phaseIndex,
      scope,
    };
  }

  createSessionPhase(key, step) {
    const scope = {
      exerciseIndex: step?.exerciseIndex ?? null,
      exerciseId: step?.exerciseId ?? null,
      workoutItemId: step?.workoutItemId ?? null,
      setIndex: step?.setIndex ?? null,
      setNumber: step?.setNumber ?? null,
      totalSets: step?.totalSets ?? null,
      repIndex: null,
      repNumber: null,
      totalReps: null,
      stepId: step?.id ?? null,
    };

    return {
      id: step ? `${step.id}:${key}` : key,
      type: 'session',
      key,
      name: key,
      durationSec: step ? this.stepDurations[this.currentStepIndex] : 0,
      elapsedSec: step ? this.getCurrentStepElapsedSec() : 0,
      remainingSec: step ? this.remainingSec : 0,
      ...scope,
      scope,
    };
  }

  canRestoreFromSnapshot(snapshot) {
    if (!RESTORABLE_STATUSES.includes(snapshot.status)) {
      return false;
    }

    if (snapshot.steps.length !== this.steps.length) {
      return false;
    }

    const stepIdsMatch = snapshot.steps.every((step, index) => step.id === this.steps[index]?.id);

    if (!stepIdsMatch) {
      return false;
    }

    const currentDurationSec = snapshot.steps[snapshot.currentStepIndex]?.durationSec;

    return Number.isInteger(currentDurationSec)
      && snapshot.remainingSec <= currentDurationSec;
  }

  persistSnapshot(force = false) {
    if (!this.persistenceEnabled || !this.isActive()) {
      return this.getSnapshot();
    }

    const now = Date.now();

    if (!force && now - this.lastSnapshotSavedAt < this.snapshotSaveIntervalMs) {
      return this.getSnapshot();
    }

    const snapshot = createPersistedSessionSnapshot(this.getSnapshot());

    if (!snapshot) {
      return this.getSnapshot();
    }

    try {
      saveSessionSnapshot(snapshot);
      this.lastSnapshotSavedAt = now;
    } catch (error) {
      console.warn('Failed to save active workout session snapshot.', error);
    }

    return snapshot;
  }

  discardPersistedSnapshot() {
    try {
      discardSessionSnapshot();
    } catch (error) {
      console.warn('Failed to clear active workout session snapshot.', error);
    }
  }
}
