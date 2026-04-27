import { listCustomExercises } from '../storage/core.js';
import { builtInExerciseRecords } from './exercises-data.js';
import {
  asArray,
  isPlainObject,
  nonNegativeNumber,
  normalizeString,
  uniqueStrings,
} from '../core/utils.js';
import { normalizeContraindicationTags } from './contraindications.js';

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
  return asArray(builtInExerciseRecords).map((exercise) =>
    normalizeExerciseRecord(exercise, false),
  );
}

/**
 * Merges built-in and custom exercises, preferring built-ins on ID collision.
 */
export function getExerciseCatalog(state) {
  const builtIns = asArray(state.exercises).map((exercise) =>
    normalizeExerciseRecord(exercise, false),
  );
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
  const migrated = migrateExerciseRecord(source);

  return {
    id: normalizeString(migrated.id),
    name: normalizeLocalizedText(migrated.name),
    shortDescription: normalizeLocalizedText(migrated.shortDescription),
    instruction: normalizeLocalizedText(migrated.instruction),
    effect: normalizeLocalizedText(migrated.effect),
    type: normalizeLocalizedText(migrated.type),
    muscles: uniqueStrings(migrated.muscles),
    tags: uniqueStrings(migrated.tags),
    executionMode: EXECUTION_MODES.includes(migrated.executionMode)
      ? migrated.executionMode
      : 'reps',
    tempo: normalizeTempo(migrated.tempo),
    estimatedCalories: nonNegativeNumber(migrated.estimatedCalories),
    image: normalizeString(migrated.image),
    movementPatterns: uniqueStrings(migrated.movementPatterns),
    muscleGroups: normalizeMuscleGroups(migrated.muscleGroups),
    difficulty: normalizeDifficulty(migrated.difficulty),
    equipment: normalizeEquipment(migrated.equipment),
    contraindications: normalizeContraindicationTags(migrated.contraindications),
    intensityProfile: normalizeIntensityProfile(migrated.intensityProfile),
    isCustom,
  };
}

function migrateExerciseRecord(source) {
  if (!isNewExerciseRecord(source)) {
    return source;
  }

  const classification = isPlainObject(source.classification) ? source.classification : {};
  const mechanics = isPlainObject(source.mechanics) ? source.mechanics : {};
  const muscles = isPlainObject(source.muscles) ? source.muscles : {};
  const technique = isPlainObject(source.technique) ? source.technique : {};
  const safety = isPlainObject(source.safety) ? source.safety : {};
  const media = isPlainObject(source.media) ? source.media : {};
  const modality = normalizeString(classification.modality).toLowerCase();
  const type = getLegacyType(modality);
  const primaryMuscles = uniqueStrings(muscles.primary);
  const secondaryMuscles = uniqueStrings(muscles.secondary);
  const stabilizerMuscles = uniqueStrings(muscles.stabilizers);
  const equipment = normalizeEquipment(classification.equipment);
  const difficulty = normalizeDifficulty(classification.difficulty);
  const movementPatterns = uniqueStrings(classification.movementPatterns);
  const executionMode = normalizeString(mechanics.executionMode);
  const impact = normalizeString(safety.impactLevel).toLowerCase();

  return {
    id: normalizeString(source.id || source.slug),
    name: normalizeLocalizedText(source.names),
    shortDescription: normalizeLocalizedText(technique.setup),
    instruction: normalizeLocalizedText(technique.steps),
    effect: normalizeLocalizedText(technique.keyCues),
    type,
    muscles: uniqueStrings([...primaryMuscles, ...secondaryMuscles, ...stabilizerMuscles]),
    tags: buildMigratedTags({
      modality,
      type,
      equipment,
      difficulty,
      movementPatterns,
      executionMode,
      mechanics,
      classification,
      impact,
    }),
    executionMode,
    tempo: mechanics.tempo,
    estimatedCalories: estimateCalories({ modality, impact, executionMode }),
    image: normalizeString(media.thumbnail),
    movementPatterns,
    muscleGroups: {
      primary: primaryMuscles,
      secondary: secondaryMuscles,
    },
    difficulty,
    equipment,
    contraindications: safety.contraindications,
    intensityProfile: buildIntensityProfile({
      modality,
      impact,
      executionMode,
      primaryMuscles,
      movementPatterns,
    }),
  };
}

