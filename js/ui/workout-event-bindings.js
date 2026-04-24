import { t } from '../i18n/index.js';
import {
  applyWorkoutExerciseFilters,
  clearWorkoutDragState,
  handleEditableListAdd,
  handlePresetWorkoutAction,
  handleWorkoutAction,
  handleWorkoutAddExercise,
  handleWorkoutDragOver,
  handleWorkoutDragStart,
  handleWorkoutFormSubmit,
  handleWorkoutItemMove,
  hasDraggedWorkoutItem,
  setWorkoutFormStatus,
  syncWorkoutItemsState,
} from './workout-actions.js';

export function bindWorkoutEvents(state) {
  document.addEventListener('click', (event) => {
    const workoutActionButton = event.target?.closest?.('[data-workout-action]');
    if (workoutActionButton) {
      handleWorkoutAction(workoutActionButton, state);
      return;
    }

    const presetWorkoutActionButton = event.target?.closest?.('[data-preset-workout-action]');
    if (presetWorkoutActionButton) {
      handlePresetWorkoutAction(presetWorkoutActionButton, state);
      return;
    }

    const listAddButton = event.target?.closest?.('[data-list-add]');
    if (listAddButton) {
      handleEditableListAdd(listAddButton, state);
      return;
    }

    const listRemoveButton = event.target?.closest?.('[data-list-remove]');
    if (listRemoveButton) {
      if (!window.confirm(t(state, 'removeListItemConfirm'))) {
        return;
      }

      listRemoveButton.closest('[data-list-value]')?.remove();
      return;
    }

    const workoutAddButton = event.target?.closest?.('[data-workout-add-exercise]');
    if (workoutAddButton) {
      handleWorkoutAddExercise(workoutAddButton, state);
      return;
    }

    const workoutRemoveButton = event.target?.closest?.('[data-workout-remove]');
    if (workoutRemoveButton) {
      const form = workoutRemoveButton.closest('[data-workout-form]');
      if (!window.confirm(t(state, 'deleteWorkoutItemConfirm'))) {
        return;
      }

      workoutRemoveButton.closest('[data-workout-item]')?.remove();
      syncWorkoutItemsState(form);
      setWorkoutFormStatus(form, t(state, 'workoutItemRemoved'), 'success');
      return;
    }

    const workoutMoveButton = event.target?.closest?.('[data-workout-move]');
    if (workoutMoveButton) {
      handleWorkoutItemMove(workoutMoveButton);
    }
  });

  document.addEventListener('submit', (event) => {
    const workoutForm = event.target?.closest?.('[data-workout-form]');
    if (workoutForm) {
      event.preventDefault();
      handleWorkoutFormSubmit(workoutForm, state);
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target?.matches?.('[data-workout-exercise-search]')) {
      const sidebar = event.target.closest('[data-workout-exercise-sidebar]');
      if (sidebar) applyWorkoutExerciseFilters(sidebar);
    }
  });

  document.addEventListener('change', (event) => {
    if (
      event.target?.matches?.(
        '[data-workout-exercise-type-filter], [data-workout-exercise-muscle-filter], [data-workout-exercise-equipment-filter], [data-workout-exercise-profile-level-filter]',
      )
    ) {
      const sidebar = event.target.closest('[data-workout-exercise-sidebar]');
      if (sidebar) applyWorkoutExerciseFilters(sidebar);
    }
  });

  document.addEventListener('dragstart', (event) => {
    const handle = event.target?.closest?.('[data-workout-drag-handle]');
    if (!handle) return;

    handleWorkoutDragStart(event, handle);
  });

  document.addEventListener('dragover', (event) => {
    const itemsRoot = event.target?.closest?.('[data-workout-items]');
    if (!itemsRoot || !hasDraggedWorkoutItem()) return;

    handleWorkoutDragOver(event, itemsRoot);
  });

  document.addEventListener('drop', (event) => {
    const itemsRoot = event.target?.closest?.('[data-workout-items]');
    if (!itemsRoot || !hasDraggedWorkoutItem()) return;

    event.preventDefault();
    syncWorkoutItemsState(itemsRoot.closest('[data-workout-form]'));
  });

  document.addEventListener('dragend', () => {
    clearWorkoutDragState();
  });

  document.addEventListener('keydown', (event) => {
    const listName = event.target?.dataset?.listEntry;
    if (listName && event.key === 'Enter') {
      event.preventDefault();
      event.target
        .closest(`[data-editable-list="${listName}"]`)
        ?.querySelector(`[data-list-add="${listName}"]`)
        ?.click();
    }
  });
}
