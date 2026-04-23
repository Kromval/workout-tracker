import { listCustomExercises } from '../storage/core.js';
import { builtInExerciseRecords } from './exercises-data.js';
import {
  asArray,
  isPlainObject,
  nonNegativeNumber,
  normalizeString,
  uniqueStrings,
} from '../core/utils.js';

const EXECUTION_MODES = ['reps', 'time', 'hold', 'custom'];
const TEMPO_FIELDS = ['eccentric', 'concentric', 'pauseTop', 'pauseBottom'];
const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'];

let builtInExercises = normalizeBuiltInExercises();
let builtInExercisesPromise = null;

/**
 * Loads and normalizes built-in exercises once for the app lifetime.
 * Data is bundled as an ES module so the catalog works without fetch or a dev server.
 */
export async function loadExercises() {
  if (builtInExercisesPromise) {
    return builtInExercisesPromise;
  }

  builtInExercisesPromise = Promise.resolve(normalizeBuiltInExercises());
  builtInExercises = await builtInExercisesPromise;
  return builtInExercises;
}

function normalizeBuiltInExercises() {
  return asArray(builtInExerciseRecords).map((exercise) => normalizeExerciseRecord(exercise, false));
}

/**
 * Merges built-in and custom exercises, preferring built-ins on ID collision.
 */
export function getExerciseCatalog(state) {
  const builtIns = asArray(state.exercises).map((exercise) => normalizeExerciseRecord(exercise, false));
  const builtInIds = new Set(builtIns.map((exercise) => exercise.id));
  const customSource = Array.isArray(state.store?.customExercises)
    ? state.store.customExercises
    : listCustomExercises();
  const customExercises = customSource
    .map((exercise) => normalizeExerciseRecord(exercise, true))
    .filter((exercise) => !builtInIds.has(exercise.id));

  return [...builtIns, ...customExercises];
}

export function getBuiltInExercises() {
  return [...builtInExercises];
}

export function isBuiltInExerciseId(id, state = null) {
  const source = state ? state.exercises : builtInExercises;
  return asArray(source).some((exercise) => exercise.id === normalizeString(id));
}

function normalizeExerciseRecord(exercise, isCustom) {
  const source = isPlainObject(exercise) ? exercise : {};

  return {
    id: normalizeString(source.id),
    name: normalizeLocalizedText(source.name),
    shortDescription: normalizeLocalizedText(source.shortDescription),
    instruction: normalizeLocalizedText(source.instruction),
    effect: normalizeLocalizedText(source.effect),
    type: normalizeLocalizedText(source.type),
    muscles: uniqueStrings(source.muscles),
    tags: uniqueStrings(source.tags),
    executionMode: EXECUTION_MODES.includes(source.executionMode) ? source.executionMode : 'reps',
    tempo: normalizeTempo(source.tempo),
    estimatedCalories: nonNegativeNumber(source.estimatedCalories),
    image: normalizeString(source.image),
    movementPatterns: uniqueStrings(source.movementPatterns),
    muscleGroups: normalizeMuscleGroups(source.muscleGroups),
    difficulty: normalizeDifficulty(source.difficulty),
    equipment: normalizeEquipment(source.equipment),
    contraindications: uniqueStrings(source.contraindications),
    intensityProfile: normalizeIntensityProfile(source.intensityProfile),
    isCustom,
  };
}

function normalizeLocalizedText(value) {
  if (isPlainObject(value)) {
    return {
      ru: normalizeString(value.ru),
      en: normalizeString(value.en),
    };
  }

  return {
    ru: normalizeString(value),
    en: '',
  };
}

function normalizeTempo(tempo) {
  if (!isPlainObject(tempo)) {
    return null;
  }

  return TEMPO_FIELDS.reduce((result, field) => ({
    ...result,
    [field]: nonNegativeNumber(tempo[field]),
  }), {});
}

function normalizeDifficulty(value) {
  const difficulty = normalizeString(value).toLowerCase();
  return DIFFICULTY_LEVELS.includes(difficulty) ? difficulty : '';
}

function normalizeEquipment(value) {
  return uniqueStrings(asArray(value).map(normalizeEquipmentId));
}

function normalizeEquipmentId(value) {
  const normalized = normalizeString(value).toLowerCase().replaceAll(' ', '-');

  if (normalized === 'resistance-band') {
    return 'bands';
  }

  return normalized;
}

function normalizeMuscleGroups(value) {
  const source = isPlainObject(value) ? value : {};

  return {
    primary: uniqueStrings(source.primary),
    secondary: uniqueStrings(source.secondary),
  };
}

function normalizeIntensityProfile(value) {
  const source = isPlainObject(value) ? value : {};

  return {
    strength: normalizeString(source.strength).toLowerCase(),
    cardio: normalizeString(source.cardio).toLowerCase(),
    endurance: normalizeString(source.endurance).toLowerCase(),
    impact: normalizeString(source.impact).toLowerCase(),
  };
}

