import { setRoute } from './state.js';

export const routes = [
  'home',
  'exercises',
  'exercise-create',
  'exercise-edit',
  'exercise-view',
  'workout-create',
  'workout-edit',
  'workout-view',
  'workout-run',
  'settings',
];

export const defaultRoute = 'home';

// Hash routing keeps the app static-server friendly and framework-free.
export function initRouter() {
  window.addEventListener('hashchange', syncRouteFromHash);
  syncRouteFromHash();
}

export function getCurrentRoute() {
  const route = normalizeHash(window.location.hash);
  return routes.includes(route) ? route : defaultRoute;
}

export function getRouteParams() {
  const [, id = ''] = getHashParts(window.location.hash);
  return {
    id: decodeURIComponent(id),
  };
}

function syncRouteFromHash() {
  setRoute(getCurrentRoute(), getRouteParams());
}

function normalizeHash(hash) {
  return getHashParts(hash)[0] || defaultRoute;
}

function getHashParts(hash) {
  return hash
    .replace(/^#\/?/, '')
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}
