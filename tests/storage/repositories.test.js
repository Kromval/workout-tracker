import {
  createCustomEquipmentRecord,
  deleteCustomEquipmentRecord,
  getEquipment,
  getProfile,
  saveEquipment,
  saveProfile,
} from '../../js/storage/profileRepository.js';
import {
  getCustomAudio,
  getFavorites,
  getSettings,
  isFavoriteExercise,
  saveLastOpenedWorkout,
  saveSettings,
  setCustomAudio,
  setFavorites,
  setSettings,
  toggleFavoriteExercise,
} from '../../js/storage/settingsRepository.js';
import {
  createWorkoutRecord,
  deleteWorkout,
  duplicateWorkout,
  getWorkout,
  getWorkouts,
  readAllWorkouts,
  readWorkoutById,
  saveWorkout,
  setWorkouts,
  updateWorkout,
} from '../../js/storage/workoutRepository.js';
import {
  createHistoryRecord,
  deleteHistoryEntry,
  getHistory,
  getHistoryByDate,
  getHistoryEntry,
  readAllHistory,
  readHistoryById,
  saveHistoryEntry,
  setHistory,
  updateHistoryEntry,
} from '../../js/storage/historyRepository.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

function validWorkout(overrides = {}) {
  return {
    title: 'Strength',
    items: [{ id: 'item-a', exerciseId: 'push-up', reps: 10 }],
    ...overrides,
  };
}

describe('storage repositories', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('settings repository saves settings, favorites, custom audio, and last opened workout', () => {
    expect(getSettings().language).toBe('ru');
    expect(setSettings({ language: 'en', favoriteExerciseIds: ['a', 'a'] })).toMatchObject({
      language: 'en',
      favoriteExerciseIds: ['a'],
    });
    expect(saveSettings({ density: 'compact' })).toMatchObject({
      language: 'en',
      density: 'compact',
    });

    setFavorites(['push-up', 'push-up', 'plank']);
    expect(getFavorites()).toEqual(['push-up', 'plank']);
    expect(isFavoriteExercise('push-up')).toBe(true);
    expect(toggleFavoriteExercise('push-up')).toEqual(['plank']);
    expect(toggleFavoriteExercise('squat')).toEqual(['plank', 'squat']);

    const workout = createWorkoutRecord(validWorkout({ title: 'Opened' }));
    expect(saveLastOpenedWorkout(workout.id).lastOpenedWorkoutId).toBe(workout.id);
    expect(saveLastOpenedWorkout('missing').lastOpenedWorkoutId).toBeNull();

    expect(setCustomAudio({ restStart: 'data:audio/wav;base64,AAAA', bad: 'ignored' })).toEqual({
      restStart: 'data:audio/wav;base64,AAAA',
    });
    expect(getCustomAudio()).toEqual({ restStart: 'data:audio/wav;base64,AAAA' });
  });

  test('profile repository saves profile and manages custom equipment', () => {
    expect(getProfile()).toHaveProperty('goals');
    expect(saveProfile({ age: '35', goal: 'strength' })).toMatchObject({
      age: 35,
      goal: 'strength',
    });

    expect(getEquipment()).toHaveProperty('selectedIds');
    expect(saveEquipment({ selectedIds: ['bodyweight'], customItems: [] }).selectedIds).toEqual([
      'bodyweight',
    ]);

    const { equipment, item } = createCustomEquipmentRecord('Sled');
    expect(item).toMatchObject({
      name: 'Sled',
      isCustom: true,
    });
    expect(equipment.selectedIds).toContain(item.id);
    expect(deleteCustomEquipmentRecord('missing')).toBe(false);
    expect(deleteCustomEquipmentRecord(item.id)).toBe(true);
    expect(getEquipment().selectedIds).not.toContain(item.id);
  });

  test('workout repository creates, updates, duplicates, sorts, and deletes workouts', () => {
    const older = createWorkoutRecord(
      validWorkout({
        title: 'Older',
        items: [{ id: 'older-item', exerciseId: 'squat', durationSec: 30 }],
      }),
    );
    const newer = saveWorkout(validWorkout({ title: 'Newer' }));

    expect(
      getWorkouts()
        .map((workout) => workout.title)
        .sort(),
    ).toEqual(['Newer', 'Older']);
    expect(readAllWorkouts()).toHaveLength(2);
    expect(getWorkout(older.id).title).toBe('Older');
    expect(readWorkoutById(newer.id).title).toBe('Newer');

    const updated = updateWorkout(older.id, { title: 'Updated older' });
    expect(updated.title).toBe('Updated older');
    expect(updateWorkout('missing', { title: 'Missing' })).toBeNull();

    const savedExisting = saveWorkout({ ...newer, title: 'Updated newer' });
    expect(savedExisting.title).toBe('Updated newer');

    const duplicate = duplicateWorkout(savedExisting.id, { title: 'Copy' });
    expect(duplicate).toMatchObject({
      title: 'Copy',
      isPreset: false,
    });
    expect(duplicate.items[0].id).not.toBe(savedExisting.items[0].id);
    expect(duplicateWorkout('missing')).toBeNull();

    expect(() => saveWorkout(null)).toThrow(TypeError);
    expect(() => createWorkoutRecord({ title: '', items: [] })).toThrow(/Workout title/);

    expect(setWorkouts([{ id: 'manual', title: 'Manual', items: [] }])[0].id).toBe('manual');
    expect(deleteWorkout('missing')).toBe(false);
    expect(deleteWorkout('manual')).toBe(true);
  });

  test('history repository creates, updates, filters, and deletes entries', () => {
    const older = createHistoryRecord({
      workoutTitleSnapshot: 'Older',
      startedAt: '2026-04-01T09:00:00.000Z',
      endedAt: '2026-04-01T09:10:00.000Z',
    });
    const newer = saveHistoryEntry({
      workoutTitleSnapshot: 'Newer',
      startedAt: '2026-04-02T09:00:00.000Z',
      endedAt: '2026-04-02T09:10:00.000Z',
    });

    expect(
      getHistory()
        .map((entry) => entry.workoutTitleSnapshot)
        .sort(),
    ).toEqual(['Newer', 'Older']);
    expect(readAllHistory()).toHaveLength(2);
    expect(getHistoryEntry(older.id).workoutTitleSnapshot).toBe('Older');
    expect(readHistoryById(newer.id).workoutTitleSnapshot).toBe('Newer');
    expect(getHistoryByDate('2026-04-01').map((entry) => entry.id)).toEqual([older.id]);

    expect(updateHistoryEntry(older.id, { note: 'felt good' })).toMatchObject({
      id: older.id,
      note: 'felt good',
    });
    expect(updateHistoryEntry('missing', { note: 'missing' })).toBeNull();
    expect(saveHistoryEntry({ ...newer, ratingEmoji: 'ok' })).toMatchObject({
      id: newer.id,
      ratingEmoji: 'ok',
    });
    expect(() => saveHistoryEntry(null)).toThrow(TypeError);

    expect(setHistory([{ id: 'manual', startedAt: '2026-04-03T09:00:00.000Z' }])[0].id).toBe(
      'manual',
    );
    expect(deleteHistoryEntry('missing')).toBe(false);
    expect(deleteHistoryEntry('manual')).toBe(true);
  });
});
