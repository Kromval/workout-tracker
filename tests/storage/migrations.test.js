import { jest } from '@jest/globals';
import {
  getStorageVersion,
  isFutureStorageVersion,
  migrateStore,
} from '../../js/storage/migrations.js';
import { MIN_SUPPORTED_STORAGE_VERSION, STORAGE_VERSION } from '../../js/storage/schema.js';

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
          items: [
            {
              id: 'item-a',
              exerciseId: 'exercise-a',
              sets: 1,
              reps: 10,
              order: 0,
            },
          ],
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
      goals: {
        strength: 0,
        hypertrophy: 0,
        endurance: 0,
        fatLoss: 0,
        mobility: 0,
      },
      bodyFocusGoals: {
        upperBody: 0,
        lowerBody: 0,
        vTaper: 0,
        core: 0,
        arms: 0,
        glutes: 0,
      },
      limitations: [],
      dislikedExercises: [],
      likedTags: [],
      sessionDurationMin: null,
      frequencyPerWeek: null,
      recoveryProfile: {
        chest: 0,
        back: 0,
        legs: 0,
        shoulders: 0,
        arms: 0,
        core: 0,
      },
      recentHistory: {
        performedExerciseIds: [],
        performedMovementPatterns: {},
      },
    });
    expect(migrated.equipment).toEqual({
      selectedIds: [],
      customItems: [],
    });
  });

  test('migrates v4 profile into scoring-ready shape', () => {
    const migrated = migrateStore({
      version: 4,
      profile: {
        trainingLevel: 'beginner',
        goal: 'fat-loss',
        limitations: 'no jumping, protect shoulder',
      },
    });

    expect(migrated.version).toBe(STORAGE_VERSION);
    expect(migrated.profile.trainingLevel).toBe('beginner');
    expect(migrated.profile.goal).toBe('fat-loss');
    expect(migrated.profile.goals).toMatchObject({
      fatLoss: 1,
    });
    expect(migrated.profile.limitations).toEqual(['no-jumping', 'protect-shoulder']);
  });

  test('migrates v5 profile by adding body focus defaults', () => {
    const migrated = migrateStore({
      version: 5,
      profile: {
        trainingLevel: 'beginner',
        goals: {
          strength: 0.7,
        },
      },
    });

    expect(migrated.version).toBe(STORAGE_VERSION);
    expect(migrated.profile.goals).toMatchObject({
      strength: 0.7,
    });
    expect(migrated.profile.bodyFocusGoals).toEqual({
      upperBody: 0,
      lowerBody: 0,
      vTaper: 0,
      core: 0,
      arms: 0,
      glutes: 0,
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
