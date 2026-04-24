import { findById, normalizeString, uniqueStrings } from './helpers.js';
import { createSettings, sanitizeCustomAudio } from './records.js';
import { loadStore, saveStore } from './store.js';

export function getSettings() {
  return loadStore().settings;
}

export function setSettings(settings) {
  const store = loadStore();
  store.settings = createSettings(settings);
  return saveStore(store).settings;
}

export function saveSettings(settingsPatch) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    ...settingsPatch,
  });
  return saveStore(store).settings;
}

export function saveLastOpenedWorkout(id) {
  const store = loadStore();
  const workoutId = normalizeString(id);
  const workout = workoutId ? findById(store.workouts, workoutId) : null;

  store.settings = createSettings({
    ...store.settings,
    lastOpenedWorkoutId: workout?.id || null,
  });

  return saveStore(store).settings;
}

export function getFavorites() {
  return loadStore().settings.favoriteExerciseIds;
}

export function setFavorites(favorites) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    favoriteExerciseIds: uniqueStrings(favorites),
  });
  return saveStore(store).settings.favoriteExerciseIds;
}

export function isFavoriteExercise(exerciseId) {
  return getFavorites().includes(exerciseId);
}

export function toggleFavoriteExercise(exerciseId) {
  const store = loadStore();
  const favorites = new Set(store.settings.favoriteExerciseIds);

  if (favorites.has(exerciseId)) {
    favorites.delete(exerciseId);
  } else {
    favorites.add(exerciseId);
  }

  store.settings = createSettings({
    ...store.settings,
    favoriteExerciseIds: Array.from(favorites),
  });
  return saveStore(store).settings.favoriteExerciseIds;
}

export function getCustomAudio() {
  return loadStore().settings.customAudio;
}

export function setCustomAudio(customAudio) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    customAudio: sanitizeCustomAudio(customAudio),
  });
  return saveStore(store).settings.customAudio;
}
