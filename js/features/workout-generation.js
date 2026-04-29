/**
 * @module js/features/workout-generation
 */
import { asArray, isPlainObject, nonNegativeNumber, normalizeString } from '../core/utils.js';
import { rankExercisesForRecommendations } from './recommendations.js';
import {
  calculateEstimatedWorkoutDuration,
  createEmptyWorkout,
  createWorkoutItem,
  normalizeWorkout,
} from './workouts.js';

/**
 * Shared single workout types constant.
 * @type {Readonly<Array>}
 */
export const SINGLE_WORKOUT_TYPES = Object.freeze([
  'auto',
  'straight',
  'circuit',
  'interval',
  'mobility',
]);

/**
 * Shared resolved single workout types constant.
 * @type {Set}
 */
const RESOLVED_SINGLE_WORKOUT_TYPES = new Set(['straight', 'circuit', 'interval', 'mobility']);
/**
 * Shared default target duration min constant.
 * @type {number}
 */
const DEFAULT_TARGET_DURATION_MIN = 30;
/**
 * Shared min target duration min constant.
 * @type {number}
 */
const MIN_TARGET_DURATION_MIN = 10;
/**
 * Shared max target duration min constant.
 * @type {number}
 */
const MAX_TARGET_DURATION_MIN = 120;
/**
 * Shared target duration tolerance constant.
 * @type {number}
 */
const TARGET_DURATION_TOLERANCE = 0.12;
/**
 * Shared min workout items constant.
 * @type {number}
 */
const MIN_WORKOUT_ITEMS = 3;

/**
 * Creates single workout recommendation.
 * @param {object} [options={}] options input
 * @returns {*} result
 */
export function createSingleWorkoutRecommendation(options = {}) {
  const request = normalizeSingleWorkoutRequest(options.request || options);
  const profile = applyPriorityOverrides(
    options.profile,
    request.priorities,
    request.hasPriorityOverrides,
  );
  const workoutType = selectSingleWorkoutType({ ...request, profile });
  const template = buildSingleWorkoutTemplate({
    ...request,
    workoutType,
    profile,
  });
  const ranking = rankExercisesForRecommendations({
    exercises: options.exercises,
    profile,
    equipment: options.equipment,
    equipmentCatalog: options.equipmentCatalog,
    excludedExerciseIds: options.excludedExerciseIds,
    goalMode: options.goalMode,
    weights: options.weights,
    context: {
      ...options.context,
      targetDurationMin: request.targetDurationMin,
    },
  });
  const selectedEntries = selectExercisesForSlots(ranking.rankedExercises, template.slots, {
    profile,
    workoutType,
  });
  const workout = createEmptyWorkout({
    title: buildWorkoutTitle(workoutType, request.targetDurationMin),
    description: buildWorkoutDescription(workoutType, selectedEntries),
    defaultRestBetweenExercises: template.defaultRestBetweenExercisesSec,
    items: selectedEntries.map((selection, index) =>
      createWorkoutItem({
        ...prescribeWorkoutItem(selection.entry.exercise, {
          goalId: getDominantGoalId(profile),
          slot: selection.slot,
          workoutType,
          trainingLevel: profile.trainingLevel,
        }),
        exerciseId: selection.entry.exercise.id,
        order: index,
      }),
    ),
  });
  const fittedWorkout = fitWorkoutToDuration(
    workout,
    request.targetDurationMin,
    selectedEntries.map((selection) => selection.entry.exercise),
  );
  const estimatedDurationSec = calculateEstimatedWorkoutDuration(
    fittedWorkout,
    selectedEntries.map((selection) => selection.entry.exercise),
  );

  return {
    request,
    profile,
    workoutType,
    template,
    workout: fittedWorkout,
    selectedExercises: selectedEntries,
    rankedExercises: ranking.rankedExercises,
    excludedExercises: ranking.excludedExercises,
    summary: {
      ...ranking.summary,
      selectedCount: fittedWorkout.items.length,
      targetDurationMin: request.targetDurationMin,
      estimatedDurationSec,
      estimatedDurationMin: Math.round((estimatedDurationSec / 60) * 10) / 10,
    },
  };
}

