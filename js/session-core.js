import { playSignal, stopAll as stopAudioSignals } from './audio.js';
import { getActiveSession, saveActiveSession, clearActiveSession } from './storage.js';
import {
  DEFAULT_REP_DURATION_SEC,
  DEFAULT_REP_TEMPO,
  DEFAULT_SNAPSHOT_SAVE_INTERVAL_MS,
  EXECUTION_MODES,
  REP_PHASE_NAMES,
  REP_PHASE_SEQUENCE,
  RESTORABLE_STATUSES,
  SESSION_PHASES,
  SESSION_SNAPSHOT_VERSION,
  SESSION_STATUSES,
  STEP_TYPES,
  TEMPO_FIELDS,
  TICK_INTERVAL_MS,
} from './session-model.js';
import { normalizeWorkout } from './workouts.js';

export { SESSION_PHASES, SESSION_STATUSES } from './session-model.js';

// Session persistence is isolated for future timer/recovery logic.
export function getSessionSnapshot() {
  const snapshot = normalizeSessionSnapshot(getActiveSession());

  if (!snapshot) {
    discardSessionSnapshot();
  }

  return snapshot;
}

export function saveSessionSnapshot(snapshot) {
  const normalized = normalizeSessionSnapshot(snapshot);

  if (!normalized) {
    discardSessionSnapshot();
    return null;
  }

  return saveActiveSession(normalized);
}

export function discardSessionSnapshot() {
  clearActiveSession();
}

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
export function buildWorkoutSteps(workout, exercises = []) {
  const normalizedWorkout = normalizeWorkout(workout);
  const exerciseMap = createExerciseMap(exercises);
  const workoutItems = normalizedWorkout.items.filter((item) => item.exerciseId);

  return workoutItems.flatMap((item, exerciseIndex) => {
    const exercise = exerciseMap.get(item.exerciseId) || null;
    const steps = [];

    for (let setIndex = 0; setIndex < item.sets; setIndex += 1) {
      steps.push(createExerciseStep(item, exercise, exerciseIndex, setIndex));

      if (setIndex < item.sets - 1 && item.restBetweenSetsSec > 0) {
        steps.push(createRestBetweenSetsStep(item, exercise, exerciseIndex, setIndex));
      }
    }

    if (exerciseIndex < workoutItems.length - 1) {
      const durationSec = item.restAfterExerciseSec ?? normalizedWorkout.defaultRestBetweenExercises;

      if (durationSec > 0) {
        steps.push(createRestBetweenExercisesStep(item, exercise, exerciseIndex, durationSec));
      }
    }

    return steps;
  });
}

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

function createExerciseStep(item, exercise, exerciseIndex, setIndex) {
  const effort = createExerciseEffort(item, exercise);

  return {
    id: `${item.id}:set-${setIndex + 1}:exercise`,
    type: STEP_TYPES.EXERCISE,
    phase: SESSION_PHASES.EXERCISE,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    exercise,
    executionMode: effort.executionMode,
    exerciseIndex,
    setIndex,
    setNumber: setIndex + 1,
    totalSets: item.sets,
    reps: effort.reps,
    distance: item.distance,
    notes: item.notes,
    durationSec: effort.durationSec,
    effort,
  };
}

function createRestBetweenSetsStep(item, exercise, exerciseIndex, setIndex) {
  return {
    id: `${item.id}:set-${setIndex + 1}:rest`,
    type: STEP_TYPES.REST_BETWEEN_SETS,
    phase: SESSION_PHASES.REST_BETWEEN_SETS,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    exercise,
    exerciseIndex,
    setIndex,
    fromSetNumber: setIndex + 1,
    toSetNumber: setIndex + 2,
    durationSource: 'restBetweenSetsSec',
    durationSec: item.restBetweenSetsSec,
  };
}

