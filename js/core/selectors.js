import { getExerciseCatalog } from '../features/exercises.js';
import { getEquipmentCatalog } from '../features/equipment.js';
import { rankRecommendedExercises } from '../features/exercise-scoring.js';
import { getWorkouts } from '../features/workouts.js';
import { getPopularPresetWorkouts } from '../features/presets.js';

const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});
export const DEFAULT_RECOMMENDATION_LIMIT = 12;

export function selectRoute(state) {
  return state?.route || 'home';
}

export function selectStore(state) {
  return state?.store || EMPTY_OBJECT;
}

export function selectSettings(state) {
  return state?.settings || selectStore(state).settings || EMPTY_OBJECT;
}

export function selectLanguage(state) {
  return selectSettings(state).language || 'ru';
}

export function selectTheme(state) {
  return selectSettings(state).theme || 'system';
}

export function selectDensity(state) {
  return selectSettings(state).density || 'comfortable';
}

export function selectProfile(state) {
  return selectStore(state).profile || EMPTY_OBJECT;
}

export function selectEquipment(state) {
  return selectStore(state).equipment || EMPTY_OBJECT;
}

export function selectCustomAudio(state) {
  return selectSettings(state).customAudio || EMPTY_OBJECT;
}

const selectFavoriteExerciseIdsBySettings = memoizeByRefs((settings) => settings.favoriteExerciseIds || EMPTY_ARRAY);
const selectFavoriteExerciseIdSetBySettings = memoizeByRefs((settings) => new Set(settings.favoriteExerciseIds || EMPTY_ARRAY));
const selectExerciseCatalogByRefs = memoizeByRefs((exercises, store) => getExerciseCatalog({
  exercises,
  store,
}));
const selectEquipmentCatalogByStore = memoizeByRefs((store) => getEquipmentCatalog({ store }));
const selectEquipmentSelectedIdSetByStore = memoizeByRefs((store) => new Set(store.equipment?.selectedIds || EMPTY_ARRAY));

const selectUserWorkoutsByStore = memoizeByRefs((store) => (store.workouts || EMPTY_ARRAY)
  .filter((workout) => !workout.isPreset));

const selectWorkoutsByStore = memoizeByRefs((store) => getWorkouts(store));
const selectExerciseRecommendationsByRefs = memoizeByRefs((exerciseCatalog, profile, equipment, equipmentCatalog, limit) => {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : DEFAULT_RECOMMENDATION_LIMIT;
  const result = rankRecommendedExercises({
    exercises: exerciseCatalog,
    profile,
    equipment,
    equipmentCatalog,
    context: {
      targetDurationMin: profile?.sessionDurationMin,
    },
  });

  return {
    ...result,
    topExercises: result.scoredExercises.slice(0, normalizedLimit),
    limit: normalizedLimit,
  };
});

export const selectPresetWorkouts = memoizeByRefs(() => getPopularPresetWorkouts());

const selectHistoryByStore = memoizeByRefs((store) => store.history || EMPTY_ARRAY);

export function selectFavoriteExerciseIds(state) {
  return selectFavoriteExerciseIdsBySettings(selectSettings(state));
}

export function selectFavoriteExerciseIdSet(state) {
  return selectFavoriteExerciseIdSetBySettings(selectSettings(state));
}

export function selectExerciseCatalog(state) {
  return selectExerciseCatalogByRefs(state?.exercises || EMPTY_ARRAY, selectStore(state));
}

export function selectRecommendedExercises(state, options = {}) {
  return selectExerciseRecommendationsByRefs(
    selectExerciseCatalog(state),
    selectProfile(state),
    selectEquipment(state),
    selectEquipmentCatalog(state),
    options.limit
  );
}

export function selectEquipmentCatalog(state) {
  return selectEquipmentCatalogByStore(selectStore(state));
}

export function selectEquipmentSelectedIdSet(state) {
  return selectEquipmentSelectedIdSetByStore(selectStore(state));
}

export function selectUserWorkouts(state) {
  return selectUserWorkoutsByStore(selectStore(state));
}

export function selectWorkouts(state) {
  return selectWorkoutsByStore(selectStore(state));
}

export function selectHistory(state) {
  return selectHistoryByStore(selectStore(state));
}

export function selectCustomExerciseCount(state) {
  return (selectStore(state).customExercises || EMPTY_ARRAY).length;
}

export function selectLastOpenedWorkout(state) {
  const workoutId = selectSettings(state).lastOpenedWorkoutId;

  if (!workoutId) {
    return null;
  }

  return selectUserWorkouts(state).find((workout) => workout.id === workoutId) || null;
}

export function selectWorkoutById(state, workoutId) {
  if (!workoutId) {
    return null;
  }

  return selectWorkouts(state).find((workout) => workout.id === workoutId) || null;
}

function memoizeByRefs(selector) {
  let previousArgs = null;
  let previousResult;

  return (...args) => {
    if (
      previousArgs
      && previousArgs.length === args.length
      && previousArgs.every((arg, index) => arg === args[index])
    ) {
      return previousResult;
    }

    previousArgs = args;
    previousResult = selector(...args);
    return previousResult;
  };
}
