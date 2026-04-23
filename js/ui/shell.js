import { pageRenderers } from '../pages/renderers.js';
import { defaultRoute } from '../core/router.js';
import { initWorkoutRunUi } from '../session/ui.js';
import { selectDensity, selectRoute, selectTheme } from '../core/selectors.js';
import { bindShellEvents } from './event-bindings.js';
import { renderPendingNotice } from './notices.js';
import { updateCurrentPage } from './page-updates.js';
import {
  applyDensity,
  applyTheme,
  bindHeaderControls,
  bindSystemThemeListener,
  renderNav,
  syncDocumentLanguage,
  updateHeaderControls,
  updateShellLabels,
} from './shell-chrome.js';

let mountedRoute = '';

/**
 * Initializes persistent shell behavior that survives route re-renders.
 */
export function initShell(state) {
  renderNav(state);
  updateHeaderControls(state);
  updateShellLabels(state);
  bindHeaderControls(state);
  bindShellEvents(state, renderApp);
  applyTheme(selectTheme(state));
  applyDensity(selectDensity(state));
  syncDocumentLanguage(state);
  bindSystemThemeListener(state);
}

/**
 * Renders the current route into #app and runs page-specific initializers.
 */
export function renderApp(state, meta = {}) {
  renderNav(state);
  updateHeaderControls(state);
  updateShellLabels(state);
  applyTheme(selectTheme(state));
  applyDensity(selectDensity(state));
  syncDocumentLanguage(state);

  const app = document.querySelector('#app');
  if (!app) return;

  const route = selectRoute(state);
  const routeChanged = route !== mountedRoute;

  if (routeChanged || !updateCurrentPage(state, meta)) {
    const renderPage = pageRenderers[route] || pageRenderers[defaultRoute];
    app.innerHTML = renderPage(state);
    renderPendingNotice(app);
    app.focus({ preventScroll: true });
    initWorkoutRunUi(state);
  }

  mountedRoute = route;
}
