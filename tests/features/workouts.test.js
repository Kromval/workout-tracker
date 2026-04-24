import {
  calculateEstimatedWorkoutDuration,
  calculateWorkoutCaloriesEstimate,
  createEmptyWorkout,
  createEmptyWorkoutDraft,
  createWorkoutItem,
  getWorkouts,
  normalizeWorkout,
} from '../../js/features/workouts.js';
import { saveStore } from '../../js/storage/core.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

describe('workouts feature', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('normalizes workouts and items into a stable shape', () => {
    const workout = normalizeWorkout({
      id: ' workout-a ',
      title: '  Upper body ',
      defaultRestBetweenExercises: '45',
      items: [
        {
          id: 'second',
          exerciseId: ' plank ',
          sets: 0,
          durationSec: '',
          restAfterExerciseSec: '',
          order: 3,
        },
        {
          id: 'first',
          exerciseId: 'push-up',
          sets: '2',
          reps: '12',
          distance: '10.5',
          restBetweenSetsSec: '-1',
          tempoOverride: { eccentric: '2', pauseBottom: 0, concentric: '1', pauseTop: 'bad' },
          order: 1,
        },
      ],
    });

    expect(workout).toMatchObject({
      id: 'workout-a',
      title: 'Upper body',
      defaultRestBetweenExercises: 45,
    });
    expect(workout.items.map((item) => item.id)).toEqual(['first', 'second']);
    expect(workout.items[0]).toMatchObject({
      order: 0,
      sets: 2,
      reps: 12,
      durationSec: null,
      distance: 10.5,
      restBetweenSetsSec: 60,
      tempoOverride: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
    });
    expect(workout.items[1]).toMatchObject({
      order: 1,
      sets: 1,
      durationSec: null,
      restAfterExerciseSec: null,
    });
  });

  test('creates drafts and workout items with defaults', () => {
    const workout = createEmptyWorkout({ title: 'Draft' });
    const item = createWorkoutItem({ exerciseId: 'squat' });

    expect(workout.title).toBe('Draft');
    expect(workout.items).toEqual([]);
    expect(workout.defaultRestBetweenExercises).toBe(90);
    expect(createEmptyWorkoutDraft()).toMatchObject({ title: '', items: [] });
    expect(item).toMatchObject({
      exerciseId: 'squat',
      sets: 1,
      restBetweenSetsSec: 60,
    });
  });

  test('calculates duration and calories using item overrides and exercise metadata', () => {
    const workout = normalizeWorkout({
      defaultRestBetweenExercises: 30,
      items: [
        {
          id: 'pushups',
          exerciseId: 'push-up',
          sets: 2,
          reps: 10,
          restBetweenSetsSec: 20,
          tempoOverride: { eccentric: 2, pauseBottom: 0, concentric: 1, pauseTop: 0 },
        },
        {
          id: 'plank',
          exerciseId: 'plank',
          sets: 1,
          durationSec: 45,
        },
      ],
    });
    const exercises = [
      { id: 'push-up', estimatedCalories: 8, tempo: { eccentric: 1, concentric: 1 } },
      { id: 'plank', estimatedCalories: 4 },
    ];

    expect(calculateEstimatedWorkoutDuration(workout, exercises)).toBe(155);
    expect(calculateWorkoutCaloriesEstimate(workout, exercises)).toBe(11);
  });

  test('reads stored workouts through normalized feature API', () => {
    saveStore({
      workouts: [
        {
          id: 'workout-a',
          title: 'A',
          updatedAt: '2026-04-01T10:00:00.000Z',
          items: [{ id: 'item-a', exerciseId: 'push-up', reps: 5 }],
        },
      ],
    });

    expect(getWorkouts()).toHaveLength(1);
    expect(getWorkouts()[0].items[0]).toMatchObject({ reps: 5, sets: 1 });
    expect(getWorkouts({ workouts: [{ id: 'draft', title: 'Draft', items: [] }] })[0].id).toBe(
      'draft',
    );
  });
});
