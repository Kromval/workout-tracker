import { jest } from '@jest/globals';
import {
  DEFAULT_STORE,
  IMPORT_MODES,
  STORAGE_KEY,
  STORAGE_VERSION,
} from '../../js/storage/schema.js';
import {
  createWorkoutItem,
  exportStore,
  getDefaultStore,
  getFavorites,
  importStore,
  loadStore,
  resetStore,
  saveSettings,
  saveStore,
  setFavorites,
  toggleFavoriteExercise,
} from '../../js/storage/core.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

describe('storage core', () => {
  let memoryStorage;

  beforeEach(() => {
    memoryStorage = createMemoryStorage();
    globalThis.window = { localStorage: memoryStorage };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('loadStore migrates and persists current schema', () => {
    memoryStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 2,
      settings: { favoriteExerciseIds: ['a'] },
      favorites: ['b'],
      customExercises: [],
      workouts: [],
      history: [],
    }));

    const store = loadStore();
    const persisted = JSON.parse(memoryStorage.getItem(STORAGE_KEY));

    expect(store.version).toBe(STORAGE_VERSION);
    expect(store.settings.favoriteExerciseIds).toEqual(['a', 'b']);
    expect(store).not.toHaveProperty('favorites');
    expect(persisted).toEqual(store);
  });

  test('does not overwrite storage from a future schema version', () => {
    const raw = {
      version: STORAGE_VERSION + 1,
      settings: { language: 'en' },
      futureOnly: true,
    };
    memoryStorage.setItem(STORAGE_KEY, JSON.stringify(raw));

    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const store = loadStore();
    warn.mockRestore();

    expect(store.version).toBe(STORAGE_VERSION);
    expect(JSON.parse(memoryStorage.getItem(STORAGE_KEY))).toEqual(raw);
  });

  test('saveStore and resetStore write normalized data', () => {
    const saved = saveStore({
      settings: { language: 'en', favoriteExerciseIds: [' a ', 'a'] },
      customExercises: [{ name: 'Custom' }],
    });

    expect(saved.version).toBe(STORAGE_VERSION);
    expect(saved.settings.favoriteExerciseIds).toEqual(['a']);
    expect(JSON.parse(memoryStorage.getItem(STORAGE_KEY))).toEqual(saved);

    expect(resetStore()).toEqual(DEFAULT_STORE);
    expect(JSON.parse(memoryStorage.getItem(STORAGE_KEY))).toEqual(DEFAULT_STORE);
    expect(getDefaultStore()).not.toBe(DEFAULT_STORE);
  });

  test('favorites API uses settings as the single source of truth', () => {
    setFavorites(['exercise-a', 'exercise-a', 'exercise-b']);
    expect(getFavorites()).toEqual(['exercise-a', 'exercise-b']);

    toggleFavoriteExercise('exercise-b');
    expect(loadStore().settings.favoriteExerciseIds).toEqual(['exercise-a']);
    expect(loadStore()).not.toHaveProperty('favorites');
  });

  test('importStore merges legacy fields and exportStore excludes duplicate fields', () => {
    saveSettings({ language: 'en', favoriteExerciseIds: ['current'] });

    const imported = importStore(JSON.stringify({
      app: 'workout-tracker',
      version: 2,
      settings: {
        favoriteExerciseIds: ['settings-favorite'],
        customAudio: { restStart: 'data:audio/wav;base64,AAAA' },
      },
      favorites: ['legacy-favorite'],
      customAudio: { restEnd: 'data:audio/wav;base64,BBBB' },
      workouts: [{
        id: 'workout-a',
        title: 'Workout A',
        items: [createWorkoutItem({ exerciseId: 'exercise-a', reps: 10 })],
      }],
    }), { mode: IMPORT_MODES.MERGE });

    expect(imported.settings.favoriteExerciseIds).toEqual([
      'current',
      'settings-favorite',
      'legacy-favorite',
    ]);
    expect(imported.settings.customAudio).toEqual({
      restStart: 'data:audio/wav;base64,AAAA',
      restEnd: 'data:audio/wav;base64,BBBB',
    });
    expect(imported.workouts).toHaveLength(1);
    expect(imported).not.toHaveProperty('favorites');
    expect(imported).not.toHaveProperty('customAudio');

    const exported = JSON.parse(exportStore());
    expect(exported.version).toBe(STORAGE_VERSION);
    expect(exported).not.toHaveProperty('favorites');
    expect(exported).not.toHaveProperty('customAudio');
    expect(exported).toHaveProperty('settings');
    expect(exported).toHaveProperty('customExercises');
    expect(exported).toHaveProperty('workouts');
    expect(exported).toHaveProperty('history');
  });

  test('importStore validates malformed payloads', () => {
    expect(() => importStore('not-json')).toThrow(/корректный JSON/);
    expect(() => importStore(JSON.stringify({ unknown: [] }))).toThrow(/Неизвестный раздел/);
    expect(() => importStore(JSON.stringify({ favorites: [123] }))).toThrow(/favorites\[0\]/);
    expect(() => importStore(JSON.stringify({ customAudio: { bad: 'data:audio/wav;base64,AAAA' } })))
      .toThrow(/неизвестное событие/);
  });
});
