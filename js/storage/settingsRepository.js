/**
 * @module js/storage/settingsRepository
 */
import { findById, normalizeString, uniqueStrings } from './helpers.js';
import { createSettings, sanitizeCustomAudio } from './records.js';
import { loadStore, saveStore } from './store.js';

/**
 * Gets settings.
 * @returns {*} result
 */
export function getSettings() {
  return loadStore().settings;
}

/**
 * Sets settings.
 * @param {object} settings settings input
 * @returns {*} result
 */
export function setSettings(settings) {
  const store = loadStore();
  store.settings = createSettings(settings);
  return saveStore(store).settings;
}

/**
 * Saves settings.
 * @param {object} settingsPatch settings patch input
 * @returns {*} result
 */
export function saveSettings(settingsPatch) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    ...settingsPatch,
  });
  return saveStore(store).settings;
}

/**
 * Saves last opened workout.
 * @param {string} id id input
 * @returns {*} result
 */
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

/**
 * Gets favorites.
 * @returns {*} result
 */
export function getFavorites() {
  return loadStore().settings.favoriteExerciseIds;
}

/**
 * Sets favorites.
 * @param {*} favorites favorites input
 * @returns {*} result
 */
export function setFavorites(favorites) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    favoriteExerciseIds: uniqueStrings(favorites),
  });
  return saveStore(store).settings.favoriteExerciseIds;
}

/**
 * Checks whether favorite exercise.
 * @param {string} exerciseId exercise id input
 * @returns {boolean} predicate result
 */
export function isFavoriteExercise(exerciseId) {
  return getFavorites().includes(exerciseId);
}

/**
 * Runs toggle favorite exercise.
 * @param {string} exerciseId exercise id input
 * @returns {*} result
 */
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

/**
 * Gets custom audio.
 * @returns {*} result
 */
export function getCustomAudio() {
  return loadStore().settings.customAudio;
}

/**
 * Sets custom audio.
 * @param {*} customAudio custom audio input
 * @returns {*} result
 */
export function setCustomAudio(customAudio) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    customAudio: sanitizeCustomAudio(customAudio),
  });
  return saveStore(store).settings.customAudio;
}
