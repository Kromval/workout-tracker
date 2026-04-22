import { loadExercises } from './features/exercises.js';
import { registerServiceWorker } from './core/pwa.js';
import { initRouter } from './core/router.js';
import { setExercises, state, subscribe } from './core/state.js';
import { initShell, renderApp } from './ui/shell.js';

async function bootstrap() {
  registerServiceWorker();
  initShell(state);
  subscribe(renderApp);

  // Load static data first, then let the router choose the active view.
  setExercises(await loadExercises());
  initRouter();
}

bootstrap();
