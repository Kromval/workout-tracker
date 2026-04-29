/**
 * @module js/storage/sessionRepository
 */
import { clone } from './helpers.js';
import { loadStore, saveStore } from './store.js';

/**
 * Gets active session.
 * @returns {*} result
 */
export function getActiveSession() {
  return loadStore().activeSession;
}

/**
 * Sets active session.
 * @param {*} session session input
 * @returns {*} result
 */
export function setActiveSession(session) {
  const store = loadStore();
  store.activeSession = session ? clone(session) : null;
  return saveStore(store).activeSession;
}

/**
 * Saves active session.
 * @param {*} session session input
 * @returns {*} result
 */
export function saveActiveSession(session) {
  return setActiveSession(session);
}

/**
 * Runs clear active session.
 */
export function clearActiveSession() {
  const store = loadStore();
  store.activeSession = null;
  saveStore(store);
}