/**
 * Normalizes single workout request.
 * @param {object} [request={}] request input
 * @returns {*} result
 */
export function normalizeSingleWorkoutRequest(request = {}) {
  const source = isPlainObject(request) ? request : {};
  const targetDurationMin = clampNumber(
    nonNegativeNumber(source.targetDurationMin ?? source.durationMin, DEFAULT_TARGET_DURATION_MIN),
    MIN_TARGET_DURATION_MIN,
    MAX_TARGET_DURATION_MIN,
  );
  const workoutType = SINGLE_WORKOUT_TYPES.includes(source.workoutType)
    ? source.workoutType
    : 'auto';

  return {
    mode: 'single',
    targetDurationMin,
    workoutType,
    hasPriorityOverrides: isPlainObject(source.priorities),
    priorities: normalizePriorities(source.priorities),
  };
}

/**
 * Selects single workout type from application state.
 * @param {object} [request={}] request input
 * @returns {*} result
 */
export function selectSingleWorkoutType(request = {}) {
  const requestedType = normalizeString(request.workoutType);

  if (RESOLVED_SINGLE_WORKOUT_TYPES.has(requestedType)) {
    return requestedType;
  }

  const profile = isPlainObject(request.profile) ? request.profile : {};
  const goals = normalizeGoalWeights(profile.goals);
  const dominantGoal = getDominantGoalId({ ...profile, goals });
  const durationMin = nonNegativeNumber(request.targetDurationMin, DEFAULT_TARGET_DURATION_MIN);

  if (dominantGoal === 'mobility') {
    return 'mobility';
  }

  if (dominantGoal === 'fatLoss' || dominantGoal === 'endurance') {
    return durationMin <= 25 ? 'interval' : 'circuit';
  }

  return 'straight';
}

/**
 * Builds single workout template.
 * @param {object} [request={}] request input
 * @returns {*} result
 */
export function buildSingleWorkoutTemplate(request = {}) {
  const workoutType = RESOLVED_SINGLE_WORKOUT_TYPES.has(request.workoutType)
    ? request.workoutType
    : selectSingleWorkoutType(request);
  const targetDurationMin = nonNegativeNumber(
    request.targetDurationMin,
    DEFAULT_TARGET_DURATION_MIN,
  );

  if (workoutType === 'mobility') {
    return {
      id: 'single-mobility',
      workoutType,
      defaultRestBetweenExercisesSec: 20,
      slots: buildMobilitySlots(targetDurationMin),
    };
  }

  if (workoutType === 'interval') {
    return {
      id: 'single-interval',
      workoutType,
      defaultRestBetweenExercisesSec: 20,
      slots: buildConditioningSlots(targetDurationMin, true),
    };
  }

  if (workoutType === 'circuit') {
    return {
      id: 'single-circuit',
      workoutType,
      defaultRestBetweenExercisesSec: 25,
      slots: buildConditioningSlots(targetDurationMin, false),
    };
  }

  return {
    id: 'single-straight',
    workoutType: 'straight',
    defaultRestBetweenExercisesSec: 75,
    slots: buildStraightSlots(targetDurationMin),
  };
}

/**
 * Selects exercises for slots from application state.
 * @param {Array} [rankedExercises=[]] ranked exercises input
 * @param {Array} [slots=[]] slots input
 * @param {string} [context={}] context input
 * @returns {*} result
 */
