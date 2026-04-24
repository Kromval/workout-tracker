import { DEFAULT_STORE, STORAGE_KEY } from './schema.js';
import { isFutureStorageVersion, migrateStore } from './migrations.js';
import { clone, createId, uniqueStrings } from './helpers.js';
import { sanitizeStore } from './records.js';

export function loadStore() {
  const rawStore = readRawStore();
  const store = migrateStore(rawStore);

  if (!isFutureStorageVersion(rawStore)) {
    initializeStorage(store);
  }

  return store;
}

export function saveStore(store) {
  const nextStore = sanitizeStore(store);
  writeRawStore(nextStore);
  return clone(nextStore);
}

export function resetStore() {
  writeRawStore(DEFAULT_STORE);
  return clone(DEFAULT_STORE);
}

export function getDefaultStore() {
  return clone(DEFAULT_STORE);
}

export function initializeStorage(store = DEFAULT_STORE) {
  if (!hasLocalStorage()) {
    return clone(store);
  }

  const nextStore = sanitizeStore(store);
  writeRawStore(nextStore);
  return clone(nextStore);
}

export function generateId(prefix = 'id') {
  return createId(prefix);
}

export function generateUniqueId(prefix = 'id', existingIds = []) {
  const usedIds = new Set(uniqueStrings(existingIds));
  let id = createId(prefix);

  while (usedIds.has(id)) {
    id = createId(prefix);
  }

  return id;
}

function readRawStore() {
  if (!hasLocalStorage()) {
    return clone(DEFAULT_STORE);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(DEFAULT_STORE);
  } catch (error) {
    console.warn('Failed to read workout tracker storage. Defaults were used.', error);
    return clone(DEFAULT_STORE);
  }
}

function writeRawStore(store) {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('Failed to write workout tracker storage.', error);
  }
}

function hasLocalStorage() {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch (error) {
    console.warn('Local storage is unavailable.', error);
    return false;
  }
}