function createRestBetweenExercisesStep(item, exercise, exerciseIndex, durationSec) {
  return {
    id: `${item.id}:rest-after-exercise`,
    type: STEP_TYPES.REST_AFTER_EXERCISE,
    phase: SESSION_PHASES.REST_BETWEEN_EXERCISES,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    exercise,
    exerciseIndex,
    durationSource: item.restAfterExerciseSec === null ? 'workout.defaultRestBetweenExercises' : 'restAfterExerciseSec',
    durationSec,
  };
}

function createExerciseEffort(item, exercise) {
  const executionMode = resolveExecutionMode(item, exercise);

  if (executionMode === EXECUTION_MODES.TIME || executionMode === EXECUTION_MODES.HOLD) {
    return {
      executionMode,
      reps: null,
      durationSource: 'durationSec',
      durationSec: item.durationSec ?? 0,
    };
  }

  if (executionMode === EXECUTION_MODES.REPS) {
    const tempoDetails = getTempoDetails(item, exercise);
    const reps = item.reps ?? 0;

    return {
      executionMode,
      reps,
      durationSource: 'reps*tempo',
      durationSec: reps * tempoDetails.repDurationSec,
      tempo: tempoDetails.tempo,
      tempoSource: tempoDetails.tempoSource,
      repDurationSec: tempoDetails.repDurationSec,
      repPhases: tempoDetails.repPhases,
    };
  }

  return {
    executionMode,
    reps: item.reps,
    durationSource: item.durationSec !== null ? 'durationSec' : 'unknown',
    durationSec: item.durationSec ?? 0,
  };
}

function resolveExecutionMode(item, exercise) {
  const exerciseMode = normalizeString(exercise?.executionMode);

  if (exerciseMode === EXECUTION_MODES.REPS || exerciseMode === EXECUTION_MODES.TIME || exerciseMode === EXECUTION_MODES.HOLD) {
    return exerciseMode;
  }

  if (item.reps !== null) {
    return EXECUTION_MODES.REPS;
  }

  if (item.durationSec !== null) {
    return exerciseMode === EXECUTION_MODES.HOLD ? EXECUTION_MODES.HOLD : EXECUTION_MODES.TIME;
  }

  return exerciseMode || EXECUTION_MODES.CUSTOM;
}

function getTempoDetails(item, exercise) {
  const tempoOverride = normalizeTempo(item.tempoOverride);
  const exerciseTempo = normalizeTempo(exercise?.tempo);
  const tempo = tempoOverride || exerciseTempo;
  const tempoSource = tempoOverride ? 'tempoOverride' : exerciseTempo ? 'exercise.tempo' : 'default';

  if (!tempo) {
    return {
      tempo: null,
      tempoSource,
      repDurationSec: DEFAULT_REP_DURATION_SEC,
      repPhases: createDefaultRepPhases(),
    };
  }

  const tempoSec = TEMPO_FIELDS.reduce((sum, field) => sum + tempo[field], 0);
  const repDurationSec = tempoSec > 0 ? tempoSec : DEFAULT_REP_DURATION_SEC;

  return {
    tempo,
    tempoSource: tempoSec > 0 ? tempoSource : 'default',
    repDurationSec,
    repPhases: tempoSec > 0 ? createTempoRepPhases(tempo) : createDefaultRepPhases(),
  };
}

function createTempoRepPhases(tempo) {
  return REP_PHASE_SEQUENCE.map((phase, phaseIndex) => ({
    key: phase.key,
    name: phase.name,
    tempoField: phase.tempoField,
    durationSec: tempo[phase.tempoField],
    phaseIndex,
  }));
}

function createDefaultRepPhases() {
  return createTempoRepPhases(DEFAULT_REP_TEMPO);
}

function createExerciseMap(exercises) {
  return asArray(exercises).reduce((map, exercise) => {
    if (isPlainObject(exercise) && normalizeString(exercise.id)) {
      map.set(normalizeString(exercise.id), exercise);
    }

    return map;
  }, new Map());
}