export function selectExercisesForSlots(rankedExercises = [], slots = [], context = {}) {
  const selectedIds = new Set();
  const selectedPatterns = new Map();

  return asArray(slots)
    .map((slot) => {
      const availableEntries = asArray(rankedExercises).filter(
        (entry) => entry?.exercise?.id && !selectedIds.has(entry.exercise.id),
      );
      const strictCandidates = availableEntries
        .filter((entry) => isExerciseEligibleForSlot(entry.exercise, slot, context))
        .map((entry) => ({
          entry,
          slot,
          selectionScore: scoreSlotSelection(entry, slot, selectedPatterns, context),
        }));
      const candidates = (
        strictCandidates.length
          ? strictCandidates
          : availableEntries
              .filter((entry) => isExerciseFallbackEligibleForSlot(entry.exercise, slot, context))
              .map((entry) => ({
                entry,
                slot: { ...slot, fallback: true },
                selectionScore: scoreSlotSelection(entry, slot, selectedPatterns, context) * 0.82,
              }))
      ).sort((left, right) => right.selectionScore - left.selectionScore);
      const selected = candidates[0] || null;

      if (!selected) {
        return null;
      }

      selectedIds.add(selected.entry.exercise.id);
      getExerciseMovementPatterns(selected.entry.exercise).forEach((pattern) => {
        const key = normalizeToken(pattern);
        selectedPatterns.set(key, (selectedPatterns.get(key) || 0) + 1);
      });

      return selected;
    })
    .filter(Boolean);
}

/**
 * Runs prescribe workout item.
 * @param {object} exercise exercise input
 * @param {string} [context={}] context input
 * @returns {*} result
 */
export function prescribeWorkoutItem(exercise, context = {}) {
  const slotRole = normalizeString(context.slot?.role);
  const workoutType = normalizeString(context.workoutType);
  const goalId = normalizeString(context.goalId);
  const levelMultiplier = getLevelVolumeMultiplier(context.trainingLevel);

  if (slotRole === 'warmup') {
    return buildEffortPrescription(exercise, {
      sets: 1,
      reps: 14,
      durationSec: 45,
      restBetweenSetsSec: 15,
      restAfterExerciseSec: workoutType === 'straight' ? 45 : 15,
    });
  }

  if (isMobilityExercise(exercise)) {
    return buildEffortPrescription(exercise, {
      sets: 1,
      reps: 8,
      durationSec: 45,
      restBetweenSetsSec: 15,
      restAfterExerciseSec: 30,
    });
  }

  if (slotRole === 'mobility' || workoutType === 'mobility') {
    return buildEffortPrescription(exercise, {
      sets: Math.max(1, Math.round(2 * levelMultiplier)),
      reps: 8,
      durationSec: 45,
      restBetweenSetsSec: 15,
      restAfterExerciseSec: 20,
    });
  }

  if (slotRole === 'finisher' || workoutType === 'interval') {
    return buildEffortPrescription(exercise, {
      sets: Math.max(2, Math.round(3 * levelMultiplier)),
      reps: 12,
      durationSec: 35,
      restBetweenSetsSec: 20,
      restAfterExerciseSec: 20,
    });
  }

  if (workoutType === 'circuit') {
    return buildEffortPrescription(exercise, {
      sets: Math.max(2, Math.round(3 * levelMultiplier)),
      reps: 12,
      durationSec: 35,
      restBetweenSetsSec: 25,
      restAfterExerciseSec: 15,
    });
  }

  if (goalId === 'strength') {
    return buildEffortPrescription(exercise, {
      sets: Math.max(3, Math.round(4 * levelMultiplier)),
      reps: 6,
      durationSec: 30,
      restBetweenSetsSec: 120,
      restAfterExerciseSec: 90,
    });
  }

  if (goalId === 'hypertrophy') {
    return buildEffortPrescription(exercise, {
      sets: Math.max(3, Math.round(3 * levelMultiplier)),
      reps: 10,
      durationSec: 35,
      restBetweenSetsSec: 75,
      restAfterExerciseSec: 75,
    });
  }

  return buildEffortPrescription(exercise, {
    sets: Math.max(2, Math.round(3 * levelMultiplier)),
    reps: 12,
    durationSec: 35,
    restBetweenSetsSec: 60,
    restAfterExerciseSec: 60,
  });
}

/**
 * Runs fit workout to duration.
 * @param {object} workout workout input
 * @param {number} targetDurationMin target duration min input
 * @param {Array} [exercises=[]] exercises input
 * @returns {*} result
 */
