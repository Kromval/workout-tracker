import { asArray, isPlainObject, normalizeString } from '../core/utils.js';
import { BODY_FOCUS_MUSCLE_GROUPS } from './body-focus.js';
import { filterExercisesForRecommendations, rankExercisesForRecommendations } from './recommendations.js';

const LEVEL_RANKS = Object.freeze({
  beginner: 1,
  novice: 2,
  intermediate: 3,
  advanced: 4,
});

const INTENSITY_VALUES = Object.freeze({
  low: 0.25,
  medium: 0.6,
  high: 1,
});

export const DEFAULT_SCORING_WEIGHTS = Object.freeze({
  goalAlignment: 0.3,
  levelMatch: 0.12,
  preference: 0.1,
  recovery: 0.16,
  safety: 0.2,
  variety: 0.07,
  timeFit: 0.05,
  fatiguePenalty: 0,
  contraindicationRisk: 0,
});

export function rankRecommendedExercises(options = {}) {
  const rankingResult = rankExercisesForRecommendations(options);
  const scoredExercises = rankingResult.rankedExercises.map((entry) => ({
    exercise: entry.exercise,
    metadata: entry.metadata,
    total: entry.score,
    excluded: false,
    parts: {
      goalAlignment: entry.parts.goalAlignment,
      levelMatch: entry.parts.difficultyFit,
      preference: entry.parts.preferenceFit,
      recovery: entry.parts.recoveryFit,
      safety: entry.parts.contraindicationsFit,
      variety: entry.parts.movementVariety,
      timeFit: entry.parts.timeFit,
      equipmentFit: entry.parts.equipmentFit,
      movementFocus: entry.parts.movementFocus,
    },
    penalties: {
      fatiguePenalty: clampUnit(1 - entry.parts.movementVariety),
      contraindicationRisk: clampUnit(1 - entry.parts.contraindicationsFit),
      explanationPenalties: entry.penalties,
    },
    reasons: entry.reasons,
    matchedSignals: entry.matchedSignals,
  }));

  return {
    eligibleExercises: rankingResult.eligibleExercises,
    excludedExercises: rankingResult.excludedExercises,
    summary: rankingResult.summary,
    scoredExercises,
    weights: rankingResult.weights,
  };
}

export function scoreExercise(user, exercise, context = {}, weights = DEFAULT_SCORING_WEIGHTS) {
  const normalizedWeights = normalizeWeights(weights);
  const normalizedUser = normalizeScoringUser(user);
  const normalizedContext = normalizeScoringContext(context);

  const parts = {
    goalAlignment: scoreGoalAlignment(normalizedUser, exercise),
    levelMatch: scoreLevelMatch(normalizedUser, exercise),
    preference: scorePreferences(normalizedUser, exercise),
    recovery: scoreRecovery(normalizedUser, exercise),
    safety: scoreSafety(normalizedUser, exercise),
    variety: scoreVariety(normalizedUser, exercise),
    timeFit: scoreTimeFit(normalizedUser, exercise, normalizedContext),
  };
  const penalties = {
    fatiguePenalty: scoreFatiguePenalty(normalizedUser, exercise),
    contraindicationRisk: scoreContraindicationRisk(normalizedUser, exercise),
  };

  const total =
    normalizedWeights.goalAlignment * parts.goalAlignment +
    normalizedWeights.levelMatch * parts.levelMatch +
    normalizedWeights.preference * parts.preference +
    normalizedWeights.recovery * parts.recovery +
    normalizedWeights.safety * parts.safety +
    normalizedWeights.variety * parts.variety +
    normalizedWeights.timeFit * parts.timeFit -
    normalizedWeights.fatiguePenalty * penalties.fatiguePenalty -
    normalizedWeights.contraindicationRisk * penalties.contraindicationRisk;

  return {
    total,
    excluded: false,
    parts,
    penalties,
  };
}

export function scoreGoalAlignment(user, exercise) {
  const goals = isPlainObject(user?.goals) ? user.goals : {};
  const bodyFocusGoals = isPlainObject(user?.bodyFocusGoals) ? user.bodyFocusGoals : {};
  const functionalScore = clampUnit(
    (numericGoal(goals.strength) * getExerciseIntensityValue(exercise, 'strength')) +
    (numericGoal(goals.hypertrophy) * getExerciseIntensityValue(exercise, 'hypertrophy')) +
    (numericGoal(goals.endurance) * getExerciseIntensityValue(exercise, 'endurance')) +
    (numericGoal(goals.fatLoss) * getExerciseIntensityValue(exercise, 'fatLoss')) +
    (numericGoal(goals.mobility) * getExerciseIntensityValue(exercise, 'mobility'))
  );
  const bodyFocusScore = scoreBodyFocusAlignment(bodyFocusGoals, exercise);
  const hasFunctionalGoals = Object.values(goals).some((value) => numericGoal(value) > 0);
  const hasBodyFocusGoals = Object.values(bodyFocusGoals).some((value) => numericGoal(value) > 0);

  if (hasFunctionalGoals && hasBodyFocusGoals) {
    return clampUnit(Math.max(functionalScore, (functionalScore + bodyFocusScore) / 2));
  }

  if (hasBodyFocusGoals) {
    return bodyFocusScore;
  }

  return functionalScore;
}

