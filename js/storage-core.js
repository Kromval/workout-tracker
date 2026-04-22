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
 *   version: number,
 *   settings: Settings,
 *   customExercises: Exercise[],
 *   workouts: Workout[],
 *   history: HistoryEntry[],
 *   favorites: string[],
 *   customAudio: Record<string, string | CustomAudioEntry>,
 *   activeSession: object | null
 * }} WorkoutTrackerStore
 */

import {
  AUDIO_EVENTS,
  CALENDAR_VIEW_MODES,
  DEFAULT_SETTINGS,
  DEFAULT_STORE,
  EXECUTION_MODES,
  EXPORT_DATA_KEYS,
  HISTORY_STATUSES,
  IMPORT_MODES,
  LANGUAGES,
  STORAGE_KEY,
  STORAGE_VERSION,
  THEMES,
} from './storage-schema.js';

export { DEFAULT_SETTINGS, DEFAULT_STORE, IMPORT_MODES, STORAGE_META } from './storage-schema.js';

export function createLocalizedText(value = '') {
  if (isPlainObject(value)) {
    return {
      ru: normalizeString(value.ru),
      en: normalizeString(value.en),
    };
  }

  return {
    ru: normalizeString(value),
    en: '',
  };
}

export function createExercise(overrides = {}) {
  const now = nowIso();

  return sanitizeExercise({
    id: createId('exercise'),
    createdAt: now,
    updatedAt: now,
    name: createLocalizedText(),
    shortDescription: createLocalizedText(),
    instruction: createLocalizedText(),
    effect: createLocalizedText(),
    type: createLocalizedText(),
    muscles: [],
    tags: [],
    executionMode: 'reps',
    tempo: null,
    estimatedCalories: 0,
    image: '',
    isCustom: true,
    ...overrides,
  });
}

export function createWorkoutItem(overrides = {}) {
  return sanitizeWorkoutItem({
    id: createId('workout-item'),
    exerciseId: '',
    sets: 1,
    reps: null,
    durationSec: null,
    distance: null,
    restBetweenSetsSec: 60,
    restAfterExerciseSec: null,
    tempoOverride: null,
    notes: '',
    order: 0,
    ...overrides,
  });
}

export function createWorkout(overrides = {}) {
  const now = nowIso();

  return sanitizeWorkout({
    id: createId('workout'),
    title: '',
    description: '',
    createdAt: now,
    updatedAt: now,
    isPreset: false,
    items: [],
    defaultRestBetweenExercises: 90,
    themeColor: '',
    tags: [],
    ...overrides,
  });
}

export function createHistoryEntry(overrides = {}) {
  const now = nowIso();
  const startedAt = normalizeString(overrides.startedAt) || nowIso();
  const endedAt = normalizeString(overrides.endedAt) || startedAt;

  return sanitizeHistoryEntry({
    id: createId('history'),
    createdAt: now,
    updatedAt: now,
    workoutId: '',
    workoutTitleSnapshot: '',
    startedAt,
    endedAt,
    durationSec: 0,
    status: 'completed',
    completedItems: [],
    note: '',
    ratingEmoji: '',
    estimatedCaloriesBurned: 0,
    totalExercisesCompleted: 0,
    totalSetsCompleted: 0,
    ...overrides,
  });
}

export function createSettings(overrides = {}) {
  return sanitizeSettings({
    ...DEFAULT_SETTINGS,
    ...overrides,
  });
}