export function fitWorkoutToDuration(workout, targetDurationMin, exercises = []) {
  const targetSec =
    clampNumber(
      nonNegativeNumber(targetDurationMin, DEFAULT_TARGET_DURATION_MIN),
      MIN_TARGET_DURATION_MIN,
      MAX_TARGET_DURATION_MIN,
    ) * 60;
  let fittedWorkout = normalizeWorkout(workout);
  let estimatedSec = calculateEstimatedWorkoutDuration(fittedWorkout, exercises);
  let attempts = 0;

  while (estimatedSec > targetSec * (1 + TARGET_DURATION_TOLERANCE) && attempts < 80) {
    const previousSec = estimatedSec;
    fittedWorkout = reduceWorkoutVolume(fittedWorkout);
    estimatedSec = calculateEstimatedWorkoutDuration(fittedWorkout, exercises);
    attempts += 1;

    if (estimatedSec >= previousSec) {
      break;
    }
  }

  while (estimatedSec < targetSec * (1 - TARGET_DURATION_TOLERANCE) && attempts < 120) {
    const previousSec = estimatedSec;
    fittedWorkout = increaseWorkoutVolume(fittedWorkout);
    estimatedSec = calculateEstimatedWorkoutDuration(fittedWorkout, exercises);
    attempts += 1;

    if (estimatedSec <= previousSec) {
      break;
    }
  }

  return normalizeWorkout(fittedWorkout);
}

/**
 * Applies priority overrides.
 * @param {object} profile profile input
 * @param {object} priorities priorities input
 * @param {boolean} hasPriorityOverrides has priority overrides input
 * @returns {*} result
 */
function applyPriorityOverrides(profile, priorities, hasPriorityOverrides) {
  const source = isPlainObject(profile) ? profile : {};

  if (!hasPriorityOverrides) {
    return source;
  }

  const normalizedPriorities = normalizePriorities(priorities);

  return {
    ...source,
    goals: {
      ...(isPlainObject(source.goals) ? source.goals : {}),
      ...normalizedPriorities.goals,
    },
    bodyFocusGoals: {
      ...(isPlainObject(source.bodyFocusGoals) ? source.bodyFocusGoals : {}),
      ...normalizedPriorities.bodyFocusGoals,
    },
  };
}

/**
 * Normalizes priorities.
 * @param {object} priorities priorities input
 * @returns {*} result
 */
function normalizePriorities(priorities) {
  const source = isPlainObject(priorities) ? priorities : {};

  return {
    goals: normalizeGoalWeights(source.goals),
    bodyFocusGoals: normalizeUnitRecord(source.bodyFocusGoals),
  };
}

/**
 * Normalizes goal weights.
 * @param {object} goals goals input
 * @returns {*} result
 */
function normalizeGoalWeights(goals) {
  const source = isPlainObject(goals) ? goals : {};

  return {
    strength: clampUnit(source.strength),
    hypertrophy: clampUnit(source.hypertrophy),
    endurance: clampUnit(source.endurance),
    fatLoss: clampUnit(source.fatLoss),
    mobility: clampUnit(source.mobility),
  };
}

/**
 * Normalizes unit record.
 * @param {object} record record input
 * @returns {*} result
 */
function normalizeUnitRecord(record) {
  const source = isPlainObject(record) ? record : {};

  return Object.entries(source).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: clampUnit(value),
    }),
    {},
  );
}

/**
 * Builds straight slots.
 * @param {number} targetDurationMin target duration min input
 * @returns {*} result
 */
function buildStraightSlots(targetDurationMin) {
  const slots = [];

  if (targetDurationMin >= 15) {
    slots.push(createSlot('warmup', ['cardio', 'yoga'], ['warmup', 'mobility', 'full-body']));
  }

  slots.push(
    createSlot('main', ['strength'], ['compound', 'full-body']),
    createSlot('main', ['strength'], ['compound']),
    createSlot('accessory', ['strength'], []),
  );

  if (targetDurationMin >= 30) {
    slots.push(createSlot('accessory', ['strength'], []));
  }

  slots.push(createSlot('core', ['strength', 'static'], ['core', 'hold']));

  if (targetDurationMin >= 45) {
    slots.push(createSlot('finisher', ['cardio'], ['cardio', 'full-body']));
  }

  return slots;
}

