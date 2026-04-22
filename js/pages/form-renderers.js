import { getExerciseCatalog } from '../features/exercises.js';
import { localizedText, t } from '../i18n/index.js';
import { renderEmptyState, renderListItem } from './components.js';
import { escapeAttribute, escapeHtml, formatDuration } from '../core/utils.js';
import { capitalize, createExerciseMap, renderWorkoutExerciseSidebar } from './workout-renderers.js';

const EXECUTION_MODES = ['reps', 'time', 'hold', 'custom'];
const TEMPO_FIELDS = ['eccentric', 'pauseBottom', 'concentric', 'pauseTop'];

export function renderWorkoutFormPage(state, workout, requestedId = '') {
  const exercises = getExerciseCatalog(state);
  const hasExercises = exercises.length > 0;
  const exerciseMap = createExerciseMap(exercises);
  const isEdit = Boolean(workout);

  if (requestedId && !workout) {
    return `
      <section class="page">
        <div class="page-header">
          <h1>${t(state, 'workoutEditTitle')}</h1>
        </div>
        <article class="card">
          <p class="muted">${t(state, 'workoutNotFound')}</p>
        </article>
      </section>
    `;
  }

  return `
    <section class="page">
      <div class="page-header">
        <h1>${t(state, isEdit ? 'workoutEditTitle' : 'workoutCreateTitle')}</h1>
      </div>

      <form class="card workout-form" data-workout-form data-form-mode="${isEdit ? 'edit' : 'create'}" aria-describedby="workout-form-status" novalidate>
        ${isEdit ? `<input type="hidden" name="id" value="${escapeAttribute(workout.id)}">` : ''}
        <fieldset class="form-section">
          <legend>${t(state, 'workoutBasics')}</legend>
          <div class="form-grid">
            <label class="field" for="workout-title">
              <span>${t(state, 'workoutTitleLabel')} *</span>
              <input id="workout-title" name="title" type="text" value="${escapeAttribute(workout?.title || '')}" required autocomplete="off">
            </label>

            <label class="field form-grid__wide" for="workout-description">
              <span>${t(state, 'workoutDescriptionLabel')}</span>
              <textarea id="workout-description" name="description" rows="3">${escapeHtml(workout?.description || '')}</textarea>
            </label>
          </div>
        </fieldset>

        <fieldset class="form-section">
          <legend>${t(state, 'workoutItems')}</legend>
          <div class="workout-editor-grid">
            ${renderWorkoutExerciseSidebar(state, exercises)}

            <div class="workout-items" data-workout-items role="list" aria-label="${escapeAttribute(t(state, 'workoutItems'))}">
              <p class="muted" data-workout-empty role="status" ${workout?.items?.length ? 'hidden' : ''}>${hasExercises ? t(state, 'workoutNoItems') : t(state, 'emptyExercises')}</p>
              ${(workout?.items || []).map((item, index) => renderWorkoutDraftItem(state, exerciseMap.get(item.exerciseId), index, item)).join('')}
            </div>
          </div>
        </fieldset>

        <p class="notice" id="workout-form-status" data-workout-form-status role="status" aria-live="polite"></p>

        <div class="toolbar">
          <button class="button button--primary" type="submit" ${hasExercises ? '' : 'disabled'}>${t(state, 'saveWorkout')}</button>
          <a class="button" href="${isEdit ? `#workout-view/${encodeURIComponent(workout.id)}` : '#home'}">${t(state, 'cancel')}</a>
        </div>
      </form>
    </section>
  `;
}





export function renderExerciseFormPage(state, exercise, requestedId = '') {
  const isEdit = Boolean(exercise);

  if (requestedId && !exercise) {
    return `
      <section class="page">
        <div class="page-header">
          <div>
            <a class="back-link" href="#exercises">${t(state, 'backToExercises')}</a>
            <h1>${t(state, 'exerciseFormEditTitle')}</h1>
          </div>
        </div>
        ${renderEmptyState(state, 'exerciseNotFound', 'exerciseNotFoundHint', 'createExercise', '#exercise-create')}
      </section>
    `;
  }

  const titleKey = isEdit ? 'exerciseFormEditTitle' : 'exerciseFormCreateTitle';
  const action = isEdit ? 'edit' : 'create';

  return `
    <section class="page">
      <div class="page-header">
        <div>
          <a class="back-link" href="${isEdit ? `#exercise-view/${encodeURIComponent(exercise.id)}` : '#exercises'}">${t(state, 'backToExercises')}</a>
          <h1>${t(state, titleKey)}</h1>
        </div>
      </div>

      <form class="card exercise-form" data-exercise-form data-form-mode="${action}" aria-describedby="exercise-form-status" novalidate>
        ${isEdit ? `<input type="hidden" name="id" value="${escapeAttribute(exercise.id)}">` : ''}

        <fieldset class="form-section">
          <legend>${t(state, 'exerciseLocalizedFields')}</legend>
          <div class="form-grid">
            ${renderTextField(state, 'name.ru', 'exerciseNameRu', exercise?.name?.ru, true)}
            ${renderTextField(state, 'name.en', 'exerciseNameEn', exercise?.name?.en, true)}
            ${renderTextareaField(state, 'shortDescription.ru', 'exerciseShortDescriptionRu', exercise?.shortDescription?.ru)}
            ${renderTextareaField(state, 'shortDescription.en', 'exerciseShortDescriptionEn', exercise?.shortDescription?.en)}
            ${renderTextareaField(state, 'instruction.ru', 'exerciseInstructionRu', exercise?.instruction?.ru)}
            ${renderTextareaField(state, 'instruction.en', 'exerciseInstructionEn', exercise?.instruction?.en)}
            ${renderTextareaField(state, 'effect.ru', 'exerciseEffectRu', exercise?.effect?.ru)}
            ${renderTextareaField(state, 'effect.en', 'exerciseEffectEn', exercise?.effect?.en)}
            ${renderTextField(state, 'type.ru', 'exerciseTypeRu', exercise?.type?.ru, true)}
            ${renderTextField(state, 'type.en', 'exerciseTypeEn', exercise?.type?.en, true)}
          </div>
        </fieldset>

        <fieldset class="form-section">
          <legend>${t(state, 'exerciseDetails')}</legend>
          <div class="form-grid">
            <label class="field" for="exercise-execution-mode">
              <span>${t(state, 'exerciseExecutionMode')} *</span>
              <select id="exercise-execution-mode" name="executionMode" required>
                ${EXECUTION_MODES.map((mode) => `
                  <option value="${mode}" ${exercise?.executionMode === mode || (!exercise && mode === 'reps') ? 'selected' : ''}>${mode}</option>
                `).join('')}
              </select>
            </label>

            <label class="field" for="exercise-estimated-calories">
              <span>${t(state, 'exerciseEstimatedCalories')}</span>
              <input id="exercise-estimated-calories" name="estimatedCalories" type="number" min="0" step="0.1" value="${escapeAttribute(exercise?.estimatedCalories ?? 0)}">
            </label>

            <label class="field form-grid__wide" for="exercise-image">
              <span>${t(state, 'exerciseImage')}</span>
              <input id="exercise-image" name="image" type="text" value="${escapeAttribute(exercise?.image || '')}">
            </label>
          </div>
        </fieldset>

        <fieldset class="form-section">
          <legend>${t(state, 'exerciseTempo')}</legend>
          <div class="form-grid form-grid--tempo">
            ${TEMPO_FIELDS.map((field) => renderNumberField(state, `tempo.${field}`, `tempo${capitalize(field)}`, exercise?.tempo?.[field] ?? 0)).join('')}
          </div>
        </fieldset>

        <fieldset class="form-section">
          <legend>${t(state, 'exerciseLists')}</legend>
          <div class="form-grid">
            ${renderEditableList(state, 'muscles', 'exerciseMuscles', exercise?.muscles || [])}
            ${renderEditableList(state, 'tags', 'exerciseTags', exercise?.tags || [])}
          </div>
        </fieldset>

        <p class="notice" id="exercise-form-status" data-exercise-form-status role="status" aria-live="polite"></p>

        <div class="toolbar">
          <button class="button button--primary" type="submit">${t(state, 'saveExercise')}</button>
          <a class="button" href="${isEdit ? `#exercise-view/${encodeURIComponent(exercise.id)}` : '#exercises'}">${t(state, 'cancel')}</a>
        </div>
      </form>
    </section>
  `;
}



export function renderTextField(state, name, labelKey, value = '', required = false) {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}${required ? ' *' : ''}</span>
      <input id="${id}" name="${name}" type="text" value="${escapeAttribute(value || '')}" ${required ? 'required' : ''} autocomplete="off">
    </label>
  `;
}



