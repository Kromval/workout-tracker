import {
  AUDIO_EVENTS,
  DEFAULT_STORE,
  EXPORT_DATA_KEYS,
  IMPORT_DATA_KEYS,
  IMPORT_MODES,
  STORAGE_VERSION,
} from './schema.js';
import {
  asArray,
  clone,
  findById,
  isPlainObject,
  mergeById,
  nowIso,
  sortByUpdatedAtDesc,
  uniqueStrings,
  upsertById,
} from './helpers.js';
import {
  createEquipment,
  createExercise,
  createProfile,
  createSettings,
  sanitizeCustomAudio,
  sanitizeCustomExercise,
  sanitizeEquipment,
} from './records.js';
import { generateUniqueId, loadStore, saveStore } from './store.js';

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
export {
  generateId,
  generateUniqueId,
  getDefaultStore,
  initializeStorage,
  loadStore,
  resetStore,
  saveStore,
} from './store.js';
export {
  getCustomAudio,
  getFavorites,
  getSettings,
  isFavoriteExercise,
  saveLastOpenedWorkout,
  saveSettings,
  setCustomAudio,
  setFavorites,
  setSettings,
  toggleFavoriteExercise,
} from './settingsRepository.js';
export {
  createCustomEquipmentRecord,
  deleteCustomEquipmentRecord,
  getEquipment,
  getProfile,
  saveEquipment,
  saveProfile,
} from './profileRepository.js';
export {
  createWorkoutRecord,
  deleteWorkout,
  duplicateWorkout,
  getWorkout,
  getWorkouts,
  listWorkouts,
  readAllWorkouts,
  readWorkoutById,
  saveWorkout,
  setWorkouts,
  updateWorkout,
} from './workoutRepository.js';
export {
  createHistoryRecord,
  deleteHistoryEntry,
  getHistory,
  getHistoryByDate,
  getHistoryEntry,
  listHistory,
  readAllHistory,
  readHistoryById,
  saveHistoryEntry,
  setHistory,
  updateHistoryEntry,
} from './historyRepository.js';
export {
  clearActiveSession,
  getActiveSession,
  saveActiveSession,
  setActiveSession,
} from './sessionRepository.js';

export function exportStore() {
  const store = loadStore();
  const exportData = EXPORT_DATA_KEYS.reduce((result, key) => {
    result[key] = clone(store[key]);
    return result;
  }, {});

  return JSON.stringify(
    {
      app: 'workout-tracker',
      version: STORAGE_VERSION,
      exportedAt: nowIso(),
      ...exportData,
    },
    null,
    2,
  );
}

export function importStore(json, options = {}) {
  const mode = options.mode === IMPORT_MODES.REPLACE ? IMPORT_MODES.REPLACE : IMPORT_MODES.MERGE;
  const parsed = parseImportJson(json);
  const payload = validateImportPayload(parsed);
  const nextStore =
    mode === IMPORT_MODES.REPLACE
      ? createReplaceStore(payload)
      : createMergedStore(loadStore(), payload);

  return saveStore(nextStore);
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
    id: generateUniqueId(
      'exercise',
      store.customExercises.map((item) => item.id),
    ),
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
  store.settings.favoriteExerciseIds = store.settings.favoriteExerciseIds.filter(
    (itemId) => itemId !== id,
  );
  saveStore(store);
  return store.customExercises.length !== initialLength;
}

function parseImportJson(json) {
  if (typeof json !== 'string') {
    return json;
  }

  try {
    return JSON.parse(json);
  } catch (error) {
    const importError = new Error(
      'Файл не похож на корректный JSON. Проверьте, что выбран экспорт Workout Planner.',
    );
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
  const presentKeys = IMPORT_DATA_KEYS.filter((key) =>
    Object.prototype.hasOwnProperty.call(source, key),
  );

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

  if (
    Object.prototype.hasOwnProperty.call(source, 'equipment') &&
    !isPlainObject(source.equipment)
  ) {
    errors.push('Раздел equipment должен быть объектом.');
  }

  ['customExercises', 'workouts', 'history', 'favorites'].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key) && !Array.isArray(source[key])) {
      errors.push(`Раздел ${key} должен быть массивом.`);
    }
  });

  if (
    Object.prototype.hasOwnProperty.call(source, 'customAudio') &&
    !isPlainObject(source.customAudio)
  ) {
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
    if (
      Object.prototype.hasOwnProperty.call(source.equipment, 'selectedIds') &&
      !Array.isArray(source.equipment.selectedIds)
    ) {
      errors.push('equipment.selectedIds должен быть массивом.');
    }

    if (
      Object.prototype.hasOwnProperty.call(source.equipment, 'customItems') &&
      !Array.isArray(source.equipment.customItems)
    ) {
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
        errors.push(
          `customAudio.${eventName} должен быть строкой Data URL или объектом с dataUrl.`,
        );
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
  const importedProfile = isPlainObject(payload.profile) ? payload.profile : {};

  return createProfile({
    ...currentProfile,
    ...importedProfile,
    goals: {
      ...(isPlainObject(currentProfile.goals) ? currentProfile.goals : {}),
      ...(isPlainObject(importedProfile.goals) ? importedProfile.goals : {}),
    },
    bodyFocusGoals: {
      ...(isPlainObject(currentProfile.bodyFocusGoals) ? currentProfile.bodyFocusGoals : {}),
      ...(isPlainObject(importedProfile.bodyFocusGoals) ? importedProfile.bodyFocusGoals : {}),
    },
    recoveryProfile: {
      ...(isPlainObject(currentProfile.recoveryProfile) ? currentProfile.recoveryProfile : {}),
      ...(isPlainObject(importedProfile.recoveryProfile) ? importedProfile.recoveryProfile : {}),
    },
    recentHistory: {
      ...(isPlainObject(currentProfile.recentHistory) ? currentProfile.recentHistory : {}),
      ...(isPlainObject(importedProfile.recentHistory) ? importedProfile.recentHistory : {}),
      performedExerciseIds: uniqueStrings([
        ...uniqueStrings(currentProfile.recentHistory?.performedExerciseIds),
        ...uniqueStrings(importedProfile.recentHistory?.performedExerciseIds),
      ]),
      performedMovementPatterns: {
        ...(isPlainObject(currentProfile.recentHistory?.performedMovementPatterns)
          ? currentProfile.recentHistory.performedMovementPatterns
          : {}),
        ...(isPlainObject(importedProfile.recentHistory?.performedMovementPatterns)
          ? importedProfile.recentHistory.performedMovementPatterns
          : {}),
      },
    },
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
      Array.isArray(importedEquipment.customItems) ? importedEquipment.customItems : [],
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
