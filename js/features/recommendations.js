/**
 * @module js/features/recommendations
 */
import { asArray, isPlainObject, normalizeString } from '../core/utils.js';
import { getEquipmentCatalog } from './equipment.js';
import {
  getExerciseEquipmentIds,
  getExerciseProfileLevel,
  isExerciseAvailableForSelectedEquipment,
  isExerciseCompatibleWithProfileLevel,
} from './exercise-compatibility.js';
import { BODY_FOCUS_MUSCLE_GROUPS } from './body-focus.js';
import {
  getContraindicationRelatedJoints,
  getContraindicationRelatedMuscles,
  normalizeContraindicationTags,
} from './contraindications.js';

/**
 * Stable reason codes for exercises excluded from recommendation results.
 * @readonly
 */
export const RECOMMENDATION_EXCLUSION_REASONS = Object.freeze({
  DUPLICATE_EXERCISE_ID: 'duplicate-exercise-id',
  MISSING_REQUIRED_EQUIPMENT: 'missing-required-equipment',
  DIFFICULTY_ABOVE_PROFILE_LEVEL: 'difficulty-above-profile-level',
  GOAL_NOT_MATCHED: 'goal-not-matched',
  CONTRAINDICATION_MATCH: 'contraindication-match',
  EXCLUDED_EXERCISE: 'excluded-exercise',
});

/**
 * Default weighted parts used by recommendation scoring.
 * Sum is expected to be near `1`.
 * @readonly
 */
export const DEFAULT_RECOMMENDATION_WEIGHTS = Object.freeze({
  goalAlignment: 0.32,
  difficultyFit: 0.14,
  equipmentFit: 0.05,
  movementFocus: 0.14,
  movementVariety: 0.1,
  contraindicationsFit: 0.15,
  preferenceFit: 0.04,
  recoveryFit: 0.04,
  timeFit: 0.02,
});

/**
 * Shared goal modes constant.
 * @type {Set}
 */
const GOAL_MODES = new Set(['prefer', 'require', 'off']);
/**
 * Shared level ranks constant.
 * @type {Readonly<object>}
 */
const LEVEL_RANKS = Object.freeze({
  beginner: 1,
  novice: 2,
  intermediate: 3,
  advanced: 4,
});
/**
 * Shared intensity scores constant.
 * @type {Readonly<object>}
 */
const INTENSITY_SCORES = Object.freeze({
  low: 0.25,
  medium: 0.6,
  high: 1,
});
/**
 * Shared goal tags by goal constant.
 * @type {Readonly<object>}
 */
const GOAL_TAGS_BY_GOAL = Object.freeze({
  strength: ['strength'],
  hypertrophy: ['strength', 'compound'],
  endurance: ['cardio', 'yoga', 'hold', 'static'],
  'fat-loss': ['cardio', 'conditioning'],
  'general-fitness': ['strength', 'cardio', 'yoga', 'static', 'hold', 'compound'],
});
/**
 * Shared type goals by type constant.
 * @type {Readonly<object>}
 */
const TYPE_GOALS_BY_TYPE = Object.freeze({
  strength: ['strength', 'hypertrophy', 'general-fitness'],
  cardio: ['endurance', 'fat-loss', 'general-fitness'],
  static: ['endurance', 'general-fitness'],
  yoga: ['endurance', 'general-fitness'],
});

/**
 * Applies hard eligibility checks before scoring recommendations.
 * @param {object} [options={}] recommendation options
 * @returns {{
 *   eligibleExercises: Array<object>,
 *   excludedExercises: Array<object>,
 *   summary: {
 *     totalExercises:number,
 *     eligibleCount:number,
 *     excludedCount:number,
 *     excludedByReason:Record<string, number>
 *   }
 * }}
 */
