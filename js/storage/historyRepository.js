import {
  asArray,
  findById,
  isPlainObject,
  normalizeDateKey,
  nowIso,
  sortHistoryEntries,
  upsertById,
} from './helpers.js';
import { createHistoryEntry, sanitizeHistoryEntry } from './records.js';
import { generateUniqueId, loadStore, saveStore } from './store.js';

export function listHistory() {
  return getHistory();
}

export function readAllHistory() {
  return getHistory();
}

export function getHistory() {
  return sortHistoryEntries(loadStore().history);
}

export function setHistory(history) {
  const store = loadStore();
  store.history = sortHistoryEntries(asArray(history).map(sanitizeHistoryEntry));
  return saveStore(store).history;
}

export function getHistoryEntry(id) {
  return findById(loadStore().history, id);
}

export function readHistoryById(id) {
  return getHistoryEntry(id);
}

export function createHistoryRecord(entry = {}) {
  const store = loadStore();
  const now = nowIso();
  const normalized = createHistoryEntry({
    ...entry,
    id: generateUniqueId(
      'history',
      store.history.map((item) => item.id),
    ),
    createdAt: now,
    updatedAt: now,
  });

  store.history = sortHistoryEntries([...store.history, normalized]);
  return saveStore(store).history.find((item) => item.id === normalized.id);
}

export function saveHistoryEntry(entry) {
  if (!isPlainObject(entry)) {
    throw new TypeError('History entry must be an object.');
  }

  if (!entry.id) {
    return createHistoryRecord(entry);
  }

  const store = loadStore();
  const existing = findById(store.history, entry.id);
  const normalized = createHistoryEntry({
    ...existing,
    ...entry,
    id: entry.id,
    createdAt: entry.createdAt || existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
  });

  store.history = sortHistoryEntries(upsertById(store.history, normalized));
  return saveStore(store).history.find((item) => item.id === normalized.id);
}

export function updateHistoryEntry(id, patch = {}) {
  const store = loadStore();
  const existing = findById(store.history, id);

  if (!existing) {
    return null;
  }

  const normalized = createHistoryEntry({
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: nowIso(),
  });

  store.history = sortHistoryEntries(upsertById(store.history, normalized));
  return saveStore(store).history.find((item) => item.id === normalized.id);
}

export function deleteHistoryEntry(id) {
  const store = loadStore();
  const initialLength = store.history.length;
  store.history = store.history.filter((entry) => entry.id !== id);
  saveStore(store);
  return store.history.length !== initialLength;
}

export function getHistoryByDate(dateString) {
  const day = normalizeDateKey(dateString);
  return sortHistoryEntries(
    loadStore().history.filter((entry) => normalizeDateKey(entry.startedAt) === day),
  );
}
