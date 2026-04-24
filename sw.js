const CACHE_NAME = 'workout-planner-v9';

const APP_SHELL = [
  './',
  './index.html',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon.svg',
  './assets/icons/maskable-icon.svg',
  './js/app.js',
  './js/core/pwa.js',
  './js/core/router.js',
  './js/core/selectors.js',
  './js/core/state.js',
  './js/core/utils.js',
  './js/features/audio.js',
  './js/features/body-focus.js',
  './js/features/calendar.js',
  './js/features/contraindications.js',
  './js/features/equipment.js',
  './js/features/exercise-compatibility.js',
  './js/features/exercise-scoring.js',
  './js/features/exercises-data.js',
  './js/features/exercises.js',
  './js/features/history.js',
  './js/features/presets.js',
  './js/features/recommendations.js',
  './js/features/workouts.js',
  './js/i18n/index.js',
  './js/i18n/messages-en.js',
  './js/i18n/messages-ru.js',
  './js/pages/components.js',
  './js/pages/exercise-page-renderers.js',
  './js/pages/form-renderers.js',
  './js/pages/home-page-renderers.js',
  './js/pages/home-stats.js',
  './js/pages/recommendation-page-renderers.js',
  './js/pages/renderers.js',
  './js/pages/settings-page-renderers.js',
  './js/pages/settings-renderers.js',
  './js/pages/workout-page-renderers.js',
  './js/pages/workout-renderers.js',
  './js/session/core.js',
  './js/session/hooks.js',
  './js/session/model.js',
  './js/session/snapshot.js',
  './js/session/steps.js',
  './js/session/ui-format.js',
  './js/session/ui.js',
  './js/session/utils.js',
  './js/storage/core.js',
  './js/storage/helpers.js',
  './js/storage/historyRepository.js',
  './js/storage/migrations.js',
  './js/storage/profileRepository.js',
  './js/storage/records.js',
  './js/storage/schema.js',
  './js/storage/sessionRepository.js',
  './js/storage/settingsRepository.js',
  './js/storage/store.js',
  './js/storage/workoutRepository.js',
  './js/ui/audio-file-utils.js',
  './js/ui/calendar-actions.js',
  './js/ui/calendar-event-bindings.js',
  './js/ui/catalog-filters.js',
  './js/ui/event-bindings.js',
  './js/ui/exercise-actions.js',
  './js/ui/exercise-event-bindings.js',
  './js/ui/form-utils.js',
  './js/ui/navigation.js',
  './js/ui/notices.js',
  './js/ui/page-updates.js',
  './js/ui/settings-actions.js',
  './js/ui/settings-event-bindings.js',
  './js/ui/shell-chrome.js',
  './js/ui/shell-event-bindings.js',
  './js/ui/shell.js',
  './js/ui/workout-actions.js',
  './js/ui/workout-event-bindings.js',
  './manifest.webmanifest',
  './styles/base.css',
  './styles/calendar.css',
  './styles/components.css',
  './styles/exercises.css',
  './styles/fixes.css',
  './styles/home.css',
  './styles/layout.css',
  './styles/navigation.css',
  './styles/responsive.css',
  './styles/session.css',
  './styles/settings.css',
  './styles/variables.css',
  './styles/workouts.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
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
        .catch(() => caches.match('./index.html')),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cachedResponse) =>
        cachedResponse ||
        fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }

          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        }),
    ),
  );
});
