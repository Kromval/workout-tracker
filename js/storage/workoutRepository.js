import {
  asArray,
  createId,
  findById,
  isPlainObject,
  nowIso,
  sortByUpdatedAtDesc,
  upsertById,
} from './helpers.js';
import {
  createWorkout,
  createWorkoutItem,
  sanitizeWorkout,
  validateWorkoutForSave,
} from './records.js';
import { generateUniqueId, loadStore, saveStore } from './store.js';

export function listWorkouts() {
  return getWorkouts();
}

export function readAllWorkouts() {
  return getWorkouts();
}

export function getWorkouts() {
  return sortByUpdatedAtDesc(loadStore().workouts);
}

export function setWorkouts(workouts) {
  const store = loadStore();
  store.workouts = sortByUpdatedAtDesc(asArray(workouts).map(sanitizeWorkout));
  return saveStore(store).workouts;
}

export function getWorkout(id) {
  return findById(loadStore().workouts, id);
}

export function readWorkoutById(id) {
  return getWorkout(id);
}

/**
 * Persists a new workout after normalization and validation.
 * @throws {Error} when the workout is missing required fields.
 */
export function createWorkoutRecord(workout = {}) {
  const store = loadStore();
  const now = nowIso();
  const normalized = createWorkout({
    ...workout,
    id: generateUniqueId(
      'workout',
      store.workouts.map((item) => item.id),
    ),
    createdAt: now,
    updatedAt: now,
    isPreset: Boolean(workout.isPreset),
  });

  validateWorkoutForSave(normalized);

  store.workouts = sortByUpdatedAtDesc([...store.workouts, normalized]);
  return saveStore(store).workouts.find((item) => item.id === normalized.id);
}

/**
 * Creates or updates a workout record and keeps persisted data sanitized.
 * @throws {Error} when validation fails.
 */
export function saveWorkout(workout) {
  if (!isPlainObject(workout)) {
    throw new TypeError('Workout must be an object.');
  }

  if (!workout.id) {
    return createWorkoutRecord(workout);
  }

  const store = loadStore();
  const existing = findById(store.workouts, workout.id);
  const normalized = createWorkout({
    ...existing,
    ...workout,
    id: workout.id || createId('workout'),
    createdAt: workout.createdAt || existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
  });

  validateWorkoutForSave(normalized);

  store.workouts = sortByUpdatedAtDesc(upsertById(store.workouts, normalized));
  return saveStore(store).workouts.find((item) => item.id === normalized.id);
}

export function updateWorkout(id, patch = {}) {
  const store = loadStore();
  const existing = findById(store.workouts, id);

  if (!existing) {
    return null;
  }

  const normalized = createWorkout({
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: nowIso(),
  });

  validateWorkoutForSave(normalized);

  store.workouts = sortByUpdatedAtDesc(upsertById(store.workouts, normalized));
  return saveStore(store).workouts.find((item) => item.id === normalized.id);
}

export function deleteWorkout(id) {
  const store = loadStore();
  const initialLength = store.workouts.length;
  store.workouts = store.workouts.filter((workout) => workout.id !== id);

  if (store.settings.lastOpenedWorkoutId === id) {
    store.settings.lastOpenedWorkoutId = null;
  }

  saveStore(store);
  return store.workouts.length !== initialLength;
}

export function duplicateWorkout(id, overrides = {}) {
  const source = getWorkout(id);

  if (!source) {
    return null;
  }

  const copy = createWorkout({
    ...source,
    ...overrides,
    id: createId('workout'),
    title: overrides.title || `${source.title} copy`,
    isPreset: false,
    items: source.items.map((item, index) =>
      createWorkoutItem({
        ...item,
        id: createId('workout-item'),
        order: index,
      }),
    ),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  });

  return saveWorkout(copy);
}
