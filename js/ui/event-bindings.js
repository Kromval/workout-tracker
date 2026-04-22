import { t } from '../i18n/index.js';
import {
  applyExerciseCatalogFilters,
} from './catalog-filters.js';
import {
  handleProgressCalendarAction,
  handleProgressCalendarDay,
} from './calendar-actions.js';
import {
  handleExerciseAction,
  handleExerciseFormSubmit,
} from './exercise-actions.js';
import {
  handleAudioPreview,
  handleCustomAudioReset,
  handleCustomAudioUpload,
  handleExportData,
  handleImportData,
  handleSettingChange,
  updateVolumeOutput,
} from './settings-actions.js';
import { closeNavMenu } from './shell-chrome.js';
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

export function bindShellEvents(state, renderApp) {
  document.addEventListener('click', (event) => {
    const exerciseActionButton = event.target?.closest?.('[data-exercise-action]');
    if (exerciseActionButton) {
      handleExerciseAction(exerciseActionButton, state);
      return;
    }

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

    const calendarActionButton = event.target?.closest?.('[data-progress-calendar-action]');
    if (calendarActionButton) {
      handleProgressCalendarAction(calendarActionButton, renderApp, state);
      return;
    }

    const calendarDayButton = event.target?.closest?.('[data-progress-calendar-day]');
    if (calendarDayButton) {
      handleProgressCalendarDay(calendarDayButton, renderApp, state);
      return;
    }

    if (event.target?.closest?.('#app-nav .nav__link')) {
      closeNavMenu();
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
      return;
    }

    if (event.target?.id === 'export-data-button') {
      handleExportData(state);
    }

    if (event.target?.id === 'import-data-button') {
      document.querySelector('#import-data-file')?.click();
    }

    const audioPreviewButton = event.target?.closest?.('[data-custom-audio-preview]');
    if (audioPreviewButton) {
      handleAudioPreview(audioPreviewButton);
      return;
    }

    const audioResetButton = event.target?.closest?.('[data-custom-audio-reset]');
    if (audioResetButton) {
      handleCustomAudioReset(audioResetButton, state);
    }
  });

  document.addEventListener('click', (event) => {
    const nav = document.querySelector('#app-nav');

    if (
      nav?.dataset.open === 'true'
      && !event.target?.closest?.('#app-nav')
      && !event.target?.closest?.('#nav-toggle')
    ) {
      closeNavMenu();
    }
  });

  document.addEventListener('change', (event) => {
    event.target?.removeAttribute?.('aria-invalid');

    const audioUploadInput = event.target?.closest?.('[data-custom-audio-upload]');
    if (audioUploadInput) {
      handleCustomAudioUpload(audioUploadInput, state);
      return;
    }

    if (event.target?.id === 'import-data-file') {
      handleImportData(event.target, state);
      return;
    }

    const settingName = event.target?.dataset?.setting;
    if (settingName) {
      handleSettingChange(event.target, state);
    }
  });

  document.addEventListener('submit', (event) => {
    const exerciseForm = event.target?.closest?.('[data-exercise-form]');
    if (exerciseForm) {
      event.preventDefault();
      handleExerciseFormSubmit(exerciseForm, state);
      return;
    }

    const workoutForm = event.target?.closest?.('[data-workout-form]');
    if (workoutForm) {
      event.preventDefault();
      handleWorkoutFormSubmit(workoutForm, state);
    }
  });

  document.addEventListener('input', (event) => {
    event.target?.removeAttribute?.('aria-invalid');

    if (event.target?.dataset?.setting === 'volume') {
      updateVolumeOutput(Number(event.target.value));
      return;
    }

    if (event.target?.matches?.('[data-workout-exercise-search]')) {
      const sidebar = event.target.closest('[data-workout-exercise-sidebar]');
      if (sidebar) applyWorkoutExerciseFilters(sidebar);
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target?.matches?.('[data-workout-exercise-type-filter], [data-workout-exercise-muscle-filter]')) {
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
    if (event.key === 'Escape') {
      closeNavMenu();
    }

    const listName = event.target?.dataset?.listEntry;
    if (listName && event.key === 'Enter') {
      event.preventDefault();
      event.target
        .closest(`[data-editable-list="${listName}"]`)
        ?.querySelector(`[data-list-add="${listName}"]`)
        ?.click();
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target?.matches?.('[data-exercises-search]')) {
      applyExerciseCatalogFilters();
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target?.matches?.('[data-exercises-type-filter], [data-exercises-muscle-filter]')) {
      applyExerciseCatalogFilters();
    }
  });
}
