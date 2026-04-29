/**
 * @module js/core/selectors
 */
import { getExerciseCatalog } from '../features/exercises.js';
import { getEquipmentCatalog } from '../features/equipment.js';
import { rankRecommendedExercises } from '../features/exercise-scoring.js';
import { getWorkouts } from '../features/workouts.js';
import { getPopularPresetWorkouts } from '../features/presets.js';

/**
 * Shared empty array constant.
 * @type {Readonly<Array>}
 */
const EMPTY_ARRAY = Object.freeze([]);
/**
 * Shared empty object constant.
 * @type {Readonly<object>}
 */
const EMPTY_OBJECT = Object.freeze({});
/**
 * Shared default recommendation limit constant.
 * @type {number}
 */
export const DEFAULT_RECOMMENDATION_LIMIT = 12;

/**
 * Selects route from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectRoute(state) {
  return state?.route || 'home';
}

/**
 * Selects store from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectStore(state) {
  return state?.store || EMPTY_OBJECT;
}

/**
 * Selects settings from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectSettings(state) {
  return state?.settings || selectStore(state).settings || EMPTY_OBJECT;
}

/**
 * Selects language from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectLanguage(state) {
  return selectSettings(state).language || 'ru';
}

/**
 * Selects theme from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectTheme(state) {
  return selectSettings(state).theme || 'system';
}

/**
 * Selects density from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectDensity(state) {
  return selectSettings(state).density || 'comfortable';
}

/**
 * Selects profile from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectProfile(state) {
  return selectStore(state).profile || EMPTY_OBJECT;
}

/**
 * Selects equipment from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectEquipment(state) {
  return selectStore(state).equipment || EMPTY_OBJECT;
}

/**
 * Selects custom audio from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectCustomAudio(state) {
  return selectSettings(state).customAudio || EMPTY_OBJECT;
}

/**
 * Module-level select favorite exercise ids by settings value.
 * @type {*}
 */
const selectFavoriteExerciseIdsBySettings = memoizeByRefs(
  (settings) => settings.favoriteExerciseIds || EMPTY_ARRAY,
);
/**
 * Module-level select favorite exercise id set by settings value.
 * @type {*}
 */
const selectFavoriteExerciseIdSetBySettings = memoizeByRefs(
  (settings) => new Set(settings.favoriteExerciseIds || EMPTY_ARRAY),
);
/**
 * Module-level select exercise catalog by refs value.
 * @type {*}
 */
const selectExerciseCatalogByRefs = memoizeByRefs((exercises, store) =>
  getExerciseCatalog({
    exercises,
    store,
  }),
);
/**
 * Module-level select equipment catalog by store value.
 * @type {*}
 */
const selectEquipmentCatalogByStore = memoizeByRefs((store) => getEquipmentCatalog({ store }));
/**
 * Module-level select equipment selected id set by store value.
 * @type {*}
 */
const selectEquipmentSelectedIdSetByStore = memoizeByRefs(
  (store) => new Set(store.equipment?.selectedIds || EMPTY_ARRAY),
);

/**
 * Module-level select user workouts by store value.
 * @type {*}
 */
const selectUserWorkoutsByStore = memoizeByRefs((store) =>
  (store.workouts || EMPTY_ARRAY).filter((workout) => !workout.isPreset),
);

/**
 * Module-level select workouts by store value.
 * @type {*}
 */
const selectWorkoutsByStore = memoizeByRefs((store) => getWorkouts(store));
/**
 * Module-level select exercise recommendations by refs value.
 * @type {*}
 */
const selectExerciseRecommendationsByRefs = memoizeByRefs(
  (exerciseCatalog, profile, equipment, equipmentCatalog, limit) => {
    const normalizedLimit =
      Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : DEFAULT_RECOMMENDATION_LIMIT;
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
  },
);

/**
 * Module-level select preset workouts value.
 * @type {*}
 */
export const selectPresetWorkouts = memoizeByRefs(() => getPopularPresetWorkouts());

/**
 * Module-level select history by store value.
 * @type {*}
 */
const selectHistoryByStore = memoizeByRefs((store) => store.history || EMPTY_ARRAY);

/**
 * Selects favorite exercise ids from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectFavoriteExerciseIds(state) {
  return selectFavoriteExerciseIdsBySettings(selectSettings(state));
}

/**
 * Selects favorite exercise id set from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectFavoriteExerciseIdSet(state) {
  return selectFavoriteExerciseIdSetBySettings(selectSettings(state));
}

/**
 * Selects exercise catalog from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectExerciseCatalog(state) {
  return selectExerciseCatalogByRefs(state?.exercises || EMPTY_ARRAY, selectStore(state));
}

/**
 * Selects recommended exercises from application state.
 * @param {object} state state input
 * @param {object} [options={}] options input
 * @returns {*} result
 */
export function selectRecommendedExercises(state, options = {}) {
  return selectExerciseRecommendationsByRefs(
    selectExerciseCatalog(state),
    selectProfile(state),
    selectEquipment(state),
    selectEquipmentCatalog(state),
    options.limit,
  );
}

/**
 * Selects equipment catalog from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectEquipmentCatalog(state) {
  return selectEquipmentCatalogByStore(selectStore(state));
}

/**
 * Selects equipment selected id set from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectEquipmentSelectedIdSet(state) {
  return selectEquipmentSelectedIdSetByStore(selectStore(state));
}

/**
 * Selects user workouts from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectUserWorkouts(state) {
  return selectUserWorkoutsByStore(selectStore(state));
}

/**
 * Selects workouts from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectWorkouts(state) {
  return selectWorkoutsByStore(selectStore(state));
}

/**
 * Selects history from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectHistory(state) {
  return selectHistoryByStore(selectStore(state));
}

/**
 * Selects custom exercise count from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectCustomExerciseCount(state) {
  return (selectStore(state).customExercises || EMPTY_ARRAY).length;
}

/**
 * Selects last opened workout from application state.
 * @param {object} state state input
 * @returns {*} result
 */
export function selectLastOpenedWorkout(state) {
  const workoutId = selectSettings(state).lastOpenedWorkoutId;

  if (!workoutId) {
    return null;
  }

  return selectUserWorkouts(state).find((workout) => workout.id === workoutId) || null;
}

/**
 * Selects workout by id from application state.
 * @param {object} state state input
 * @param {string} workoutId workout id input
 * @returns {*} result
 */
export function selectWorkoutById(state, workoutId) {
  if (!workoutId) {
    return null;
  }

  return selectWorkouts(state).find((workout) => workout.id === workoutId) || null;
}

/**
 * Runs memoize by refs.
 * @param {*} selector selector input
 * @returns {*} result
 */
function memoizeByRefs(selector) {
  let previousArgs = null;
  let previousResult;

  return (...args) => {
    if (
      previousArgs &&
      previousArgs.length === args.length &&
      previousArgs.every((arg, index) => arg === args[index])
    ) {
      return previousResult;
    }

    previousArgs = args;
    previousResult = selector(...args);
    return previousResult;
  };
}