export function scoreLevelMatch(user, exercise) {
  const userLevel = LEVEL_RANKS[normalizeToken(user?.trainingLevel || user?.level)] || 1;
  const exerciseLevel = LEVEL_RANKS[normalizeToken(exercise?.difficulty)] || 1;
  const difference = Math.abs(userLevel - exerciseLevel);

  return clampUnit(1 - difference * 0.35);
}

export function scorePreferences(user, exercise) {
  let score = 0.5;
  const dislikedExercises = new Set(asArray(user?.dislikedExercises).map(normalizeToken));
  const preferredTags = asArray(user?.likedTags).map(normalizeToken);
  const tags = new Set(asArray(exercise?.tags).map(normalizeToken));
  const equipment = new Set(asArray(exercise?.equipment).map(normalizeToken));

  if (dislikedExercises.has(normalizeToken(exercise?.id))) {
    score -= 0.6;
  }

  preferredTags.forEach((tag) => {
    if (tags.has(tag) || equipment.has(tag)) {
      score += 0.1;
    }
  });

  return clampUnit(score);
}

export function scoreRecovery(user, exercise) {
  const recovery = isPlainObject(user?.recoveryProfile) ? user.recoveryProfile : {};
  const muscles = asArray(exercise?.muscleGroups?.primary).map(normalizeToken);

  if (muscles.length === 0) {
    return 1;
  }

  const average = muscles.reduce((sum, muscleId) => sum + clampUnit(recovery[muscleId] ?? 1), 0) / muscles.length;
  return clampUnit(average);
}

export function scoreSafety(user, exercise) {
  const limitations = new Set(asArray(user?.limitations).map(normalizeToken));
  const contraindications = asArray(exercise?.contraindications).map(normalizeToken);

  if (contraindications.some((item) => limitations.has(item))) {
    return 0;
  }

  const overlapCount = contraindications.filter((item) => hasTokenOverlap(limitations, item)).length;
  return clampUnit(1 - overlapCount * 0.25);
}

export function scoreVariety(user, exercise) {
  const recentExerciseIds = new Set(asArray(user?.recentHistory?.performedExerciseIds).map(normalizeToken));
  const recentPatterns = isPlainObject(user?.recentHistory?.performedMovementPatterns)
    ? user.recentHistory.performedMovementPatterns
    : {};
  const movementPatterns = asArray(exercise?.movementPatterns).map(normalizeToken);

  if (recentExerciseIds.has(normalizeToken(exercise?.id))) {
    return 0.3;
  }

  const repetitionCount = movementPatterns.reduce((sum, pattern) => sum + nonNegativeNumber(recentPatterns[pattern]), 0);
  return clampUnit(Math.max(0.2, 1 - repetitionCount * 0.2));
}

export function scoreTimeFit(user, exercise, context = {}) {
  const sessionDurationMin = nonNegativeNumber(context.targetDurationMin ?? user?.sessionDurationMin);
  if (sessionDurationMin <= 0) {
    return 1;
  }

  const estimatedMinutes = estimateExerciseDurationMin(exercise);
  const differenceRatio = Math.abs(sessionDurationMin - estimatedMinutes) / sessionDurationMin;
  return clampUnit(1 - differenceRatio);
}

export function scoreFatiguePenalty(user, exercise) {
  const recentExerciseIds = new Set(asArray(user?.recentHistory?.performedExerciseIds).map(normalizeToken));
  const recentPatterns = isPlainObject(user?.recentHistory?.performedMovementPatterns)
    ? user.recentHistory.performedMovementPatterns
    : {};
  let penalty = recentExerciseIds.has(normalizeToken(exercise?.id)) ? 0.6 : 0;

  asArray(exercise?.movementPatterns).map(normalizeToken).forEach((pattern) => {
    penalty += nonNegativeNumber(recentPatterns[pattern]) * 0.08;
  });

  return clampUnit(penalty);
}

export function scoreContraindicationRisk(user, exercise) {
  const limitations = new Set(asArray(user?.limitations).map(normalizeToken));
  const contraindications = asArray(exercise?.contraindications).map(normalizeToken);

  if (contraindications.length === 0) {
    return 0;
  }

  const directMatch = contraindications.some((item) => limitations.has(item));
  if (directMatch) {
    return 1;
  }

  const fuzzyMatches = contraindications.filter((item) => hasTokenOverlap(limitations, item)).length;
  return clampUnit(fuzzyMatches / contraindications.length);
}