export function loadStore() {
  const store = migrateStore(readRawStore());
  initializeStorage(store);
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

export function setSettings(settings) {
  const store = loadStore();
  store.settings = createSettings(settings);
  store.favorites = store.settings.favoriteExerciseIds;
  store.customAudio = store.settings.customAudio;
  return saveStore(store).settings;
}

export function saveSettings(settingsPatch) {
  const store = loadStore();
  store.settings = createSettings({
    ...store.settings,
    ...settingsPatch,
  });
  store.favorites = store.settings.favoriteExerciseIds;
  store.customAudio = store.settings.customAudio;
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
  store.favorites = store.settings.favoriteExerciseIds;
  store.customAudio = store.settings.customAudio;

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
  store.favorites = store.favorites.filter((itemId) => itemId !== id);
  store.settings.favoriteExerciseIds = store.favorites;
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
export function validateWorkoutForSave(workout) {
  const errors = [];
  const source = isPlainObject(workout) ? workout : {};
  const items = asArray(source.items);

  if (normalizeString(source.title).length === 0) {
    errors.push('Workout title is required.');
  }

  if (items.length === 0) {
    errors.push('Workout must contain at least one exercise.');
  }

  items.forEach((item, index) => {
    const label = `Workout item #${index + 1}`;
    const hasReps = Number.isInteger(item.reps) && item.reps > 0;
    const hasDuration = Number.isInteger(item.durationSec) && item.durationSec > 0;

    if (normalizeString(item.exerciseId).length === 0) {
      errors.push(`${label}: exerciseId is required.`);
    }

    if (hasReps === hasDuration) {
      errors.push(`${label}: set either positive reps or positive durationSec.`);
    }
  });

  if (errors.length > 0) {
    const error = new Error(errors.join(' '));
    error.name = 'WorkoutValidationError';
    error.details = errors;
    throw error;
  }
}

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
  return loadStore().favorites;
}

export function setFavorites(favorites) {
  const store = loadStore();
  store.favorites = uniqueStrings(favorites);
  store.settings.favoriteExerciseIds = store.favorites;
  return saveStore(store).favorites;
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

  store.favorites = Array.from(favorites);
  store.settings.favoriteExerciseIds = store.favorites;
  return saveStore(store).favorites;
}

export function getCustomAudio() {
  return loadStore().customAudio;
}

export function setCustomAudio(customAudio) {
  const store = loadStore();
  store.customAudio = sanitizeCustomAudio(customAudio);
  store.settings.customAudio = store.customAudio;
  return saveStore(store).customAudio;
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

function sanitizeStore(store) {
  const source = isPlainObject(store) ? store : {};
  const settings = createSettings(source.settings);
  const favorites = Array.isArray(source.favorites)
    ? uniqueStrings(source.favorites)
    : uniqueStrings(settings.favoriteExerciseIds);
  const customAudio = isPlainObject(source.customAudio)
    ? sanitizeCustomAudio(source.customAudio)
    : sanitizeCustomAudio(settings.customAudio);

  if (Array.isArray(source.favorites) && source.favorites.length > 0) {
    settings.favoriteExerciseIds = favorites;
  }

  if (isPlainObject(source.customAudio) && Object.keys(source.customAudio).length > 0) {
    settings.customAudio = customAudio;
  }

  return {
    version: STORAGE_VERSION,
    settings: {
      ...settings,
      favoriteExerciseIds: favorites,
      customAudio,
    },
    customExercises: sortByUpdatedAtDesc(asArray(source.customExercises).map(sanitizeCustomExercise)),
    workouts: sortByUpdatedAtDesc(asArray(source.workouts).map(sanitizeWorkout)),
    history: sortHistoryEntries(asArray(source.history).map(sanitizeHistoryEntry)),
    favorites,
    customAudio,
    activeSession: sanitizeActiveSession(source.activeSession),
  };
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
  const allowedKeys = new Set(EXPORT_DATA_KEYS);
  const presentKeys = EXPORT_DATA_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(source, key));

  if (presentKeys.length === 0) {
    errors.push(`JSON должен содержать хотя бы один раздел: ${EXPORT_DATA_KEYS.join(', ')}.`);
  }

  Object.keys(source).forEach((key) => {
    if (!allowedKeys.has(key) && !['app', 'version', 'exportedAt'].includes(key)) {
      errors.push(`Неизвестный раздел данных: ${key}.`);
    }
  });

  if (Object.prototype.hasOwnProperty.call(source, 'settings') && !isPlainObject(source.settings)) {
    errors.push('Раздел settings должен быть объектом.');
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

  return EXPORT_DATA_KEYS.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = clone(source[key]);
    }

    return result;
  }, {});
}

function createReplaceStore(payload) {
  return syncDuplicatedSettingsFields({
    ...DEFAULT_STORE,
    ...payload,
  });
}

