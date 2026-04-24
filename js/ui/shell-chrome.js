import { t } from '../i18n/index.js';
import { routes } from '../core/router.js';
import { selectLanguage, selectRoute, selectTheme } from '../core/selectors.js';
import { updateSettings } from '../core/state.js';
import { navRoutes, routeLabels } from './navigation.js';

const themeQuery =
  typeof window !== 'undefined' ? window.matchMedia?.('(prefers-color-scheme: dark)') : null;

export function renderNav(state) {
  const nav = document.querySelector('#app-nav');
  if (!nav) return;

  nav.innerHTML = routes
    .filter((route) => navRoutes.includes(route))
    .map(
      (route) => `
    <a class="nav__link" href="#${route}" ${selectRoute(state) === route ? 'aria-current="page"' : ''}>${t(state, routeLabels[route])}</a>
  `,
    )
    .join('');

  document
    .querySelector('#nav-toggle')
    ?.setAttribute('aria-label', t(state, 'navigationToggleLabel'));
  nav.setAttribute('aria-label', t(state, 'mainNavigationLabel'));
}

export function bindHeaderControls(state) {
  document.querySelector('#nav-toggle')?.addEventListener('click', () => {
    const nav = document.querySelector('#app-nav');
    const button = document.querySelector('#nav-toggle');
    const isOpen = nav?.dataset.open === 'true';

    nav?.toggleAttribute('data-open', !isOpen);
    if (nav) {
      nav.dataset.open = String(!isOpen);
    }
    button?.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const nextTheme = getResolvedTheme(selectTheme(state)) === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
  });

  document.querySelector('#language-toggle')?.addEventListener('click', () => {
    const nextLanguage = selectLanguage(state) === 'ru' ? 'en' : 'ru';
    updateSettings({ language: nextLanguage });
  });
}

export function closeNavMenu() {
  const nav = document.querySelector('#app-nav');
  const button = document.querySelector('#nav-toggle');

  if (nav) {
    nav.dataset.open = 'false';
    nav.removeAttribute('data-open');
  }

  button?.setAttribute('aria-expanded', 'false');
}

export function updateHeaderControls(state) {
  const languageToggle = document.querySelector('#language-toggle');
  if (languageToggle) {
    languageToggle.textContent = selectLanguage(state).toUpperCase();
    languageToggle.setAttribute('aria-label', t(state, 'languageToggleLabel'));
  }

  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = getResolvedTheme(selectTheme(state)) === 'dark' ? '☀' : '◐';
    themeToggle.setAttribute('aria-label', t(state, 'themeToggleLabel'));
  }
}

export function updateShellLabels(state) {
  const brandText = document.querySelector('#app-brand-text');
  const brandMark = document.querySelector('#app-brand-mark');
  const brandLink = document.querySelector('#app-brand-link');
  const route = selectRoute(state);
  const routeTitle = t(state, routeLabels[route] || 'homeTitle');
  const brand = t(state, 'appBrand');

  if (brandText) {
    brandText.textContent = brand;
  }

  if (brandMark) {
    brandMark.textContent = t(state, 'appBrandMark');
  }

  brandLink?.setAttribute('aria-label', t(state, 'brandHomeLabel'));

  document.title = route === 'home' ? brand : `${routeTitle} - ${brand}`;
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = getResolvedTheme(theme);
}

export function applyDensity(density) {
  document.documentElement.dataset.density = density === 'compact' ? 'compact' : 'comfortable';
}

export function getResolvedTheme(theme) {
  return theme === 'system' ? (themeQuery?.matches ? 'dark' : 'light') : theme;
}

export function syncDocumentLanguage(state) {
  document.documentElement.lang = selectLanguage(state);
}

export function bindSystemThemeListener(state) {
  const handleSystemThemeChange = () => {
    if (selectTheme(state) === 'system') {
      applyTheme(selectTheme(state));
      updateHeaderControls(state);
    }
  };

  if (themeQuery?.addEventListener) {
    themeQuery.addEventListener('change', handleSystemThemeChange);
  } else if (themeQuery?.addListener) {
    themeQuery.addListener(handleSystemThemeChange);
  }
}
