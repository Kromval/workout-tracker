/**
 * @module js/session/ui-format
 */
import { localizedText, t } from '../i18n/index.js';
import { SESSION_STATUSES } from './core.js';
import { SESSION_STEP_TYPES, STEP_TYPES } from './model.js';
import { escapeHtml } from '../core/utils.js';
import { selectLanguage } from '../core/selectors.js';

/**
 * Renders finish stat markup.
 * @param {string} label label input
 * @param {string} value value input
 * @returns {string} rendered markup
 */
export function renderFinishStat(label, value) {
  return `
    <article class="session-finish__stat">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
    </article>
  `;
}

/**
 * Builds session summary.
 * @param {object} snapshot snapshot input
 * @returns {*} result
 */
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
      Array.from(completedByItem.values()).reduce(
        (total, item) => total + item.estimatedCaloriesBurned,
        0,
      ),
    ),
    totalExercisesCompleted: completedItems.length,
    totalSetsCompleted: completedItems.reduce((total, item) => total + item.setsCompleted, 0),
  };
}

/**
 * Gets completed exercise steps.
 * @param {object} snapshot snapshot input
 * @returns {*} result
 */
export function getCompletedExerciseSteps(snapshot) {
  const steps = Array.isArray(snapshot.steps) ? snapshot.steps : [];
  const currentStepIndex = Number.isInteger(snapshot.currentStepIndex)
    ? snapshot.currentStepIndex
    : steps.length;
  const completedThroughIndex =
    snapshot.status === SESSION_STATUSES.COMPLETED ? steps.length : Math.max(0, currentStepIndex);

  return steps.slice(0, completedThroughIndex).filter(isWorkStep);
}

/**
 * Gets step calories.
 * @param {number} step step input
 * @returns {*} result
 */
export function getStepCalories(step) {
  const caloriesPerMinute = Math.max(0, Number(step.exercise?.estimatedCalories) || 0);
  const durationSec = Math.max(0, Number(step.durationSec) || 0);
  return (durationSec / 60) * caloriesPerMinute;
}

/**
 * Runs round to one decimal.
 * @param {string} value value input
 * @returns {*} result
 */
export function roundToOneDecimal(value) {
  return Math.round(Math.max(0, Number(value) || 0) * 10) / 10;
}

/**
 * Gets next step.
 * @param {object} snapshot snapshot input
 * @returns {*} result
 */
export function getNextStep(snapshot) {
  const nextIndex = snapshot.currentStepIndex + 1;
  return snapshot.steps?.[nextIndex] || null;
}

/**
 * Gets step exercise name.
 * @param {number} step step input
 * @param {object} state state input
 * @returns {*} result
 */
export function getStepExerciseName(step, state) {
  if (!step) {
    return t(state, 'sessionFinished');
  }

  return (
    step.title ||
    localizedText(step.exercise?.name, selectLanguage(state)) ||
    step.exerciseId ||
    t(state, 'emptyValue')
  );
}

/**
 * Gets step kind label.
 * @param {number} step step input
 * @param {object} state state input
 * @returns {*} result
 */
export function getStepKindLabel(step, state) {
  if (!step) {
    return t(state, 'sessionNoCurrentStep');
  }

  if (step.type === SESSION_STEP_TYPES.WORK) {
    return t(state, 'sessionWorkStep');
  }

  if (step.type === STEP_TYPES.EXERCISE) {
    return t(state, 'sessionExerciseStep');
  }

  if (step.type === STEP_TYPES.REST_BETWEEN_SETS || step.type === SESSION_STEP_TYPES.REST) {
    return t(state, 'sessionRestBetweenSets');
  }

  if (step.type === STEP_TYPES.REST_AFTER_EXERCISE || step.type === SESSION_STEP_TYPES.TRANSITION) {
    return t(state, 'sessionRestBetweenExercises');
  }

  if (step.type === SESSION_STEP_TYPES.PREPARE) {
    return t(state, 'sessionPrepareStep');
  }

  if (step.type === SESSION_STEP_TYPES.COOLDOWN) {
    return t(state, 'sessionCooldownStep');
  }

  if (step.type === SESSION_STEP_TYPES.CUE) {
    return t(state, 'sessionCueStep');
  }

  return step.type || t(state, 'sessionNoCurrentStep');
}

/**
 * Formats set counter.
 * @param {number} step step input
 * @param {object} state state input
 * @returns {*} result
 */
export function formatSetCounter(step, state) {
  if (!step?.setNumber || !step?.totalSets) {
    return t(state, 'sessionNotApplicable');
  }

  return `${step.setNumber} / ${step.totalSets}`;
}

/**
 * Formats rep counter.
 * @param {number} step step input
 * @param {*} phase phase input
 * @param {object} state state input
 * @returns {*} result
 */
export function formatRepCounter(step, phase, state) {
  if (!step || step.executionMode !== 'reps' || !step.reps) {
    return t(state, 'sessionNotApplicable');
  }

  const repNumber =
    phase?.repNumber ||
    Math.min(
      step.reps,
      Math.floor((step.elapsedSec || 0) / Math.max(1, step.effort?.repDurationSec || 1)) + 1,
    );

  return `${repNumber} / ${step.reps}`;
}

/**
 * Gets phase label.
 * @param {*} phase phase input
 * @param {object} state state input
 * @returns {*} result
 */
export function getPhaseLabel(phase, state) {
  if (!phase) {
    return t(state, 'emptyValue');
  }

  return t(state, `sessionPhase_${phase.key}`) || phase.name || phase.key;
}

/**
 * Formats next step.
 * @param {number} step step input
 * @param {object} state state input
 * @returns {*} result
 */
export function formatNextStep(step, state) {
  if (!step) {
    return t(state, 'sessionNoNextStep');
  }

  const name = getStepExerciseName(step, state);
  const kind = getStepKindLabel(step, state);
  return `${kind}: ${name}`;
}

/**
 * Gets status label.
 * @param {HTMLElement} status status input
 * @param {object} state state input
 * @returns {*} result
 */
export function getStatusLabel(status, state) {
  return t(state, `sessionStatus_${status}`) || status;
}

/**
 * Checks whether terminal.
 * @param {HTMLElement} status status input
 * @returns {boolean} predicate result
 */
export function isTerminal(status) {
  return status === SESSION_STATUSES.COMPLETED || status === SESSION_STATUSES.ABORTED;
}

/**
 * Checks whether step is executable work.
 * @param {*} step step input
 * @returns {boolean} predicate result
 */
function isWorkStep(step) {
  return step?.type === SESSION_STEP_TYPES.WORK || step?.type === STEP_TYPES.EXERCISE;
}
