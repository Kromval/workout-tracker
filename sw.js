const CACHE_NAME = 'workout-planner-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon.svg',
  './assets/icons/maskable-icon.svg',
  './styles/variables.css',
  './styles/base.css',
  './styles/layout.css',
  './styles/components.css',
  './styles/fixes.css',
  './js/app.js',
  './js/audio.js',
  './js/calendar.js',
  './js/exercises.js',
  './js/exercises-data.js',
  './js/history.js',
  './js/i18n.js',
  './js/pages.js',
  './js/pages-components.js',
  './js/pages-renderers.js',
  './js/presets.js',
  './js/router.js',
  './js/session.js',
  './js/session-core.js',
  './js/session-model.js',
  './js/session-ui.js',
  './js/state.js',
  './js/storage.js',
  './js/storage-core.js',
  './js/storage-schema.js',
  './js/ui.js',
  './js/ui-navigation.js',
  './js/ui-shell.js',
  './js/utils.js',
  './js/workouts.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => cachedResponse || fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }))
  );
});
