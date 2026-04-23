/**
 * @typedef {{ ru: string, en: string }} LocalizedText
 *
 * @typedef {{
 *   eccentric: number,
 *   concentric: number,
 *   pauseTop: number,
 *   pauseBottom: number
 * }} Tempo
 *
 * @typedef {{
 *   id: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   name: LocalizedText,
 *   shortDescription: LocalizedText,
 *   instruction: LocalizedText,
 *   effect: LocalizedText,
 *   type: LocalizedText,
 *   muscles: string[],
 *   tags: string[],
 *   executionMode: 'reps' | 'time' | 'hold' | 'custom',
 *   tempo: Tempo | null,
 *   estimatedCalories: number,
 *   image: string,
 *   isCustom: boolean
 * }} Exercise
 *
 * @typedef {{
 *   id: string,
 *   exerciseId: string,
 *   sets: number,
 *   reps: number | null,
 *   durationSec: number | null,
 *   distance: number | null,
 *   restBetweenSetsSec: number,
 *   restAfterExerciseSec: number | null,
 *   tempoOverride: Tempo | null,
 *   notes: string,
 *   order: number
 * }} WorkoutItem
 *
 * @typedef {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   isPreset: boolean,
 *   items: WorkoutItem[],
 *   defaultRestBetweenExercises: number,
 *   themeColor: string,
 *   tags: string[]
 * }} Workout
 *
 * @typedef {{
 *   workoutItemId: string,
 *   exerciseId: string,
 *   exerciseNameSnapshot: LocalizedText,
 *   setsCompleted: number,
 *   repsCompleted: number | null,
 *   durationSec: number | null,
 *   skipped: boolean,
 *   note: string
 * }} CompletedWorkoutItem
 *
 * @typedef {{
 *   id: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   workoutId: string,
 *   workoutTitleSnapshot: string,
 *   startedAt: string,
 *   endedAt: string,
 *   durationSec: number,
 *   status: 'completed' | 'aborted' | 'interrupted',
 *   completedItems: CompletedWorkoutItem[],
 *   note: string,
 *   ratingEmoji: string,
 *   estimatedCaloriesBurned: number,
 *   totalExercisesCompleted: number,
 *   totalSetsCompleted: number
 * }} HistoryEntry
 *
 * @typedef {{
 *   name: string,
 *   type: string,
 *   size: number,
 *   dataUrl: string,
 *   updatedAt: string
 * }} CustomAudioEntry
 *
 * @typedef {{
 *   language: 'ru' | 'en',
 *   theme: 'light' | 'dark' | 'system',
 *   soundEnabled: boolean,
 *   volume: number,
 *   customAudio: Record<string, string | CustomAudioEntry>,
 *   favoriteExerciseIds: string[],
 *   calendarViewMode: 'month' | 'week',
 *   lastOpenedWorkoutId: string | null
 * }} Settings
 *
 * @typedef {{
 *   age: number | null,
 *   sex: '' | 'male' | 'female',
 *   weightKg: number | null,
 *   heightCm: number | null,
 *   bodyFatPercent: number | null,
 *   wristCm: number | null,
 *   waistCm: number | null,
 *   neckCm: number | null,
 *   chestCm: number | null,
 *   hipsCm: number | null,
 *   forearmCm: number | null,
 *   calfCm: number | null,
 *   trainingLevel: '' | 'beginner' | 'intermediate' | 'advanced',
 *   goal: '' | 'strength' | 'hypertrophy' | 'endurance' | 'fat-loss' | 'general-fitness',
 *   limitations: string
 * }} UserProfile
 *
 * @typedef {{
 *   id: string,
 *   name: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   isCustom: boolean
 * }} EquipmentItem
 *
 * @typedef {{
 *   selectedIds: string[],
 *   customItems: EquipmentItem[]
 * }} EquipmentState
 *
 * @typedef {{
 *   version: number,
 *   settings: Settings,
 *   profile: UserProfile,
 *   equipment: EquipmentState,
 *   customExercises: Exercise[],
 *   workouts: Workout[],
 *   history: HistoryEntry[],
 *   activeSession: object | null
 * }} WorkoutTrackerStore
 */