function createMergedStore(currentStore, payload) {
  const nextStore = clone(currentStore);

  if (isPlainObject(payload.settings)) {
    nextStore.settings = {
      ...nextStore.settings,
      ...payload.settings,
    };

    if (Array.isArray(payload.settings.favoriteExerciseIds)) {
      nextStore.favorites = uniqueStrings([
        ...nextStore.favorites,
        ...payload.settings.favoriteExerciseIds,
      ]);
    }

    if (isPlainObject(payload.settings.customAudio)) {
      nextStore.customAudio = {
        ...nextStore.customAudio,
        ...payload.settings.customAudio,
      };
    }
  }

  if (Array.isArray(payload.customExercises)) {
    nextStore.customExercises = mergeById(nextStore.customExercises, payload.customExercises);
  }

  if (Array.isArray(payload.workouts)) {
    nextStore.workouts = mergeById(nextStore.workouts, payload.workouts);
  }

  if (Array.isArray(payload.history)) {
    nextStore.history = mergeById(nextStore.history, payload.history);
  }

  if (Array.isArray(payload.favorites)) {
    nextStore.favorites = uniqueStrings([...nextStore.favorites, ...payload.favorites]);
  }

  if (isPlainObject(payload.customAudio)) {
    nextStore.customAudio = {
      ...nextStore.customAudio,
      ...payload.customAudio,
    };
  }

  nextStore.settings.favoriteExerciseIds = uniqueStrings([
    ...nextStore.settings.favoriteExerciseIds,
    ...nextStore.favorites,
  ]);
  nextStore.settings.customAudio = {
    ...nextStore.settings.customAudio,
    ...nextStore.customAudio,
  };

  return nextStore;
}

