import { localizedText, t } from '../i18n/index.js';
import { refreshStore, updateProfile } from '../core/state.js';
import { selectExerciseCatalog, selectLanguage, selectProfile } from '../core/selectors.js';
import {
  createCustomExercise,
  createWorkoutItem,
  createWorkoutRecord,
  deleteCustomExercise,
  saveCustomExercise,
  toggleFavoriteExercise,
} from '../storage/core.js';
import {
  clearFormInvalidState,
  isValidOptionalUrl,
  markInvalidControls,
  nonNegativeFormNumber,
  normalizeFormString,
  uniqueFormStrings,
} from './form-utils.js';
import { navigateWithNotice, setPendingNotice } from './notices.js';

export function handleExerciseAction(button, state) {
  const exerciseId = button.dataset.exerciseId;
  const action = button.dataset.exerciseAction;
  const exercise = selectExerciseCatalog(state).find((item) => item.id === exerciseId);

  if (!exercise) {
    window.alert(t(state, 'exerciseNotFound'));
    return;
  }

  if (action === 'favorite') {
    toggleFavoriteExercise(exercise.id);
    refreshStore();
    return;
  }

  if (action === 'dislike') {
    const profile = selectProfile(state);
    const dislikedExercises = new Set(profile?.dislikedExercises || []);

    if (dislikedExercises.has(exercise.id)) {
      dislikedExercises.delete(exercise.id);
      setPendingNotice(t(state, 'dislikedExerciseRemoved'));
    } else {
      dislikedExercises.add(exercise.id);
      setPendingNotice(t(state, 'dislikedExerciseAdded'));
    }

    updateProfile({
      dislikedExercises: Array.from(dislikedExercises),
    });
    return;
  }

  if (action === 'add-to-workout') {
    const workout = createWorkoutRecord({
      title: getLocalizedExerciseName(exercise, state),
      description: t(state, 'createdFromExercise'),
      items: [
        createWorkoutItem({
          exerciseId: exercise.id,
          reps:
            exercise.executionMode === 'reps' || exercise.executionMode === 'custom' ? 10 : null,
          durationSec:
            exercise.executionMode === 'time' || exercise.executionMode === 'hold' ? 30 : null,
        }),
      ],
    });

    refreshStore();
    navigateWithNotice(
      `workout-edit/${encodeURIComponent(workout.id)}`,
      t(state, 'workoutCreated'),
    );
    return;
  }

  if (!exercise.isCustom) {
    return;
  }

  if (action === 'edit') {
    window.location.hash = `exercise-edit/${encodeURIComponent(exercise.id)}`;
    return;
  }

  if (action === 'delete' && window.confirm(t(state, 'deleteExerciseConfirm'))) {
    deleteCustomExercise(exercise.id);
    refreshStore();
    navigateWithNotice('exercises', t(state, 'deleteExerciseSuccess'));
  }
}

export function handleExerciseFormSubmit(form, state) {
  clearExerciseFormStatus(form);
  clearFormInvalidState(form);

  const formData = new FormData(form);
  const negativeInputs = Array.from(form.querySelectorAll('input[type="number"]')).filter(
    (input) => Number(input.value || 0) < 0,
  );

  if (negativeInputs.length > 0) {
    markInvalidControls(form, negativeInputs);
    setExerciseFormStatus(form, t(state, 'formNoNegativeValues'), 'error');
    return;
  }

  if (!form.checkValidity()) {
    markInvalidControls(form, Array.from(form.querySelectorAll(':invalid')));
    form.reportValidity();
    setExerciseFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const imageInput = form.querySelector('[name="image"]');
  if (!isValidOptionalUrl(imageInput?.value)) {
    markInvalidControls(form, [imageInput]);
    setExerciseFormStatus(form, t(state, 'exerciseImageInvalid'), 'error');
    return;
  }

  const exercise = {
    id: normalizeFormString(formData.get('id')),
    name: {
      ru: normalizeFormString(formData.get('name.ru')),
      en: normalizeFormString(formData.get('name.en')),
    },
    shortDescription: {
      ru: normalizeFormString(formData.get('shortDescription.ru')),
      en: normalizeFormString(formData.get('shortDescription.en')),
    },
    instruction: {
      ru: normalizeFormString(formData.get('instruction.ru')),
      en: normalizeFormString(formData.get('instruction.en')),
    },
    effect: {
      ru: normalizeFormString(formData.get('effect.ru')),
      en: normalizeFormString(formData.get('effect.en')),
    },
    type: {
      ru: normalizeFormString(formData.get('type.ru')),
      en: normalizeFormString(formData.get('type.en')),
    },
    muscles: uniqueFormStrings(formData.getAll('muscles[]')),
    tags: uniqueFormStrings(formData.getAll('tags[]')),
    executionMode: normalizeFormString(formData.get('executionMode')) || 'reps',
    tempo: {
      eccentric: nonNegativeFormNumber(formData.get('tempo.eccentric')),
      pauseBottom: nonNegativeFormNumber(formData.get('tempo.pauseBottom')),
      concentric: nonNegativeFormNumber(formData.get('tempo.concentric')),
      pauseTop: nonNegativeFormNumber(formData.get('tempo.pauseTop')),
    },
    estimatedCalories: nonNegativeFormNumber(formData.get('estimatedCalories')),
    image: normalizeFormString(formData.get('image')),
  };

  if (!exercise.name.ru || !exercise.name.en || !exercise.type.ru || !exercise.type.en) {
    markInvalidControls(
      form,
      [
        form.querySelector('[name="name.ru"]'),
        form.querySelector('[name="name.en"]'),
        form.querySelector('[name="type.ru"]'),
        form.querySelector('[name="type.en"]'),
      ].filter((input) => !normalizeFormString(input?.value)),
    );
    setExerciseFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  try {
    const isEdit = Boolean(exercise.id);
    const savedExercise = isEdit ? saveCustomExercise(exercise) : createCustomExercise(exercise);

    setPendingNotice(
      t(state, 'exerciseSaved'),
      'success',
      `#exercise-view/${encodeURIComponent(savedExercise.id)}`,
    );
    refreshStore();
    window.location.hash = `exercise-view/${encodeURIComponent(savedExercise.id)}`;
  } catch (error) {
    setExerciseFormStatus(form, error.message || t(state, 'exerciseSaveFailed'), 'error');
  }
}

function getLocalizedExerciseName(exercise, state) {
  const language = selectLanguage(state);
  return localizedText(exercise.name, language) || exercise.id;
}

function setExerciseFormStatus(form, message, type = 'success') {
  const status = form.querySelector('[data-exercise-form-status]');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function clearExerciseFormStatus(form) {
  setExerciseFormStatus(form, '');
}
