/**
 * @module tests/session/plan.test
 */
import {
  SESSION_PLAN_SCHEMA,
  SESSION_STEP_TYPES,
  WORKOUT_BLOCK_TYPES,
} from '../../js/session/model.js';
import {
  compileSessionPlan,
  compileWorkoutToSessionSteps,
  normalizeWorkoutBlocks,
} from '../../js/session/plan.js';

describe('session plan compiler', () => {
  const exercises = [
    {
      id: 'push-up',
      executionMode: 'reps',
      tempo: { eccentric: 2, pauseBottom: 0, concentric: 1, pauseTop: 0 },
    },
    { id: 'squat', executionMode: 'reps' },
    { id: 'plank', executionMode: 'hold' },
  ];

  test('exposes v2 session plan schema metadata', () => {
    expect(SESSION_PLAN_SCHEMA.version).toBe(2);
    expect(SESSION_PLAN_SCHEMA.blockTypes).toEqual(
      expect.arrayContaining([WORKOUT_BLOCK_TYPES.STRAIGHT, WORKOUT_BLOCK_TYPES.CIRCUIT]),
    );
    expect(SESSION_PLAN_SCHEMA.stepTypes).toEqual(
      expect.arrayContaining([
        SESSION_STEP_TYPES.PREPARE,
        SESSION_STEP_TYPES.WORK,
        SESSION_STEP_TYPES.COOLDOWN,
      ]),
    );
  });

  test('compiles legacy workout items into a warmup/work/rest/cooldown session plan', () => {
    const plan = compileSessionPlan(
      {
        id: 'workout-a',
        title: 'Workout A',
        defaultRestBetweenExercises: 30,
        items: [
          {
            id: 'pushups',
            exerciseId: 'push-up',
            sets: 2,
            reps: 3,
            restBetweenSetsSec: 20,
          },
          {
            id: 'plank',
            exerciseId: 'plank',
            sets: 1,
            durationSec: 45,
          },
        ],
      },
      exercises,
      {
        warmupDurationSec: 60,
        cooldownDurationSec: 45,
        prepareDurationSec: 5,
      },
    );

    expect(plan).toMatchObject({
      version: 2,
      workoutId: 'workout-a',
      workoutTitle: 'Workout A',
      workoutType: WORKOUT_BLOCK_TYPES.STRAIGHT,
      blocks: [
        {
          type: WORKOUT_BLOCK_TYPES.STRAIGHT,
          source: 'legacy-items',
        },
      ],
    });
    expect(plan.steps.map((step) => step.type)).toEqual([
      'prepare',
      'prepare',
      'work',
      'rest',
      'work',
      'transition',
      'prepare',
      'work',
      'cooldown',
    ]);
    expect(plan.steps[0]).toMatchObject({
      id: 'workout-a:warmup',
      durationSec: 60,
      source: 'warmup-template',
    });
    expect(plan.steps.find((step) => step.legacyType === 'exercise')).toMatchObject({
      type: SESSION_STEP_TYPES.WORK,
      workoutItemId: 'pushups',
      executionMode: 'reps',
      reps: 3,
    });
    expect(plan.steps.at(-1)).toMatchObject({
      id: 'workout-a:cooldown',
      durationSec: 45,
      source: 'cooldown-template',
    });
    expect(plan.legacySteps.map((step) => step.type)).toEqual([
      'exercise',
      'rest-between-sets',
      'exercise',
      'rest-after-exercise',
      'exercise',
    ]);
    expect(plan.totalDurationSec).toBe(
      plan.steps.reduce((total, step) => total + step.durationSec, 0),
    );
  });

  test('normalizes explicit circuit blocks and compiles round steps', () => {
    const plan = compileSessionPlan(
      {
        id: 'circuit-a',
        title: 'Circuit A',
        blocks: [
          {
            id: 'block-circuit',
            type: 'circuit',
            rounds: 2,
            defaultRestBetweenExercises: 15,
            restBetweenRoundsSec: 40,
            items: [
              { id: 'pushups', exerciseId: 'push-up', reps: 8 },
              { id: 'squats', exerciseId: 'squat', reps: 12 },
            ],
          },
        ],
      },
      exercises,
      {
        warmupDurationSec: 0,
        cooldownDurationSec: 0,
        prepareDurationSec: 0,
      },
    );

    expect(plan.blocks[0]).toMatchObject({
      id: 'block-circuit',
      type: WORKOUT_BLOCK_TYPES.CIRCUIT,
      rounds: 2,
    });
    expect(plan.workoutType).toBe(WORKOUT_BLOCK_TYPES.CIRCUIT);
    expect(plan.steps.map((step) => step.type)).toEqual([
      'work',
      'transition',
      'work',
      'rest',
      'work',
      'transition',
      'work',
    ]);
    expect(plan.steps.filter((step) => step.type === SESSION_STEP_TYPES.WORK)).toHaveLength(4);
    expect(plan.steps.find((step) => step.source === 'round-rest')).toMatchObject({
      fromRoundNumber: 1,
      toRoundNumber: 2,
      durationSec: 40,
    });
  });

  test('returns only compiled session steps when requested', () => {
    const steps = compileWorkoutToSessionSteps(
      {
        id: 'mobility-a',
        workoutType: 'mobility',
        items: [{ id: 'plank', exerciseId: 'plank', durationSec: 30 }],
      },
      exercises,
      { includeWarmup: false, includeCooldown: false, prepareDurationSec: 0 },
    );

    expect(steps).toHaveLength(1);
    expect(steps[0]).toMatchObject({
      type: SESSION_STEP_TYPES.WORK,
      blockType: WORKOUT_BLOCK_TYPES.MOBILITY,
      exerciseId: 'plank',
    });
  });

  test('normalizes legacy items into an implicit workout block', () => {
    expect(
      normalizeWorkoutBlocks({
        id: 'legacy-a',
        items: [{ id: 'item-a', exerciseId: 'push-up', reps: 10 }],
      }),
    ).toEqual([
      expect.objectContaining({
        type: WORKOUT_BLOCK_TYPES.STRAIGHT,
        source: 'legacy-items',
        items: [expect.objectContaining({ id: 'item-a', exerciseId: 'push-up' })],
      }),
    ]);
  });
});
