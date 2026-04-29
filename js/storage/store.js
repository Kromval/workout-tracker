/**
 * @module js/storage/store
 */
import { DEFAULT_STORE, STORAGE_KEY } from './schema.js';
import { isFutureStorageVersion, migrateStore } from './migrations.js';
import { clone, createId, uniqueStrings } from './helpers.js';
import { sanitizeStore } from './records.js';

/**
 * Runs load store.
 * @returns {*} result
 */
export function loadStore() {
  const rawStore = readRawStore();
  const store = migrateStore(rawStore);

  if (!isFutureStorageVersion(rawStore)) {
    initializeStorage(store);
  }

  return store;
}

/**
 * Saves store.
 * @param {object} store store input
 * @returns {*} result
 */
export function saveStore(store) {
  const nextStore = sanitizeStore(store);
  writeRawStore(nextStore);
  return clone(nextStore);
}

/**
 * Runs reset store.
 * @returns {*} result
 */
export function resetStore() {
  writeRawStore(DEFAULT_STORE);
  return clone(DEFAULT_STORE);
}

/**
 * Gets default store.
 * @returns {*} result
 */
export function getDefaultStore() {
  return clone(DEFAULT_STORE);
}

/**
 * Initializes initialize storage.
 * @param {object} [store=DEFAULT_STORE] store input
 * @returns {*} result
 */
export function initializeStorage(store = DEFAULT_STORE) {
  if (!hasLocalStorage()) {
    return clone(store);
  }

  const nextStore = sanitizeStore(store);
  writeRawStore(nextStore);
  return clone(nextStore);
}

/**
 * Runs generate id.
 * @param {string} [prefix="id"] prefix input
 * @returns {*} result
 */
export function generateId(prefix = 'id') {
  return createId(prefix);
}

/**
 * Runs generate unique id.
 * @param {string} [prefix="id"] prefix input
 * @param {Array} [existingIds=[]] existing ids input
 * @returns {*} result
 */
export function generateUniqueId(prefix = 'id', existingIds = []) {
  const usedIds = new Set(uniqueStrings(existingIds));
  let id = createId(prefix);

  while (usedIds.has(id)) {
    id = createId(prefix);
  }

  return id;
}

/**
 * Reads raw store.
 * @returns {*} result
 */
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

/**
 * Runs write raw store.
 * @param {object} store store input
 */
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

/**
 * Checks whether local storage.
 * @returns {boolean} predicate result
 */
function hasLocalStorage() {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch (error) {
    console.warn('Local storage is unavailable.', error);
    return false;
  }
}
