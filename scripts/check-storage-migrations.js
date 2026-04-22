import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function main() {
  const memoryStorage = createMemoryStorage();
  globalThis.window = { localStorage: memoryStorage };

  const migrations = await import(pathToFileURL(path.resolve('js/storage/migrations.js')));
  const schema = await import(pathToFileURL(path.resolve('js/storage/schema.js')));
  const storage = await import(pathToFileURL(path.resolve('js/storage/core.js')));

  const migrated = migrations.migrateStore({
    version: 1,
    settings: {
      language: 'en',
      favoriteExerciseIds: ['exercise-a'],
      customAudio: {},
    },
    favorites: ['exercise-a', 'exercise-b'],
    customAudio: {},
    activeSession: {
      version: 1,
      status: 'paused',
      workout: {
        id: 'workout-a',
        title: 'Workout A',
        items: [{
          id: 'item-a',
          exerciseId: 'exercise-a',
          sets: 1,
          reps: 10,
          order: 0,
        }],
      },
      steps: [{ id: 'step-a', durationSec: 30 }],
      currentStepIndex: 0,
      currentStep: { remainingSec: 12 },
      elapsedSec: 18,
      startedAt: '2026-01-01T00:00:00.000Z',
      savedAt: '2026-01-01T00:00:18.000Z',
    },
  });

  assert.equal(migrated.version, schema.STORAGE_VERSION);
  assert.deepEqual(migrated.settings.favoriteExerciseIds, ['exercise-a', 'exercise-b']);
  assert.equal(Object.prototype.hasOwnProperty.call(migrated, 'favorites'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(migrated, 'customAudio'), false);
  assert.equal(migrated.activeSession.remainingSec, 12);
  assert.equal(migrated.activeSession.currentStepIndex, 0);

  assert.equal(migrations.getStorageVersion(undefined), schema.MIN_SUPPORTED_STORAGE_VERSION);
  assert.equal(migrations.isFutureStorageVersion({ version: schema.STORAGE_VERSION + 1 }), true);
  assert.equal(migrations.isFutureStorageVersion({ version: schema.STORAGE_VERSION }), false);

  storage.resetStore();
  storage.importStore(JSON.stringify({
    app: 'workout-tracker',
    version: 2,
    settings: {
      favoriteExerciseIds: ['exercise-a'],
    },
    favorites: ['exercise-b'],
    customAudio: {
      tick: 'data:audio/wav;base64,AAAA',
    },
  }));

  const store = storage.loadStore();
  assert.equal(store.version, schema.STORAGE_VERSION);
  assert.deepEqual(store.settings.favoriteExerciseIds, ['exercise-a', 'exercise-b']);
  assert.equal(store.settings.customAudio.tick, 'data:audio/wav;base64,AAAA');
  assert.equal(Object.prototype.hasOwnProperty.call(store, 'favorites'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(store, 'customAudio'), false);

  const exported = JSON.parse(storage.exportStore());
  assert.equal(Object.prototype.hasOwnProperty.call(exported, 'favorites'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(exported, 'customAudio'), false);
  assert.deepEqual(Object.keys(exported).filter((key) => schema.EXPORT_DATA_KEYS.includes(key)), schema.EXPORT_DATA_KEYS);

  console.log('storage migrations ok');
}

function createMemoryStorage() {
  const values = new Map();

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
    clear() {
      values.clear();
    },
  };
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
