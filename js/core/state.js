/**
 * @module js/core/state
 */
import {
  getDefaultStore,
  loadStore,
  saveEquipment,
  saveLastOpenedWorkout,
  saveProfile,
  saveSettings,
} from '../storage/core.js';

/**
 * Module-level listeners value.
 * @type {Set}
 */
const listeners = new Set();

/**
 * Shared default state constant.
 * @type {Readonly<object>}
 */
export const DEFAULT_STATE = Object.freeze({
  route: 'home',
  exercises: [],
  store: getDefaultStore(),
  settings: getDefaultStore().settings,
});

// The app state is intentionally small; persisted data stays in storage.js.
/**
 * Module-level state value.
 * @type {*}
 */
export const state = initialState();

/**
 * Initializes initial state.
 * @returns {*} result
 */
export function initialState() {
  const store = loadStore();

  return {
    route: DEFAULT_STATE.route,
    exercises: [...DEFAULT_STATE.exercises],
    store,
    settings: store.settings,
  };
}

/**
 * Runs subscribe.
 * @param {Function} listener listener input
 * @returns {*} result
 */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Runs notify.
 * @param {object} [meta={}] meta input
 */
export function notify(meta = {}) {
  listeners.forEach((listener) => listener(state, meta));
}

/**
 * Sets route.
 * @param {string} route route input
 * @param {*} [params={}] params input
 */
export function setRoute(route, params = {}) {
  state.route = route;
  syncLastOpenedWorkout(route, params.id);
  notify({ type: 'route', route, params });
}

/**
 * Sets exercises.
 * @param {Array} exercises exercises input
 */
export function setExercises(exercises) {
  state.exercises = exercises;
  notify({ type: 'exercises' });
}

/**
 * Runs refresh store.
 */
export function refreshStore() {
  state.store = loadStore();
  state.settings = state.store.settings;
  notify({ type: 'store' });
}

/**
 * Updates settings.
 * @param {object} settingsPatch settings patch input
 */
export function updateSettings(settingsPatch) {
  state.settings = saveSettings(settingsPatch);
  state.store = loadStore();
  notify({ type: 'settings', changedKeys: Object.keys(settingsPatch) });
}

/**
 * Updates profile.
 * @param {object} profilePatch profile patch input
 */
export function updateProfile(profilePatch) {
  saveProfile(profilePatch);
  state.store = loadStore();
  state.settings = state.store.settings;
  notify({ type: 'profile', changedKeys: Object.keys(profilePatch) });
}

/**
 * Updates equipment.
 * @param {object} equipment equipment input
 */
export function updateEquipment(equipment) {
  saveEquipment(equipment);
  state.store = loadStore();
  state.settings = state.store.settings;
  notify({ type: 'equipment' });
}

/**
 * Runs sync last opened workout.
 * @param {string} route route input
 * @param {string} workoutId workout id input
 */
function syncLastOpenedWorkout(route, workoutId) {
  if (!['workout-view', 'workout-run'].includes(route) || !workoutId) {
    return;
  }

  if (state.settings.lastOpenedWorkoutId === workoutId) {
    return;
  }

  state.settings = saveLastOpenedWorkout(workoutId);
  state.store = loadStore();
}
