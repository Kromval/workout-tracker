import { getDefaultStore, loadStore, saveLastOpenedWorkout, saveSettings } from './storage.js';

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

export function notify() {
  listeners.forEach((listener) => listener(state));
}

export function setRoute(route, params = {}) {
  state.route = route;
  syncLastOpenedWorkout(route, params.id);
  notify();
}

export function setExercises(exercises) {
  state.exercises = exercises;
  notify();
}

export function refreshStore() {
  state.store = loadStore();
  state.settings = state.store.settings;
  notify();
}

export function updateSettings(settingsPatch) {
  state.settings = saveSettings(settingsPatch);
  state.store = loadStore();
  notify();
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
