import { localizedText, t } from '../i18n/index.js';
import { renderListItem, renderWorkoutDraftItem } from '../pages/renderers.js';
import { getPopularPresetWorkout } from '../features/presets.js';
import { createSingleWorkoutRecommendation } from '../features/workout-generation.js';
import { refreshStore } from '../core/state.js';
import {
  selectEquipment,
  selectEquipmentCatalog,
  selectExerciseCatalog,
  selectLanguage,
  selectProfile,
  selectWorkoutById,
} from '../core/selectors.js';
import {
  createWorkoutItem,
  createWorkoutRecord,
  deleteWorkout,
  duplicateWorkout,
  saveWorkout,
} from '../storage/core.js';
import { clearFormInvalidState, markInvalidControls, normalizeFormString } from './form-utils.js';
import { navigateWithNotice, setPendingNotice } from './notices.js';

let draggedWorkoutItem = null;

export function handleWorkoutAction(button, state) {
  const workoutId = button.dataset.workoutId;
  const action = button.dataset.workoutAction;
  const workout = selectWorkoutById(state, workoutId);

  if (!workout) {
    window.alert(t(state, 'workoutNotFound'));
    return;
  }

  if (action === 'duplicate') {
    const copy = duplicateWorkout(workout.id, {
      title: t(state, 'workoutCopyTitle').replace('{title}', workout.title),
    });

    refreshStore();
    if (copy) {
      navigateWithNotice(
        `workout-view/${encodeURIComponent(copy.id)}`,
        t(state, 'duplicateWorkoutSuccess'),
      );
    }
    return;
  }

  if (action === 'delete' && window.confirm(t(state, 'deleteWorkoutConfirm'))) {
    deleteWorkout(workout.id);
    refreshStore();
    navigateWithNotice('home', t(state, 'deleteWorkoutSuccess'));
  }
}

export function handlePresetWorkoutAction(button, state) {
  const presetId = button.dataset.presetWorkoutId;
  const action = button.dataset.presetWorkoutAction;
  const preset = getPopularPresetWorkout(presetId);

  if (!preset) {
    window.alert(t(state, 'workoutNotFound'));
    return;
  }

  const language = selectLanguage(state);
  let workout = null;

  try {
    workout = createWorkoutRecord({
      title: localizedText(preset.title, language) || t(state, 'workoutViewTitle'),
      description: localizedText(preset.description, language),
      defaultRestBetweenExercises: preset.defaultRestBetweenExercises,
      items: preset.items.map((item, index) =>
        createWorkoutItem({
          exerciseId: item.exerciseId,
          sets: item.sets,
          reps: item.reps,
          durationSec: item.durationSec,
          distance: item.distance,
          restBetweenSetsSec: item.restBetweenSetsSec,
          restAfterExerciseSec: item.restAfterExerciseSec,
          tempoOverride: item.tempoOverride,
          notes: item.notes,
          order: index,
        }),
      ),
    });
  } catch (error) {
    window.alert(error.message || t(state, 'workoutSaveFailed'));
    return;
  }

  refreshStore();

  if (action === 'edit') {
    navigateWithNotice(
      `workout-edit/${encodeURIComponent(workout.id)}`,
      t(state, 'presetWorkoutCopied'),
    );
    return;
  }

  navigateWithNotice(
    `workout-view/${encodeURIComponent(workout.id)}`,
    t(state, 'presetWorkoutCopied'),
  );
}

