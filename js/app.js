import { loadExercises } from './exercises.js';
import { initRouter } from './router.js';
import { setExercises, state, subscribe } from './state.js';
import { initShell, renderApp } from './ui.js';

async function bootstrap() {
  initShell(state);
  subscribe(renderApp);

  // Load static data first, then let the router choose the active view.
  setExercises(await loadExercises());
  initRouter();
}

bootstrap();
