import { asArray, isPlainObject, nonNegativeNumber, normalizeString } from '../core/utils.js';
import { rankExercisesForRecommendations } from './recommendations.js';
import {
  calculateEstimatedWorkoutDuration,
  createEmptyWorkout,
  createWorkoutItem,
  normalizeWorkout,
} from './workouts.js';

export const SINGLE_WORKOUT_TYPES = Object.freeze([
  'auto',
  'straight',
  'circuit',
  'interval',
  'mobility',
]);

const RESOLVED_SINGLE_WORKOUT_TYPES = new Set(['straight', 'circuit', 'interval', 'mobility']);
const DEFAULT_TARGET_DURATION_MIN = 30;
const MIN_TARGET_DURATION_MIN = 10;
const MAX_TARGET_DURATION_MIN = 120;
const TARGET_DURATION_TOLERANCE = 0.12;
const MIN_WORKOUT_ITEMS = 3;

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

export function selectExercisesForSlots(rankedExercises = [], slots = [], context = {}) {
  const selectedIds = new Set();
  const selectedPatterns = new Map();

  return asArray(slots)
    .map((slot) => {
      const candidates = asArray(rankedExercises)
        .filter((entry) => entry?.exercise?.id && !selectedIds.has(entry.exercise.id))
        .filter((entry) => isExerciseEligibleForSlot(entry.exercise, slot, context))
        .map((entry) => ({
          entry,
          slot,
          selectionScore: scoreSlotSelection(entry, slot, selectedPatterns, context),
        }))
        .sort((left, right) => right.selectionScore - left.selectionScore);
      const selected = candidates[0] || null;

      if (!selected) {
        return null;
      }

      selectedIds.add(selected.entry.exercise.id);
      asArray(selected.entry.exercise.movementPatterns).forEach((pattern) => {
        const key = normalizeToken(pattern);
        selectedPatterns.set(key, (selectedPatterns.get(key) || 0) + 1);
      });

      return selected;
    })
    .filter(Boolean);
}

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

function normalizePriorities(priorities) {
  const source = isPlainObject(priorities) ? priorities : {};

  return {
    goals: normalizeGoalWeights(source.goals),
    bodyFocusGoals: normalizeUnitRecord(source.bodyFocusGoals),
  };
}

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

function createSlot(role, preferredTypes, preferredTags) {
  return {
    role,
    preferredTypes,
    preferredTags,
  };
}

function scoreSlotSelection(entry, slot, selectedPatterns, context) {
  const recommendationScore = nonNegativeNumber(entry?.score);
  const slotFit = scoreSlotFit(entry?.exercise, slot);
  const diversityFit = scoreSelectionDiversity(entry?.exercise, selectedPatterns);
  const roleFit = scoreRoleFit(entry?.exercise, slot, context);

  return recommendationScore * 0.62 + slotFit * 0.22 + diversityFit * 0.1 + roleFit * 0.06;
}

function scoreSlotFit(exercise, slot) {
  const type = normalizeToken(exercise?.type?.en || exercise?.type);
  const tags = new Set(asArray(exercise?.tags).map(normalizeToken));
  const mode = normalizeToken(exercise?.executionMode);
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

function isExerciseEligibleForSlot(exercise, slot, context = {}) {
  const role = normalizeToken(slot?.role);
  const workoutType = normalizeToken(context.workoutType);
  const type = normalizeToken(exercise?.type?.en || exercise?.type);
  const tags = new Set(asArray(exercise?.tags).map(normalizeToken));
  const mode = normalizeToken(exercise?.executionMode);
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

function scoreSelectionDiversity(exercise, selectedPatterns) {
  const movementPatterns = asArray(exercise?.movementPatterns).map(normalizeToken);

  if (movementPatterns.length === 0) {
    return 0.75;
  }

  const overlapCount = movementPatterns.reduce(
    (sum, pattern) => sum + (selectedPatterns.get(pattern) || 0),
    0,
  );

  return clampUnit(1 - overlapCount * 0.25);
}

function scoreRoleFit(exercise, slot, context) {
  if (slot?.role !== 'main') {
    return 0.7;
  }

  const workoutType = normalizeString(context.workoutType);
  const type = normalizeToken(exercise?.type?.en || exercise?.type);

  if (workoutType === 'straight' && type === 'strength') {
    return 1;
  }

  return 0.7;
}

function buildEffortPrescription(exercise, prescription) {
  const executionMode = normalizeString(exercise?.executionMode);
  const usesDuration = executionMode === 'time' || executionMode === 'hold';

  return {
    sets: prescription.sets,
    reps: usesDuration ? null : prescription.reps,
    durationSec: usesDuration ? prescription.durationSec : null,
    restBetweenSetsSec: prescription.restBetweenSetsSec,
    restAfterExerciseSec: prescription.restAfterExerciseSec,
  };
}

function isMobilityExercise(exercise) {
  const type = normalizeToken(exercise?.type?.en || exercise?.type);
  const tags = new Set(asArray(exercise?.tags).map(normalizeToken));

  return type === 'yoga' || tags.has('yoga') || tags.has('mobility');
}

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

function updateWorkoutItem(workout, itemId, patch) {
  return normalizeWorkout({
    ...workout,
    items: workout.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
  });
}

function isWarmupItem(item) {
  return item.order === 0;
}

function buildWorkoutTitle(workoutType, targetDurationMin) {
  const labels = {
    straight: 'Recommended workout',
    circuit: 'Recommended circuit workout',
    interval: 'Recommended interval workout',
    mobility: 'Recommended mobility workout',
  };

  return `${labels[workoutType] || labels.straight}, ${targetDurationMin} min`;
}

function buildWorkoutDescription(workoutType, selectedEntries) {
  const selectedRoles = selectedEntries.map((selection) => selection.slot.role).join(', ');
  return `Generated ${workoutType} workout. Slots: ${selectedRoles}.`;
}

function getDominantGoalId(profile) {
  const goals = normalizeGoalWeights(profile?.goals);
  const entries = Object.entries(goals).sort((left, right) => right[1] - left[1]);

  if (entries[0]?.[1] > 0) {
    return entries[0][0];
  }

  const goal = normalizeString(profile?.goal);
  return goal === 'fat-loss' ? 'fatLoss' : goal || 'generalFitness';
}

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

function exerciseTargetsMuscle(exercise, muscleId) {
  const target = normalizeToken(muscleId);
  return [
    ...asArray(exercise?.muscles),
    ...asArray(exercise?.muscleGroups?.primary),
    ...asArray(exercise?.muscleGroups?.secondary),
    ...asArray(exercise?.tags),
  ]
    .map(normalizeToken)
    .includes(target);
}

function normalizeToken(value) {
  return normalizeString(value).toLowerCase();
}

function clampUnit(value) {
  return clampNumber(nonNegativeNumber(value), 0, 1);
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}
