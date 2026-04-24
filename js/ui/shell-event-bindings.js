import { closeNavMenu } from './shell-chrome.js';

export function bindShellChromeEvents() {
  document.addEventListener('click', (event) => {
    if (
      event.target?.closest?.('#app-nav .nav__link') ||
      event.target?.closest?.('#mobile-app-nav a')
    ) {
      closeNavMenu();
    }
  });

  document.addEventListener('click', (event) => {
    const nav = document.querySelector('#app-nav');

    if (
      nav?.dataset.open === 'true' &&
      !event.target?.closest?.('#app-nav') &&
      !event.target?.closest?.('#nav-toggle')
    ) {
      closeNavMenu();
    }

    const mobileMenu = document.querySelector('[data-mobile-nav-menu]');
    if (mobileMenu?.dataset.open === 'true' && !event.target?.closest?.('#mobile-app-nav')) {
      closeNavMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNavMenu();
    }
  });
}
