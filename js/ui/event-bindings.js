import { bindCalendarEvents } from './calendar-event-bindings.js';
import { bindExerciseEvents } from './exercise-event-bindings.js';
import { bindSettingsEvents } from './settings-event-bindings.js';
import { bindShellChromeEvents } from './shell-event-bindings.js';
import { bindWorkoutEvents } from './workout-event-bindings.js';

export function bindShellEvents(state, renderApp) {
  bindShellChromeEvents();
  bindExerciseEvents(state);
  bindWorkoutEvents(state);
  bindSettingsEvents(state);
  bindCalendarEvents(state, renderApp);

  document.addEventListener('change', (event) => {
    event.target?.removeAttribute?.('aria-invalid');
  });

  document.addEventListener('input', (event) => {
    event.target?.removeAttribute?.('aria-invalid');
  });
}
