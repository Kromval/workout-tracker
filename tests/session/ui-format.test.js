import {
  buildSessionSummary,
  formatNextStep,
  formatRepCounter,
  formatSetCounter,
  getCompletedExerciseSteps,
  getNextStep,
  getPhaseLabel,
  getStatusLabel,
  getStepCalories,
  getStepExerciseName,
  getStepKindLabel,
  isTerminal,
  renderFinishStat,
  roundToOneDecimal,
} from '../../js/session/ui-format.js';

const state = { settings: { language: 'en' } };

describe('session UI format helpers', () => {
  test('builds finish summary from completed exercise steps', () => {
    const snapshot = {
      status: 'running',
      elapsedSec: 125.4,
      currentStepIndex: 3,
      steps: [
        {
          id: 'pushups:set-1:exercise',
          type: 'exercise',
          workoutItemId: 'pushups',
          exerciseId: 'push-up',
          exercise: { name: 'Push-up', estimatedCalories: 6 },
          executionMode: 'reps',
          reps: 10,
          durationSec: 30,
        },
        {
          id: 'rest',
          type: 'rest-between-sets',
          durationSec: 20,
        },
        {
          id: 'plank:set-1:exercise',
          type: 'exercise',
          workoutItemId: 'plank',
          exerciseId: 'plank',
          exercise: { name: 'Plank', estimatedCalories: 4 },
          executionMode: 'hold',
          durationSec: 45,
        },
      ],
    };

    expect(getCompletedExerciseSteps(snapshot).map((step) => step.id)).toEqual([
      'pushups:set-1:exercise',
      'plank:set-1:exercise',
    ]);
    expect(buildSessionSummary(snapshot)).toMatchObject({
      durationSec: 125,
      estimatedCaloriesBurned: 6,
      totalExercisesCompleted: 2,
      totalSetsCompleted: 2,
      completedItems: [
        {
          workoutItemId: 'pushups',
          exerciseId: 'push-up',
          setsCompleted: 1,
          repsCompleted: 10,
          durationSec: null,
        },
        {
          workoutItemId: 'plank',
          exerciseId: 'plank',
          setsCompleted: 1,
          repsCompleted: null,
          durationSec: 45,
        },
      ],
    });
  });

  test('formats labels, counters, next step, and escaped finish stats', () => {
    const step = {
      type: 'exercise',
      exerciseId: 'push-up',
      exercise: { name: { en: 'Push-up', ru: 'Отжимания' } },
      executionMode: 'reps',
      reps: 5,
      setNumber: 1,
      totalSets: 3,
      elapsedSec: 4,
      effort: { repDurationSec: 3 },
    };

    expect(renderFinishStat('<sets>', '<3>')).toContain('&lt;3&gt;');
    expect(getStepExerciseName(step, state)).toBe('Push-up');
    expect(getStepExerciseName(null, state)).toEqual(expect.any(String));
    expect(getStepKindLabel(step, state)).toEqual(expect.any(String));
    expect(getStepKindLabel({ type: 'rest-between-sets' }, state)).toEqual(expect.any(String));
    expect(getStepKindLabel({ type: 'rest-after-exercise' }, state)).toEqual(expect.any(String));
    expect(formatSetCounter(step, state)).toBe('1 / 3');
    expect(formatSetCounter({}, state)).toEqual(expect.any(String));
    expect(formatRepCounter(step, null, state)).toBe('2 / 5');
    expect(formatRepCounter(step, { repNumber: 4 }, state)).toBe('4 / 5');
    expect(formatRepCounter({ executionMode: 'time' }, null, state)).toEqual(expect.any(String));
    expect(getPhaseLabel({ key: 'eccentric', name: 'Eccentric' }, state)).toEqual(
      expect.any(String),
    );
    expect(getPhaseLabel(null, state)).toEqual(expect.any(String));
    expect(formatNextStep(step, state)).toContain('Push-up');
    expect(formatNextStep(null, state)).toEqual(expect.any(String));
    expect(getStatusLabel('running', state)).toEqual(expect.any(String));
  });

  test('calculates calories, rounding, next step, and terminal statuses', () => {
    expect(getStepCalories({ durationSec: 90, exercise: { estimatedCalories: 8 } })).toBe(12);
    expect(getStepCalories({ durationSec: -1, exercise: { estimatedCalories: -1 } })).toBe(0);
    expect(roundToOneDecimal(1.24)).toBe(1.2);
    expect(roundToOneDecimal(-5)).toBe(0);
    expect(getNextStep({ currentStepIndex: 0, steps: ['current', 'next'] })).toBe('next');
    expect(getNextStep({ currentStepIndex: 0, steps: ['current'] })).toBeNull();
    expect(isTerminal('completed')).toBe(true);
    expect(isTerminal('aborted')).toBe(true);
    expect(isTerminal('running')).toBe(false);
  });
});
