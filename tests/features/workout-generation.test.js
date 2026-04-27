import {
  createSingleWorkoutRecommendation,
  fitWorkoutToDuration,
  normalizeSingleWorkoutRequest,
  prescribeWorkoutItem,
  selectExercisesForSlots,
  selectSingleWorkoutType,
} from '../../js/features/workout-generation.js';
import {
  calculateEstimatedWorkoutDuration,
  createEmptyWorkout,
} from '../../js/features/workouts.js';

const equipmentCatalog = [{ id: 'bodyweight' }];
const equipment = { selectedIds: ['bodyweight'] };

function createExercise(overrides = {}) {
  const type = overrides.type || 'strength';

  return {
    id: overrides.id || 'exercise',
    name: { ru: overrides.id || 'exercise', en: overrides.id || 'exercise' },
    type: { en: type },
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    tags: type === 'cardio' ? ['bodyweight', 'cardio'] : ['bodyweight', 'compound'],
    executionMode: 'reps',
    movementPatterns: [overrides.pattern || overrides.id || 'pattern'],
    muscles: overrides.muscles || ['chest'],
    muscleGroups: {
      primary: overrides.primary || overrides.muscles || ['chest'],
      secondary: overrides.secondary || [],
    },
    contraindications: [],
    intensityProfile:
      type === 'cardio'
        ? {
            strength: 'low',
            cardio: 'high',
            endurance: 'high',
            impact: 'medium',
          }
        : {
            strength: 'high',
            cardio: 'low',
            endurance: 'medium',
            impact: 'low',
          },
    ...overrides,
  };
}