export function handleWorkoutGenerationFormSubmit(form, state) {
  const status = form.querySelector('[data-workout-generation-status]');

  clearGenerationStatus(status);

  if (!form.checkValidity()) {
    form.reportValidity();
    setGenerationStatus(status, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const formData = new FormData(form);
  const request = {
    targetDurationMin: Number(formData.get('targetDurationMin')),
    workoutType: normalizeFormString(formData.get('workoutType')) || 'auto',
    priorities: readWorkoutGenerationPriorities(formData),
  };

  try {
    const recommendation = createSingleWorkoutRecommendation({
      request,
      exercises: selectExerciseCatalog(state),
      profile: selectProfile(state),
      equipment: selectEquipment(state),
      equipmentCatalog: selectEquipmentCatalog(state),
    });

    if (recommendation.workout.items.length === 0) {
      setGenerationStatus(status, t(state, 'workoutGenerateEmpty'), 'error');
      return;
    }

    const workout = createWorkoutRecord({
      title: recommendation.workout.title,
      description: recommendation.workout.description,
      defaultRestBetweenExercises: recommendation.workout.defaultRestBetweenExercises,
      items: recommendation.workout.items,
    });

    refreshStore();
    navigateWithNotice(
      `workout-view/${encodeURIComponent(workout.id)}`,
      t(state, 'workoutGenerateCreated'),
    );
  } catch (error) {
    setGenerationStatus(status, error.message || t(state, 'workoutGenerateFailed'), 'error');
  }
}

export function handleEditableListAdd(button, state) {
  const name = button.dataset.listAdd;
  const root = button.closest(`[data-editable-list="${name}"]`);
  const input = root?.querySelector(`[data-list-entry="${name}"]`);
  const items = root?.querySelector(`[data-list-items="${name}"]`);
  const value = input?.value.trim();

  if (!value || !items) return;

  const exists = Array.from(items.querySelectorAll('[data-list-value]')).some(
    (item) => item.dataset.listValue.toLowerCase() === value.toLowerCase(),
  );

  if (!exists) {
    items.insertAdjacentHTML('beforeend', renderListItem(name, value, state));
  }

  input.value = '';
  input.focus();
}

function readWorkoutGenerationPriorities(formData) {
  return {
    goals: {
      strength: readPriorityValue(formData, 'goals.strength'),
      hypertrophy: readPriorityValue(formData, 'goals.hypertrophy'),
      endurance: readPriorityValue(formData, 'goals.endurance'),
      fatLoss: readPriorityValue(formData, 'goals.fatLoss'),
      mobility: readPriorityValue(formData, 'goals.mobility'),
    },
    bodyFocusGoals: {
      upperBody: readPriorityValue(formData, 'bodyFocusGoals.upperBody'),
      lowerBody: readPriorityValue(formData, 'bodyFocusGoals.lowerBody'),
      vTaper: readPriorityValue(formData, 'bodyFocusGoals.vTaper'),
      core: readPriorityValue(formData, 'bodyFocusGoals.core'),
      arms: readPriorityValue(formData, 'bodyFocusGoals.arms'),
      glutes: readPriorityValue(formData, 'bodyFocusGoals.glutes'),
    },
  };
}

function readPriorityValue(formData, fieldName) {
  const value = Number(formData.get(fieldName));
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}

function setGenerationStatus(status, message, type = 'success') {
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function clearGenerationStatus(status) {
  setGenerationStatus(status, '');
}

export function handleWorkoutAddExercise(button, state) {
  const form = button.closest('[data-workout-form]');
  const picker = form?.querySelector('[data-workout-exercise-picker]');
  const items = form?.querySelector('[data-workout-items]');
  const exerciseId = button.dataset.workoutAddExerciseId || picker?.value;
  const exercise = selectExerciseCatalog(state).find((item) => item.id === exerciseId);

  if (!exercise || !items) {
    setWorkoutFormStatus(form, t(state, 'workoutExerciseRequired'), 'error');
    return;
  }

  const order = items.querySelectorAll('[data-workout-item]').length;
  items.insertAdjacentHTML('beforeend', renderWorkoutDraftItem(state, exercise, order));
  syncWorkoutItemsState(form);
  clearWorkoutFormStatus(form);
}

export function applyWorkoutExerciseFilters(sidebar) {
  if (!sidebar) return;

  const query = normalizeFormString(sidebar.querySelector('[data-workout-exercise-search]')?.value)
    .toLowerCase()
    .trim();

  const type = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-type-filter]')?.value,
  ).toLowerCase();

  const muscle = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-muscle-filter]')?.value,
  ).toLowerCase();
  const equipmentFilter = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-equipment-filter]')?.value,
  ).toLowerCase();
  const profileLevelFilter = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-profile-level-filter]')?.value,
  ).toLowerCase();
  const currentProfileLevel = normalizeFormString(
    sidebar.dataset.profileTrainingLevel,
  ).toLowerCase();

  const options = Array.from(sidebar.querySelectorAll('.workout-exercise-option'));
  let visibleCount = 0;

  options.forEach((option) => {
    const searchText = (option.dataset.exerciseSearch || '').toLowerCase();
    const optionType = (option.dataset.exerciseType || '').toLowerCase();
    const muscles = option.dataset.exerciseMuscles ? option.dataset.exerciseMuscles.split('|') : [];
    const equipmentIds = option.dataset.exerciseEquipment
      ? option.dataset.exerciseEquipment.split('|')
      : [];
    const profileLevel = (option.dataset.exerciseProfileLevel || '').toLowerCase();
    const equipmentAvailable = option.dataset.exerciseEquipmentAvailable === 'true';
    const profileCompatible = option.dataset.exerciseProfileCompatible === 'true';

    const matchesQuery = !query || searchText.includes(query);
    const matchesType = !type || optionType === type;
    const matchesMuscle = !muscle || muscles.includes(muscle);
    const matchesEquipment =
      !equipmentFilter ||
      (equipmentFilter === 'available'
        ? equipmentAvailable
        : equipmentIds.includes(equipmentFilter));
    const matchesProfileLevel =
      !profileLevelFilter ||
      (profileLevelFilter === 'profile'
        ? !currentProfileLevel || profileCompatible
        : profileLevel === profileLevelFilter);

    const isVisible =
      matchesQuery && matchesType && matchesMuscle && matchesEquipment && matchesProfileLevel;

    option.style.display = isVisible ? 'grid' : 'none';

    if (isVisible) visibleCount++;
  });

  const empty = sidebar.querySelector('[data-workout-exercise-no-results]');
  if (empty) empty.hidden = visibleCount > 0;
}