function normalizeTempo(tempo) {
  if (!isPlainObject(tempo)) {
    return null;
  }

  return TEMPO_FIELDS.reduce((result, field) => ({
    ...result,
    [field]: nonNegativeNumber(tempo[field], 0),
  }), {});
}

function normalizeHooks(options) {
  return {
    onTick: normalizeHook(options.onTick),
    onStepChange: normalizeHook(options.onStepChange),
    onPhaseChange: normalizeHook(options.onPhaseChange),
    onWorkoutComplete: normalizeHook(options.onWorkoutComplete),
    onWorkoutAbort: normalizeHook(options.onWorkoutAbort),
  };
}

function normalizeHook(callback) {
  return typeof callback === 'function' ? callback : noop;
}

function createPersistedSessionSnapshot(snapshot) {
  if (!isPlainObject(snapshot) || !RESTORABLE_STATUSES.includes(snapshot.status)) {
    return null;
  }

  return normalizeSessionSnapshot({
    version: SESSION_SNAPSHOT_VERSION,
    savedAt: nowIso(),
    status: snapshot.status,
    workout: snapshot.workout,
    steps: asArray(snapshot.steps).map((step) => ({
      id: normalizeString(step?.id),
      durationSec: nonNegativeInteger(step?.durationSec, 0),
    })),
    currentStepIndex: snapshot.currentStepIndex,
    remainingSec: snapshot.currentStep?.remainingSec ?? snapshot.remainingSec,
    elapsedSec: snapshot.elapsedSec,
    startedAt: snapshot.startedAt,
  });
}

function normalizeSessionSnapshot(snapshot) {
  if (!isPlainObject(snapshot)) {
    return null;
  }

  const status = normalizeString(snapshot.status);
  const steps = asArray(snapshot.steps).map((step) => ({
    id: normalizeString(step?.id),
    durationSec: nonNegativeInteger(step?.durationSec, 0),
  }));
  const currentStepIndex = nonNegativeInteger(snapshot.currentStepIndex, -1);
  const currentStep = steps[currentStepIndex];
  const remainingSec = nonNegativeInteger(snapshot.currentStep?.remainingSec ?? snapshot.remainingSec, -1);
  const elapsedSec = nonNegativeInteger(snapshot.elapsedSec, 0);

  if (
    !RESTORABLE_STATUSES.includes(status)
    || !isPlainObject(snapshot.workout)
    || steps.length === 0
    || currentStepIndex < 0
    || currentStepIndex >= steps.length
    || !currentStep?.id
    || remainingSec < 0
    || remainingSec > currentStep.durationSec
  ) {
    return null;
  }

  return {
    version: positiveInteger(snapshot.version) || SESSION_SNAPSHOT_VERSION,
    savedAt: normalizeIsoDate(snapshot.savedAt, nowIso()),
    status,
    workout: normalizeWorkout(snapshot.workout),
    steps,
    currentStepIndex,
    remainingSec,
    elapsedSec,
    startedAt: normalizeIsoDate(snapshot.startedAt, nowIso()),
  };
}

function positiveInteger(value) {
  return Math.max(0, nonNegativeInteger(value, 0));
}

function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isRestStep(step) {
  return step?.type === STEP_TYPES.REST_BETWEEN_SETS || step?.type === STEP_TYPES.REST_AFTER_EXERCISE;
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function getPhaseSignature(phase) {
  if (!phase) {
    return '';
  }

  if (typeof phase !== 'object') {
    return String(phase);
  }

  return [
    phase.type,
    phase.key,
    phase.stepId,
    phase.exerciseIndex,
    phase.setIndex,
    phase.repIndex,
    phase.phaseIndex,
  ].join(':');
}

function findLastIndex(items, predicate) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (predicate(items[index], index)) {
      return index;
    }
  }

  return -1;
}

function noop() {}
