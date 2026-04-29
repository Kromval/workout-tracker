/**
 * @module js/core/router
 */
import { setRoute } from './state.js';

/**
 * Module-level routes value.
 * @type {Array}
 */
export const routes = [
  'home',
  'exercises',
  'recommendations',
  'exercise-create',
  'exercise-edit',
  'exercise-view',
  'workout-create',
  'workout-generate',
  'workout-edit',
  'workout-view',
  'workout-run',
  'settings',
];

/**
 * Module-level default route value.
 * @type {string}
 */
export const defaultRoute = 'home';

// Hash routing keeps the app static-server friendly and framework-free.
/**
 * Initializes router.
 */
export function initRouter() {
  window.addEventListener('hashchange', syncRouteFromHash);
  syncRouteFromHash();
}

/**
 * Gets current route.
 * @returns {*} result
 */
export function getCurrentRoute() {
  const route = normalizeHash(window.location.hash);
  return routes.includes(route) ? route : defaultRoute;
}

/**
 * Gets route params.
 * @returns {*} result
 */
export function getRouteParams() {
  const [, id = ''] = getHashParts(window.location.hash);
  return {
    id: safeDecodeURIComponent(id),
  };
}

/**
 * Runs sync route from hash.
 */
function syncRouteFromHash() {
  setRoute(getCurrentRoute(), getRouteParams());
}

/**
 * Normalizes hash.
 * @param {string} hash hash input
 * @returns {*} result
 */
function normalizeHash(hash) {
  return getHashParts(hash)[0] || defaultRoute;
}

/**
 * Gets hash parts.
 * @param {string} hash hash input
 * @returns {*} result
 */
function getHashParts(hash) {
  return hash
    .replace(/^#\/?/, '')
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Decodes URI components without letting malformed hashes break routing.
 * @param {string} value value input
 * @returns {string} decoded value or original value
 */
function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