import {
  AUDIO_EVENTS,
  DEFAULT_STORE,
  EXPORT_DATA_KEYS,
  IMPORT_DATA_KEYS,
  IMPORT_MODES,
  STORAGE_KEY,
  STORAGE_VERSION,
} from './schema.js';
import { isFutureStorageVersion, migrateStore } from './migrations.js';

export { DEFAULT_SETTINGS, DEFAULT_STORE, IMPORT_MODES, STORAGE_META } from './schema.js';
export {
  createLocalizedText,
  createProfile,
  createEquipment,
  createEquipmentItem,
  createExercise,
  createWorkoutItem,
  createWorkout,
  createHistoryEntry,
  createSettings,
  sanitizeEquipment,
  validateWorkoutForSave,
} from './records.js';

import {
  asArray,
  clone,
  createId,
  findById,
  isPlainObject,
  mergeById,
  normalizeDateKey,
  normalizeString,
  nowIso,
  sortByUpdatedAtDesc,
  sortHistoryEntries,
  uniqueStrings,
  upsertById,
} from './helpers.js';
import {
  createEquipment,
  createEquipmentItem,
  createExercise,
  createHistoryEntry,
  createProfile,
  createSettings,
  sanitizeEquipment,
  createWorkout,
  createWorkoutItem,
  sanitizeCustomAudio,
  sanitizeCustomExercise,
  sanitizeHistoryEntry,
  sanitizeStore,
  sanitizeWorkout,
  validateWorkoutForSave,
} from './records.js';

export function loadStore() {
  const rawStore = readRawStore();
  const store = migrateStore(rawStore);

  if (!isFutureStorageVersion(rawStore)) {
    initializeStorage(store);
  }

  return store;
}

export function saveStore(store) {
  const nextStore = sanitizeStore(store);
  writeRawStore(nextStore);
  return clone(nextStore);
}

export function resetStore() {
  writeRawStore(DEFAULT_STORE);
  return clone(DEFAULT_STORE);
}

export function getDefaultStore() {
  return clone(DEFAULT_STORE);
}

export function initializeStorage(store = DEFAULT_STORE) {
  if (!hasLocalStorage()) {
    return clone(store);
  }

  const nextStore = sanitizeStore(store);
  writeRawStore(nextStore);
  return clone(nextStore);
}

export function exportStore() {
  const store = loadStore();
  const exportData = EXPORT_DATA_KEYS.reduce((result, key) => {
    result[key] = clone(store[key]);
    return result;
  }, {});

  return JSON.stringify({
    app: 'workout-tracker',
    version: STORAGE_VERSION,
    exportedAt: nowIso(),
    ...exportData,
  }, null, 2);
}

export function importStore(json, options = {}) {
  const mode = options.mode === IMPORT_MODES.REPLACE ? IMPORT_MODES.REPLACE : IMPORT_MODES.MERGE;
  const parsed = parseImportJson(json);
  const payload = validateImportPayload(parsed);
  const nextStore = mode === IMPORT_MODES.REPLACE
    ? createReplaceStore(payload)
    : createMergedStore(loadStore(), payload);

  return saveStore(nextStore);
}

export function generateId(prefix = 'id') {
  return createId(prefix);
}

export function generateUniqueId(prefix = 'id', existingIds = []) {
  const usedIds = new Set(uniqueStrings(existingIds));
  let id = createId(prefix);

  while (usedIds.has(id)) {
    id = createId(prefix);
  }

  return id;
}

export function getSettings() {
  return loadStore().settings;
}

export function getProfile() {
  return loadStore().profile;
}

export function saveProfile(profilePatch) {
  const store = loadStore();
  store.profile = createProfile({
    ...store.profile,
    ...profilePatch,
  });
  return saveStore(store).profile;
}

export function getEquipment() {
  return loadStore().equipment;
}

export function saveEquipment(equipment) {
  const store = loadStore();
  store.equipment = createEquipment(equipment);
  return saveStore(store).equipment;
}

export function createCustomEquipmentRecord(name) {
  const store = loadStore();
  const item = createEquipmentItem({
    name,
    id: generateUniqueId('equipment', store.equipment.customItems.map((entry) => entry.id)),
  });
  const customItems = [...store.equipment.customItems, item];
  const selectedIds = uniqueStrings([...store.equipment.selectedIds, item.id]);

  store.equipment = createEquipment({
    ...store.equipment,
    customItems,
    selectedIds,
  });

  return {
    equipment: saveStore(store).equipment,
    item,
  };
}

