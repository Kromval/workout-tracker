import { jest } from '@jest/globals';
import {
  getStorageVersion,
  isFutureStorageVersion,
  migrateStore,
} from '../../js/storage/migrations.js';
import {
  MIN_SUPPORTED_STORAGE_VERSION,
  STORAGE_VERSION,
} from '../../js/storage/schema.js';

describe('storage migrations', () => {
  test('migrates legacy v1 store to current normalized schema', () => {
    const migrated = migrateStore({
      version: 1,
      settings: {
        language: 'en',
        favoriteExerciseIds: ['exercise-a'],
        customAudio: {
          exerciseStart: 'data:audio/wav;base64,AAAA',
        },
      },
      favorites: ['exercise-b'],
      customAudio: {
        restStart: 'data:audio/wav;base64,BBBB',
      },
      activeSession: {
        version: 1,
        savedAt: '2026-01-01T00:00:01.000Z',
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
        steps: [{ id: 'item-a:set-1:exercise', durationSec: 30 }],
        currentStepIndex: 0,
        currentStep: { remainingSec: 11 },
        elapsedSec: 19,
        startedAt: '2026-01-01T00:00:00.000Z',
      },
    });

    expect(migrated.version).toBe(STORAGE_VERSION);
    expect(migrated).not.toHaveProperty('favorites');
    expect(migrated).not.toHaveProperty('customAudio');
    expect(migrated.settings.favoriteExerciseIds).toEqual(['exercise-a', 'exercise-b']);
    expect(migrated.settings.customAudio).toEqual({
      exerciseStart: 'data:audio/wav;base64,AAAA',
      restStart: 'data:audio/wav;base64,BBBB',
    });
    expect(migrated.activeSession.remainingSec).toBe(11);
  });

  test('migrates v2 store by moving legacy duplicates into settings', () => {
    const migrated = migrateStore({
      version: 2,
      settings: {
        favoriteExerciseIds: ['a'],
        customAudio: { restEnd: 'data:audio/wav;base64,AAAA' },
      },
      favorites: ['b'],
      customAudio: { workoutComplete: 'data:audio/wav;base64,BBBB' },
    });

    expect(migrated.version).toBe(STORAGE_VERSION);
    expect(migrated.settings.favoriteExerciseIds).toEqual(['a', 'b']);
    expect(migrated.settings.customAudio).toEqual({
      restEnd: 'data:audio/wav;base64,AAAA',
      workoutComplete: 'data:audio/wav;base64,BBBB',
    });
    expect(migrated).not.toHaveProperty('favorites');
    expect(migrated).not.toHaveProperty('customAudio');
  });

  test('migrates v3 store by adding profile and equipment defaults', () => {
    const migrated = migrateStore({
      version: 3,
      settings: { language: 'en' },
      workouts: [],
      history: [],
      customExercises: [],
    });

    expect(migrated.version).toBe(STORAGE_VERSION);
    expect(migrated.profile).toEqual({
      age: null,
      sex: '',
      weightKg: null,
      heightCm: null,
      bodyFatPercent: null,
      wristCm: null,
      waistCm: null,
      neckCm: null,
      chestCm: null,
      hipsCm: null,
      forearmCm: null,
      calfCm: null,
      trainingLevel: '',
      goal: '',
      limitations: '',
    });
    expect(migrated.equipment).toEqual({
      selectedIds: [],
      customItems: [],
    });
  });

  test('normalizes missing and future versions predictably', () => {
    expect(getStorageVersion(undefined)).toBe(MIN_SUPPORTED_STORAGE_VERSION);
    expect(isFutureStorageVersion({ version: STORAGE_VERSION + 1 })).toBe(true);
    expect(isFutureStorageVersion({ version: STORAGE_VERSION })).toBe(false);

    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const migrated = migrateStore({ version: STORAGE_VERSION + 1, settings: { language: 'en' } });
    warn.mockRestore();

    expect(migrated.version).toBe(STORAGE_VERSION);
    expect(migrated.settings.language).toBe('en');
  });
});
