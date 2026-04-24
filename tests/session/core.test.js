import { jest } from '@jest/globals';
import {
  createWorkoutSession,
  restoreWorkoutSession,
  SESSION_STATUSES,
} from '../../js/session/core.js';
import { saveSessionSnapshot } from '../../js/session/snapshot.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

const workout = {
  id: 'workout-a',
  title: 'Workout',
  items: [
    {
      id: 'pushups',
      exerciseId: 'push-up',
      sets: 1,
      reps: 2,
      tempoOverride: { eccentric: 1, pauseBottom: 0, concentric: 1, pauseTop: 0 },
    },
    {
      id: 'plank',
      exerciseId: 'plank',
      sets: 1,
      durationSec: 2,
    },
  ],
};

const exercises = [
  { id: 'push-up', executionMode: 'reps' },
  { id: 'plank', executionMode: 'time' },
];

describe('workout session core', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('runs through start, ticks, pause/resume, time adjustments, and completion', () => {
    const onTick = jest.fn();
    const onStepChange = jest.fn();
    const onPhaseChange = jest.fn();
    const onWorkoutComplete = jest.fn();
    const intervalIds = [];
    const setInterval = jest.fn((callback) => {
      intervalIds.push(callback);
      return intervalIds.length;
    });
    const clearInterval = jest.fn();
    const session = createWorkoutSession(workout, exercises, {
      audio: false,
      persist: false,
      setInterval,
      clearInterval,
      onTick,
      onStepChange,
      onPhaseChange,
      onWorkoutComplete,
    });

    expect(session.getSnapshot()).toMatchObject({
      status: SESSION_STATUSES.IDLE,
      currentStepIndex: 0,
      totalSteps: 3,
    });

    session.start();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(onStepChange).toHaveBeenCalled();

    session.tick();
    expect(onTick).toHaveBeenCalled();
    expect(onPhaseChange).toHaveBeenCalled();

    session.addTime(2);
    expect(session.getSnapshot().currentStep.durationSec).toBe(6);

    session.subtractTime(10);
    expect(session.getSnapshot().currentStepIndex).toBeGreaterThan(0);

    session.pause();
    expect(clearInterval).toHaveBeenCalled();
    session.resume();
    session.skipCurrentStep();
    session.skipCurrentStep();

    const finished = session.getSnapshot();
    expect(finished.status).toBe(SESSION_STATUSES.COMPLETED);
    expect(finished.currentStep).toBeNull();
    expect(onWorkoutComplete).toHaveBeenCalled();
  });

  test('aborts active sessions and restores compatible snapshots', () => {
    const onWorkoutAbort = jest.fn();
    const session = createWorkoutSession(workout, exercises, {
      audio: false,
      persist: false,
      onWorkoutAbort,
    });

    session.start();
    const snapshot = session.getSnapshot();
    session.abort();

    expect(session.getSnapshot().status).toBe(SESSION_STATUSES.ABORTED);
    expect(onWorkoutAbort).toHaveBeenCalled();

    saveSessionSnapshot({
      ...snapshot,
      status: SESSION_STATUSES.PAUSED,
      currentStepIndex: 0,
      remainingSec: 1,
      currentStep: { ...snapshot.currentStep, remainingSec: 1 },
    });
    const restored = restoreWorkoutSession(undefined, exercises, {
      audio: false,
      persist: false,
      autoStartTimer: false,
    });

    expect(restored.getSnapshot()).toMatchObject({
      status: SESSION_STATUSES.PAUSED,
      currentStepIndex: 0,
      currentStep: {
        remainingSec: 1,
      },
    });
    expect(
      restoreWorkoutSession(
        {
          ...snapshot,
          steps: [{ id: 'different', durationSec: 1 }],
          status: SESSION_STATUSES.RUNNING,
        },
        exercises,
        { audio: false, persist: false },
      ),
    ).toBeNull();
  });

  test('completes immediately for workouts without executable steps', () => {
    const session = createWorkoutSession({ id: 'empty', title: 'Empty', items: [] }, [], {
      audio: false,
      persist: false,
    });

    expect(session.start()).toMatchObject({
      status: SESSION_STATUSES.COMPLETED,
      progress: 1,
    });
  });
});
