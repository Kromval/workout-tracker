import {
  createEquipment,
  createProfile,
  createSettings,
  createWorkout,
  createWorkoutItem,
  sanitizeCustomAudio,
  sanitizeHistoryEntry,
  sanitizeStore,
  validateWorkoutForSave,
} from '../../js/storage/records.js';
import { STORAGE_VERSION } from '../../js/storage/schema.js';

describe('storage normalizers', () => {
  test('sanitizeStore keeps v3 store normalized and removes legacy duplicates', () => {
    const store = sanitizeStore({
      version: 1,
      settings: {
        language: 'de',
        theme: 'dark',
        volume: 3,
        favoriteExerciseIds: [' exercise-a ', '', 'exercise-a'],
        customAudio: {
          tick: 'data:audio/wav;base64,AAAA',
          unknown: 'data:audio/wav;base64,BBBB',
        },
      },
      favorites: ['legacy-favorite'],
      customAudio: {
        phaseChange: 'data:audio/wav;base64,CCCC',
      },
      customExercises: [{ id: 'custom-a', name: 'Custom A', muscles: ['chest', 'chest'] }],
      workouts: [{ id: 'workout-a', title: 'Workout A', items: [] }],
      history: [{ id: 'history-a', startedAt: 'bad-date', status: 'bad-status' }],
    });

    expect(store.version).toBe(STORAGE_VERSION);
    expect(store).not.toHaveProperty('favorites');
    expect(store).not.toHaveProperty('customAudio');
    expect(store.settings.language).toBe('ru');
    expect(store.settings.theme).toBe('dark');
    expect(store.settings.volume).toBe(1);
    expect(store.settings.favoriteExerciseIds).toEqual(['exercise-a']);
    expect(store.settings.customAudio).toEqual({ tick: 'data:audio/wav;base64,AAAA' });
    expect(store.customExercises[0].muscles).toEqual(['chest']);
    expect(store.history[0].status).toBe('completed');
  });

  test('createSettings clamps options and filters invalid custom audio', () => {
    const settings = createSettings({
      language: 'en',
      theme: 'neon',
      soundEnabled: 'yes',
      volume: -1,
      calendarViewMode: 'year',
      favoriteExerciseIds: [' a ', 'a', null, 'b'],
      customAudio: {
        restStart: {
          name: ' Rest ',
          type: 'audio/wav',
          size: 12,
          dataUrl: 'data:audio/wav;base64,AAAA',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
        restEnd: 'not-a-data-url',
      },
    });

    expect(settings.language).toBe('en');
    expect(settings.theme).toBe('system');
    expect(settings.soundEnabled).toBe(true);
    expect(settings.volume).toBe(0);
    expect(settings.calendarViewMode).toBe('month');
    expect(settings.favoriteExerciseIds).toEqual(['a', 'b']);
    expect(settings.customAudio.restStart).toMatchObject({
      name: 'Rest',
      type: 'audio/wav',
      size: 12,
      dataUrl: 'data:audio/wav;base64,AAAA',
    });
    expect(settings.customAudio).not.toHaveProperty('restEnd');
  });

  test('profile and equipment sanitizers normalize user metadata', () => {
    const profile = createProfile({
      age: '31',
      sex: 'other',
      weightKg: '82.4',
      heightCm: '180',
      bodyFatPercent: 140,
      trainingLevel: 'advanced',
      goal: 'fat-loss',
      limitations: ' no jumping ',
    });
    const equipment = createEquipment({
      selectedIds: ['bodyweight', ' custom-bench ', 'bodyweight'],
      customItems: [
        { id: 'custom-bench', name: ' Adjustable bench ', updatedAt: '2026-01-03T00:00:00.000Z' },
        { id: '', name: ' ' },
      ],
    });

    expect(profile).toMatchObject({
      age: 31,
      sex: '',
      weightKg: 82.4,
      heightCm: 180,
      bodyFatPercent: 100,
      trainingLevel: 'advanced',
      goal: 'fat-loss',
      limitations: 'no jumping',
    });
    expect(equipment.selectedIds).toEqual(['bodyweight', 'custom-bench']);
    expect(equipment.customItems).toHaveLength(1);
    expect(equipment.customItems[0]).toMatchObject({
      id: 'custom-bench',
      name: 'Adjustable bench',
      isCustom: true,
    });
  });

  test('workout normalizer orders items and validates executable workout contract', () => {
    const workout = createWorkout({
      title: '  Test workout  ',
      items: [
        createWorkoutItem({ id: 'late', exerciseId: 'exercise-b', reps: 8, order: 2 }),
        createWorkoutItem({ id: 'early', exerciseId: 'exercise-a', durationSec: 30, reps: null, order: 0 }),
      ],
      tags: [' strength ', 'strength'],
    });

    expect(workout.title).toBe('Test workout');
    expect(workout.items.map((item) => item.id)).toEqual(['early', 'late']);
    expect(workout.items.map((item) => item.order)).toEqual([0, 1]);
    expect(workout.tags).toEqual(['strength']);
    expect(() => validateWorkoutForSave(workout)).not.toThrow();
    expect(() => validateWorkoutForSave({ title: '', items: [] })).toThrow(/Workout title is required/);
    expect(() => validateWorkoutForSave({
      title: 'Invalid',
      items: [createWorkoutItem({ exerciseId: 'exercise-a', reps: 10, durationSec: 30 })],
    })).toThrow(/set either positive reps or positive durationSec/);
  });

  test('history and audio sanitizers reject invalid shapes', () => {
    expect(sanitizeCustomAudio({
      exerciseStart: 'data:audio/ogg;base64,AAAA',
      restEnd: 'data:text/plain;base64,AAAA',
      tick: { dataUrl: 'data:audio/wav;base64,BBBB', type: 'bad/type', size: -10 },
    })).toEqual({
      exerciseStart: 'data:audio/ogg;base64,AAAA',
      tick: {
        name: 'Custom audio',
        type: 'audio/wav',
        size: 0,
        dataUrl: 'data:audio/wav;base64,BBBB',
        updatedAt: expect.any(String),
      },
    });

    const entry = sanitizeHistoryEntry({
      status: 'unknown',
      completedItems: [{ setsCompleted: -1, skipped: 1 }],
    });

    expect(entry.status).toBe('completed');
    expect(entry.completedItems[0].setsCompleted).toBe(0);
    expect(entry.completedItems[0].skipped).toBe(true);
  });
});
