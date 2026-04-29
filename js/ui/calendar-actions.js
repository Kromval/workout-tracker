/**
 * @module js/ui/calendar-actions
 */
import { moveProgressCalendarMonth, selectProgressCalendarDay } from '../features/calendar.js';

/**
 * Handles progress calendar action interactions.
 * @param {HTMLElement} button button input
 * @param {*} renderApp render app input
 * @param {object} state state input
 */
export function handleProgressCalendarAction(button, renderApp, state) {
  const action = button.dataset.progressCalendarAction;
  const delta = action === 'previous' ? -1 : action === 'next' ? 1 : 0;

  if (delta === 0) {
    return;
  }

  moveProgressCalendarMonth(delta);
  renderApp(state);
}

/**
 * Handles progress calendar day interactions.
 * @param {HTMLElement} button button input
 * @param {*} renderApp render app input
 * @param {object} state state input
 */
export function handleProgressCalendarDay(button, renderApp, state) {
  selectProgressCalendarDay(button.dataset.progressCalendarDay);
  renderApp(state);
}