function syncDuplicatedSettingsFields(store) {
  const nextStore = clone(store);

  if (isPlainObject(nextStore.settings)) {
    if (!Array.isArray(nextStore.favorites) || nextStore.favorites.length === 0) {
      nextStore.favorites = uniqueStrings(nextStore.settings.favoriteExerciseIds);
    }

    if (!isPlainObject(nextStore.customAudio) || Object.keys(nextStore.customAudio).length === 0) {
      nextStore.customAudio = sanitizeCustomAudio(nextStore.settings.customAudio);
    }
  }

  return nextStore;
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

function sanitizeSettings(settings) {
  const source = isPlainObject(settings) ? settings : {};
  const language = LANGUAGES.includes(source.language) ? source.language : DEFAULT_SETTINGS.language;
  const theme = THEMES.includes(source.theme) ? source.theme : DEFAULT_SETTINGS.theme;
  const calendarViewMode = CALENDAR_VIEW_MODES.includes(source.calendarViewMode)
    ? source.calendarViewMode
    : DEFAULT_SETTINGS.calendarViewMode;

  return {
    language,
    theme,
    soundEnabled: typeof source.soundEnabled === 'boolean'
      ? source.soundEnabled
      : DEFAULT_SETTINGS.soundEnabled,
    volume: clampNumber(source.volume, 0, 1, DEFAULT_SETTINGS.volume),
    customAudio: sanitizeCustomAudio(source.customAudio),
    favoriteExerciseIds: uniqueStrings(source.favoriteExerciseIds),
    calendarViewMode,
    lastOpenedWorkoutId: source.lastOpenedWorkoutId ? normalizeString(source.lastOpenedWorkoutId) : null,
  };
}

function sanitizeExercise(exercise) {
  const source = isPlainObject(exercise) ? exercise : {};
  const createdAt = normalizeIsoDate(source.createdAt, nowIso());

  return {
    id: normalizeString(source.id) || createId('exercise'),
    createdAt,
    updatedAt: normalizeIsoDate(source.updatedAt, createdAt),
    name: createLocalizedText(source.name),
    shortDescription: createLocalizedText(source.shortDescription),
    instruction: createLocalizedText(source.instruction),
    effect: createLocalizedText(source.effect),
    type: createLocalizedText(source.type),
    muscles: uniqueStrings(source.muscles),
    tags: uniqueStrings(source.tags),
    executionMode: EXECUTION_MODES.includes(source.executionMode) ? source.executionMode : 'reps',
    tempo: sanitizeTempo(source.tempo),
    estimatedCalories: nonNegativeNumber(source.estimatedCalories, 0),
    image: normalizeString(source.image),
    isCustom: source.isCustom !== false,
  };
}

function sanitizeCustomExercise(exercise) {
  return {
    ...sanitizeExercise(exercise),
    isCustom: true,
  };
}

function sanitizeWorkout(workout) {
  const source = isPlainObject(workout) ? workout : {};

  return {
    id: normalizeString(source.id) || createId('workout'),
    title: normalizeString(source.title),
    description: normalizeString(source.description),
    createdAt: normalizeIsoDate(source.createdAt, nowIso()),
    updatedAt: normalizeIsoDate(source.updatedAt, nowIso()),
    isPreset: Boolean(source.isPreset),
    items: asArray(source.items)
      .map(sanitizeWorkoutItem)
      .sort((left, right) => left.order - right.order)
      .map((item, order) => ({ ...item, order })),
    defaultRestBetweenExercises: nonNegativeInteger(source.defaultRestBetweenExercises, 90),
    themeColor: normalizeString(source.themeColor),
    tags: uniqueStrings(source.tags),
  };
}

function sanitizeWorkoutItem(item) {
  const source = isPlainObject(item) ? item : {};

  return {
    id: normalizeString(source.id) || createId('workout-item'),
    exerciseId: normalizeString(source.exerciseId),
    sets: Math.max(1, nonNegativeInteger(source.sets, 1)),
    reps: optionalNonNegativeInteger(source.reps),
    durationSec: optionalNonNegativeInteger(source.durationSec),
    distance: optionalNonNegativeNumber(source.distance),
    restBetweenSetsSec: nonNegativeInteger(source.restBetweenSetsSec, 60),
    restAfterExerciseSec: optionalNonNegativeInteger(source.restAfterExerciseSec),
    tempoOverride: sanitizeTempo(source.tempoOverride),
    notes: normalizeString(source.notes),
    order: nonNegativeInteger(source.order, 0),
  };
}

function sanitizeHistoryEntry(entry) {
  const source = isPlainObject(entry) ? entry : {};
  const startedAt = normalizeIsoDate(source.startedAt, nowIso());
  const endedAt = normalizeIsoDate(source.endedAt, startedAt);
  const createdAt = normalizeIsoDate(source.createdAt, startedAt);

  return {
    id: normalizeString(source.id) || createId('history'),
    createdAt,
    updatedAt: normalizeIsoDate(source.updatedAt, endedAt),
    workoutId: normalizeString(source.workoutId),
    workoutTitleSnapshot: normalizeString(source.workoutTitleSnapshot),
    startedAt,
    endedAt,
    durationSec: nonNegativeInteger(source.durationSec, 0),
    status: HISTORY_STATUSES.includes(source.status) ? source.status : 'completed',
    completedItems: asArray(source.completedItems).map(sanitizeCompletedItem),
    note: normalizeString(source.note),
    ratingEmoji: normalizeString(source.ratingEmoji),
    estimatedCaloriesBurned: nonNegativeNumber(source.estimatedCaloriesBurned, 0),
    totalExercisesCompleted: nonNegativeInteger(source.totalExercisesCompleted, 0),
    totalSetsCompleted: nonNegativeInteger(source.totalSetsCompleted, 0),
  };
}

function sanitizeCompletedItem(item) {
  const source = isPlainObject(item) ? item : {};

  return {
    workoutItemId: normalizeString(source.workoutItemId),
    exerciseId: normalizeString(source.exerciseId),
    exerciseNameSnapshot: createLocalizedText(source.exerciseNameSnapshot),
    setsCompleted: nonNegativeInteger(source.setsCompleted, 0),
    repsCompleted: optionalNonNegativeInteger(source.repsCompleted),
    durationSec: optionalNonNegativeInteger(source.durationSec),
    skipped: Boolean(source.skipped),
    note: normalizeString(source.note),
  };
}

function sanitizeTempo(tempo) {
  if (!isPlainObject(tempo)) {
    return null;
  }

  return {
    eccentric: nonNegativeNumber(tempo.eccentric, 0),
    concentric: nonNegativeNumber(tempo.concentric, 0),
    pauseTop: nonNegativeNumber(tempo.pauseTop, 0),
    pauseBottom: nonNegativeNumber(tempo.pauseBottom, 0),
  };
}

function sanitizeCustomAudio(customAudio) {
  if (!isPlainObject(customAudio)) {
    return {};
  }

  return AUDIO_EVENTS.reduce((result, eventName) => {
    const audioEntry = sanitizeCustomAudioEntry(customAudio[eventName]);

    if (audioEntry) {
      result[eventName] = audioEntry;
    }

    return result;
  }, {});
}

function sanitizeCustomAudioEntry(value) {
  if (typeof value === 'string') {
    return normalizeAudioDataUrl(value);
  }

  if (!isPlainObject(value)) {
    return null;
  }

  const dataUrl = normalizeAudioDataUrl(value.dataUrl);

  if (!dataUrl) {
    return null;
  }

  return {
    name: normalizeString(value.name) || 'Custom audio',
    type: normalizeAudioMime(value.type) || getDataUrlMime(dataUrl),
    size: nonNegativeInteger(value.size, 0),
    dataUrl,
    updatedAt: normalizeIsoDate(value.updatedAt, nowIso()),
  };
}

function normalizeAudioDataUrl(value) {
  const dataUrl = normalizeString(value);

  if (!dataUrl.startsWith('data:audio/') || !dataUrl.includes(';base64,')) {
    return '';
  }

  return dataUrl;
}

function normalizeAudioMime(value) {
  const mime = normalizeString(value).toLowerCase();
  return ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/ogg'].includes(mime) ? mime : '';
}

function getDataUrlMime(dataUrl) {
  const match = dataUrl.match(/^data:([^;,]+)[;,]/);
  return match ? normalizeAudioMime(match[1]) : '';
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

function sanitizeActiveSession(session) {
  if (!isPlainObject(session)) {
    return null;
  }

  const status = normalizeString(session.status);
  const steps = asArray(session.steps).map((step) => ({
    id: normalizeString(step?.id),
    durationSec: nonNegativeInteger(step?.durationSec, 0),
  }));
  const currentStepIndex = nonNegativeInteger(session.currentStepIndex, -1);
  const currentStep = steps[currentStepIndex];
  const remainingSec = nonNegativeInteger(session.currentStep?.remainingSec ?? session.remainingSec, -1);

  if (
    !['running', 'paused'].includes(status)
    || !isPlainObject(session.workout)
    || steps.length === 0
    || currentStepIndex < 0
    || currentStepIndex >= steps.length
    || !currentStep?.id
    || remainingSec < 0
    || remainingSec > currentStep.durationSec
  ) {
    return null;
  }

  return {
    version: nonNegativeInteger(session.version, 1) || 1,
    savedAt: normalizeIsoDate(session.savedAt, nowIso()),
    status,
    workout: sanitizeWorkout(session.workout),
    steps,
    currentStepIndex,
    remainingSec,
    elapsedSec: nonNegativeInteger(session.elapsedSec, 0),
    startedAt: normalizeIsoDate(session.startedAt, nowIso()),
  };
}

function migrateStore(store) {
  return sanitizeStore(store);
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

function upsertById(items, nextItem) {
  const index = items.findIndex((item) => item.id === nextItem.id);

  if (index === -1) {
    return [...items, nextItem];
  }

  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function mergeById(currentItems, importedItems) {
  return importedItems.reduce((result, item) => upsertById(result, item), [...currentItems]);
}

function findById(items, id) {
  return clone(items.find((item) => item.id === id) || null);
}

function sortByUpdatedAtDesc(items) {
  return sortByDateDesc(items, (item) => item.updatedAt || item.createdAt);
}

function sortHistoryEntries(items) {
  return sortByDateDesc(items, (item) => item.updatedAt || item.endedAt || item.startedAt || item.createdAt);
}

function sortByDateDesc(items, getDateValue) {
  return [...items].sort((left, right) => getTime(getDateValue(right)) - getTime(getDateValue(left)));
}

function getTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function normalizeDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function nowIso() {
  return new Date().toISOString();
}

function createId(prefix) {
  const cryptoApi = typeof globalThis !== 'undefined' ? globalThis.crypto : null;

  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return `${prefix}-${cryptoApi.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function uniqueStrings(values) {
  return Array.from(new Set(asArray(values).map(normalizeString).filter(Boolean)));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function optionalNonNegativeInteger(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeInteger(value, 0);
}

function optionalNonNegativeNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeNumber(value, 0);
}

function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, number));
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
