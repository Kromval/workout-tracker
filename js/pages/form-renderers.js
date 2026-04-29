/**
 * @module js/pages/form-renderers
 */
import { localizedText, t } from '../i18n/index.js';
import { renderEmptyState, renderListItem } from './components.js';
import { escapeAttribute, escapeHtml } from '../core/utils.js';
import { selectExerciseCatalog, selectLanguage } from '../core/selectors.js';
import {
  capitalize,
  createExerciseMap,
  getExerciseEquipmentLabels,
  getExerciseIntensitySummary,
  getExerciseMovementPatterns,
  getExercisePrimaryMuscles,
  getExerciseTypeLabel,
  renderWorkoutExerciseSidebar,
} from './workout-renderers.js';

/**
 * Shared execution modes constant.
 * @type {Array}
 */
const EXECUTION_MODES = ['reps', 'time', 'hold', 'custom'];
/**
 * Shared tempo fields constant.
 * @type {Array}
 */
const TEMPO_FIELDS = ['eccentric', 'pauseBottom', 'concentric', 'pauseTop'];

/**
 * Renders workout form page markup.
 * @param {object} state state input
 * @param {object} workout workout input
 * @param {string} [requestedId=""] requested id input
 * @returns {string} rendered markup
 */
export function renderWorkoutFormPage(state, workout, requestedId = '') {
  const exercises = selectExerciseCatalog(state);
  const hasExercises = exercises.length > 0;
  const exerciseMap = createExerciseMap(exercises);
  const isEdit = Boolean(workout);
  const workoutItems = workout?.items || [];

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
    <section class="page workout-builder-page">
      <div class="page-header">
        <div>
          <h1>${t(state, isEdit ? 'workoutEditTitle' : 'workoutCreateTitle')}</h1>
          ${isEdit ? '' : `<p class="muted">${t(state, 'workoutCreateGenerationHint')}</p>`}
        </div>
        ${isEdit ? '' : `<a class="button button--primary" href="#workout-generate">${t(state, 'generateWorkout')}</a>`}
      </div>

      <form class="workout-form workout-builder-form" data-workout-form data-form-mode="${isEdit ? 'edit' : 'create'}" aria-describedby="workout-form-status" novalidate>
        ${isEdit ? `<input type="hidden" name="id" value="${escapeAttribute(workout.id)}">` : ''}
        <div class="workout-builder-layout">
          <div class="workout-builder-sidebar-wrap">
            ${renderWorkoutExerciseSidebar(state, exercises)}
          </div>

          <article class="workout-builder-panel">
            <div class="workout-builder-panel__head">
              <div class="workout-builder-kicker">${t(state, 'workoutBasics')}</div>
              <div class="workout-builder-status"><span data-workout-item-count>${workoutItems.length}</span> ${t(state, 'workoutExerciseCountShort')}</div>
            </div>

            <div class="workout-builder-panel__main">
              <section class="workout-builder-section">
                <div class="workout-builder-section__title">
                  <h2>${t(state, isEdit ? 'workoutEditTitle' : 'workoutCreateTitle')}</h2>
                  <p class="muted">${t(state, 'workoutExercisePickerHint')}</p>
                </div>

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
              </section>

              <section class="workout-builder-section workout-builder-section--items">
                <div class="workout-builder-section__header">
                  <div>
                    <p class="workout-builder-section__eyebrow">${t(state, 'workoutItems')}</p>
                    <h3>${t(state, 'workoutItems')}</h3>
                  </div>
                  <span class="badge"><span data-workout-item-count>${workoutItems.length}</span> / ${exercises.length}</span>
                </div>

                <div class="workout-items" data-workout-items role="list" aria-label="${escapeAttribute(t(state, 'workoutItems'))}">
                  <p class="muted workout-items__empty" data-workout-empty role="status" ${workoutItems.length ? 'hidden' : ''}>${hasExercises ? t(state, 'workoutNoItems') : t(state, 'emptyExercises')}</p>
                  ${workoutItems.map((item, index) => renderWorkoutDraftItem(state, exerciseMap.get(item.exerciseId), index, item)).join('')}
                </div>
              </section>
            </div>

            <div class="workout-builder-panel__footer">
              <p class="notice" id="workout-form-status" data-workout-form-status role="status" aria-live="polite"></p>
              <div class="toolbar workout-builder-actions">
                <button class="button button--primary" type="submit" ${hasExercises ? '' : 'disabled'}>${t(state, 'saveWorkout')}</button>
                <a class="button" href="${isEdit ? `#workout-view/${encodeURIComponent(workout.id)}` : '#home'}">${t(state, 'cancel')}</a>
              </div>
            </div>
          </article>
        </div>
      </form>
    </section>
  `;
}

/**
 * Renders exercise form page markup.
 * @param {object} state state input
 * @param {object} exercise exercise input
 * @param {string} [requestedId=""] requested id input
 * @returns {string} rendered markup
 */
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
                ${EXECUTION_MODES.map(
                  (mode) => `
                  <option value="${mode}" ${exercise?.executionMode === mode || (!exercise && mode === 'reps') ? 'selected' : ''}>${mode}</option>
                `,
                ).join('')}
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

/**
 * Renders text field markup.
 * @param {object} state state input
 * @param {string} name name input
 * @param {string} labelKey label key input
 * @param {string} [value=""] value input
 * @param {*} [required=false] required input
 * @returns {string} rendered markup
 */
export function renderTextField(state, name, labelKey, value = '', required = false) {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}${required ? ' *' : ''}</span>
      <input id="${id}" name="${name}" type="text" value="${escapeAttribute(value || '')}" ${required ? 'required' : ''} autocomplete="off">
    </label>
  `;
}