export function deleteCustomEquipmentRecord(id) {
  const store = loadStore();
  const nextCustomItems = store.equipment.customItems.filter((item) => item.id !== id);

  if (nextCustomItems.length === store.equipment.customItems.length) {
    return false;
  }

  store.equipment = createEquipment({
    ...store.equipment,
    customItems: nextCustomItems,
    selectedIds: store.equipment.selectedIds.filter((itemId) => itemId !== id),
  });
  saveStore(store);
  return true;
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

export function getCustomExercises() {
  return sortByUpdatedAtDesc(loadStore().customExercises);
}

export function setCustomExercises(exercises) {
  const store = loadStore();
  store.customExercises = sortByUpdatedAtDesc(asArray(exercises).map(sanitizeCustomExercise));
  return saveStore(store).customExercises;
}

export function listCustomExercises() {
  return getCustomExercises();
}

export function readAllCustomExercises() {
  return getCustomExercises();
}

export function getCustomExercise(id) {
  return findById(loadStore().customExercises, id);
}

export function readCustomExerciseById(id) {
  return getCustomExercise(id);
}

export function createCustomExercise(exercise = {}) {
  const store = loadStore();
  const now = nowIso();
  const normalized = createExercise({
    ...exercise,
    id: generateUniqueId('exercise', store.customExercises.map((item) => item.id)),
    createdAt: now,
    updatedAt: now,
    isCustom: true,
  });

  store.customExercises = sortByUpdatedAtDesc([...store.customExercises, normalized]);
  return saveStore(store).customExercises.find((item) => item.id === normalized.id);
}

export function saveCustomExercise(exercise) {
  if (!isPlainObject(exercise)) {
    throw new TypeError('Custom exercise must be an object.');
  }

  if (!exercise.id) {
    return createCustomExercise(exercise);
  }

  const store = loadStore();
  const existing = findById(store.customExercises, exercise.id);
  const normalized = createExercise({
    ...existing,
    ...exercise,
    isCustom: true,
    id: exercise.id,
    createdAt: exercise.createdAt || existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
  });

  store.customExercises = sortByUpdatedAtDesc(upsertById(store.customExercises, normalized));
  return saveStore(store).customExercises.find((item) => item.id === normalized.id);
}

export function updateCustomExercise(id, patch = {}) {
  const store = loadStore();
  const existing = findById(store.customExercises, id);

  if (!existing) {
    return null;
  }

  const normalized = createExercise({
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: nowIso(),
    isCustom: true,
  });

  store.customExercises = sortByUpdatedAtDesc(upsertById(store.customExercises, normalized));
  return saveStore(store).customExercises.find((item) => item.id === normalized.id);
}

export function deleteCustomExercise(id) {
  const store = loadStore();
  const initialLength = store.customExercises.length;
  store.customExercises = store.customExercises.filter((exercise) => exercise.id !== id);
  store.settings.favoriteExerciseIds = store.settings.favoriteExerciseIds.filter((itemId) => itemId !== id);
  saveStore(store);
  return store.customExercises.length !== initialLength;
}

export function listWorkouts() {
  return getWorkouts();
}

export function readAllWorkouts() {
  return getWorkouts();
}

export function getWorkouts() {
  return sortByUpdatedAtDesc(loadStore().workouts);
}

export function setWorkouts(workouts) {
  const store = loadStore();
  store.workouts = sortByUpdatedAtDesc(asArray(workouts).map(sanitizeWorkout));
  return saveStore(store).workouts;
}

export function getWorkout(id) {
  return findById(loadStore().workouts, id);
}

export function readWorkoutById(id) {
  return getWorkout(id);
}

/**
 * Persists a new workout after normalization and validation.
 * @throws {Error} when the workout is missing required fields.
 */
export function createWorkoutRecord(workout = {}) {
  const store = loadStore();
  const now = nowIso();
  const normalized = createWorkout({
    ...workout,
    id: generateUniqueId('workout', store.workouts.map((item) => item.id)),
    createdAt: now,
    updatedAt: now,
    isPreset: Boolean(workout.isPreset),
  });

  validateWorkoutForSave(normalized);

  store.workouts = sortByUpdatedAtDesc([...store.workouts, normalized]);
  return saveStore(store).workouts.find((item) => item.id === normalized.id);
}

/**
 * Creates or updates a workout record and keeps persisted data sanitized.
 * @throws {Error} when validation fails.
 */
export function saveWorkout(workout) {
  if (!isPlainObject(workout)) {
    throw new TypeError('Workout must be an object.');
  }

  if (!workout.id) {
    return createWorkoutRecord(workout);
  }

  const store = loadStore();
  const existing = findById(store.workouts, workout.id);
  const normalized = createWorkout({
    ...existing,
    ...workout,
    id: workout.id || createId('workout'),
    createdAt: workout.createdAt || existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
  });

  validateWorkoutForSave(normalized);

  store.workouts = sortByUpdatedAtDesc(upsertById(store.workouts, normalized));
  return saveStore(store).workouts.find((item) => item.id === normalized.id);
}

export function updateWorkout(id, patch = {}) {
  const store = loadStore();
  const existing = findById(store.workouts, id);

  if (!existing) {
    return null;
  }

  const normalized = createWorkout({
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: nowIso(),
  });

  validateWorkoutForSave(normalized);

  store.workouts = sortByUpdatedAtDesc(upsertById(store.workouts, normalized));
  return saveStore(store).workouts.find((item) => item.id === normalized.id);
}

/**
 * Validates the minimal executable workout contract used by sessions.
 */
export function deleteWorkout(id) {
  const store = loadStore();
  const initialLength = store.workouts.length;
  store.workouts = store.workouts.filter((workout) => workout.id !== id);

  if (store.settings.lastOpenedWorkoutId === id) {
    store.settings.lastOpenedWorkoutId = null;
  }

  saveStore(store);
  return store.workouts.length !== initialLength;
}

export function duplicateWorkout(id, overrides = {}) {
  const source = getWorkout(id);

  if (!source) {
    return null;
  }

  const copy = createWorkout({
    ...source,
    ...overrides,
    id: createId('workout'),
    title: overrides.title || `${source.title} copy`,
    isPreset: false,
    items: source.items.map((item, index) => createWorkoutItem({
      ...item,
      id: createId('workout-item'),
      order: index,
    })),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  });

  return saveWorkout(copy);
}

export function listHistory() {
  return getHistory();
}

export function readAllHistory() {
  return getHistory();
}

export function getHistory() {
  return sortHistoryEntries(loadStore().history);
}

export function setHistory(history) {
  const store = loadStore();
  store.history = sortHistoryEntries(asArray(history).map(sanitizeHistoryEntry));
  return saveStore(store).history;
}

export function getHistoryEntry(id) {
  return findById(loadStore().history, id);
}

export function readHistoryById(id) {
  return getHistoryEntry(id);
}

export function createHistoryRecord(entry = {}) {
  const store = loadStore();
  const now = nowIso();
  const normalized = createHistoryEntry({
    ...entry,
    id: generateUniqueId('history', store.history.map((item) => item.id)),
    createdAt: now,
    updatedAt: now,
  });

  store.history = sortHistoryEntries([...store.history, normalized]);
  return saveStore(store).history.find((item) => item.id === normalized.id);
}

export function saveHistoryEntry(entry) {
  if (!isPlainObject(entry)) {
    throw new TypeError('History entry must be an object.');
  }

  if (!entry.id) {
    return createHistoryRecord(entry);
  }

  const store = loadStore();
  const existing = findById(store.history, entry.id);
  const normalized = createHistoryEntry({
    ...existing,
    ...entry,
    id: entry.id,
    createdAt: entry.createdAt || existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
  });

  store.history = sortHistoryEntries(upsertById(store.history, normalized));
  return saveStore(store).history.find((item) => item.id === normalized.id);
}

export function updateHistoryEntry(id, patch = {}) {
  const store = loadStore();
  const existing = findById(store.history, id);

  if (!existing) {
    return null;
  }

  const normalized = createHistoryEntry({
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: nowIso(),
  });

  store.history = sortHistoryEntries(upsertById(store.history, normalized));
  return saveStore(store).history.find((item) => item.id === normalized.id);
}

export function deleteHistoryEntry(id) {
  const store = loadStore();
  const initialLength = store.history.length;
  store.history = store.history.filter((entry) => entry.id !== id);
  saveStore(store);
  return store.history.length !== initialLength;
}

export function getHistoryByDate(dateString) {
  const day = normalizeDateKey(dateString);
  return sortHistoryEntries(loadStore().history.filter((entry) => normalizeDateKey(entry.startedAt) === day));
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

export function getActiveSession() {
  return loadStore().activeSession;
}

export function setActiveSession(session) {
  const store = loadStore();
  store.activeSession = session ? clone(session) : null;
  return saveStore(store).activeSession;
}

export function saveActiveSession(session) {
  return setActiveSession(session);
}

export function clearActiveSession() {
  const store = loadStore();
  store.activeSession = null;
  saveStore(store);
}

function parseImportJson(json) {
  if (typeof json !== 'string') {
    return json;
  }

  try {
    return JSON.parse(json);
  } catch (error) {
    const importError = new Error('Файл не похож на корректный JSON. Проверьте, что выбран экспорт Workout Planner.');
    importError.name = 'ImportValidationError';
    importError.details = [error.message];
    throw importError;
  }
}

function validateImportPayload(payload) {
  if (!isPlainObject(payload)) {
    throwImportValidationError(['Корневой элемент JSON должен быть объектом.']);
  }

  const source = isPlainObject(payload.data) ? payload.data : payload;
  const errors = [];
  const allowedKeys = new Set(IMPORT_DATA_KEYS);
  const presentKeys = IMPORT_DATA_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(source, key));

  if (presentKeys.length === 0) {
    errors.push(`JSON должен содержать хотя бы один раздел: ${IMPORT_DATA_KEYS.join(', ')}.`);
  }

  Object.keys(source).forEach((key) => {
    if (!allowedKeys.has(key) && !['app', 'version', 'exportedAt'].includes(key)) {
      errors.push(`Неизвестный раздел данных: ${key}.`);
    }
  });

  if (Object.prototype.hasOwnProperty.call(source, 'settings') && !isPlainObject(source.settings)) {
    errors.push('Раздел settings должен быть объектом.');
  }

  if (Object.prototype.hasOwnProperty.call(source, 'profile') && !isPlainObject(source.profile)) {
    errors.push('Раздел profile должен быть объектом.');
  }

  if (Object.prototype.hasOwnProperty.call(source, 'equipment') && !isPlainObject(source.equipment)) {
    errors.push('Раздел equipment должен быть объектом.');
  }

  ['customExercises', 'workouts', 'history', 'favorites'].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key) && !Array.isArray(source[key])) {
      errors.push(`Раздел ${key} должен быть массивом.`);
    }
  });

  if (Object.prototype.hasOwnProperty.call(source, 'customAudio') && !isPlainObject(source.customAudio)) {
    errors.push('Раздел customAudio должен быть объектом.');
  }

  if (Array.isArray(source.customExercises)) {
    validateObjectArray(source.customExercises, 'customExercises', errors);
  }

  if (Array.isArray(source.workouts)) {
    validateObjectArray(source.workouts, 'workouts', errors);
  }

  if (Array.isArray(source.history)) {
    validateObjectArray(source.history, 'history', errors);
  }

  if (Array.isArray(source.favorites)) {
    source.favorites.forEach((item, index) => {
      if (typeof item !== 'string') {
        errors.push(`favorites[${index}] должен быть строкой.`);
      }
    });
  }

  if (isPlainObject(source.equipment)) {
    if (Object.prototype.hasOwnProperty.call(source.equipment, 'selectedIds') && !Array.isArray(source.equipment.selectedIds)) {
      errors.push('equipment.selectedIds должен быть массивом.');
    }

    if (Object.prototype.hasOwnProperty.call(source.equipment, 'customItems') && !Array.isArray(source.equipment.customItems)) {
      errors.push('equipment.customItems должен быть массивом.');
    }

    if (Array.isArray(source.equipment?.selectedIds)) {
      source.equipment.selectedIds.forEach((item, index) => {
        if (typeof item !== 'string') {
          errors.push(`equipment.selectedIds[${index}] должен быть строкой.`);
        }
      });
    }

    if (Array.isArray(source.equipment?.customItems)) {
      validateObjectArray(source.equipment.customItems, 'equipment.customItems', errors);
    }
  }

  if (isPlainObject(source.customAudio)) {
    Object.keys(source.customAudio).forEach((eventName) => {
      if (!AUDIO_EVENTS.includes(eventName)) {
        errors.push(`customAudio содержит неизвестное событие: ${eventName}.`);
      } else if (!isValidImportAudioValue(source.customAudio[eventName])) {
        errors.push(`customAudio.${eventName} должен быть строкой Data URL или объектом с dataUrl.`);
      }
    });
  }

  if (errors.length > 0) {
    throwImportValidationError(errors);
  }

  return IMPORT_DATA_KEYS.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = clone(source[key]);
    }

    return result;
  }, {});
}

