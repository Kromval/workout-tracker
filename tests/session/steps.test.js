import { buildWorkoutSteps } from '../../js/session/steps.js';

describe('session steps', () => {
  test('builds reps, set-rest, and exercise-rest steps', () => {
    const steps = buildWorkoutSteps(
      {
        defaultRestBetweenExercises: 30,
        items: [
          {
            id: 'pushups',
            exerciseId: 'push-up',
            sets: 2,
            reps: 3,
            restBetweenSetsSec: 20,
            tempoOverride: { eccentric: 2, pauseBottom: 0, concentric: 1, pauseTop: 0 },
            notes: 'strict',
          },
          {
            id: 'plank',
            exerciseId: 'plank',
            sets: 1,
            durationSec: 45,
          },
        ],
      },
      [
        { id: 'push-up', executionMode: 'reps', estimatedCalories: 8 },
        { id: 'plank', executionMode: 'hold', estimatedCalories: 4 },
      ],
    );

    expect(steps.map((step) => step.type)).toEqual([
      'exercise',
      'rest-between-sets',
      'exercise',
      'rest-after-exercise',
      'exercise',
    ]);
    expect(steps[0]).toMatchObject({
      id: 'pushups:set-1:exercise',
      phase: 'exercise',
      executionMode: 'reps',
      reps: 3,
      durationSec: 9,
      notes: 'strict',
      effort: {
        durationSource: 'reps*tempo',
        tempoSource: 'tempoOverride',
        repDurationSec: 3,
      },
    });
    expect(steps[1]).toMatchObject({
      durationSource: 'restBetweenSetsSec',
      fromSetNumber: 1,
      toSetNumber: 2,
      durationSec: 20,
    });
    expect(steps[3]).toMatchObject({
      durationSource: 'workout.defaultRestBetweenExercises',
      durationSec: 30,
    });
    expect(steps[4]).toMatchObject({
      executionMode: 'hold',
      durationSec: 45,
      effort: {
        durationSource: 'durationSec',
      },
    });
  });

  test('handles unknown exercises, zero tempo, custom mode, and missing exercise ids', () => {
    const steps = buildWorkoutSteps({
      items: [
        {
          id: 'unknown',
          exerciseId: 'missing',
          reps: 2,
          tempoOverride: { eccentric: 0, pauseBottom: 0, concentric: 0, pauseTop: 0 },
        },
        {
          id: 'custom',
          exerciseId: 'custom-mode',
          durationSec: null,
          reps: null,
        },
        {
          id: 'empty',
          exerciseId: '',
          durationSec: 60,
        },
      ],
    });

    expect(steps).toHaveLength(3);
    expect(steps[0]).toMatchObject({
      executionMode: 'reps',
      durationSec: 6,
      effort: {
        tempoSource: 'default',
        repDurationSec: 3,
      },
    });
    expect(steps[2]).toMatchObject({
      executionMode: 'custom',
      durationSec: 0,
      effort: {
        durationSource: 'unknown',
      },
    });
  });
});
