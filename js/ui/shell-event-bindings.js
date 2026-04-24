import { closeNavMenu } from './shell-chrome.js';

export function bindShellChromeEvents() {
  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('#app-nav .nav__link')) {
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
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNavMenu();
    }
  });
}
