import { t } from '../i18n/index.js';
import { routes } from '../core/router.js';
import {
  selectLanguage,
  selectLastOpenedWorkout,
  selectRoute,
  selectTheme,
} from '../core/selectors.js';
import { updateSettings } from '../core/state.js';
import { navRoutes, routeLabels } from './navigation.js';

const themeQuery =
  typeof window !== 'undefined' ? window.matchMedia?.('(prefers-color-scheme: dark)') : null;

export function renderNav(state) {
  const nav = document.querySelector('#app-nav');
  const mobileNav = document.querySelector('#mobile-app-nav');

  if (nav) {
    nav.innerHTML = routes
      .filter((route) => navRoutes.includes(route))
      .map(
        (route) => `
    <a class="nav__link" href="#${route}" ${selectRoute(state) === route ? 'aria-current="page"' : ''}>${t(state, routeLabels[route])}</a>
  `,
      )
      .join('');

    nav.setAttribute('aria-label', t(state, 'mainNavigationLabel'));
  }

  if (mobileNav) {
    mobileNav.innerHTML = renderMobileAppNav(state);
    mobileNav.setAttribute('aria-label', t(state, 'mainNavigationLabel'));
  }

  document
    .querySelector('#nav-toggle')
    ?.setAttribute('aria-label', t(state, 'navigationToggleLabel'));
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

  document.querySelector('#mobile-app-nav')?.addEventListener('click', (event) => {
    const moreButton = event.target.closest('[data-mobile-nav-more]');
    if (!moreButton) {
      closeMobileNavMenu();
      return;
    }

    const menu = document.querySelector('[data-mobile-nav-menu]');
    const isOpen = menu?.dataset.open === 'true';

    if (menu) {
      menu.dataset.open = String(!isOpen);
      menu.toggleAttribute('data-open', !isOpen);
    }

    moreButton.setAttribute('aria-expanded', String(!isOpen));
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
  closeMobileNavMenu();
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

function renderMobileAppNav(state) {
  const route = selectRoute(state);
  const lastWorkout = selectLastOpenedWorkout(state);
  const workoutHref = lastWorkout
    ? `#workout-view/${encodeURIComponent(lastWorkout.id)}`
    : '#workout-create';
  const workoutActive = route.startsWith('workout-');
  const moreActive = route === 'settings' || route.startsWith('exercise-');

  const primaryItems = [
    { route: 'home', href: '#home', labelKey: 'navHome', icon: '⌂', active: route === 'home' },
    {
      route: 'exercises',
      href: '#exercises',
      labelKey: 'navExercises',
      icon: '◇',
      active: route === 'exercises',
    },
    {
      route: 'workout',
      href: workoutHref,
      labelKey: lastWorkout ? 'navWorkoutView' : 'navWorkoutCreate',
      icon: '＋',
      active: workoutActive,
    },
    {
      route: 'recommendations',
      href: '#recommendations',
      labelKey: 'navRecommendations',
      icon: '★',
      active: route === 'recommendations',
    },
  ];
  const moreItems = [
    { href: '#settings', labelKey: 'navSettings' },
    { href: '#exercise-create', labelKey: 'createExercise' },
    { href: '#workout-create', labelKey: 'navWorkoutCreate' },
  ];

  return `
    <div class="mobile-app-nav__bar">
      ${primaryItems
        .map(
          (item) => `
            <a class="mobile-app-nav__item" href="${item.href}" data-mobile-nav-route="${item.route}" ${item.active ? 'aria-current="page"' : ''}>
              <span class="mobile-app-nav__icon" aria-hidden="true">${item.icon}</span>
              <span class="mobile-app-nav__label">${t(state, item.labelKey)}</span>
            </a>
          `,
        )
        .join('')}
      <div class="mobile-app-nav__more ${moreActive ? 'mobile-app-nav__more--active' : ''}">
        <button class="mobile-app-nav__item mobile-app-nav__item--button" type="button" data-mobile-nav-more aria-expanded="false" aria-haspopup="menu">
          <span class="mobile-app-nav__icon" aria-hidden="true">☰</span>
          <span class="mobile-app-nav__label">${t(state, 'navMore')}</span>
        </button>
        <div class="mobile-app-nav__menu" data-mobile-nav-menu role="menu">
          ${moreItems
            .map(
              (item) => `
                <a class="mobile-app-nav__menu-item" href="${item.href}" role="menuitem">${t(state, item.labelKey)}</a>
              `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;
}

function closeMobileNavMenu() {
  const menu = document.querySelector('[data-mobile-nav-menu]');
  const button = document.querySelector('[data-mobile-nav-more]');

  if (menu) {
    menu.dataset.open = 'false';
    menu.removeAttribute('data-open');
  }

  button?.setAttribute('aria-expanded', 'false');
}