/**
 * Builds conditioning slots.
 * @param {number} targetDurationMin target duration min input
 * @param {boolean} isInterval is interval input
 * @returns {*} result
 */
function buildConditioningSlots(targetDurationMin, isInterval) {
  const slots = [createSlot('warmup', ['cardio', 'yoga'], ['warmup', 'mobility', 'full-body'])];
  const targetCount = targetDurationMin >= 40 ? 7 : targetDurationMin >= 25 ? 6 : 5;

  while (slots.length < targetCount - 1) {
    slots.push(
      createSlot(
        'conditioning',
        ['cardio', 'strength'],
        ['cardio', 'full-body', 'full-body-dynamic', isInterval ? 'conditioning' : 'compound'],
      ),
    );
  }

  slots.push(createSlot('core', ['strength', 'static'], ['core', 'hold']));
  return slots;
}

/**
 * Builds mobility slots.
 * @param {number} targetDurationMin target duration min input
 * @returns {*} result
 */
function buildMobilitySlots(targetDurationMin) {
  const targetCount = targetDurationMin >= 40 ? 7 : targetDurationMin >= 25 ? 6 : 4;

  return Array.from({ length: targetCount }, (_, index) =>
    createSlot(
      index === 0 ? 'warmup' : 'mobility',
      ['yoga', 'static', 'strength'],
      ['yoga', 'mobility', 'hold', 'core', 'full-body'],
    ),
  );
}

/**
 * Creates slot.
 * @param {*} role role input
 * @param {*} preferredTypes preferred types input
 * @param {Array} preferredTags preferred tags input
 * @returns {*} result
 */
function createSlot(role, preferredTypes, preferredTags) {
  return {
    role,
    preferredTypes,
    preferredTags,
  };
}

/**
 * Scores slot selection.
 * @param {object} entry entry input
 * @param {object} slot slot input
 * @param {Array} selectedPatterns selected patterns input
 * @param {object} context context input
 * @returns {*} result
 */
function scoreSlotSelection(entry, slot, selectedPatterns, context) {
  const recommendationScore = nonNegativeNumber(entry?.score);
  const slotFit = scoreSlotFit(entry?.exercise, slot);
  const diversityFit = scoreSelectionDiversity(entry?.exercise, selectedPatterns);
  const roleFit = scoreRoleFit(entry?.exercise, slot, context);

  return recommendationScore * 0.62 + slotFit * 0.22 + diversityFit * 0.1 + roleFit * 0.06;
}

/**
 * Scores slot fit.
 * @param {object} exercise exercise input
 * @param {object} slot slot input
 * @returns {*} result
 */
function scoreSlotFit(exercise, slot) {
  const type = getExerciseType(exercise);
  const tags = new Set(getExerciseTags(exercise));
  const mode = getExerciseExecutionMode(exercise);
  let score = 0.35;

  if (asArray(slot?.preferredTypes).map(normalizeToken).includes(type)) {
    score += 0.3;
  }

  asArray(slot?.preferredTags)
    .map(normalizeToken)
    .forEach((tag) => {
      if (tags.has(tag)) {
        score += 0.08;
      }
    });

  if (slot?.role === 'warmup' && (mode === 'time' || tags.has('warmup'))) {
    score += 0.12;
  }

  if (slot?.role === 'core' && exerciseTargetsMuscle(exercise, 'core')) {
    score += 0.18;
  }

  if (slot?.role === 'mobility' && (type === 'yoga' || tags.has('mobility') || mode === 'hold')) {
    score += 0.16;
  }

  return clampUnit(score);
}

/**
 * Checks whether exercise eligible for slot.
 * @param {object} exercise exercise input
 * @param {object} slot slot input
 * @param {string} [context={}] context input
 * @returns {boolean} predicate result
 */