function isNewExerciseRecord(source) {
  return (
    isPlainObject(source.classification) ||
    isPlainObject(source.mechanics) ||
    isPlainObject(source.technique) ||
    isPlainObject(source.safety) ||
    isPlainObject(source.names)
  );
}

function getLegacyType(modality) {
  const normalized = normalizeString(modality).toLowerCase();

  if (normalized === 'cardio') {
    return { ru: 'кардио', en: 'cardio' };
  }

  if (normalized === 'static') {
    return { ru: 'статика', en: 'static' };
  }

  if (normalized === 'yoga') {
    return { ru: 'йога', en: 'yoga' };
  }

  return { ru: 'силовое', en: 'strength' };
}

function buildMigratedTags(metadata) {
  const typeTag = normalizeString(metadata.type?.en).toLowerCase();
  const tags = [
    typeTag,
    metadata.modality === 'isolation' ? 'isolation' : '',
    ...metadata.equipment,
    metadata.difficulty,
    ...metadata.movementPatterns,
    normalizeString(metadata.mechanics?.loadType),
    normalizeString(metadata.classification?.bodyPosition),
    metadata.impact ? `impact-${metadata.impact}` : '',
    metadata.executionMode === 'hold' ? 'hold' : '',
  ];

  if (typeTag === 'yoga' || metadata.movementPatterns.some((pattern) => pattern === 'stretch')) {
    tags.push('mobility');
  }

  if (metadata.equipment.includes('bodyweight')) {
    tags.push('home');
  } else {
    tags.push('gym');
  }

  return uniqueStrings(tags);
}

function estimateCalories(metadata) {
  const modality = normalizeString(metadata.modality).toLowerCase();
  const impact = normalizeString(metadata.impact).toLowerCase();

  if (modality === 'cardio') {
    return impact === 'high' ? 12 : impact === 'medium' ? 9 : 7;
  }

  if (modality === 'static' || metadata.executionMode === 'hold') {
    return 4;
  }

  if (modality === 'yoga') {
    return 3;
  }

  return 6;
}

function buildIntensityProfile(metadata) {
  const modality = normalizeString(metadata.modality).toLowerCase();
  const impact = ['low', 'medium', 'high'].includes(metadata.impact) ? metadata.impact : 'low';
  const isHold = metadata.executionMode === 'hold';
  const isFullBody =
    metadata.primaryMuscles.includes('full-body') ||
    metadata.movementPatterns.includes('full-body-dynamic');

  if (modality === 'cardio') {
    return {
      strength: isFullBody ? 'medium' : 'low',
      cardio: 'high',
      endurance: 'high',
      impact,
    };
  }

  if (modality === 'static' || isHold) {
    return {
      strength: 'low',
      cardio: 'low',
      endurance: 'high',
      impact,
    };
  }

  if (modality === 'yoga') {
    return {
      strength: 'low',
      cardio: 'low',
      endurance: 'medium',
      impact,
    };
  }

  return {
    strength: modality === 'isolation' ? 'medium' : 'high',
    cardio: 'low',
    endurance: 'medium',
    impact,
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

  return TEMPO_FIELDS.reduce(
    (result, field) => ({
      ...result,
      [field]: nonNegativeNumber(tempo[field]),
    }),
    {},
  );
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

  return (
    {
      bar: 'pull-up-bar',
      cable: 'cable-station',
      'cable-machine': 'cable-station',
      dumbbell: 'dumbbells',
      machine: 'machines',
      'resistance-band': 'bands',
    }[normalized] || normalized
  );
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