describe('single workout generation', () => {
  test('normalizes request defaults and clamps target duration', () => {
    expect(normalizeSingleWorkoutRequest({ durationMin: 5, workoutType: 'unknown' })).toEqual({
      mode: 'single',
      targetDurationMin: 10,
      workoutType: 'auto',
      hasPriorityOverrides: false,
      priorities: {
        goals: {
          strength: 0,
          hypertrophy: 0,
          endurance: 0,
          fatLoss: 0,
          mobility: 0,
        },
        bodyFocusGoals: {},
      },
    });
  });

  test('auto-selects workout type from dominant goal and duration', () => {
    expect(
      selectSingleWorkoutType({
        workoutType: 'auto',
        targetDurationMin: 20,
        profile: { goals: { fatLoss: 1 } },
      }),
    ).toBe('interval');

    expect(
      selectSingleWorkoutType({
        workoutType: 'auto',
        targetDurationMin: 40,
        profile: { goals: { endurance: 1 } },
      }),
    ).toBe('circuit');

    expect(
      selectSingleWorkoutType({
        workoutType: 'auto',
        targetDurationMin: 30,
        profile: { goals: { mobility: 1 } },
      }),
    ).toBe('mobility');
  });

  test('creates a straight workout draft from ranked exercises', () => {
    const result = createSingleWorkoutRecommendation({
      request: {
        targetDurationMin: 30,
        workoutType: 'straight',
        priorities: {
          goals: { strength: 1 },
          bodyFocusGoals: { upperBody: 1 },
        },
      },
      profile: {
        trainingLevel: 'beginner',
        goals: { endurance: 1 },
      },
      equipment,
      equipmentCatalog,
      exercises: [
        createExercise({ id: 'jumping-jacks', type: 'cardio', tags: ['warmup', 'cardio'] }),
        createExercise({ id: 'push-ups', primary: ['chest'], pattern: 'horizontal-push' }),
        createExercise({ id: 'squats', primary: ['quads'], pattern: 'squat' }),
        createExercise({ id: 'lunges', primary: ['glutes'], pattern: 'lunge' }),
        createExercise({ id: 'rows', primary: ['back'], pattern: 'horizontal-pull' }),
        createExercise({
          id: 'plank',
          type: 'static',
          executionMode: 'hold',
          tags: ['core', 'hold'],
          primary: ['core'],
          pattern: 'core-anti-extension',
        }),
      ],
    });

    expect(result.workoutType).toBe('straight');
    expect(result.workout.title).toContain('30 min');
    expect(result.workout.items).toHaveLength(6);
    expect(new Set(result.workout.items.map((item) => item.exerciseId)).size).toBe(6);
    expect(result.workout.items[0].notes).toBe('');
    expect(result.workout.items.some((item) => item.exerciseId === 'plank')).toBe(true);
    expect(result.summary.estimatedDurationMin).toBeGreaterThan(0);
  });

  test('keeps yoga out of straight strength work slots even when it is ranked higher', () => {
    const selections = selectExercisesForSlots(
      [
        { exercise: createExercise({ id: 'corpse-pose', type: 'yoga', tags: ['yoga'] }), score: 1 },
        { exercise: createExercise({ id: 'push-ups', type: 'strength' }), score: 0.1 },
      ],
      [{ role: 'main', preferredTypes: ['strength'], preferredTags: ['compound'] }],
      { workoutType: 'straight' },
    );

    expect(selections).toHaveLength(1);
    expect(selections[0].entry.exercise.id).toBe('push-ups');
  });

  test('uses profile priorities when request does not override them', () => {
    const result = createSingleWorkoutRecommendation({
      request: {
        targetDurationMin: 20,
        workoutType: 'auto',
      },
      profile: {
        trainingLevel: 'beginner',
        goals: { mobility: 1 },
      },
      equipment,
      equipmentCatalog,
      exercises: [
        createExercise({
          id: 'downward-dog',
          type: 'yoga',
          executionMode: 'hold',
          tags: ['yoga', 'mobility'],
          primary: ['full-body'],
        }),
        createExercise({
          id: 'cat-cow',
          type: 'yoga',
          executionMode: 'hold',
          tags: ['yoga', 'mobility'],
          primary: ['core'],
          pattern: 'spinal-mobility',
        }),
        createExercise({
          id: 'plank',
          type: 'static',
          executionMode: 'hold',
          tags: ['core', 'hold'],
          primary: ['core'],
          pattern: 'core-anti-extension',
        }),
        createExercise({ id: 'push-ups', primary: ['chest'], pattern: 'horizontal-push' }),
      ],
    });

    expect(result.workoutType).toBe('mobility');
  });

  test('prescribes duration for time and hold exercises', () => {
    expect(
      prescribeWorkoutItem(createExercise({ id: 'plank', executionMode: 'hold', type: 'static' }), {
        workoutType: 'straight',
        goalId: 'strength',
        trainingLevel: 'beginner',
      }),
    ).toMatchObject({
      reps: null,
      durationSec: 30,
    });
  });

  test('does not prescribe strength volume to yoga holds', () => {
    expect(
      prescribeWorkoutItem(
        createExercise({
          id: 'corpse-pose',
          executionMode: 'hold',
          type: 'yoga',
          tags: ['yoga', 'mobility'],
        }),
        { workoutType: 'straight', goalId: 'strength', trainingLevel: 'advanced' },
      ),
    ).toMatchObject({
      sets: 1,
      reps: null,
      durationSec: 45,
      restBetweenSetsSec: 15,
    });
  });

  test('fits generated workout volume toward target duration', () => {
    const exercises = [
      createExercise({ id: 'push-ups' }),
      createExercise({ id: 'squats' }),
      createExercise({ id: 'plank', executionMode: 'hold', type: 'static' }),
    ];
    const workout = createEmptyWorkout({
      items: [
        {
          id: 'one',
          exerciseId: 'push-ups',
          sets: 5,
          reps: 12,
          restBetweenSetsSec: 120,
          restAfterExerciseSec: 90,
          order: 0,
        },
        {
          id: 'two',
          exerciseId: 'squats',
          sets: 5,
          reps: 12,
          restBetweenSetsSec: 120,
          restAfterExerciseSec: 90,
          order: 1,
        },
        {
          id: 'three',
          exerciseId: 'plank',
          sets: 5,
          durationSec: 60,
          restBetweenSetsSec: 120,
          restAfterExerciseSec: 0,
          order: 2,
        },
      ],
    });

    const beforeSec = calculateEstimatedWorkoutDuration(workout, exercises);
    const fitted = fitWorkoutToDuration(workout, 15, exercises);
    const afterSec = calculateEstimatedWorkoutDuration(fitted, exercises);

    expect(afterSec).toBeLessThan(beforeSec);
    expect(fitted.items).toHaveLength(3);
  });
});
