import { handleProgressCalendarAction, handleProgressCalendarDay } from './calendar-actions.js';

export function bindCalendarEvents(state, renderApp) {
  document.addEventListener('click', (event) => {
    const calendarActionButton = event.target?.closest?.('[data-progress-calendar-action]');
    if (calendarActionButton) {
      handleProgressCalendarAction(calendarActionButton, renderApp, state);
      return;
    }

    const calendarDayButton = event.target?.closest?.('[data-progress-calendar-day]');
    if (calendarDayButton) {
      handleProgressCalendarDay(calendarDayButton, renderApp, state);
    }
  });
}
