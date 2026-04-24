import { clone } from './helpers.js';
import { loadStore, saveStore } from './store.js';

export function getActiveSession() {
  return loadStore().activeSession;
}

export function setActiveSession(session) {
  const store = loadStore();
  store.activeSession = session ? clone(session) : null;
  return saveStore(store).activeSession;
}

export function saveActiveSession(session) {
  return setActiveSession(session);
}

export function clearActiveSession() {
  const store = loadStore();
  store.activeSession = null;
  saveStore(store);
}
