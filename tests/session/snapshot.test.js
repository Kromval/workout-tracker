import {
  createPersistedSessionSnapshot,
  discardSessionSnapshot,
  getSessionSnapshot,
  normalizeSessionSnapshot,
  saveSessionSnapshot,
} from '../../js/session/snapshot.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

const baseSnapshot = {
  version: 1,
  savedAt: '2026-04-01T10:00:00.000Z',
  status: 'running',
  workout: {
    id: 'workout-a',
    title: 'Workout',
    items: [{ id: 'item-a', exerciseId: 'push-up', reps: 10 }],
  },
  steps: [
    { id: 'item-a:set-1:exercise', durationSec: 30 },
    { id: 'item-a:set-1:rest', durationSec: 20 },
  ],
  currentStepIndex: 0,
  remainingSec: 10,
  elapsedSec: 20,
  startedAt: '2026-04-01T09:59:00.000Z',
};

describe('session snapshot', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('normalizes restorable snapshots and rejects invalid ones', () => {
    const normalized = normalizeSessionSnapshot(baseSnapshot);
    expect(normalized).toMatchObject({
      status: 'running',
      currentStepIndex: 0,
      remainingSec: 10,
      elapsedSec: 20,
    });
    expect(normalized.steps).toEqual([
      { id: 'item-a:set-1:exercise', durationSec: 30 },
      { id: 'item-a:set-1:rest', durationSec: 20 },
    ]);
    expect(normalizeSessionSnapshot({ ...baseSnapshot, status: 'completed' })).toBeNull();
    expect(normalizeSessionSnapshot({ ...baseSnapshot, remainingSec: 31 })).toBeNull();
    expect(normalizeSessionSnapshot({ ...baseSnapshot, currentStepIndex: 3 })).toBeNull();
    expect(normalizeSessionSnapshot(null)).toBeNull();
  });

  test('persists, reads, and discards active session snapshots', () => {
    expect(saveSessionSnapshot(baseSnapshot)).toMatchObject({
      status: 'running',
      remainingSec: 10,
    });
    expect(getSessionSnapshot()).toMatchObject({
      status: 'running',
      currentStepIndex: 0,
    });

    discardSessionSnapshot();
    expect(getSessionSnapshot()).toBeNull();
    expect(saveSessionSnapshot({ ...baseSnapshot, status: 'completed' })).toBeNull();
  });

  test('creates compact persisted snapshots from live session snapshots', () => {
    const persisted = createPersistedSessionSnapshot({
      ...baseSnapshot,
      currentStep: { remainingSec: 8 },
      steps: [
        { id: 'item-a:set-1:exercise', durationSec: 30, exercise: { name: 'Push-up' } },
        { id: 'item-a:set-1:rest', durationSec: 20, extra: true },
      ],
    });

    expect(persisted).toMatchObject({
      status: 'running',
      currentStepIndex: 0,
      remainingSec: 8,
      steps: [
        { id: 'item-a:set-1:exercise', durationSec: 30 },
        { id: 'item-a:set-1:rest', durationSec: 20 },
      ],
    });
    expect(createPersistedSessionSnapshot({ ...baseSnapshot, status: 'aborted' })).toBeNull();
  });
});