function isExerciseEligibleForSlot(exercise, slot, context = {}) {
  const role = normalizeToken(slot?.role);
  const workoutType = normalizeToken(context.workoutType);
  const type = getExerciseType(exercise);
  const tags = new Set(getExerciseTags(exercise));
  const mode = getExerciseExecutionMode(exercise);
  const preferredTypes = asArray(slot?.preferredTypes).map(normalizeToken);
  const preferredTags = asArray(slot?.preferredTags).map(normalizeToken);
  const hasPreferredType = preferredTypes.length === 0 || preferredTypes.includes(type);
  const hasPreferredTag = preferredTags.some((tag) => tags.has(tag));

  if (workoutType === 'straight' && (role === 'main' || role === 'accessory')) {
    return type === 'strength';
  }

  if (role === 'core') {
    return (
      (type === 'strength' || type === 'static') &&
      (exerciseTargetsMuscle(exercise, 'core') || tags.has('core') || tags.has('hold'))
    );
  }

  if (role === 'mobility') {
    return type === 'yoga' || tags.has('mobility') || mode === 'hold';
  }

  if (role === 'conditioning' || role === 'finisher') {
    return (
      type === 'cardio' ||
      type === 'strength' ||
      tags.has('cardio') ||
      tags.has('conditioning') ||
      tags.has('full-body-dynamic')
    );
  }

  if (role === 'warmup') {
    return (
      hasPreferredType ||
      hasPreferredTag ||
      tags.has('warmup') ||
      tags.has('mobility') ||
      mode === 'time'
    );
  }

  return hasPreferredType || hasPreferredTag;
}

/**
 * Checks whether exercise fallback eligible for slot.
 * @param {object} exercise exercise input
 * @param {object} slot slot input
 * @param {string} [context={}] context input
 * @returns {boolean} predicate result
 */
function isExerciseFallbackEligibleForSlot(exercise, slot, context = {}) {
  const role = normalizeToken(slot?.role);
  const workoutType = normalizeToken(context.workoutType);
  const type = getExerciseType(exercise);
  const tags = new Set(getExerciseTags(exercise));
  const mode = getExerciseExecutionMode(exercise);

  if (workoutType === 'straight' && (role === 'main' || role === 'accessory')) {
    return type === 'strength' || tags.has('compound');
  }

  if (role === 'core') {
    return type === 'static' || type === 'strength' || mode === 'hold';
  }

  if (role === 'mobility') {
    return type === 'yoga' || type === 'static' || mode === 'hold' || tags.has('mobility');
  }

  if (role === 'conditioning' || role === 'finisher') {
    return type === 'cardio' || type === 'strength' || tags.has('full-body-dynamic');
  }

  if (role === 'warmup') {
    return type === 'cardio' || type === 'yoga' || mode === 'time' || tags.has('mobility');
  }

  return true;
}

/**
 * Scores selection diversity.
 * @param {object} exercise exercise input
 * @param {Array} selectedPatterns selected patterns input
 * @returns {*} result
 */
function scoreSelectionDiversity(exercise, selectedPatterns) {
  const movementPatterns = getExerciseMovementPatterns(exercise);

  if (movementPatterns.length === 0) {
    return 0.75;
  }

  const overlapCount = movementPatterns.reduce(
    (sum, pattern) => sum + (selectedPatterns.get(pattern) || 0),
    0,
  );

  return clampUnit(1 - overlapCount * 0.25);
}

/**
 * Scores role fit.
 * @param {object} exercise exercise input
 * @param {object} slot slot input
 * @param {object} context context input
 * @returns {*} result
 */
function scoreRoleFit(exercise, slot, context) {
  if (slot?.role !== 'main') {
    return 0.7;
  }

  const workoutType = normalizeString(context.workoutType);
  const type = getExerciseType(exercise);

  if (workoutType === 'straight' && type === 'strength') {
    return 1;
  }

  return 0.7;
}

/**
 * Builds effort prescription.
 * @param {object} exercise exercise input
 * @param {object} prescription prescription input
 * @returns {*} result
 */
