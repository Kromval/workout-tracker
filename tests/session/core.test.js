/**
 * @module tests/session/core.test
 */
import { jest } from '@jest/globals';
import {
  createWorkoutSession,
  restoreWorkoutSession,
  SESSION_STATUSES,
} from '../../js/session/core.js';
import { saveSessionSnapshot } from '../../js/session/snapshot.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

/**
 * Module-level workout value.
 * @type {object}
 */
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

/**
 * Module-level exercises value.
 * @type {Array}
 */
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
      totalSteps: 7,
      currentStep: {
        type: 'prepare',
        source: 'warmup-template',
      },
    });

    session.start();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(onStepChange).toHaveBeenCalled();

    session.tick();
    expect(onTick).toHaveBeenCalled();

    session.addTime(2);
    expect(session.getSnapshot().currentStep.durationSec).toBe(302);

    session.subtractTime(400);
    expect(session.getSnapshot().currentStepIndex).toBeGreaterThan(0);

    session.pause();
    expect(clearInterval).toHaveBeenCalled();
    session.resume();
    while (session.isActive()) {
      session.skipCurrentStep();
    }

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

  test('migrates legacy active session snapshots onto compiled session plan steps', () => {
    saveSessionSnapshot({
      version: 1,
      savedAt: '2026-04-01T10:00:00.000Z',
      status: SESSION_STATUSES.PAUSED,
      workout,
      steps: [
        { id: 'pushups:set-1:exercise', durationSec: 4 },
        { id: 'pushups:rest-after-exercise', durationSec: 90 },
        { id: 'plank:set-1:exercise', durationSec: 2 },
      ],
      currentStepIndex: 2,
      remainingSec: 1,
      elapsedSec: 95,
      startedAt: '2026-04-01T09:58:00.000Z',
    });

    const restored = restoreWorkoutSession(undefined, exercises, {
      audio: false,
      persist: false,
      autoStartTimer: false,
    });
    const snapshot = restored.getSnapshot();

    expect(snapshot.status).toBe(SESSION_STATUSES.PAUSED);
    expect(snapshot.currentStep).toMatchObject({
      type: 'work',
      legacyId: 'plank:set-1:exercise',
      remainingSec: 1,
    });
    expect(snapshot.currentStepIndex).toBeGreaterThan(0);
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
