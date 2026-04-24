import {
  createHistoryEntry,
  getHistory,
  getHistoryByDate,
  getHistoryGroupedByMonth,
  getHistoryStats,
  getStatsSummary,
  saveHistoryEntry,
} from '../../js/features/history.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

describe('history feature', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('creates normalized entries and derives summary fields', () => {
    const entry = createHistoryEntry({
      workoutId: 'workout-a',
      startedAt: '2026-04-01T10:00:00.000Z',
      endedAt: '2026-04-01T10:12:30.000Z',
      status: 'unknown',
      estimatedCaloriesBurned: '42.5',
      completedItems: [
        { exerciseId: 'push-up', setsCompleted: '2', repsCompleted: 20 },
        { exerciseId: 'plank', setsCompleted: 1, durationSec: 45 },
        { exerciseId: 'skipped', setsCompleted: 5, skipped: true },
        null,
      ],
    });

    expect(entry).toMatchObject({
      workoutId: 'workout-a',
      status: 'completed',
      durationSec: 750,
      estimatedCaloriesBurned: 42.5,
      totalExercisesCompleted: 2,
      totalSetsCompleted: 3,
    });
    expect(entry.id).toEqual(expect.stringContaining('history-'));
  });

  test('persists entries, reads them sorted, and filters by date', () => {
    saveHistoryEntry({
      id: 'older',
      workoutTitleSnapshot: 'Older',
      startedAt: '2026-04-01T09:00:00.000Z',
      endedAt: '2026-04-01T09:05:00.000Z',
    });
    saveHistoryEntry({
      workoutTitleSnapshot: 'Newer',
      startedAt: '2026-04-01T12:00:00.000Z',
      endedAt: '2026-04-01T12:10:00.000Z',
    });
    saveHistoryEntry({
      workoutTitleSnapshot: 'Other day',
      startedAt: '2026-04-02T12:00:00.000Z',
      endedAt: '2026-04-02T12:10:00.000Z',
    });

    expect(getHistory().map((entry) => entry.workoutTitleSnapshot)).toEqual([
      'Other day',
      'Newer',
      'Older',
    ]);
    expect(getHistoryByDate('2026-04-01').map((entry) => entry.workoutTitleSnapshot)).toEqual([
      'Newer',
      'Older',
    ]);
  });

  test('groups entries by month and calculates aggregate stats', () => {
    const history = [
      {
        id: 'a',
        status: 'completed',
        startedAt: '2026-03-01T09:00:00.000Z',
        durationSec: 100,
        estimatedCaloriesBurned: 10.25,
        totalExercisesCompleted: 1,
        totalSetsCompleted: 2,
      },
      {
        id: 'b',
        status: 'aborted',
        startedAt: '2026-04-02T09:00:00.000Z',
        durationSec: 200,
        estimatedCaloriesBurned: 20.25,
        totalExercisesCompleted: 2,
        totalSetsCompleted: 4,
      },
      {
        id: 'c',
        status: 'interrupted',
        startedAt: '2026-04-03T09:00:00.000Z',
        durationSec: -1,
        estimatedCaloriesBurned: 'bad',
        totalExercisesCompleted: -1,
        totalSetsCompleted: 'bad',
      },
      {
        id: 'invalid-date',
        startedAt: 'not-a-date',
      },
    ];

    expect(Object.keys(getHistoryGroupedByMonth(history))).toEqual(['2026-04', '2026-03']);
    expect(getHistoryGroupedByMonth(history)['2026-04'].map((entry) => entry.id)).toEqual([
      'c',
      'b',
    ]);
    expect(getStatsSummary(history)).toMatchObject({
      totalEntries: 4,
      completed: 2,
      aborted: 1,
      interrupted: 1,
      totalDurationSec: 300,
      totalCaloriesBurned: 30.5,
      totalExercisesCompleted: 3,
      totalSetsCompleted: 6,
      averageDurationSec: 75,
      averageCaloriesBurned: 7.6,
    });
  });

  test('validates saved entry shape and exposes stats alias', () => {
    expect(() => saveHistoryEntry(null)).toThrow(TypeError);
    expect(getHistoryStats()).toMatchObject({
      totalEntries: 0,
      totalDurationSec: 0,
      averageCaloriesBurned: 0,
    });
  });
});