function normalizeScoringUser(profile = {}, equipment = null) {
  const source = isPlainObject(profile) ? profile : {};
  const equipmentState = equipment && isPlainObject(equipment) ? equipment : null;

  return {
    goals: isPlainObject(source.goals) ? source.goals : {},
    bodyFocusGoals: isPlainObject(source.bodyFocusGoals) ? source.bodyFocusGoals : {},
    level: normalizeToken(source.level || source.trainingLevel),
    trainingLevel: normalizeToken(source.trainingLevel || source.level),
    equipmentAvailable: asArray(source.equipmentAvailable).length > 0
      ? asArray(source.equipmentAvailable).map(normalizeToken)
      : asArray(equipmentState?.selectedIds).map(normalizeToken),
    limitations: asArray(source.limitations).map(normalizeToken),
    dislikedExercises: asArray(source.dislikedExercises).map(normalizeToken),
    likedTags: asArray(source.likedTags).map(normalizeToken),
    sessionDurationMin: nonNegativeNumber(source.sessionDurationMin),
    frequencyPerWeek: nonNegativeNumber(source.frequencyPerWeek),
    recoveryProfile: isPlainObject(source.recoveryProfile) ? source.recoveryProfile : {},
    recentHistory: isPlainObject(source.recentHistory) ? source.recentHistory : {},
  };
}

function normalizeScoringContext(context = {}) {
  const source = isPlainObject(context) ? context : {};

  return {
    targetDurationMin: nonNegativeNumber(source.targetDurationMin),
  };
}

function normalizeWeights(weights = {}) {
  return {
    ...DEFAULT_SCORING_WEIGHTS,
    ...(isPlainObject(weights) ? weights : {}),
  };
}

function getExerciseIntensityValue(exercise, channel) {
  const profile = isPlainObject(exercise?.intensityProfile) ? exercise.intensityProfile : {};
  const normalizedType = normalizeToken(exercise?.type?.en || exercise?.type);
  const normalizedTags = new Set(asArray(exercise?.tags).map(normalizeToken));
  const normalizedPatterns = new Set(asArray(exercise?.movementPatterns).map(normalizeToken));

  if (channel === 'hypertrophy') {
    return readIntensity(profile.hypertrophy)
      || clampUnit(readIntensity(profile.strength) * (normalizedType === 'strength' ? 0.9 : 0.6));
  }

  if (channel === 'fatLoss') {
    return clampUnit(readIntensity(profile.fatLoss) || ((readIntensity(profile.cardio) * 0.7) + (readIntensity(profile.endurance) * 0.3)));
  }

  if (channel === 'mobility') {
    if (readIntensity(profile.mobility) > 0) {
      return readIntensity(profile.mobility);
    }

    if (normalizedType === 'yoga' || normalizedTags.has('mobility') || normalizedPatterns.has('stretch')) {
      return 0.9;
    }

    if (normalizedPatterns.has('hip-opener') || normalizedPatterns.has('back-extension') || normalizedPatterns.has('balance')) {
      return 0.6;
    }

    return 0;
  }

  return readIntensity(profile[channel]);
}

function scoreBodyFocusAlignment(bodyFocusGoals, exercise) {
  const primaryMuscles = new Set(asArray(exercise?.muscleGroups?.primary).map(normalizeToken));
  const activeBodyFocusEntries = Object.entries(isPlainObject(bodyFocusGoals) ? bodyFocusGoals : {})
    .filter(([, weight]) => numericGoal(weight) > 0);

  if (activeBodyFocusEntries.length === 0) {
    return 0;
  }

  const totalWeight = activeBodyFocusEntries.reduce((sum, [, weight]) => sum + numericGoal(weight), 0);
  const weightedTotal = activeBodyFocusEntries.reduce((sum, [goalId, weight]) => {
    const targetMuscles = BODY_FOCUS_MUSCLE_GROUPS[goalId] || [];

    if (targetMuscles.length === 0) {
      return sum;
    }

    const matches = targetMuscles.filter((muscleId) => primaryMuscles.has(muscleId)).length;
    const alignment = matches / targetMuscles.length;
    return sum + numericGoal(weight) * clampUnit(alignment * 2.2);
  }, 0);

  if (totalWeight <= 0) {
    return 0;
  }

  return clampUnit(weightedTotal / totalWeight);
}

function estimateExerciseDurationMin(exercise) {
  const executionMode = normalizeToken(exercise?.executionMode);
  const intensity = Math.max(
    getExerciseIntensityValue(exercise, 'strength'),
    getExerciseIntensityValue(exercise, 'endurance'),
    getExerciseIntensityValue(exercise, 'fatLoss'),
    getExerciseIntensityValue(exercise, 'mobility')
  );

  if (executionMode === 'hold') {
    return 6;
  }

  if (executionMode === 'time') {
    return 8;
  }

  if (executionMode === 'reps') {
    return 5 + intensity * 4;
  }

  return 6;
}

function readIntensity(value) {
  if (typeof value === 'number') {
    return clampUnit(value);
  }

  return INTENSITY_VALUES[normalizeToken(value)] || 0;
}

function numericGoal(value) {
  return clampUnit(value);
}

function normalizeToken(value) {
  return normalizeString(value).toLowerCase().replaceAll(' ', '-');
}

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

function nonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function clampUnit(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.min(1, Math.max(0, number));
}