export function handleWorkoutItemMove(button) {
  const item = button.closest('[data-workout-item]');
  const direction = button.dataset.workoutMove;

  if (!item) return;

  if (direction === 'up' && item.previousElementSibling?.matches('[data-workout-item]')) {
    item.parentElement.insertBefore(item, item.previousElementSibling);
  }

  if (direction === 'down' && item.nextElementSibling?.matches('[data-workout-item]')) {
    item.parentElement.insertBefore(item.nextElementSibling, item);
  }

  syncWorkoutItemsState(item.closest('[data-workout-form]'));
}

export function syncWorkoutItemsState(form = document.querySelector('[data-workout-form]')) {
  const itemsRoot = form?.querySelector?.('[data-workout-items]');
  if (!itemsRoot) return;

  const items = Array.from(itemsRoot.querySelectorAll('[data-workout-item]'));
  const empty = itemsRoot.querySelector('[data-workout-empty]');
  const counters = form.querySelectorAll('[data-workout-item-count]');

  if (empty) {
    empty.hidden = items.length > 0;
  }

  counters.forEach((counter) => {
    counter.textContent = String(items.length);
  });

  items.forEach((item, index) => {
    item.dataset.order = String(index);
    item.setAttribute('aria-posinset', String(index + 1));
    item.setAttribute('aria-setsize', String(items.length));
    item.querySelector('[data-workout-move="up"]')?.toggleAttribute('disabled', index === 0);
    item
      .querySelector('[data-workout-move="down"]')
      ?.toggleAttribute('disabled', index === items.length - 1);
  });
}

export function handleWorkoutDragStart(event, handle) {
  const item = handle.closest('[data-workout-item]');
  if (!item) return;

  draggedWorkoutItem = item;
  item.classList.add('workout-item--dragging');
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', item.dataset.order || '');
}

export function handleWorkoutDragOver(event, itemsRoot) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const targetItem = event.target.closest('[data-workout-item]');
  if (!targetItem || targetItem === draggedWorkoutItem || !itemsRoot.contains(targetItem)) {
    return;
  }

  const rect = targetItem.getBoundingClientRect();
  const shouldInsertAfter = event.clientY > rect.top + rect.height / 2;

  if (shouldInsertAfter) {
    targetItem.after(draggedWorkoutItem);
  } else {
    targetItem.before(draggedWorkoutItem);
  }

  syncWorkoutItemsState(itemsRoot.closest('[data-workout-form]'));
}

