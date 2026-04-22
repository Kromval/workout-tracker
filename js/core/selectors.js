import { getExerciseCatalog } from '../features/exercises.js';
import { getWorkouts } from '../features/workouts.js';
import { getPopularPresetWorkouts } from '../features/presets.js';

const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

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

export function selectCustomAudio(state) {
  return selectSettings(state).customAudio || EMPTY_OBJECT;
}

const selectFavoriteExerciseIdsBySettings = memoizeByRefs((settings) => settings.favoriteExerciseIds || EMPTY_ARRAY);
const selectFavoriteExerciseIdSetBySettings = memoizeByRefs((settings) => new Set(settings.favoriteExerciseIds || EMPTY_ARRAY));
const selectExerciseCatalogByRefs = memoizeByRefs((exercises, store) => getExerciseCatalog({
  exercises,
  store,
}));

const selectUserWorkoutsByStore = memoizeByRefs((store) => (store.workouts || EMPTY_ARRAY)
  .filter((workout) => !workout.isPreset));

const selectWorkoutsByStore = memoizeByRefs((store) => getWorkouts(store));

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