function buildEffortPrescription(exercise, prescription) {
  const executionMode = getExerciseExecutionMode(exercise);
  const usesDuration = executionMode === 'time' || executionMode === 'hold';

  return {
    sets: prescription.sets,
    reps: usesDuration ? null : prescription.reps,
    durationSec: usesDuration ? prescription.durationSec : null,
    restBetweenSetsSec: prescription.restBetweenSetsSec,
    restAfterExerciseSec: prescription.restAfterExerciseSec,
  };
}

/**
 * Checks whether mobility exercise.
 * @param {object} exercise exercise input
 * @returns {boolean} predicate result
 */
function isMobilityExercise(exercise) {
  const type = getExerciseType(exercise);
  const tags = new Set(getExerciseTags(exercise));

  return type === 'yoga' || tags.has('yoga') || tags.has('mobility');
}

/**
 * Runs reduce workout volume.
 * @param {object} workout workout input
 * @returns {*} result
 */
function reduceWorkoutVolume(workout) {
  const normalizedWorkout = normalizeWorkout(workout);
  const items = [...normalizedWorkout.items];
  const reducibleItem = [...items].reverse().find((item) => item.sets > 1 && !isWarmupItem(item));

  if (reducibleItem) {
    return updateWorkoutItem(normalizedWorkout, reducibleItem.id, {
      sets: reducibleItem.sets - 1,
    });
  }

  const durationItem = [...items]
    .reverse()
    .find((item) => item.durationSec !== null && item.durationSec > 20 && !isWarmupItem(item));

  if (durationItem) {
    return updateWorkoutItem(normalizedWorkout, durationItem.id, {
      durationSec: Math.max(20, durationItem.durationSec - 5),
    });
  }

  if (items.length > MIN_WORKOUT_ITEMS) {
    return normalizeWorkout({
      ...normalizedWorkout,
      items: items.slice(0, -1),
    });
  }

  return normalizedWorkout;
}

/**
 * Runs increase workout volume.
 * @param {object} workout workout input
 * @returns {*} result
 */
function increaseWorkoutVolume(workout) {
  const normalizedWorkout = normalizeWorkout(workout);
  const expandableItem = normalizedWorkout.items.find(
    (item) => item.sets < 5 && !isWarmupItem(item),
  );

  if (expandableItem) {
    return updateWorkoutItem(normalizedWorkout, expandableItem.id, {
      sets: expandableItem.sets + 1,
    });
  }

  const durationItem = normalizedWorkout.items.find(
    (item) => item.durationSec !== null && item.durationSec < 60 && !isWarmupItem(item),
  );

  if (durationItem) {
    return updateWorkoutItem(normalizedWorkout, durationItem.id, {
      durationSec: durationItem.durationSec + 5,
    });
  }

  return normalizedWorkout;
}

/**
 * Updates workout item.
 * @param {object} workout workout input
 * @param {string} itemId item id input
 * @param {object} patch patch input
 * @returns {*} result
 */
function updateWorkoutItem(workout, itemId, patch) {
  return normalizeWorkout({
    ...workout,
    items: workout.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
  });
}

/**
 * Checks whether warmup item.
 * @param {object} item item input
 * @returns {boolean} predicate result
 */
function isWarmupItem(item) {
  return item.order === 0;
}

/**
 * Builds workout title.
 * @param {string} workoutType workout type input
 * @param {number} targetDurationMin target duration min input
 * @returns {*} result
 */
function buildWorkoutTitle(workoutType, targetDurationMin) {
  const labels = {
    straight: 'Recommended workout',
    circuit: 'Recommended circuit workout',
    interval: 'Recommended interval workout',
    mobility: 'Recommended mobility workout',
  };

  return `${labels[workoutType] || labels.straight}, ${targetDurationMin} min`;
}

/**
 * Builds workout description.
 * @param {string} workoutType workout type input
 * @param {Array} selectedEntries selected entries input
 * @returns {*} result
 */
function buildWorkoutDescription(workoutType, selectedEntries) {
  const selectedRoles = selectedEntries.map((selection) => selection.slot.role).join(', ');
  return `Generated ${workoutType} workout. Slots: ${selectedRoles}.`;
}

/**
 * Gets dominant goal id.
 * @param {object} profile profile input
 * @returns {*} result
 */