export function clearWorkoutDragState() {
  draggedWorkoutItem?.classList.remove('workout-item--dragging');
  draggedWorkoutItem = null;
}

export function hasDraggedWorkoutItem() {
  return Boolean(draggedWorkoutItem);
}

export function handleWorkoutFormSubmit(form, state) {
  clearWorkoutFormStatus(form);
  clearFormInvalidState(form);

  if (!form.checkValidity()) {
    markInvalidControls(form, Array.from(form.querySelectorAll(':invalid')));
    form.reportValidity();
    setWorkoutFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const rows = Array.from(form.querySelectorAll('[data-workout-item]'));
  if (rows.length === 0) {
    setWorkoutFormStatus(form, t(state, 'workoutEmptyRequired'), 'error');
    return;
  }

  const knownExerciseIds = new Set(selectExerciseCatalog(state).map((exercise) => exercise.id));
  const unknownExerciseRows = rows.filter(
    (row) => !knownExerciseIds.has(row.dataset.exerciseId || ''),
  );
  if (unknownExerciseRows.length > 0) {
    markInvalidControls(form, unknownExerciseRows);
    setWorkoutFormStatus(form, t(state, 'workoutUnknownExercise'), 'error');
    return;
  }

  const formData = new FormData(form);
  const titleInput = form.querySelector('[name="title"]');
  if (!normalizeFormString(formData.get('title'))) {
    markInvalidControls(form, [titleInput]);
    setWorkoutFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const errors = [];
  const items = rows.map((row, index) => {
    const executionMode = row.dataset.executionMode;
    const usesDuration = executionMode === 'time' || executionMode === 'hold';
    const effortField = usesDuration ? 'durationSec' : 'reps';
    const effort = readWorkoutInteger(row, effortField, { min: 1 }, errors);

    return createWorkoutItem({
      exerciseId: row.dataset.exerciseId || '',
      sets: readWorkoutInteger(row, 'sets', { min: 1 }, errors),
      reps: usesDuration ? null : effort,
      durationSec: usesDuration ? effort : null,
      restBetweenSetsSec: readWorkoutInteger(row, 'restBetweenSetsSec', { min: 0 }, errors),
      restAfterExerciseSec: readWorkoutInteger(row, 'restAfterExerciseSec', { min: 0 }, errors),
      notes: normalizeFormString(row.querySelector('[data-workout-field="notes"]')?.value),
      order: Number(row.dataset.order) || index,
    });
  });

  if (errors.length > 0) {
    setWorkoutFormStatus(
      form,
      `${t(state, 'workoutNumberInvalid')} ${t(state, 'formInvalidData')}`,
      'error',
    );
    return;
  }

  try {
    const isEdit = Boolean(normalizeFormString(formData.get('id')));
    const workoutPayload = {
      id: normalizeFormString(formData.get('id')),
      title: normalizeFormString(formData.get('title')),
      description: normalizeFormString(formData.get('description')),
      items,
    };
    const workout = workoutPayload.id
      ? saveWorkout(workoutPayload)
      : createWorkoutRecord(workoutPayload);

    setPendingNotice(
      t(state, isEdit ? 'workoutSaved' : 'workoutCreated'),
      'success',
      `#workout-view/${encodeURIComponent(workout.id)}`,
    );
    refreshStore();
    window.location.hash = `workout-view/${encodeURIComponent(workout.id)}`;
  } catch (error) {
    setWorkoutFormStatus(form, error.message || t(state, 'workoutSaveFailed'), 'error');
  }
}

export function setWorkoutFormStatus(form, message, type = 'success') {
  const status = form?.querySelector?.('[data-workout-form-status]');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function readWorkoutInteger(row, fieldName, options, errors) {
  const input = row.querySelector(`[data-workout-field="${fieldName}"]`);
  const value = Number(input?.value);
  const min = options.min ?? 0;

  if (!Number.isInteger(value) || value < min) {
    errors.push(fieldName);
    input?.setAttribute('aria-invalid', 'true');
    return min;
  }

  input?.removeAttribute('aria-invalid');
  return value;
}

function clearWorkoutFormStatus(form) {
  setWorkoutFormStatus(form, '');
}