export function filterExercisesForRecommendations(options = {}) {
  const exercises = asArray(options.exercises);
  const profile = normalizeProfile(options.profile);
  const context = normalizeRecommendationContext(options.context, profile);
  const goalMode = normalizeGoalMode(options.goalMode);
  const equipmentCatalog = getNormalizedEquipmentCatalog(
    options.equipmentCatalog,
    options.equipment,
  );
  const knownEquipmentIds = equipmentCatalog.map((item) => item.id);
  const selectedEquipmentIds = getSelectedEquipmentIds(options.equipment);
  const excludedExerciseIds = new Set(asArray(options.excludedExerciseIds).map(normalizeToken));

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

    if (excludedExerciseIds.has(normalizeToken(exercise.id))) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.EXCLUDED_EXERCISE);
    }

    if (!metadata.hasRequiredEquipment) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.MISSING_REQUIRED_EQUIPMENT);
    }

    if (!metadata.isCompatibleWithProfileLevel) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.DIFFICULTY_ABOVE_PROFILE_LEVEL);
    }

    if (hasContraindicationMatch(profile.limitations, exercise?.contraindications)) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.CONTRAINDICATION_MATCH);
    }

    if (goalMode === 'require' && profile.goal && !metadata.matchesGoal) {
      reasons.push(RECOMMENDATION_EXCLUSION_REASONS.GOAL_NOT_MATCHED);
    }

    const resultEntry = {
      exercise,
      reasons,
      metadata,
      context,
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

/**
 * Filters and scores exercises, then sorts eligible entries by descending score.
 * @param {object} [options={}] recommendation options
 * @returns {{
 *   eligibleExercises: Array<object>,
 *   excludedExercises: Array<object>,
 *   rankedExercises: Array<object>,
 *   summary: object,
 *   weights: object
 * }} ranking result
 */
export function rankExercisesForRecommendations(options = {}) {
  const filteringResult = filterExercisesForRecommendations(options);
  const profile = normalizeProfile(options.profile);
  const context = normalizeRecommendationContext(options.context, profile);
  const weights = normalizeWeights(options.weights);

  const rankedExercises = filteringResult.eligibleExercises
    .map((entry) => {
      const scored = scoreExercise(
        entry.exercise,
        profile,
        {
          ...context,
          selectedEquipmentIds: entry.metadata.requiredEquipmentIds.length
            ? entry.metadata.requiredEquipmentIds
            : context.selectedEquipmentIds,
        },
        weights,
      );

      return {
        exercise: entry.exercise,
        metadata: entry.metadata,
        score: scored.score,
        reasons: scored.reasons,
        matchedSignals: scored.matchedSignals,
        penalties: scored.penalties,
        parts: scored.parts,
      };
    })
    .sort((left, right) => right.score - left.score);

  return {
    ...filteringResult,
    rankedExercises,
    weights,
  };
}

/**
 * Scores a single exercise against normalized user profile and context.
 * @param {object} exercise exercise record
 * @param {object} profile user profile input
 * @param {object} [context={}] recommendation context
 * @param {object} [weights=DEFAULT_RECOMMENDATION_WEIGHTS] part weights
 * @returns {{score:number,reasons:string[],matchedSignals:string[],penalties:string[],parts:object}}
 */
export function scoreExercise(
  exercise,
  profile,
  context = {},
  weights = DEFAULT_RECOMMENDATION_WEIGHTS,
) {
  const normalizedProfile = normalizeProfile(profile);
  const normalizedContext = normalizeRecommendationContext(context, normalizedProfile);
  const normalizedWeights = normalizeWeights(weights);

  const parts = {
    goalAlignment: scoreGoalAlignment(exercise, normalizedProfile, normalizedContext),
    difficultyFit: scoreDifficultyFit(exercise, normalizedProfile),
    equipmentFit: scoreEquipmentFit(exercise, normalizedContext),
    movementFocus: scoreMovementFocus(exercise, normalizedProfile),
    movementVariety: scoreMovementVariety(exercise, normalizedContext),
    contraindicationsFit: scoreContraindications(exercise, normalizedProfile),
    preferenceFit: scorePreferenceFit(exercise, normalizedProfile),
    recoveryFit: scoreRecoveryFit(exercise, normalizedProfile),
    timeFit: scoreTimeFit(exercise, normalizedProfile, normalizedContext),
  };

  const score = clampUnit(
    normalizedWeights.goalAlignment * parts.goalAlignment +
      normalizedWeights.difficultyFit * parts.difficultyFit +
      normalizedWeights.equipmentFit * parts.equipmentFit +
      normalizedWeights.movementFocus * parts.movementFocus +
      normalizedWeights.movementVariety * parts.movementVariety +
      normalizedWeights.contraindicationsFit * parts.contraindicationsFit +
      normalizedWeights.preferenceFit * parts.preferenceFit +
      normalizedWeights.recoveryFit * parts.recoveryFit +
      normalizedWeights.timeFit * parts.timeFit,
  );

  const explanation = buildExplanationPayload(
    parts,
    exercise,
    normalizedProfile,
    normalizedContext,
  );

  return {
    score,
    reasons: explanation.reasons,
    matchedSignals: explanation.matchedSignals,
    penalties: explanation.penalties,
    parts,
  };
}

/**
 * Builds filtering metadata used for recommendation eligibility checks.
 * @param {object} exercise exercise record
 * @param {object} [context={}] profile/equipment context
 * @returns {{
 *   requiredEquipmentIds:string[],
 *   profileLevel:string,
 *   goalIds:string[],
 *   hasRequiredEquipment:boolean,
 *   isCompatibleWithProfileLevel:boolean,
 *   matchesGoal:boolean
 * }}
 */
export function buildExerciseRecommendationMetadata(exercise, context = {}) {
  const profile = normalizeProfile(context.profile);
  const knownEquipmentIds = asArray(context.knownEquipmentIds);
  const selectedEquipmentIds = asArray(context.selectedEquipmentIds);
  const goalIds = getExerciseGoalIds(exercise);

  return {
    requiredEquipmentIds: getExerciseEquipmentIds(exercise, knownEquipmentIds),
    profileLevel: getExerciseProfileLevel(exercise),
    goalIds,
    hasRequiredEquipment: isExerciseAvailableForSelectedEquipment(
      exercise,
      selectedEquipmentIds,
      knownEquipmentIds,
    ),
    isCompatibleWithProfileLevel: isExerciseCompatibleWithProfileLevel(
      exercise,
      profile.trainingLevel,
    ),
    matchesGoal: !profile.goal || goalIds.includes(profile.goal),
  };
}

/**
 * Derives goal IDs supported by exercise tags and type.
 * @param {object} exercise exercise record
 * @returns {string[]} normalized goal IDs
 */
export function getExerciseGoalIds(exercise) {
  const tags = getExerciseTags(exercise);
  const goals = new Set();

  Object.entries(GOAL_TAGS_BY_GOAL).forEach(([goalId, goalTags]) => {
    if (goalTags.some((tag) => tags.includes(tag))) {
      goals.add(goalId);
    }
  });

  const normalizedType = getExerciseType(exercise);
  asArray(TYPE_GOALS_BY_TYPE[normalizedType]).forEach((goalId) => goals.add(goalId));

  if (goals.size === 0) {
    goals.add('general-fitness');
  }

  return Array.from(goals);
}

/**
 * Scores how well the exercise matches active goal weights.
 * @param {object} exercise exercise record
 * @param {object} profile normalized or raw profile
 * @param {object} [context={}] reserved context for forward compatibility
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreGoalAlignment(exercise, profile) {
  const normalizedProfile = normalizeProfile(profile);
  const goals = getNormalizedGoalWeights(normalizedProfile);
  const type = getExerciseType(exercise);
  const tags = new Set(getExerciseTags(exercise));

  const strength = getIntensityValue(exercise, 'strength');
  const endurance = getIntensityValue(exercise, 'endurance');
  const cardio = getIntensityValue(exercise, 'cardio');
  const impact = getIntensityValue(exercise, 'impact');
  const hypertrophy = clampUnit(
    strength * 0.78 + (type === 'strength' ? 0.14 : 0) + (tags.has('compound') ? 0.08 : 0),
  );
  const fatLoss = clampUnit(cardio * 0.6 + endurance * 0.25 + impact * 0.15);
  const generalFitness = clampUnit(
    strength * 0.3 + endurance * 0.3 + cardio * 0.25 + impact * 0.15,
  );

  const weightedScore =
    goals.strength * strength +
    goals.hypertrophy * hypertrophy +
    goals.endurance * clampUnit(endurance * 0.7 + cardio * 0.3) +
    goals.fatLoss * fatLoss +
    goals.mobility * getMobilitySignal(exercise) +
    goals.generalFitness * generalFitness;
  const totalWeight = Object.values(goals).reduce((sum, value) => sum + value, 0);

  if (totalWeight <= 0) {
    return type === 'strength' || type === 'cardio' || type === 'yoga' ? 0.6 : 0.5;
  }

  return clampUnit(weightedScore / totalWeight);
}

/**
 * Scores compatibility of exercise difficulty against user level.
 * @param {object} exercise exercise record
 * @param {object} profile user profile
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreDifficultyFit(exercise, profile) {
  const userLevel = LEVEL_RANKS[normalizeToken(profile?.trainingLevel || profile?.level)] || 1;
  const exerciseLevel = LEVEL_RANKS[normalizeToken(exercise?.difficulty)] || 1;
  const difference = exerciseLevel - userLevel;

  if (difference === 0) {
    return 1;
  }

  if (difference < 0) {
    return clampUnit(0.88 + difference * 0.08);
  }

  return clampUnit(0.35 - (difference - 1) * 0.2);
}

/**
 * Scores whether selected equipment can satisfy exercise requirements.
 * @param {object} exercise exercise record
 * @param {object} [context={}] recommendation context
 * @returns {number} `1` when equipment is compatible, else `0`
 */
export function scoreEquipmentFit(exercise, context = {}) {
  const selectedEquipmentIds = new Set([
    'bodyweight',
    ...asArray(context?.selectedEquipmentIds).map(normalizeToken),
  ]);
  const requiredEquipmentIds = getExerciseRequiredEquipmentIds(exercise);

  if (requiredEquipmentIds.length === 0) {
    return 1;
  }

  return requiredEquipmentIds.every((equipmentId) => selectedEquipmentIds.has(equipmentId)) ? 1 : 0;
}

/**
 * Scores alignment between body-focus goals and target muscle groups.
 * @param {object} exercise exercise record
 * @param {object} profile user profile
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreMovementFocus(exercise, profile) {
  const bodyFocusGoals = isPlainObject(profile?.bodyFocusGoals) ? profile.bodyFocusGoals : {};
  const primaryMuscles = new Set(getExercisePrimaryMuscles(exercise));
  const secondaryMuscles = new Set(getExerciseSecondaryMuscles(exercise));
  const allMuscles = new Set([
    ...primaryMuscles,
    ...secondaryMuscles,
    ...getExerciseMuscles(exercise),
  ]);
  const activeEntries = Object.entries(bodyFocusGoals).filter(
    ([, weight]) => clampUnit(weight) > 0,
  );

  if (activeEntries.length === 0) {
    return 0.5;
  }

  const totalWeight = activeEntries.reduce((sum, [, weight]) => sum + clampUnit(weight), 0);
  const weightedScore = activeEntries.reduce((sum, [goalId, weight]) => {
    const targetMuscles = asArray(BODY_FOCUS_MUSCLE_GROUPS[goalId]).map(normalizeToken);
    if (targetMuscles.length === 0) {
      return sum;
    }

    const primaryMatches = targetMuscles.filter((muscleId) => primaryMuscles.has(muscleId)).length;
    const secondaryMatches = targetMuscles.filter(
      (muscleId) => !primaryMuscles.has(muscleId) && allMuscles.has(muscleId),
    ).length;
    const alignment = clampUnit(
      (primaryMatches * 1 + secondaryMatches * 0.45) / targetMuscles.length,
    );

    return sum + clampUnit(weight) * alignment;
  }, 0);

  return totalWeight > 0 ? clampUnit(weightedScore / totalWeight) : 0.5;
}

/**
 * Penalizes repeated movements from recent history and rewards novelty.
 * @param {object} exercise exercise record
 * @param {object} [context={}] recommendation context
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreMovementVariety(exercise, context = {}) {
  const recentHistory = normalizeRecentHistory(context?.recentHistory);
  const exerciseId = normalizeToken(exercise?.id);
  const movementPatterns = getExerciseMovementPatterns(exercise);

  let score = 1;

  if (recentHistory.performedExerciseIds.includes(exerciseId)) {
    score -= 0.45;
  }

  movementPatterns.forEach((pattern) => {
    const count = Number(recentHistory.performedMovementPatterns[pattern] || 0);
    score -= Math.min(0.42, count * 0.14);
  });

  if (
    movementPatterns.length > 0 &&
    movementPatterns.every((pattern) => !recentHistory.performedMovementPatterns[pattern])
  ) {
    score += 0.05;
  }

  return clampUnit(score);
}

/**
 * Returns safety score from contraindication overlap (`0` or `1`).
 * @param {object} exercise exercise record
 * @param {object} profile user profile
 * @returns {number} safety score
 */
export function scoreContraindications(exercise, profile) {
  return hasContraindicationMatch(profile?.limitations, exercise?.contraindications) ? 0 : 1;
}

/**
 * Scores tag/equipment preference fit including disliked exercise IDs.
 * @param {object} exercise exercise record
 * @param {object} profile user profile
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scorePreferenceFit(exercise, profile) {
  const dislikedExercises = new Set(asArray(profile?.dislikedExercises).map(normalizeToken));
  const likedTags = asArray(profile?.likedTags).map(normalizeToken);
  const tags = new Set(getExerciseTags(exercise));
  const equipment = new Set(getExerciseRequiredEquipmentIds(exercise));
  let score = 0.5;

  if (dislikedExercises.has(normalizeToken(exercise?.id))) {
    score -= 0.5;
  }

  likedTags.forEach((tag) => {
    if (tags.has(tag) || equipment.has(tag)) {
      score += 0.12;
    }
  });

  return clampUnit(score);
}

/**
 * Scores exercise fit against recovery readiness for primary muscles.
 * @param {object} exercise exercise record
 * @param {object} profile user profile
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreRecoveryFit(exercise, profile) {
  const recoveryProfile = isPlainObject(profile?.recoveryProfile) ? profile.recoveryProfile : {};
  const recoveryValues = Object.values(recoveryProfile).map(Number).filter(Number.isFinite);
  const muscles = getExercisePrimaryMuscles(exercise);

  if (recoveryValues.length > 0 && recoveryValues.every((value) => value === 0)) {
    return 1;
  }

  if (muscles.length === 0) {
    return 1;
  }

  const average =
    muscles.reduce(
      (sum, muscleId) => sum + getRecoveryReadinessForMuscle(recoveryProfile, muscleId),
      0,
    ) / muscles.length;
  return clampUnit(average);
}

/**
 * Scores estimated exercise duration against target session duration.
 * @param {object} exercise exercise record
 * @param {object} profile user profile
 * @param {object} [context={}] recommendation context
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreTimeFit(exercise, profile, context = {}) {
  const targetDurationMin = nonNegativeNumber(
    context.targetDurationMin ?? profile?.sessionDurationMin,
  );

  if (targetDurationMin <= 0) {
    return 1;
  }

  const estimatedDurationMin = estimateExerciseDurationMin(exercise);
  const differenceRatio = Math.abs(targetDurationMin - estimatedDurationMin) / targetDurationMin;
  return clampUnit(1 - differenceRatio);
}

/**
 * Builds explanation payload.
 * @param {object} parts parts input
 * @param {object} exercise exercise input
 * @param {object} profile profile input
 * @param {object} context context input
 * @returns {*} result
 */
function buildExplanationPayload(parts, exercise, profile, context) {
  const matchedSignals = [];
  const penalties = [];
  const reasons = [];
  const exerciseId = normalizeToken(exercise?.id);
  const recentHistory = normalizeRecentHistory(context?.recentHistory);

  if (parts.goalAlignment >= 0.7) {
    matchedSignals.push(`goal-${getDominantGoal(profile)}`);
    reasons.push('High goal alignment');
  } else if (parts.goalAlignment <= 0.35) {
    penalties.push('weak-goal-alignment');
    reasons.push('Weak goal alignment');
  }

  if (parts.difficultyFit >= 0.95) {
    matchedSignals.push(
      `difficulty-${normalizeToken(exercise?.difficulty || profile?.trainingLevel)}`,
    );
    reasons.push('Matches profile difficulty');
  } else if (parts.difficultyFit < 0.75) {
    penalties.push('difficulty-off-target');
    reasons.push('Difficulty is not an ideal match');
  }

  if (parts.equipmentFit === 1) {
    getExerciseRequiredEquipmentIds(exercise).forEach((equipmentId) => {
      matchedSignals.push(`equipment-${equipmentId}`);
    });
    reasons.push('Equipment available');
  }

  if (parts.movementFocus >= 0.65) {
    matchedSignals.push('body-focus-match');
    reasons.push('Supports current body-focus priorities');
  }

  if (parts.movementVariety < 0.65) {
    penalties.push('recent-pattern-overlap');
    reasons.push('Recent movement pattern overlap');
  } else if (!recentHistory.performedExerciseIds.includes(exerciseId)) {
    matchedSignals.push('novel-exercise');
    reasons.push('Adds variety to recent training');
  }

  if (parts.preferenceFit > 0.6) {
    matchedSignals.push('preference-match');
    reasons.push('Matches saved preferences');
  } else if (parts.preferenceFit < 0.35) {
    penalties.push('preference-mismatch');
    reasons.push('Conflicts with saved preferences');
  }

  if (parts.recoveryFit < 0.55) {
    penalties.push('recovery-limited');
    reasons.push('Recovery profile suggests caution');
  }

  if (parts.contraindicationsFit < 1) {
    penalties.push('contraindication-risk');
    reasons.push('Potential contraindication risk');
  }

  return {
    matchedSignals: uniqueList(matchedSignals),
    penalties: uniqueList(penalties),
    reasons: uniqueList(reasons),
  };
}

/**
 * Gets selected equipment ids.
 * @param {object} equipment equipment input
 * @returns {*} result
 */
function getSelectedEquipmentIds(equipment) {
  return uniqueList(['bodyweight', ...asArray(equipment?.selectedIds).map(normalizeTag)]);
}

/**
 * Gets normalized equipment catalog.
 * @param {object} equipmentCatalog equipment catalog input
 * @param {object} equipment equipment input
 * @returns {*} result
 */
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

/**
 * Normalizes profile.
 * @param {object} profile profile input
 * @returns {*} result
 */
function normalizeProfile(profile) {
  const source = isPlainObject(profile) ? profile : {};
  const goals = isPlainObject(source.goals) ? source.goals : {};

  return {
    trainingLevel: normalizeTag(source.trainingLevel || source.level),
    goal: normalizeTag(source.goal),
    goals: {
      strength: clampUnit(goals.strength),
      hypertrophy: clampUnit(goals.hypertrophy),
      endurance: clampUnit(goals.endurance),
      fatLoss: clampUnit(goals.fatLoss),
      mobility: clampUnit(goals.mobility),
      generalFitness: clampUnit(goals.generalFitness),
    },
    bodyFocusGoals: isPlainObject(source.bodyFocusGoals) ? source.bodyFocusGoals : {},
    limitations: asArray(source.limitations).map(normalizeTag),
    dislikedExercises: asArray(source.dislikedExercises).map(normalizeTag),
    likedTags: asArray(source.likedTags).map(normalizeTag),
    recoveryProfile: isPlainObject(source.recoveryProfile) ? source.recoveryProfile : {},
    recentHistory: normalizeRecentHistory(source.recentHistory),
    sessionDurationMin: nonNegativeNumber(source.sessionDurationMin),
  };
}

/**
 * Normalizes recommendation context.
 * @param {string} [context={}] context input
 * @param {object} [profile={}] profile input
 * @returns {*} result
 */
function normalizeRecommendationContext(context = {}, profile = {}) {
  const source = isPlainObject(context) ? context : {};

  return {
    targetDurationMin: nonNegativeNumber(source.targetDurationMin ?? profile?.sessionDurationMin),
    selectedEquipmentIds: asArray(source.selectedEquipmentIds).map(normalizeTag),
    recentHistory: normalizeRecentHistory(source.recentHistory || profile?.recentHistory),
  };
}

/**
 * Normalizes recent history.
 * @param {object} recentHistory recent history input
 * @returns {*} result
 */
function normalizeRecentHistory(recentHistory) {
  const source = isPlainObject(recentHistory) ? recentHistory : {};
  const performedMovementPatterns = isPlainObject(source.performedMovementPatterns)
    ? Object.entries(source.performedMovementPatterns).reduce((result, [pattern, count]) => {
        const normalizedPattern = normalizeTag(pattern);
        if (!normalizedPattern) {
          return result;
        }

        result[normalizedPattern] = nonNegativeNumber(count);
        return result;
      }, {})
    : {};

  return {
    performedExerciseIds: asArray(source.performedExerciseIds).map(normalizeTag),
    performedMovementPatterns,
  };
}

/**
 * Gets normalized goal weights.
 * @param {object} profile profile input
 * @returns {*} result
 */
function getNormalizedGoalWeights(profile) {
  const weights = {
    ...profile.goals,
  };

  if (Object.values(weights).some((value) => value > 0)) {
    return weights;
  }

  if (profile.goal === 'fat-loss') {
    return { ...weights, fatLoss: 1 };
  }

  if (profile.goal === 'general-fitness') {
    return {
      ...weights,
      strength: 0.35,
      hypertrophy: 0.15,
      endurance: 0.2,
      fatLoss: 0.1,
      mobility: 0.1,
      generalFitness: 0.1,
    };
  }

  if (
    profile.goal === 'strength' ||
    profile.goal === 'hypertrophy' ||
    profile.goal === 'endurance'
  ) {
    return {
      ...weights,
      [profile.goal]: 1,
    };
  }

  return weights;
}

/**
 * Normalizes goal mode.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeGoalMode(value) {
  const mode = normalizeTag(value) || 'prefer';
  return GOAL_MODES.has(mode) ? mode : 'prefer';
}

/**
 * Normalizes weights.
 * @param {object} [weights={}] weights input
 * @returns {*} result
 */
function normalizeWeights(weights = {}) {
  return {
    ...DEFAULT_RECOMMENDATION_WEIGHTS,
    ...(isPlainObject(weights) ? weights : {}),
  };
}

/**
 * Gets intensity value.
 * @param {object} exercise exercise input
 * @param {*} channel channel input
 * @returns {*} result
 */
function getIntensityValue(exercise, channel) {
  const profile = isPlainObject(exercise?.intensityProfile) ? exercise.intensityProfile : {};
  const value = profile[channel];

  if (typeof value === 'number') {
    return clampUnit(value);
  }

  return INTENSITY_SCORES[normalizeTag(value)] || getFallbackIntensityValue(exercise, channel);
}

/**
 * Gets mobility signal.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getMobilitySignal(exercise) {
  const type = getExerciseType(exercise);
  const tags = new Set(getExerciseTags(exercise));
  const movementPatterns = new Set(getExerciseMovementPatterns(exercise));

  if (type === 'yoga' || tags.has('mobility')) {
    return 1;
  }

  if (movementPatterns.has('stretch') || movementPatterns.has('balance')) {
    return 0.7;
  }

  return 0;
}

/**
 * Runs estimate exercise duration min.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function estimateExerciseDurationMin(exercise) {
  const executionMode = getExerciseExecutionMode(exercise);
  const intensity = Math.max(
    getIntensityValue(exercise, 'strength'),
    getIntensityValue(exercise, 'endurance'),
    getIntensityValue(exercise, 'cardio'),
  );

  if (executionMode === 'hold') {
    return 6;
  }

  if (executionMode === 'time') {
    return 8;
  }

  return 4 + intensity * 4;
}

/**
 * Gets exercise type.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseType(exercise) {
  const explicitType = normalizeTag(exercise?.type?.en || exercise?.type);
  const modality = normalizeTag(exercise?.classification?.modality);
  const type = explicitType || modality;

  if (type === 'cardio' || type === 'static' || type === 'yoga') {
    return type;
  }

  if (type === 'strength' || type === 'compound' || type === 'isolation') {
    return 'strength';
  }

  return type;
}

/**
 * Gets exercise tags.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseTags(exercise) {
  const classification = isPlainObject(exercise?.classification) ? exercise.classification : {};
  const mechanics = isPlainObject(exercise?.mechanics) ? exercise.mechanics : {};
  const safety = isPlainObject(exercise?.safety) ? exercise.safety : {};
  const equipment = getExerciseRequiredEquipmentIds(exercise);
  const movementPatterns = getExerciseMovementPatterns(exercise);
  const type = getExerciseType(exercise);
  const executionMode = getExerciseExecutionMode(exercise);
  const impact = normalizeTag(exercise?.intensityProfile?.impact || safety.impactLevel);
  const tags = [
    ...asArray(exercise?.tags),
    type,
    ...equipment,
    normalizeTag(exercise?.difficulty || classification.difficulty),
    ...movementPatterns,
    normalizeTag(mechanics.loadType),
    normalizeTag(classification.bodyPosition),
    impact ? `impact-${impact}` : '',
    executionMode === 'hold' ? 'hold' : '',
  ]
    .map(normalizeTag)
    .filter(Boolean);

  if (type === 'yoga' || movementPatterns.includes('stretch')) {
    tags.push('mobility');
  }

  if (equipment.includes('bodyweight')) {
    tags.push('home');
  }

  return uniqueList(tags);
}

/**
 * Gets exercise required equipment ids.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseRequiredEquipmentIds(exercise) {
  const explicitEquipment = asArray(exercise?.equipment);
  const classificationEquipment = asArray(exercise?.classification?.equipment);
  const source = explicitEquipment.length ? explicitEquipment : classificationEquipment;
  return uniqueList(source.map(normalizeEquipmentId).filter(Boolean));
}

/**
 * Gets exercise movement patterns.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseMovementPatterns(exercise) {
  const explicitPatterns = asArray(exercise?.movementPatterns);
  const classificationPatterns = asArray(exercise?.classification?.movementPatterns);
  return uniqueList(
    (explicitPatterns.length ? explicitPatterns : classificationPatterns).map(normalizeTag),
  );
}

/**
 * Gets exercise execution mode.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseExecutionMode(exercise) {
  return normalizeTag(exercise?.executionMode || exercise?.mechanics?.executionMode);
}

/**
 * Gets exercise primary muscles.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExercisePrimaryMuscles(exercise) {
  const explicitPrimary = asArray(exercise?.muscleGroups?.primary);
  const currentModelPrimary = asArray(exercise?.muscles?.primary);
  const legacyMuscles = asArray(exercise?.muscles);
  return uniqueList(
    (explicitPrimary.length
      ? explicitPrimary
      : currentModelPrimary.length
        ? currentModelPrimary
        : legacyMuscles
    ).map(normalizeTag),
  );
}

/**
 * Gets exercise secondary muscles.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseSecondaryMuscles(exercise) {
  const explicitSecondary = asArray(exercise?.muscleGroups?.secondary);
  const currentModelSecondary = asArray(exercise?.muscles?.secondary);
  const stabilizers = asArray(exercise?.muscles?.stabilizers);
  return uniqueList(
    (explicitSecondary.length ? explicitSecondary : [...currentModelSecondary, ...stabilizers]).map(
      normalizeTag,
    ),
  );
}

/**
 * Gets exercise muscles.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseMuscles(exercise) {
  const legacyMuscles = Array.isArray(exercise?.muscles) ? exercise.muscles : [];
  return uniqueList(
    [
      ...legacyMuscles,
      ...getExercisePrimaryMuscles(exercise),
      ...getExerciseSecondaryMuscles(exercise),
    ].map(normalizeTag),
  );
}

/**
 * Gets recovery readiness for muscle.
 * @param {object} recoveryProfile recovery profile input
 * @param {string} muscleId muscle id input
 * @returns {*} result
 */
function getRecoveryReadinessForMuscle(recoveryProfile, muscleId) {
  const normalizedMuscle = normalizeTag(muscleId);
  const directValue = recoveryProfile[normalizedMuscle];

  if (directValue !== undefined) {
    return clampUnit(directValue);
  }

  const area = getRecoveryAreaForMuscle(normalizedMuscle);
  if (!area) {
    return 1;
  }

  return recoveryProfile[area] === undefined ? 1 : clampUnit(recoveryProfile[area]);
}

/**
 * Gets recovery area for muscle.
 * @param {string} muscleId muscle id input
 * @returns {*} result
 */
function getRecoveryAreaForMuscle(muscleId) {
  if (muscleId === 'chest') {
    return 'chest';
  }

  if (
    muscleId === 'back' ||
    muscleId === 'lats' ||
    muscleId === 'upper-back' ||
    muscleId === 'lower-back' ||
    muscleId === 'spinal-erectors'
  ) {
    return 'back';
  }

  if (
    muscleId === 'legs' ||
    muscleId === 'quads' ||
    muscleId === 'quadriceps' ||
    muscleId === 'hamstrings' ||
    muscleId === 'glutes' ||
    muscleId === 'calves' ||
    muscleId === 'adductors'
  ) {
    return 'legs';
  }

  if (muscleId === 'shoulders' || muscleId === 'delts' || muscleId === 'rear-delts') {
    return 'shoulders';
  }

  if (
    muscleId === 'arms' ||
    muscleId === 'biceps' ||
    muscleId === 'triceps' ||
    muscleId === 'forearms'
  ) {
    return 'arms';
  }

  if (muscleId === 'core' || muscleId === 'abs' || muscleId === 'obliques') {
    return 'core';
  }

  return '';
}

/**
 * Gets fallback intensity value.
 * @param {object} exercise exercise input
 * @param {*} channel channel input
 * @returns {*} result
 */
function getFallbackIntensityValue(exercise, channel) {
  const type = getExerciseType(exercise);
  const executionMode = getExerciseExecutionMode(exercise);
  const impact = normalizeTag(exercise?.safety?.impactLevel);

  if (channel === 'impact') {
    return INTENSITY_SCORES[impact] || 0.25;
  }

  if (type === 'cardio') {
    return channel === 'cardio' || channel === 'endurance'
      ? 1
      : channel === 'strength' && getExercisePrimaryMuscles(exercise).includes('full-body')
        ? 0.6
        : 0.25;
  }

  if (type === 'static' || executionMode === 'hold') {
    return channel === 'endurance' ? 1 : 0.25;
  }

  if (type === 'yoga') {
    return channel === 'endurance' ? 0.6 : 0.25;
  }

  if (type === 'strength') {
    return channel === 'strength' ? 1 : channel === 'endurance' ? 0.6 : 0.25;
  }

  return 0;
}

/**
 * Checks whether contraindication match.
 * @param {*} limitations limitations input
 * @param {*} contraindications contraindications input
 * @returns {boolean} predicate result
 */
function hasContraindicationMatch(limitations, contraindications) {
  const normalizedLimitations = new Set([
    ...asArray(limitations).map(normalizeTag),
    ...normalizeContraindicationTags(limitations),
  ]);
  const normalizedContraindications = normalizeContraindicationTags(contraindications);

  return normalizedContraindications.some((contraindication) => {
    if (normalizedLimitations.has(contraindication)) {
      return true;
    }

    const relatedSignals = [
      ...getContraindicationRelatedJoints(contraindication),
      ...getContraindicationRelatedMuscles(contraindication),
    ];

    return relatedSignals.some((signal) => hasTokenOverlap(normalizedLimitations, signal));
  });
}

/**
 * Checks whether token overlap.
 * @param {*} limitations limitations input
 * @param {*} token token input
 * @returns {boolean} predicate result
 */
function hasTokenOverlap(limitations, token) {
  if (!token) {
    return false;
  }

  if (limitations.has(token)) {
    return true;
  }

  const tokenParts = token.split(/[-_/]/).filter(Boolean);
  for (const limitation of limitations) {
    const limitationParts = limitation.split(/[-_/]/).filter(Boolean);
    if (tokenParts.some((part) => limitationParts.includes(part))) {
      return true;
    }
  }

  return false;
}

/**
 * Gets dominant goal.
 * @param {object} profile profile input
 * @returns {*} result
 */
function getDominantGoal(profile) {
  const normalizedGoals = getNormalizedGoalWeights(profile);
  const topGoal = Object.entries(normalizedGoals).sort((left, right) => right[1] - left[1])[0];

  return topGoal?.[0] || normalizeTag(profile?.goal) || 'general-fitness';
}

/**
 * Normalizes tag.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeTag(value) {
  return normalizeString(value).toLowerCase().replaceAll(' ', '-');
}

/**
 * Normalizes equipment id.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeEquipmentId(value) {
  const normalized = normalizeTag(value);

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

/**
 * Normalizes token.
 * @param {string} value value input
 * @returns {string} formatted value
 */
function normalizeToken(value) {
  return normalizeTag(value);
}

/**
 * Runs non negative number.
 * @param {string} value value input
 * @returns {*} result
 */
function nonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

/**
 * Runs clamp unit.
 * @param {string} value value input
 * @returns {*} result
 */
function clampUnit(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.min(1, Math.max(0, number));
}

/**
 * Runs unique list.
 * @param {Array} values values input
 * @returns {*} result
 */
function uniqueList(values) {
  return Array.from(new Set(asArray(values).filter(Boolean)));
}

/**
 * Runs count excluded reasons.
 * @param {Array} excludedExercises excluded exercises input
 * @returns {*} result
 */
function countExcludedReasons(excludedExercises) {
  return excludedExercises.reduce((result, entry) => {
    entry.reasons.forEach((reason) => {
      result[reason] = (result[reason] || 0) + 1;
    });
    return result;
  }, {});
}