function getDominantGoalId(profile) {
  const goals = normalizeGoalWeights(profile?.goals);
  const entries = Object.entries(goals).sort((left, right) => right[1] - left[1]);

  if (entries[0]?.[1] > 0) {
    return entries[0][0];
  }

  const goal = normalizeString(profile?.goal);
  return goal === 'fat-loss' ? 'fatLoss' : goal || 'generalFitness';
}

/**
 * Gets level volume multiplier.
 * @param {*} trainingLevel training level input
 * @returns {*} result
 */
function getLevelVolumeMultiplier(trainingLevel) {
  const level = normalizeToken(trainingLevel);

  if (level === 'advanced') {
    return 1.2;
  }

  if (level === 'intermediate') {
    return 1;
  }

  return 0.8;
}

/**
 * Runs exercise targets muscle.
 * @param {object} exercise exercise input
 * @param {string} muscleId muscle id input
 * @returns {*} result
 */
function exerciseTargetsMuscle(exercise, muscleId) {
  const target = normalizeToken(muscleId);
  return [...getExerciseMuscles(exercise), ...getExerciseTags(exercise)]
    .map(normalizeToken)
    .includes(target);
}

/**
 * Gets exercise type.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseType(exercise) {
  const explicitType = normalizeToken(exercise?.type?.en || exercise?.type);
  const modality = normalizeToken(exercise?.classification?.modality);
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
  const equipment = getExerciseEquipmentIds(exercise);
  const movementPatterns = getExerciseMovementPatterns(exercise);
  const type = getExerciseType(exercise);
  const executionMode = getExerciseExecutionMode(exercise);
  const impact = normalizeToken(exercise?.intensityProfile?.impact || safety.impactLevel);
  const tags = [
    ...asArray(exercise?.tags),
    type,
    ...equipment,
    normalizeToken(exercise?.difficulty || classification.difficulty),
    ...movementPatterns,
    normalizeToken(mechanics.loadType),
    normalizeToken(classification.bodyPosition),
    impact ? `impact-${impact}` : '',
    executionMode === 'hold' ? 'hold' : '',
  ]
    .map(normalizeToken)
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
 * Gets exercise equipment ids.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseEquipmentIds(exercise) {
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
    (explicitPatterns.length ? explicitPatterns : classificationPatterns).map(normalizeToken),
  );
}

/**
 * Gets exercise execution mode.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseExecutionMode(exercise) {
  return normalizeToken(exercise?.executionMode || exercise?.mechanics?.executionMode);
}

/**
 * Gets exercise muscles.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function getExerciseMuscles(exercise) {
  const legacyMuscles = Array.isArray(exercise?.muscles) ? exercise.muscles : [];
  const muscleGroups = isPlainObject(exercise?.muscleGroups) ? exercise.muscleGroups : {};
  const currentMuscles = isPlainObject(exercise?.muscles) ? exercise.muscles : {};

  return uniqueList(
    [
      ...legacyMuscles,
      ...asArray(muscleGroups.primary),
      ...asArray(muscleGroups.secondary),
      ...asArray(currentMuscles.primary),
      ...asArray(currentMuscles.secondary),
      ...asArray(currentMuscles.stabilizers),
    ].map(normalizeToken),
  );
}

/**
 * Normalizes equipment id.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeEquipmentId(value) {
  const normalized = normalizeToken(value);

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
 * Runs unique list.
 * @param {Array} values values input
 * @returns {*} result
 */
function uniqueList(values) {
  return Array.from(new Set(asArray(values).filter(Boolean)));
}

/**
 * Normalizes token.
 * @param {string} value value input
 * @returns {string} formatted value
 */
function normalizeToken(value) {
  return normalizeString(value).toLowerCase();
}

/**
 * Runs clamp unit.
 * @param {string} value value input
 * @returns {*} result
 */
function clampUnit(value) {
  return clampNumber(nonNegativeNumber(value), 0, 1);
}

/**
 * Runs clamp number.
 * @param {string} value value input
 * @param {number} min min input
 * @param {number} max max input
 * @returns {*} result
 */
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}
