import {
  getDefaultStore,
  loadStore,
  saveEquipment,
  saveLastOpenedWorkout,
  saveProfile,
  saveSettings,
} from '../storage/core.js';

const listeners = new Set();

export const DEFAULT_STATE = Object.freeze({
  route: 'home',
  exercises: [],
  store: getDefaultStore(),
  settings: getDefaultStore().settings,
});

// The app state is intentionally small; persisted data stays in storage.js.
export const state = initialState();

export function initialState() {
  const store = loadStore();

  return {
    route: DEFAULT_STATE.route,
    exercises: [...DEFAULT_STATE.exercises],
    store,
    settings: store.settings,
  };
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notify(meta = {}) {
  listeners.forEach((listener) => listener(state, meta));
}

export function setRoute(route, params = {}) {
  state.route = route;
  syncLastOpenedWorkout(route, params.id);
  notify({ type: 'route', route, params });
}

export function setExercises(exercises) {
  state.exercises = exercises;
  notify({ type: 'exercises' });
}

export function refreshStore() {
  state.store = loadStore();
  state.settings = state.store.settings;
  notify({ type: 'store' });
}

export function updateSettings(settingsPatch) {
  state.settings = saveSettings(settingsPatch);
  state.store = loadStore();
  notify({ type: 'settings', changedKeys: Object.keys(settingsPatch) });
}

export function updateProfile(profilePatch) {
  saveProfile(profilePatch);
  state.store = loadStore();
  state.settings = state.store.settings;
  notify({ type: 'profile', changedKeys: Object.keys(profilePatch) });
}

export function updateEquipment(equipment) {
  saveEquipment(equipment);
  state.store = loadStore();
  state.settings = state.store.settings;
  notify({ type: 'equipment' });
}

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
