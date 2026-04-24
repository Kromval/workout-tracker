import { applyExerciseCatalogFilters } from './catalog-filters.js';
import { handleExerciseAction, handleExerciseFormSubmit } from './exercise-actions.js';

export function bindExerciseEvents(state) {
  document.addEventListener('click', (event) => {
    const exerciseActionButton = event.target?.closest?.('[data-exercise-action]');
    if (exerciseActionButton) {
      handleExerciseAction(exerciseActionButton, state);
    }
  });

  document.addEventListener('submit', (event) => {
    const exerciseForm = event.target?.closest?.('[data-exercise-form]');
    if (exerciseForm) {
      event.preventDefault();
      handleExerciseFormSubmit(exerciseForm, state);
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target?.matches?.('[data-exercises-search]')) {
      applyExerciseCatalogFilters();
    }
  });

  document.addEventListener('change', (event) => {
    if (
      event.target?.matches?.(
        '[data-exercises-type-filter], [data-exercises-muscle-filter], [data-exercises-equipment-filter], [data-exercises-profile-level-filter]',
      )
    ) {
      applyExerciseCatalogFilters();
    }
  });
}
