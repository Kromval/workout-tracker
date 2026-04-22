import { localizedText, t } from '../i18n/index.js';
import { SESSION_STATUSES } from './core.js';
import { escapeHtml } from '../core/utils.js';

export function renderFinishStat(label, value) {
  return `
    <article class="session-finish__stat">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
    </article>
  `;
}



export function buildSessionSummary(snapshot) {
  const completedExerciseSteps = getCompletedExerciseSteps(snapshot);
  const completedByItem = completedExerciseSteps.reduce((items, step) => {
    const key = step.workoutItemId || step.id;
    const current = items.get(key) || {
      workoutItemId: step.workoutItemId || '',
      exerciseId: step.exerciseId || '',
      exerciseNameSnapshot: step.exercise?.name || '',
      setsCompleted: 0,
      repsCompleted: null,
      durationSec: null,
      skipped: false,
      note: step.notes || '',
      estimatedCaloriesBurned: 0,
    };

    current.setsCompleted += 1;

    if (step.executionMode === 'reps') {
      current.repsCompleted = (current.repsCompleted || 0) + Math.max(0, Number(step.reps) || 0);
    } else {
      current.durationSec = (current.durationSec || 0) + Math.max(0, Number(step.durationSec) || 0);
    }

    current.estimatedCaloriesBurned += getStepCalories(step);
    items.set(key, current);
    return items;
  }, new Map());

  const completedItems = Array.from(completedByItem.values()).map((item) => ({
    workoutItemId: item.workoutItemId,
    exerciseId: item.exerciseId,
    exerciseNameSnapshot: item.exerciseNameSnapshot,
    setsCompleted: item.setsCompleted,
    repsCompleted: item.repsCompleted,
    durationSec: item.durationSec,
    skipped: item.skipped,
    note: item.note,
  }));

  return {
    durationSec: Math.max(0, Math.round(Number(snapshot.elapsedSec) || 0)),
    completedItems,
    estimatedCaloriesBurned: roundToOneDecimal(
      Array.from(completedByItem.values()).reduce((total, item) => total + item.estimatedCaloriesBurned, 0),
    ),
    totalExercisesCompleted: completedItems.length,
    totalSetsCompleted: completedItems.reduce((total, item) => total + item.setsCompleted, 0),
  };
}



export function getCompletedExerciseSteps(snapshot) {
  const steps = Array.isArray(snapshot.steps) ? snapshot.steps : [];
  const currentStepIndex = Number.isInteger(snapshot.currentStepIndex) ? snapshot.currentStepIndex : steps.length;
  const completedThroughIndex = snapshot.status === SESSION_STATUSES.COMPLETED
    ? steps.length
    : Math.max(0, currentStepIndex);

  return steps
    .slice(0, completedThroughIndex)
    .filter((step) => step?.type === 'exercise');
}



export function getStepCalories(step) {
  const caloriesPerMinute = Math.max(0, Number(step.exercise?.estimatedCalories) || 0);
  const durationSec = Math.max(0, Number(step.durationSec) || 0);
  return (durationSec / 60) * caloriesPerMinute;
}



export function roundToOneDecimal(value) {
  return Math.round(Math.max(0, Number(value) || 0) * 10) / 10;
}



export function getNextStep(snapshot) {
  const nextIndex = snapshot.currentStepIndex + 1;
  return snapshot.steps?.[nextIndex] || null;
}



export function getStepExerciseName(step, state) {
  if (!step) {
    return t(state, 'sessionFinished');
  }

  return localizedText(step.exercise?.name, state.settings.language) || step.exerciseId || t(state, 'emptyValue');
}



export function getStepKindLabel(step, state) {
  if (!step) {
    return t(state, 'sessionNoCurrentStep');
  }

  if (step.type === 'exercise') {
    return t(state, 'sessionExerciseStep');
  }

  if (step.type === 'rest-between-sets') {
    return t(state, 'sessionRestBetweenSets');
  }

  return t(state, 'sessionRestBetweenExercises');
}



export function formatSetCounter(step, state) {
  if (!step?.setNumber || !step?.totalSets) {
    return t(state, 'sessionNotApplicable');
  }

  return `${step.setNumber} / ${step.totalSets}`;
}



export function formatRepCounter(step, phase, state) {
  if (!step || step.executionMode !== 'reps' || !step.reps) {
    return t(state, 'sessionNotApplicable');
  }

  const repNumber = phase?.repNumber || Math.min(
    step.reps,
    Math.floor((step.elapsedSec || 0) / Math.max(1, step.effort?.repDurationSec || 1)) + 1,
  );

  return `${repNumber} / ${step.reps}`;
}



export function getPhaseLabel(phase, state) {
  if (!phase) {
    return t(state, 'emptyValue');
  }

  return t(state, `sessionPhase_${phase.key}`) || phase.name || phase.key;
}



export function formatNextStep(step, state) {
  if (!step) {
    return t(state, 'sessionNoNextStep');
  }

  const name = getStepExerciseName(step, state);
  const kind = getStepKindLabel(step, state);
  return `${kind}: ${name}`;
}



export function getStatusLabel(status, state) {
  return t(state, `sessionStatus_${status}`) || status;
}



export function isTerminal(status) {
  return status === SESSION_STATUSES.COMPLETED || status === SESSION_STATUSES.ABORTED;
}


