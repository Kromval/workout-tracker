import {
  createWorkout as createStoredWorkout,
  createWorkoutItem as createStoredWorkoutItem,
  listWorkouts,
} from '../storage/core.js';
import {
  asArray,
  isPlainObject,
  nonNegativeInteger,
  nonNegativeNumber,
  normalizeString,
} from '../core/utils.js';

const DEFAULT_REST_BETWEEN_EXERCISES_SEC = 90;
const DEFAULT_REST_BETWEEN_SETS_SEC = 60;
const DEFAULT_REP_DURATION_SEC = 3;
const TEMPO_FIELDS = ['eccentric', 'pauseBottom', 'concentric', 'pauseTop'];

// Workout-specific helpers stay UI-agnostic so editor/session flows can reuse them.
export function getWorkouts() {
  return listWorkouts().map(normalizeWorkout);
}

/**
 * Creates a normalized empty workout draft for editor flows.
 * @param {object} overrides partial workout fields
 * @returns {object} normalized workout draft
 */
export function createEmptyWorkout(overrides = {}) {
  return normalizeWorkout(createStoredWorkout({
    title: '',
    description: '',
    items: [],
    defaultRestBetweenExercises: DEFAULT_REST_BETWEEN_EXERCISES_SEC,
    ...overrides,
  }));
}

export function createWorkoutItem(overrides = {}) {
  return normalizeWorkoutItem(createStoredWorkoutItem({
    restBetweenSetsSec: DEFAULT_REST_BETWEEN_SETS_SEC,
    ...overrides,
  }));
}

/**
 * Normalizes arbitrary workout-like input into the app's workout shape.
 * This does not persist data; storage.js owns persistence and validation.
 */
export function normalizeWorkout(workout = {}) {
  const source = isPlainObject(workout) ? workout : {};
  const createdAt = normalizeIsoDate(source.createdAt, nowIso());
  const defaultRestBetweenExercises = nonNegativeInteger(
    source.defaultRestBetweenExercises,
    DEFAULT_REST_BETWEEN_EXERCISES_SEC,
  );

  return {
    id: normalizeString(source.id) || createId('workout'),
    title: normalizeString(source.title),
    description: normalizeString(source.description),
    createdAt,
    updatedAt: normalizeIsoDate(source.updatedAt, createdAt),
    isPreset: Boolean(source.isPreset),
    defaultRestBetweenExercises,
    items: asArray(source.items)
      .map(normalizeWorkoutItem)
      .sort((left, right) => left.order - right.order)
      .map((item, order) => ({ ...item, order })),
  };
}

/**
 * Estimates total workout duration including exercise effort and rest periods.
 */
export function calculateEstimatedWorkoutDuration(workout, exercises = []) {
  const normalizedWorkout = normalizeWorkout(workout);
  const exerciseMap = createExerciseMap(exercises);

  return normalizedWorkout.items.reduce((totalSec, item, index) => {
    const exercise = exerciseMap.get(item.exerciseId) || null;
    const activeSec = calculateItemActiveDuration(item, exercise);
    const setRestSec = Math.max(0, item.sets - 1) * item.restBetweenSetsSec;
    const exerciseRestSec = index < normalizedWorkout.items.length - 1
      ? item.restAfterExerciseSec ?? normalizedWorkout.defaultRestBetweenExercises
      : 0;

    return totalSec + activeSec + setRestSec + exerciseRestSec;
  }, 0);
}

/**
 * Estimates calories from exercise duration and per-minute exercise metadata.
 */
export function calculateWorkoutCaloriesEstimate(workout, exercises = []) {
  const normalizedWorkout = normalizeWorkout(workout);
  const exerciseMap = createExerciseMap(exercises);

  const calories = normalizedWorkout.items.reduce((totalCalories, item) => {
    const exercise = exerciseMap.get(item.exerciseId);

    if (!exercise) {
      return totalCalories;
    }

    const caloriesPerMinute = nonNegativeNumber(exercise.estimatedCalories, 0);
    const activeMinutes = calculateItemActiveDuration(item, exercise) / 60;
    return totalCalories + activeMinutes * caloriesPerMinute;
  }, 0);

  return Math.round(calories * 10) / 10;
}

// Backward-compatible alias used by early workout editor placeholders.
export function createEmptyWorkoutDraft() {
  return createEmptyWorkout();
}

function normalizeWorkoutItem(item = {}) {
  const source = isPlainObject(item) ? item : {};

  return {
    id: normalizeString(source.id) || createId('workout-item'),
    exerciseId: normalizeString(source.exerciseId),
    sets: Math.max(1, nonNegativeInteger(source.sets, 1)),
    reps: optionalNonNegativeInteger(source.reps),
    durationSec: optionalNonNegativeInteger(source.durationSec),
    distance: optionalNonNegativeNumber(source.distance),
    restBetweenSetsSec: nonNegativeInteger(source.restBetweenSetsSec, DEFAULT_REST_BETWEEN_SETS_SEC),
    restAfterExerciseSec: optionalNonNegativeInteger(source.restAfterExerciseSec),
    tempoOverride: normalizeTempo(source.tempoOverride),
    notes: normalizeString(source.notes),
    order: nonNegativeInteger(source.order, 0),
  };
}

function calculateItemActiveDuration(item, exercise) {
  if (item.durationSec !== null) {
    return item.sets * item.durationSec;
  }

  if (item.reps !== null) {
    return item.sets * item.reps * getRepDurationSec(item, exercise);
  }

  return 0;
}

function getRepDurationSec(item, exercise) {
  const tempo = item.tempoOverride || normalizeTempo(exercise?.tempo);

  if (!tempo) {
    return DEFAULT_REP_DURATION_SEC;
  }

  const tempoSec = TEMPO_FIELDS.reduce((sum, field) => sum + tempo[field], 0);
  return tempoSec > 0 ? tempoSec : DEFAULT_REP_DURATION_SEC;
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

function optionalNonNegativeInteger(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeInteger(value, 0);
}

function optionalNonNegativeNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeNumber(value, 0);
}

function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function nowIso() {
  return new Date().toISOString();
}

function createId(prefix) {
  const cryptoApi = typeof globalThis !== 'undefined' ? globalThis.crypto : null;

  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return `${prefix}-${cryptoApi.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