/**
 * Renders textarea field markup.
 * @param {object} state state input
 * @param {string} name name input
 * @param {string} labelKey label key input
 * @param {string} [value=""] value input
 * @returns {string} rendered markup
 */
export function renderTextareaField(state, name, labelKey, value = '') {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <textarea id="${id}" name="${name}" rows="3">${escapeHtml(value || '')}</textarea>
    </label>
  `;
}

/**
 * Renders number field markup.
 * @param {object} state state input
 * @param {string} name name input
 * @param {string} labelKey label key input
 * @param {string} [value=0] value input
 * @returns {string} rendered markup
 */
export function renderNumberField(state, name, labelKey, value = 0) {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <input id="${id}" name="${name}" type="number" min="0" step="0.1" value="${escapeAttribute(value)}">
    </label>
  `;
}

/**
 * Renders editable list markup.
 * @param {object} state state input
 * @param {string} name name input
 * @param {string} labelKey label key input
 * @param {Array} values values input
 * @returns {string} rendered markup
 */
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

/**
 * Renders workout draft item markup.
 * @param {object} state state input
 * @param {object} exercise exercise input
 * @param {*} [order=0] order input
 * @param {object} [workoutItem=null] workout item input
 * @returns {string} rendered markup
 */
export function renderWorkoutDraftItem(state, exercise, order = 0, workoutItem = null) {
  const language = selectLanguage(state);
  const exerciseId = exercise?.id || workoutItem?.exerciseId || '';
  const name = localizedText(exercise?.name, language) || exerciseId || t(state, 'emptyValue');
  const isMissingExercise = Boolean(exerciseId && !exercise);
  const executionMode = exercise?.executionMode || 'reps';
  const usesDuration = executionMode === 'time' || executionMode === 'hold';
  const effortField = usesDuration ? 'durationSec' : 'reps';
  const defaults = createWorkoutDraftDefaults(exercise);
  const effortValue = usesDuration
    ? (workoutItem?.durationSec ?? defaults.durationSec)
    : (workoutItem?.reps ?? defaults.reps);
  const metadata = exercise ? buildWorkoutDraftMetadata(state, exercise) : [];

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
      ${
        metadata.length
          ? `
        <dl class="workout-item__meta">
          ${metadata
            .map(
              (item) => `
            <div>
              <dt>${escapeHtml(item.label)}</dt>
              <dd>${escapeHtml(item.value)}</dd>
            </div>
          `,
            )
            .join('')}
        </dl>
      `
          : ''
      }

      <div class="form-grid workout-item__fields">
        <label class="field">
          <span>${t(state, 'workoutSetsLabel')} *</span>
          <input data-workout-field="sets" type="number" min="1" step="1" value="${escapeAttribute(workoutItem?.sets ?? defaults.sets)}" required inputmode="numeric">
        </label>

        <label class="field">
          <span>${t(state, usesDuration ? 'workoutDurationSecLabel' : 'workoutRepsLabel')} *</span>
          <input data-workout-field="${effortField}" type="number" min="1" step="1" value="${escapeAttribute(effortValue)}" required inputmode="numeric">
        </label>

        <label class="field">
          <span>${t(state, 'workoutRestBetweenSetsLabel')} *</span>
          <input data-workout-field="restBetweenSetsSec" type="number" min="0" step="1" value="${escapeAttribute(workoutItem?.restBetweenSetsSec ?? defaults.restBetweenSetsSec)}" required inputmode="numeric">
        </label>

        <label class="field">
          <span>${t(state, 'workoutRestAfterExerciseLabel')} *</span>
          <input data-workout-field="restAfterExerciseSec" type="number" min="0" step="1" value="${escapeAttribute(workoutItem?.restAfterExerciseSec ?? defaults.restAfterExerciseSec)}" required inputmode="numeric">
        </label>

        <label class="field form-grid__wide">
          <span>${t(state, 'workoutNotesLabel')}</span>
          <textarea data-workout-field="notes" rows="2">${escapeHtml(workoutItem?.notes || '')}</textarea>
        </label>
      </div>
    </article>
  `;
}

/**
 * Builds workout draft metadata.
 * @param {object} state state input
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function buildWorkoutDraftMetadata(state, exercise) {
  const language = selectLanguage(state);
  const items = [
    {
      label: t(state, 'exerciseType'),
      value: getExerciseTypeLabel(exercise, language),
    },
    {
      label: t(state, 'workoutExerciseDifficulty'),
      value: humanizeToken(exercise.difficulty),
    },
    {
      label: t(state, 'workoutExerciseEquipment'),
      value: getExerciseEquipmentLabels(exercise, state).join(', '),
    },
    {
      label: t(state, 'workoutExercisePrimaryMuscles'),
      value: getExercisePrimaryMuscles(exercise).map(humanizeToken).join(', '),
    },
    {
      label: t(state, 'workoutExerciseMovement'),
      value: getExerciseMovementPatterns(exercise).map(humanizeToken).join(', '),
    },
    {
      label: t(state, 'workoutExerciseIntensity'),
      value: getExerciseIntensitySummary(exercise),
    },
    {
      label: t(state, 'workoutExerciseTempo'),
      value: exercise.tempo
        ? `${exercise.tempo.eccentric}-${exercise.tempo.pauseBottom}-${exercise.tempo.concentric}-${exercise.tempo.pauseTop}`
        : '',
    },
  ];

  return items
    .map((item) => ({
      ...item,
      value: item.value || t(state, 'emptyValue'),
    }))
    .filter((item) => item.value !== t(state, 'emptyValue'));
}

/**
 * Creates workout draft defaults.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
function createWorkoutDraftDefaults(exercise) {
  const type = localizedText(exercise?.type, 'en').toLowerCase();
  const tags = new Set((exercise?.tags || []).map((tag) => String(tag).toLowerCase()));
  const difficulty = String(exercise?.difficulty || '').toLowerCase();
  const executionMode = exercise?.executionMode || 'reps';
  const intensity = exercise?.intensityProfile || {};
  const isMobility = type === 'yoga' || tags.has('mobility') || tags.has('recovery');
  const isCardio = type === 'cardio' || intensity.cardio === 'high';
  const usesDuration = executionMode === 'time' || executionMode === 'hold';

  return {
    sets: usesDuration || isMobility ? 1 : difficulty === 'beginner' ? 2 : 3,
    reps: difficulty === 'advanced' ? 12 : difficulty === 'beginner' ? 8 : 10,
    durationSec: isMobility || executionMode === 'hold' ? 45 : isCardio ? 60 : 30,
    restBetweenSetsSec: isMobility ? 15 : isCardio ? 30 : difficulty === 'advanced' ? 90 : 60,
    restAfterExerciseSec: isMobility ? 15 : isCardio ? 45 : 90,
  };
}

/**
 * Runs humanize token.
 * @param {string} value value input
 * @returns {*} result
 */
function humanizeToken(value) {
  return String(value || '')
    .trim()
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) =>
      part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(' ');
}