function createReplaceStore(payload) {
  return {
    ...DEFAULT_STORE,
    ...withoutLegacyFields(payload),
    settings: mergeImportedSettings(DEFAULT_STORE.settings, payload),
    profile: createProfile(payload.profile),
    equipment: createEquipment(payload.equipment),
  };
}

function createMergedStore(currentStore, payload) {
  const nextStore = clone(currentStore);

  if (Array.isArray(payload.customExercises)) {
    nextStore.customExercises = mergeById(nextStore.customExercises, payload.customExercises);
  }

  if (Array.isArray(payload.workouts)) {
    nextStore.workouts = mergeById(nextStore.workouts, payload.workouts);
  }

  if (Array.isArray(payload.history)) {
    nextStore.history = mergeById(nextStore.history, payload.history);
  }

  nextStore.settings = mergeImportedSettings(nextStore.settings, payload);
  nextStore.profile = mergeImportedProfile(nextStore.profile, payload);
  nextStore.equipment = mergeImportedEquipment(nextStore.equipment, payload);

  return nextStore;
}

function mergeImportedSettings(currentSettings, payload) {
  const importedSettings = isPlainObject(payload.settings) ? payload.settings : {};

  return createSettings({
    ...currentSettings,
    ...importedSettings,
    favoriteExerciseIds: uniqueStrings([
      ...uniqueStrings(currentSettings.favoriteExerciseIds),
      ...uniqueStrings(importedSettings.favoriteExerciseIds),
      ...uniqueStrings(payload.favorites),
    ]),
    customAudio: {
      ...sanitizeCustomAudio(currentSettings.customAudio),
      ...sanitizeCustomAudio(importedSettings.customAudio),
      ...sanitizeCustomAudio(payload.customAudio),
    },
  });
}

