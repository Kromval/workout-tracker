import {
  DEFAULT_RECOMMENDATION_WEIGHTS,
  rankExercisesForRecommendations,
  scoreContraindications as scoreRecommendationContraindications,
  scoreDifficultyFit,
  scoreExercise as scoreRecommendationExercise,
  scoreGoalAlignment as scoreRecommendationGoalAlignment,
  scoreMovementFocus,
  scoreMovementVariety,
  scorePreferenceFit,
  scoreRecoveryFit,
  scoreTimeFit as scoreRecommendationTimeFit,
} from './recommendations.js';

/**
 * Backward-compatible aliases for the recommendation scoring weights.
 * New code should import scoring primitives from `recommendations.js`.
 * @readonly
 */
export const DEFAULT_SCORING_WEIGHTS = DEFAULT_RECOMMENDATION_WEIGHTS;

/**
 * Ranks exercises using the recommendation pipeline and maps the result to the
 * legacy scoring schema consumed by the recommendation UI.
 * @param {object} [options={}] scoring/recommendation options
 * @returns {{
 *   eligibleExercises:Array<object>,
 *   excludedExercises:Array<object>,
 *   summary:object,
 *   scoredExercises:Array<object>,
 *   weights:object
 * }}
 */
export function rankRecommendedExercises(options = {}) {
  const rankingResult = rankExercisesForRecommendations(options);
  const scoredExercises = rankingResult.rankedExercises.map(mapRankedExercise);

  return {
    eligibleExercises: rankingResult.eligibleExercises,
    excludedExercises: rankingResult.excludedExercises,
    summary: rankingResult.summary,
    scoredExercises,
    weights: rankingResult.weights,
  };
}

/**
 * Scores one exercise against user state and optional context overrides.
 * @param {object} user profile-like user object
 * @param {object} exercise exercise record
 * @param {object} [context={}] scoring context
 * @param {object} [weights=DEFAULT_SCORING_WEIGHTS] scoring weights
 * @returns {{total:number,excluded:boolean,parts:object,penalties:object,reasons:string[],matchedSignals:string[]}}
 */
export function scoreExercise(user, exercise, context = {}, weights = DEFAULT_SCORING_WEIGHTS) {
  const result = scoreRecommendationExercise(exercise, user, context, weights);

  return {
    total: result.score,
    excluded: false,
    parts: mapParts(result.parts),
    penalties: mapPenalties(result.parts, result.penalties),
    reasons: result.reasons,
    matchedSignals: result.matchedSignals,
  };
}

/**
 * Scores functional and body-focus goal alignment.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreGoalAlignment(user, exercise) {
  const functionalScore = scoreRecommendationGoalAlignment(exercise, user);
  const focusScore = scoreMovementFocus(exercise, user);
  const hasFunctionalGoals = Object.values(user?.goals || {}).some((value) => Number(value) > 0);
  const hasBodyFocusGoals = Object.values(user?.bodyFocusGoals || {}).some(
    (value) => Number(value) > 0,
  );

  if (hasFunctionalGoals && hasBodyFocusGoals) {
    return clampUnit(Math.max(functionalScore, (functionalScore + focusScore) / 2));
  }

  if (hasBodyFocusGoals) {
    return focusScore;
  }

  return functionalScore;
}

/**
 * Scores user level vs exercise difficulty compatibility.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreLevelMatch(user, exercise) {
  return scoreDifficultyFit(exercise, user);
}

/**
 * Scores user preferences using liked tags and disliked exercises.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scorePreferences(user, exercise) {
  return scorePreferenceFit(exercise, user);
}

/**
 * Scores readiness based on per-muscle recovery state.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreRecovery(user, exercise) {
  return scoreRecoveryFit(exercise, user);
}

/**
 * Scores contraindication safety.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreSafety(user, exercise) {
  return scoreRecommendationContraindications(exercise, user);
}

/**
 * Scores novelty and movement-pattern diversity from recent history.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreVariety(user, exercise) {
  return scoreMovementVariety(exercise, {
    recentHistory: user?.recentHistory,
  });
}

/**
 * Scores estimated exercise duration against target session duration.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @param {object} [context={}] scoring context
 * @returns {number} normalized score in range `[0, 1]`
 */
export function scoreTimeFit(user, exercise, context = {}) {
  return scoreRecommendationTimeFit(exercise, user, context);
}

/**
 * Penalty for repeated exercise IDs and overloaded movement patterns.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized penalty in range `[0, 1]`
 */
export function scoreFatiguePenalty(user, exercise) {
  return clampUnit(1 - scoreVariety(user, exercise));
}

/**
 * Risk penalty from contraindication overlap with user limitations.
 * @param {object} user normalized or raw user profile
 * @param {object} exercise exercise record
 * @returns {number} normalized penalty in range `[0, 1]`
 */
export function scoreContraindicationRisk(user, exercise) {
  return clampUnit(1 - scoreSafety(user, exercise));
}

function mapRankedExercise(entry) {
  return {
    exercise: entry.exercise,
    metadata: entry.metadata,
    total: entry.score,
    excluded: false,
    parts: mapParts(entry.parts),
    penalties: mapPenalties(entry.parts, entry.penalties),
    reasons: entry.reasons,
    matchedSignals: entry.matchedSignals,
  };
}

function mapParts(parts) {
  return {
    goalAlignment: parts.goalAlignment,
    levelMatch: parts.difficultyFit,
    preference: parts.preferenceFit,
    recovery: parts.recoveryFit,
    safety: parts.contraindicationsFit,
    variety: parts.movementVariety,
    timeFit: parts.timeFit,
    equipmentFit: parts.equipmentFit,
    movementFocus: parts.movementFocus,
  };
}

function mapPenalties(parts, explanationPenalties = []) {
  return {
    fatiguePenalty: clampUnit(1 - parts.movementVariety),
    contraindicationRisk: clampUnit(1 - parts.contraindicationsFit),
    explanationPenalties,
  };
}

function clampUnit(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.min(1, Math.max(0, number));
}
