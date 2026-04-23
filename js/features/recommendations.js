import { asArray, isPlainObject, normalizeString } from '../core/utils.js';
import { getEquipmentCatalog } from './equipment.js';
import {
  getExerciseEquipmentIds,
  getExerciseProfileLevel,
  isExerciseAvailableForSelectedEquipment,
  isExerciseCompatibleWithProfileLevel,
} from './exercise-compatibility.js';

export const RECOMMENDATION_EXCLUSION_REASONS = Object.freeze({
  DUPLICATE_EXERCISE_ID: 'duplicate-exercise-id',
  MISSING_REQUIRED_EQUIPMENT: 'missing-required-equipment',
  DIFFICULTY_ABOVE_PROFILE_LEVEL: 'difficulty-above-profile-level',
  GOAL_NOT_MATCHED: 'goal-not-matched',
});

const GOAL_MODES = new Set(['prefer', 'require', 'off']);
const GOAL_TAGS_BY_GOAL = Object.freeze({
  strength: ['strength'],
  hypertrophy: ['strength'],
  endurance: ['cardio', 'yoga', 'hold', 'static'],
  'fat-loss': ['cardio'],
  'general-fitness': ['strength', 'cardio', 'yoga', 'static', 'hold'],
});

const TYPE_GOALS_BY_TYPE = Object.freeze({
  strength: ['strength', 'hypertrophy', 'general-fitness'],
  cardio: ['endurance', 'fat-loss', 'general-fitness'],
  static: ['endurance', 'general-fitness'],
  yoga: ['endurance', 'general-fitness'],
});

export function filterExercisesForRecommendations(options = {}) {
  const exercises = asArray(options.exercises);
  const profile = normalizeProfile(options.profile);
  const goalMode = normalizeGoalMode(options.goalMode);
  const equipmentCatalog = getNormalizedEquipmentCatalog(options.equipmentCatalog, options.equipment);
  const knownEquipmentIds = equipmentCatalog.map((item) => item.id);
  const selectedEquipmentIds = getSelectedEquipmentIds(options.equipment);

  const eligibleExercises = [];
  const excludedExercises = [];
  const seenExerciseIds = new Set();

  exercises.forEach((exercise) => {
    if (!isPlainObject(exercise)) {
      return;
    }

    const exerciseId = normalizeString(exercise.id);
    const metadata = buildExerciseRecommendationMetadata(exercise, {
      profile,
      selectedEquipmentIds,
      knownEquipmentIds,
    });
    const reasons = [];

    if (!exerciseId) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.DUPLICATE_EXERCISE_ID);
    } else if (seenExerciseIds.has(exerciseId)) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.DUPLICATE_EXERCISE_ID);
    } else {
      seenExerciseIds.add(exerciseId);
    }

    if (!metadata.hasRequiredEquipment) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.MISSING_REQUIRED_EQUIPMENT);
    }

    if (!metadata.isCompatibleWithProfileLevel) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.DIFFICULTY_ABOVE_PROFILE_LEVEL);
    }

    if (goalMode === 'require' && profile.goal && !metadata.matchesGoal) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.GOAL_NOT_MATCHED);
    }

    const resultEntry = {
      exercise,
      reasons,
      metadata,
    };

    if (reasons.length > 0) {
      excludedExercises.push(resultEntry);
    } else {
      eligibleExercises.push(resultEntry);
    }
  });

  return {
    eligibleExercises,
    excludedExercises,
    summary: {
      totalExercises: exercises.length,
      eligibleCount: eligibleExercises.length,
      excludedCount: excludedExercises.length,
      excludedByReason: countExcludedReasons(excludedExercises),
    },
  };
}

export function buildExerciseRecommendationMetadata(exercise, context = {}) {
  const profile = normalizeProfile(context.profile);
  const knownEquipmentIds = asArray(context.knownEquipmentIds);
  const selectedEquipmentIds = asArray(context.selectedEquipmentIds);
  const goalIds = getExerciseGoalIds(exercise);

  return {
    requiredEquipmentIds: getExerciseEquipmentIds(exercise, knownEquipmentIds),
    profileLevel: getExerciseProfileLevel(exercise),
    goalIds,
    hasRequiredEquipment: isExerciseAvailableForSelectedEquipment(exercise, selectedEquipmentIds, knownEquipmentIds),
    isCompatibleWithProfileLevel: isExerciseCompatibleWithProfileLevel(exercise, profile.trainingLevel),
    matchesGoal: !profile.goal || goalIds.includes(profile.goal),
  };
}

export function getExerciseGoalIds(exercise) {
  const tags = asArray(exercise?.tags).map(normalizeTag);
  const goals = new Set();

  Object.entries(GOAL_TAGS_BY_GOAL).forEach(([goalId, goalTags]) => {
    if (goalTags.some((tag) => tags.includes(tag))) {
      goals.add(goalId);
    }
  });

  const normalizedType = normalizeString(exercise?.type?.en || exercise?.type).toLowerCase();
  asArray(TYPE_GOALS_BY_TYPE[normalizedType]).forEach((goalId) => goals.add(goalId));

  if (goals.size === 0) {
    goals.add('general-fitness');
  }

  return Array.from(goals);
}

function getSelectedEquipmentIds(equipment) {
  return asArray(equipment?.selectedIds).map(normalizeTag);
}

function getNormalizedEquipmentCatalog(equipmentCatalog, equipment) {
  const catalog = asArray(equipmentCatalog);

  if (catalog.length > 0) {
    return catalog
      .map((item) => ({
        id: normalizeString(item?.id),
      }))
      .filter((item) => Boolean(item.id));
  }

  return getEquipmentCatalog({ store: { equipment } })
    .map((item) => ({
      id: normalizeString(item.id),
    }))
    .filter((item) => Boolean(item.id));
}

function normalizeProfile(profile) {
  const source = isPlainObject(profile) ? profile : {};

  return {
    trainingLevel: normalizeTag(source.trainingLevel),
    goal: normalizeTag(source.goal),
  };
}

function normalizeGoalMode(value) {
  const mode = normalizeTag(value) || 'prefer';
  return GOAL_MODES.has(mode) ? mode : 'prefer';
}

function normalizeTag(value) {
  return normalizeString(value).toLowerCase().replaceAll(' ', '-');
}

function countExcludedReasons(excludedExercises) {
  return excludedExercises.reduce((result, entry) => {
    entry.reasons.forEach((reason) => {
      result[reason] = (result[reason] || 0) + 1;
    });
    return result;
  }, {});
}