function withoutLegacyFields(payload) {
  const nextPayload = clone(payload);
  delete nextPayload.favorites;
  delete nextPayload.customAudio;
  return nextPayload;
}

function mergeImportedProfile(currentProfile, payload) {
  return createProfile({
    ...currentProfile,
    ...(isPlainObject(payload.profile) ? payload.profile : {}),
  });
}

function mergeImportedEquipment(currentEquipment, payload) {
  const importedEquipment = isPlainObject(payload.equipment) ? payload.equipment : {};

  return createEquipment({
    ...currentEquipment,
    ...importedEquipment,
    selectedIds: uniqueStrings([
      ...uniqueStrings(currentEquipment.selectedIds),
      ...uniqueStrings(importedEquipment.selectedIds),
    ]),
    customItems: mergeById(
      sanitizeEquipment(currentEquipment).customItems,
      Array.isArray(importedEquipment.customItems) ? importedEquipment.customItems : []
    ),
  });
}

function validateObjectArray(items, key, errors) {
  items.forEach((item, index) => {
    if (!isPlainObject(item)) {
      errors.push(`${key}[${index}] должен быть объектом.`);
    }
  });
}

function throwImportValidationError(details) {
  const error = new Error(`Не удалось импортировать данные: ${details.join(' ')}`);
  error.name = 'ImportValidationError';
  error.details = details;
  throw error;
}

function isValidImportAudioValue(value) {
  if (typeof value === 'string') {
    return true;
  }

  if (!isPlainObject(value)) {
    return false;
  }

  return typeof value.dataUrl === 'string';
}

function readRawStore() {
  if (!hasLocalStorage()) {
    return clone(DEFAULT_STORE);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(DEFAULT_STORE);
  } catch (error) {
    console.warn('Failed to read workout tracker storage. Defaults were used.', error);
    return clone(DEFAULT_STORE);
  }
}

function writeRawStore(store) {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('Failed to write workout tracker storage.', error);
  }
}

function hasLocalStorage() {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch (error) {
    console.warn('Local storage is unavailable.', error);
    return false;
  }
}