export function renderTextareaField(state, name, labelKey, value = '') {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <textarea id="${id}" name="${name}" rows="3">${escapeHtml(value || '')}</textarea>
    </label>
  `;
}



export function renderNumberField(state, name, labelKey, value = 0) {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <input id="${id}" name="${name}" type="number" min="0" step="0.1" value="${escapeAttribute(value)}">
    </label>
  `;
}



export function renderEditableList(state, name, labelKey, values) {
  const inputId = `exercise-${name}-entry`;
  return `
    <div class="editable-list form-grid__wide" data-editable-list="${name}">
      <label class="field" for="${inputId}">
        <span>${t(state, labelKey)}</span>
        <span class="inline-control">
          <input id="${inputId}" type="text" data-list-entry="${name}" autocomplete="off">
          <button class="button" type="button" data-list-add="${name}">${t(state, 'addListItem')}</button>
        </span>
      </label>
      <div class="chip-list editable-list__items" data-list-items="${name}">
        ${values.map((value) => renderListItem(name, value, state)).join('')}
      </div>
    </div>
  `;
}



export function renderWorkoutDraftItem(state, exercise, order = 0, workoutItem = null) {
  const language = state.settings.language;
  const exerciseId = exercise?.id || workoutItem?.exerciseId || '';
  const name = localizedText(exercise?.name, language) || exerciseId || t(state, 'emptyValue');
  const isMissingExercise = Boolean(exerciseId && !exercise);
  const executionMode = exercise?.executionMode || 'reps';
  const usesDuration = executionMode === 'time' || executionMode === 'hold';
  const effortField = usesDuration ? 'durationSec' : 'reps';
  const effortValue = usesDuration
    ? workoutItem?.durationSec ?? 30
    : workoutItem?.reps ?? 10;

  return `
    <article class="workout-item" data-workout-item data-exercise-id="${escapeAttribute(exerciseId)}" data-execution-mode="${escapeAttribute(executionMode)}" data-order="${escapeAttribute(order)}" role="listitem">
      <div class="workout-item__header">
        <div class="workout-item__title">
          <span class="workout-item__drag-handle" role="button" tabindex="0" draggable="true" data-workout-drag-handle aria-label="${t(state, 'dragWorkoutItem')}">↕</span>
          <h3>${escapeHtml(name)}</h3>
          <span class="badge">${escapeHtml(executionMode)}</span>
        </div>
        <div class="workout-item__actions">
          <button class="icon-button" type="button" data-workout-move="up" aria-label="${t(state, 'moveExerciseUp')}">↑</button>
          <button class="icon-button" type="button" data-workout-move="down" aria-label="${t(state, 'moveExerciseDown')}">↓</button>
          <button class="button button--danger" type="button" data-workout-remove aria-label="${escapeAttribute(`${t(state, 'deleteWorkoutItem')}: ${name}`)}">${t(state, 'deleteWorkoutItem')}</button>
        </div>
      </div>
      ${isMissingExercise ? `<p class="notice" data-type="error">${t(state, 'workoutUnknownExercise')}</p>` : ''}

      <div class="form-grid workout-item__fields">
        <label class="field">
          <span>${t(state, 'workoutSetsLabel')} *</span>
          <input data-workout-field="sets" type="number" min="1" step="1" value="${escapeAttribute(workoutItem?.sets ?? 3)}" required inputmode="numeric">
        </label>

        <label class="field">
          <span>${t(state, usesDuration ? 'workoutDurationSecLabel' : 'workoutRepsLabel')} *</span>
          <input data-workout-field="${effortField}" type="number" min="1" step="1" value="${escapeAttribute(effortValue)}" required inputmode="numeric">
        </label>

        <label class="field">
          <span>${t(state, 'workoutRestBetweenSetsLabel')} *</span>
          <input data-workout-field="restBetweenSetsSec" type="number" min="0" step="1" value="${escapeAttribute(workoutItem?.restBetweenSetsSec ?? 60)}" required inputmode="numeric">
        </label>

        <label class="field">
          <span>${t(state, 'workoutRestAfterExerciseLabel')} *</span>
          <input data-workout-field="restAfterExerciseSec" type="number" min="0" step="1" value="${escapeAttribute(workoutItem?.restAfterExerciseSec ?? 90)}" required inputmode="numeric">
        </label>

        <label class="field form-grid__wide">
          <span>${t(state, 'workoutNotesLabel')}</span>
          <textarea data-workout-field="notes" rows="2">${escapeHtml(workoutItem?.notes || '')}</textarea>
        </label>
      </div>
    </article>
  `;
}


