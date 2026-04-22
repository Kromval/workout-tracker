import {
  moveProgressCalendarMonth,
  selectProgressCalendarDay,
} from '../features/calendar.js';

export function handleProgressCalendarAction(button, renderApp, state) {
  const action = button.dataset.progressCalendarAction;
  const delta = action === 'previous' ? -1 : action === 'next' ? 1 : 0;

  if (delta === 0) {
    return;
  }

  moveProgressCalendarMonth(delta);
  renderApp(state);
}

export function handleProgressCalendarDay(button, renderApp, state) {
  selectProgressCalendarDay(button.dataset.progressCalendarDay);
  renderApp(state);
}
