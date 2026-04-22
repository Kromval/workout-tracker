const CACHE_NAME = 'workout-planner-v9';

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon.svg",
  "./assets/icons/maskable-icon.svg",
  "./js/app.js",
  "./js/core/pwa.js",
  "./js/core/router.js",
  "./js/core/selectors.js",
  "./js/core/state.js",
  "./js/core/utils.js",
  "./js/features/audio.js",
  "./js/features/calendar.js",
  "./js/features/exercises-data.js",
  "./js/features/exercises.js",
  "./js/features/history.js",
  "./js/features/presets.js",
  "./js/features/workouts.js",
  "./js/i18n/index.js",
  "./js/i18n/messages-en.js",
  "./js/i18n/messages-ru.js",
  "./js/pages/components.js",
  "./js/pages/form-renderers.js",
  "./js/pages/home-stats.js",
  "./js/pages/renderers.js",
  "./js/pages/settings-renderers.js",
  "./js/pages/workout-renderers.js",
  "./js/session/core.js",
  "./js/session/hooks.js",
  "./js/session/model.js",
  "./js/session/snapshot.js",
  "./js/session/steps.js",
  "./js/session/ui-format.js",
  "./js/session/ui.js",
  "./js/session/utils.js",
  "./js/storage/core.js",
  "./js/storage/helpers.js",
  "./js/storage/migrations.js",
  "./js/storage/records.js",
  "./js/storage/schema.js",
  "./js/ui/audio-file-utils.js",
  "./js/ui/calendar-actions.js",
  "./js/ui/catalog-filters.js",
  "./js/ui/event-bindings.js",
  "./js/ui/exercise-actions.js",
  "./js/ui/form-utils.js",
  "./js/ui/navigation.js",
  "./js/ui/notices.js",
  "./js/ui/settings-actions.js",
  "./js/ui/shell-chrome.js",
  "./js/ui/shell.js",
  "./js/ui/workout-actions.js",
  "./styles/base.css",
  "./styles/components.css",
  "./styles/fixes.css",
  "./styles/layout.css",
  "./styles/variables.css"
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
