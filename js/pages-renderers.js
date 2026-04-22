import { renderProgressCalendar } from './calendar.js';
import { audioEvents } from './audio.js';
import { getExerciseCatalog } from './exercises.js';
import { getStatsSummary } from './history.js';
import { localizedText, t } from './i18n.js';
import { renderEmptyState, renderListItem } from './pages-components.js';
import { getPopularPresetWorkouts } from './presets.js';
import { getRouteParams } from './router.js';
import {
  asArray,
  escapeAttribute,
  escapeHtml,
  formatCalories,
  formatDuration,
  uniqueStrings,
} from './utils.js';
import {
  calculateEstimatedWorkoutDuration,
  calculateWorkoutCaloriesEstimate,
  getWorkouts,
} from './workouts.js';

const EXECUTION_MODES = ['reps', 'time', 'hold', 'custom'];
const TEMPO_FIELDS = ['eccentric', 'pauseBottom', 'concentric', 'pauseTop'];

export { renderListItem } from './pages-components.js';

function renderPlaceholder(state, titleKey) {
  return `
    <section class="page">
      <div class="page-header">
        <h1>${t(state, titleKey)}</h1>
      </div>
      <article class="card">
        <p class="muted">${t(state, 'pagePlaceholder')}</p>
      </article>
    </section>
  `;
}

export function renderHomePage(state) {
  const exercises = getExerciseCatalog(state);
  const userWorkouts = getWorkouts().filter((workout) => !workout.isPreset);
  const presetWorkouts = getPopularPresetWorkouts();
  const customExerciseCount = state.store.customExercises.length;
  const activityStats = getHomeActivityStats(state.store.history);
  const lastOpenedWorkout = getLastOpenedWorkout(state, userWorkouts);

  return `
    <section class="page home-page">
      <div class="home-stats">
        ${renderHomeStat(state, userWorkouts.length, 'totalWorkouts')}
        ${renderHomeStat(state, exercises.length, 'exercisesTitle')}
        ${renderHomeStat(state, customExerciseCount, 'customExercises')}
      </div>

      <div class="quick-actions" aria-label="${t(state, 'quickActions')}">
        <a class="quick-action quick-action--primary" href="#workout-create">
          <span class="quick-action__icon">🏋️</span>
          <span>${t(state, 'quickActionNewTrain')}</span>
        </a>
        ${lastOpenedWorkout ? `
          <a class="quick-action" href="#workout-view/${encodeURIComponent(lastOpenedWorkout.id)}" aria-label="${escapeAttribute(`${t(state, 'returnToLastWorkout')}: ${lastOpenedWorkout.title}`)}">
            <span class="quick-action__icon">↩</span>
            <span>${t(state, 'returnToLastWorkout')}</span>
          </a>
        ` : ''}
        <a class="quick-action" href="#exercises">
          <span class="quick-action__icon">📋</span>
          <span>${t(state, 'quickActionExercises')}</span>
        </a>
        <a class="quick-action" href="#settings">
          <span class="quick-action__icon">⚙️</span>
          <span>${t(state, 'quickActionSettings')}</span>
        </a>
      </div>

      ${renderHomeActivityStats(state, activityStats)}

      ${renderProgressCalendar(state.store.history, { language: state.settings.language })}

      <section class="home-section" aria-labelledby="user-workouts-heading">
        <div class="section-header">
          <div>
            <h2 id="user-workouts-heading">${t(state, 'workoutsTitle')}</h2>
            <p class="muted">${t(state, 'userWorkoutsHint')}</p>
          </div>
          <a class="button button--primary" href="#workout-create"><span>${t(state, 'quickActionCreate')}</span></a>
        </div>

        ${userWorkouts.length
          ? `<div class="workout-card-grid">${userWorkouts.map((workout) => renderWorkoutCard(state, workout, exercises)).join('')}</div>`
          : renderEmptyState(state, 'emptyWorkoutsTitle', 'emptyWorkoutsDescription', 'createWorkout', '#workout-create')}
      </section>

      <section class="home-section" aria-labelledby="preset-workouts-heading">
        <div class="section-header">
          <div>
            <h2 id="preset-workouts-heading">${t(state, 'presetWorkoutsTitle')}</h2>
            <p class="muted">${t(state, 'presetWorkoutsHint')}</p>
          </div>
        </div>

        ${presetWorkouts.length
          ? `<div style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: none;">
              ${presetWorkouts.map((workout) =>
                renderWorkoutCard(state, workout, exercises, { isPresetCard: true })
              ).join('')}
            </div>`
          : renderEmptyState(state, 'emptyPresetsTitle', 'emptyPresetsDescription', 'createWorkout', '#workout-create')}
      </section>
    </section>
  `;
}

function getLastOpenedWorkout(state, workouts) {
  const workoutId = state.settings.lastOpenedWorkoutId;

  if (!workoutId) {
    return null;
  }

  return workouts.find((workout) => workout.id === workoutId) || null;
}

export function renderExercisesPage(state) {
  const language = state.settings.language;
  const exercises = getExerciseCatalog(state);

  // Подготовка фильтров
  const allMuscles = new Set();
  const allTypes = new Set();

  exercises.forEach(ex => {
    ex.muscles?.forEach(m => allMuscles.add(m));
    const typeName = localizedText(ex.type, language);
    if (typeName) allTypes.add(typeName);
  });

  const muscleOptions = Array.from(allMuscles).sort().map(m => 
    `<option value="${escapeAttribute(m)}">${escapeHtml(m)}</option>`
  ).join('');

  const typeOptions = Array.from(allTypes).sort().map(t => 
    `<option value="${escapeAttribute(t.toLowerCase())}">${escapeHtml(t)}</option>`
  ).join('');

  // Карточки упражнений
  const exerciseCardsHTML = exercises.map(exercise => {
    const name = localizedText(exercise.name, language);
    const desc = localizedText(exercise.shortDescription, language);
    const searchText = `${name} ${desc} ${exercise.muscles.join(' ')}`.toLowerCase();
    const typeText = localizedText(exercise.type, language).toLowerCase();
    const musclesText = exercise.muscles.join('|');
    const isFavorite = state.store.favorites.includes(exercise.id);

    return `
      <a class="exercise-card" href="#exercise-view/${encodeURIComponent(exercise.id)}"
         data-exercise-search="${escapeHtml(searchText)}"
         data-exercise-type="${escapeAttribute(typeText)}"
         data-exercise-muscles="${escapeAttribute(musclesText)}">
        <div class="exercise-card__content">
          <div class="exercise-card__header">
            <h3>${escapeHtml(name)}</h3>
            ${isFavorite ? `<span class="badge badge--favorite">★</span>` : ''}
          </div>
          <p class="muted">${escapeHtml(desc || t(state, 'emptyValue'))}</p>
          <div class="exercise-card__meta">
            <span class="badge">${escapeHtml(localizedText(exercise.type, language) || exercise.executionMode)}</span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  return `
    <section class="page exercises-page">
      <div class="page-header">
        <h1>${t(state, 'exercisesTitle')}</h1>
        <a class="button button--primary" href="#exercise-create">${t(state, 'createExercise')}</a>
      </div>

      <div class="exercise-filters">
        <label class="field">
          <span>${t(state, 'exerciseSearchLabel')}</span>
          <input type="text" id="exercises-search" data-exercises-search placeholder="${t(state, 'exerciseSearchPlaceholder')}" autocomplete="off">
        </label>

        <label class="field">
          <span>${t(state, 'exerciseTypeLabel')}</span>
          <select id="exercises-type-filter" data-exercises-type-filter>
            <option value="">${t(state, 'filterAll')}</option>
            ${typeOptions}
          </select>
        </label>

        <label class="field">
          <span>${t(state, 'exerciseMusclesLabel')}</span>
          <select id="exercises-muscle-filter" data-exercises-muscle-filter>
            <option value="">${t(state, 'filterAll')}</option>
            ${muscleOptions}
          </select>
        </label>
      </div>

      <div class="exercise-list" data-exercise-list>
        ${exerciseCardsHTML || `<p class="muted" role="status">${t(state, 'emptyExercises')}</p>`}
      </div>

      <p class="muted exercise-no-results" data-exercise-no-results role="status" aria-live="polite" hidden>${t(state, 'exerciseFilterNoResults')}</p>
    </section>
  `;
}

export function renderExerciseViewPage(state) {
  const language = state.settings.language;
  const { id } = getRouteParams();
  const exercise = getExerciseCatalog(state).find((item) => item.id === id);

  if (!exercise) {
    return `
      <section class="page">
        <div class="page-header">
          <h1>${t(state, 'exerciseViewTitle')}</h1>
        </div>
        <article class="empty-state">
          <div class="empty-state__icon" aria-hidden="true">!</div>
          <div>
            <h3>${id ? t(state, 'exerciseNotFound') : t(state, 'selectExercise')}</h3>
            <p class="muted">${id ? t(state, 'exerciseNotFoundHint') : t(state, 'selectExerciseHint')}</p>
          </div>
          <div class="toolbar">
            <a class="button" href="#exercises">${t(state, 'backToExercises')}</a>
          </div>
        </article>
      </section>
    `;
  }

  const name = localizedText(exercise.name, language);
  const isFavorite = state.store.favorites.includes(exercise.id);
  const customActions = exercise.isCustom ? `
    <button class="button" type="button" data-exercise-action="edit" data-exercise-id="${escapeAttribute(exercise.id)}">${t(state, 'editExercise')}</button>
    <button class="button button--danger" type="button" data-exercise-action="delete" data-exercise-id="${escapeAttribute(exercise.id)}">${t(state, 'deleteExercise')}</button>
  ` : '';

  return `
    <section class="page">
      <div class="page-header">
        <div>
          <a class="back-link" href="#exercises">${t(state, 'backToExercises')}</a>
          <h1>${escapeHtml(name || t(state, 'exerciseViewTitle'))}</h1>
        </div>
      </div>

      <article class="card exercise-view ${exercise.image ? '' : 'exercise-view--no-image'}">
        ${exercise.image ? `
          <img class="exercise-view__image" src="${escapeAttribute(exercise.image)}" alt="${escapeAttribute(name)}">
        ` : ''}

        <div class="exercise-view__content">
          <p class="exercise-view__lead">${renderText(exercise.shortDescription, language, state)}</p>

          <div class="toolbar">
            <button class="button ${isFavorite ? '' : 'button--primary'}" type="button" data-exercise-action="favorite" data-exercise-id="${escapeAttribute(exercise.id)}">
              ${isFavorite ? t(state, 'removeFromFavorites') : t(state, 'addToFavorites')}
            </button>
            <button class="button" type="button" data-exercise-action="add-to-workout" data-exercise-id="${escapeAttribute(exercise.id)}">${t(state, 'addToWorkout')}</button>
            ${customActions}
          </div>

          <dl class="details-grid">
            ${renderDetail(state, 'exerciseInstruction', renderText(exercise.instruction, language, state))}
            ${renderDetail(state, 'exerciseEffect', renderText(exercise.effect, language, state))}
            ${renderDetail(state, 'exerciseType', escapeHtml(localizedText(exercise.type, language) || t(state, 'emptyValue')))}
            ${renderDetail(state, 'exerciseMuscles', renderChips(exercise.muscles, state))}
            ${renderDetail(state, 'exerciseTags', renderChips(exercise.tags, state))}
            ${renderDetail(state, 'exerciseExecutionMode', escapeHtml(exercise.executionMode || t(state, 'emptyValue')))}
            ${renderDetail(state, 'exerciseTempo', escapeHtml(formatTempo(exercise.tempo, state)))}
            ${renderDetail(state, 'exerciseEstimatedCalories', escapeHtml(`${exercise.estimatedCalories || 0}`))}
          </dl>
        </div>
      </article>
    </section>
  `;
}

export function renderExerciseCreatePage(state) {
  return renderExerciseFormPage(state, null);
}

export function renderExerciseEditPage(state) {
  const { id } = getRouteParams();
  const exercise = getExerciseCatalog(state).find((item) => item.id === id && item.isCustom);

  return renderExerciseFormPage(state, exercise || null, id);
}

export function renderWorkoutCreatePage(state) {
  return renderWorkoutFormPage(state, null);
}

export function renderWorkoutEditPage(state) {
  const { id } = getRouteParams();
  const workout = getWorkouts().find((item) => item.id === id);

  return renderWorkoutFormPage(state, workout || null, id);
}

export function renderWorkoutViewPage(state) {
  const { id } = getRouteParams();           // id из хеша
  const exercises = getExerciseCatalog(state);

  // === Если ID нет — показываем список всех пользовательских тренировок ===
  if (!id) {
    const userWorkouts = getWorkouts().filter((workout) => !workout.isPreset);

    return `
      <section class="page">
        <div class="page-header">
          <h1>${t(state, 'workoutsTitle')}</h1>
          <a class="button button--primary" href="#workout-create">${t(state, 'createWorkout')}</a>
        </div>

        <p class="muted">${t(state, 'userWorkoutsHint')}</p>

        ${userWorkouts.length
          ? `<div class="workout-card-grid">${userWorkouts.map((workout) => renderWorkoutCard(state, workout, exercises)).join('')}</div>`
          : renderEmptyState(state, 'emptyWorkoutsTitle', 'emptyWorkoutsDescription', 'createWorkout', '#workout-create')}
      </section>
    `;
  }

  // === Если ID есть — показываем детальную страницу тренировки (как было) ===
  const workout = getWorkouts().find((item) => item.id === id);

  if (!workout) {
    return `
      <section class="page">
        <div class="page-header">
          <h1>${t(state, 'workoutViewTitle')}</h1>
        </div>
        <article class="empty-state">
          <div class="empty-state__icon" aria-hidden="true">!</div>
          <div>
            <h3>${t(state, 'workoutNotFound')}</h3>
            <p class="muted">${t(state, 'workoutNotFoundHint')}</p>
          </div>
          <div class="toolbar">
            <a class="button" href="#workout-view">${t(state, 'workoutsTitle')}</a>
            <a class="button button--primary" href="#workout-create">${t(state, 'createWorkout')}</a>
          </div>
        </article>
      </section>
    `;
  }

  const durationSec = calculateEstimatedWorkoutDuration(workout, exercises);
  const calories = calculateWorkoutCaloriesEstimate(workout, exercises);

  return `
    <section class="page">
      <div class="page-header">
        <div>
          <a class="back-link" href="#workout-view">← ${t(state, 'workoutsTitle')}</a>
          <h1>${escapeHtml(workout.title || t(state, 'workoutViewTitle'))}</h1>
          <p class="muted">${escapeHtml(workout.description || t(state, 'emptyValue'))}</p>
        </div>
      </div>

      ${workout.items.length ? '' : renderEmptyState(state, 'workoutEmptyViewTitle', 'workoutEmptyViewDescription', 'editWorkout', `#workout-edit/${encodeURIComponent(workout.id)}`)}

      <article class="card workout-summary">
        <div class="stat">
          <span class="stat__value">${escapeHtml(formatDuration(durationSec))}</span>
          <span class="muted">${t(state, 'workoutEstimatedDuration')}</span>
        </div>
        <div class="stat">
          <span class="stat__value">${escapeHtml(formatCalories(calories))}</span>
          <span class="muted">${t(state, 'workoutEstimatedCalories')}</span>
        </div>
        <div class="stat">
          <span class="stat__value">${workout.items.length}</span>
          <span class="muted">${t(state, 'workoutExerciseCount')}</span>
        </div>
      </article>

      <div class="workout-view-list">
        ${workout.items.map((item, index) => renderWorkoutViewItem(state, item, exercises.find(e => e.id === item.exerciseId), index)).join('')}
      </div>

      <div class="toolbar">
        <a class="button button--primary" href="#workout-run/${encodeURIComponent(workout.id)}" ${workout.items.length ? '' : 'aria-disabled="true" tabindex="-1"'}>${t(state, 'startWorkout')}</a>
        <a class="button" href="#workout-edit/${encodeURIComponent(workout.id)}">${t(state, 'editWorkout')}</a>
        <button class="button" type="button" data-workout-action="duplicate" data-workout-id="${escapeAttribute(workout.id)}">${t(state, 'duplicateWorkout')}</button>
        <button class="button button--danger" type="button" data-workout-action="delete" data-workout-id="${escapeAttribute(workout.id)}">${t(state, 'deleteWorkout')}</button>
      </div>
    </section>
  `;
}

export function renderWorkoutRunPage(state) {
  const { id } = getRouteParams();
  const workout = getWorkouts().find((item) => item.id === id);

  if (!workout) {
    return `
      <section class="page">
        <div class="page-header">
          <h1>${t(state, 'workoutRunTitle')}</h1>
        </div>
        <article class="empty-state">
          <div class="empty-state__icon" aria-hidden="true">!</div>
          <div>
            <h3>${id ? t(state, 'workoutNotFound') : t(state, 'selectWorkout')}</h3>
            <p class="muted">${id ? t(state, 'workoutNotFoundHint') : t(state, 'selectWorkoutHint')}</p>
          </div>
          <div class="toolbar">
            <a class="button" href="#home">${t(state, 'navHome')}</a>
          </div>
        </article>
      </section>
    `;
  }

  return `
    <section class="page session-page" data-session-root data-workout-id="${escapeAttribute(workout.id)}">
      <div class="page-header session-page__header">
        <div>
          <a class="back-link" href="#workout-view/${encodeURIComponent(workout.id)}">${t(state, 'navWorkoutView')}</a>
          <h1>${escapeHtml(workout.title || t(state, 'workoutRunTitle'))}</h1>
        </div>
        <div class="session-status" data-session-status aria-live="polite">${t(state, 'sessionStatus_idle')}</div>
      </div>

      <article class="session-panel">
        <div class="session-panel__main">
          <div class="session-kicker" data-session-step-kind>${t(state, 'sessionExerciseStep')}</div>
          <h2 data-session-exercise>${t(state, 'emptyValue')}</h2>
          <div class="session-phase" data-session-phase>${t(state, 'emptyValue')}</div>
          <div class="session-current-timer" data-session-current-time aria-live="polite">00:00</div>
        </div>

        <div class="session-panel__aside">
          <div class="session-total-timer">
            <span>${t(state, 'sessionTotalTimer')}</span>
            <strong data-session-total-time>00:00</strong>
          </div>
          <div class="session-progress">
            <div class="session-progress__label">
              <span>${t(state, 'sessionWorkoutProgress')}</span>
              <strong data-session-progress-value>0%</strong>
            </div>
            <div class="session-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
              <span data-session-progress></span>
            </div>
          </div>
        </div>
      </article>

      <section class="session-grid" aria-label="${t(state, 'sessionCurrentDetails')}">
        <article class="session-metric">
          <span>${t(state, 'sessionCurrentSet')}</span>
          <strong data-session-sets>${t(state, 'sessionNotApplicable')}</strong>
        </article>
        <article class="session-metric">
          <span>${t(state, 'sessionCurrentRep')}</span>
          <strong data-session-reps>${t(state, 'sessionNotApplicable')}</strong>
        </article>
        <article class="session-metric session-metric--wide">
          <span>${t(state, 'sessionNextStep')}</span>
          <strong data-session-next>${t(state, 'emptyValue')}</strong>
        </article>
      </section>

      <div class="session-controls" aria-label="${t(state, 'sessionControls')}">
        <button class="button button--primary" type="button" data-session-action="pause-resume">${t(state, 'sessionPause')}</button>
        <button class="button" type="button" data-session-action="skip">${t(state, 'sessionSkip')}</button>
        <button class="button" type="button" data-session-action="add-time">${t(state, 'sessionAddTen')}</button>
        <button class="button" type="button" data-session-action="subtract-time">${t(state, 'sessionSubtractTen')}</button>
        <button class="button button--danger" type="button" data-session-action="abort">${t(state, 'sessionAbort')}</button>
      </div>

      <section class="session-finish" data-session-finish hidden aria-live="polite"></section>
    </section>
  `;
}

export function renderSettingsPage(state) {
  const { settings } = state;
  const volumePercent = Math.round(settings.volume * 100);

  return `
    <section class="page">
      <div class="page-header">
        <h1>${t(state, 'settingsTitle')}</h1>
      </div>

      <article class="card settings-panel">
        <div class="settings-panel__header">
          <h3>${t(state, 'interfaceSettings')}</h3>
          <p class="muted">${t(state, 'interfaceSettingsDescription')}</p>
        </div>

        <div class="settings-grid">
          <label class="field" for="setting-theme">
            <span>${t(state, 'themeLabel')}</span>
            <select id="setting-theme" data-setting="theme">
              <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>${t(state, 'themeLight')}</option>
              <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>${t(state, 'themeDark')}</option>
              <option value="system" ${settings.theme === 'system' ? 'selected' : ''}>${t(state, 'themeSystem')}</option>
            </select>
          </label>

          <label class="field" for="setting-language">
            <span>${t(state, 'languageLabel')}</span>
            <select id="setting-language" data-setting="language">
              <option value="ru" ${settings.language === 'ru' ? 'selected' : ''}>${t(state, 'languageRu')}</option>
              <option value="en" ${settings.language === 'en' ? 'selected' : ''}>${t(state, 'languageEn')}</option>
            </select>
          </label>

          <div class="field">
            <span>${t(state, 'soundLabel')}</span>
            <label class="checkbox-field">
              <input type="checkbox" data-setting="soundEnabled" ${settings.soundEnabled ? 'checked' : ''}>
              <span>${t(state, 'soundEnabled')}</span>
            </label>
          </div>

          <label class="field" for="setting-volume">
            <span>${t(state, 'volumeLabel')}: <output id="setting-volume-value">${volumePercent}%</output></span>
            <input id="setting-volume" type="range" min="0" max="1" step="0.01" value="${settings.volume}" data-setting="volume">
          </label>
        </div>
      </article>

      <article class="card settings-panel">
        <div class="settings-panel__header">
          <h3>${t(state, 'customAudioSettings')}</h3>
          <p class="muted">${t(state, 'customAudioDescription')}</p>
        </div>

        <div class="custom-audio-list">
          ${audioEvents.map((eventName) => renderCustomAudioRow(state, eventName, settings.customAudio?.[eventName])).join('')}
        </div>

        <p class="notice" id="custom-audio-status" role="status" aria-live="polite"></p>
      </article>

      <article class="card settings-panel">
        <div class="settings-panel__header">
          <h3>${t(state, 'dataSettings')}</h3>
          <p class="muted">${t(state, 'dataSettingsDescription')}</p>
        </div>

        <div class="toolbar">
          <button class="button button--primary" type="button" id="export-data-button">${t(state, 'exportJson')}</button>
          <button class="button" type="button" id="import-data-button">${t(state, 'importJson')}</button>
          <input class="sr-only" type="file" id="import-data-file" accept="application/json,.json">
        </div>

        <fieldset class="import-mode">
          <legend>${t(state, 'importMode')}</legend>
          <label>
            <input type="radio" name="import-mode" value="merge" checked>
            ${t(state, 'importMerge')}
          </label>
          <label>
            <input type="radio" name="import-mode" value="replace">
            ${t(state, 'importReplace')}
          </label>
        </fieldset>

        <p class="notice" id="import-export-status" role="status" aria-live="polite"></p>
      </article>
    </section>
  `;
}

function renderCustomAudioRow(state, eventName, audioEntry) {
  const hasAudio = Boolean(getCustomAudioDataUrl(audioEntry));
  const fileName = getCustomAudioName(audioEntry) || t(state, 'customAudioDefault');
  const fileSize = getCustomAudioSize(audioEntry);

  return `
    <div class="custom-audio-row" data-custom-audio-row="${escapeAttribute(eventName)}">
      <div class="custom-audio-row__main">
        <strong>${t(state, `audioEvent_${eventName}`)}</strong>
        <span class="muted">${escapeHtml(fileName)}${fileSize ? ` · ${escapeHtml(formatFileSize(fileSize))}` : ''}</span>
      </div>

      <div class="custom-audio-row__actions">
        <label class="button custom-audio-upload">
          <span>${t(state, hasAudio ? 'customAudioReplace' : 'customAudioUpload')}</span>
          <input class="sr-only" type="file" accept="audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/ogg,.mp3,.wav,.ogg" data-custom-audio-upload="${escapeAttribute(eventName)}">
        </label>
        <button class="button" type="button" data-custom-audio-preview="${escapeAttribute(eventName)}">${t(state, 'customAudioPreview')}</button>
        <button class="button" type="button" data-custom-audio-reset="${escapeAttribute(eventName)}" ${hasAudio ? '' : 'disabled'}>${t(state, 'customAudioReset')}</button>
      </div>
    </div>
  `;
}

function renderWorkoutFormPage(state, workout, requestedId = '') {
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



export const pageRenderers = {
  home: renderHomePage,
  exercises: renderExercisesPage,
  'exercise-create': renderExerciseCreatePage,
  'exercise-edit': renderExerciseEditPage,
  'exercise-view': renderExerciseViewPage,
  'workout-create': renderWorkoutCreatePage,
  'workout-edit': renderWorkoutEditPage,
  'workout-view': renderWorkoutViewPage,
  'workout-run': renderWorkoutRunPage,
  settings: renderSettingsPage,
};

function renderExerciseFormPage(state, exercise, requestedId = '') {
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

function renderTextField(state, name, labelKey, value = '', required = false) {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}${required ? ' *' : ''}</span>
      <input id="${id}" name="${name}" type="text" value="${escapeAttribute(value || '')}" ${required ? 'required' : ''} autocomplete="off">
    </label>
  `;
}

function renderTextareaField(state, name, labelKey, value = '') {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <textarea id="${id}" name="${name}" rows="3">${escapeHtml(value || '')}</textarea>
    </label>
  `;
}

function renderNumberField(state, name, labelKey, value = 0) {
  const id = `exercise-${name.replaceAll('.', '-')}`;
  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <input id="${id}" name="${name}" type="number" min="0" step="0.1" value="${escapeAttribute(value)}">
    </label>
  `;
}

function renderEditableList(state, name, labelKey, values) {
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

function renderWorkoutViewItem(state, item, exercise, index) {
  const language = state.settings.language;
  const name = localizedText(exercise?.name, language) || item.exerciseId || t(state, 'emptyValue');
  const exerciseType = getExerciseTypeLabel(exercise, language) || exercise?.executionMode || t(state, 'emptyValue');

  return `
    <article class="card workout-view-item">
      <div class="workout-view-item__header">
        <div>
          <span class="muted">${index + 1}</span>
          <h3>${escapeHtml(name)}</h3>
        </div>
        <span class="badge">${escapeHtml(exerciseType)}</span>
      </div>

      <dl class="details-grid">
        ${renderDetail(state, 'workoutSetsLabel', escapeHtml(item.sets))}
        ${item.reps !== null ? renderDetail(state, 'workoutRepsLabel', escapeHtml(item.reps)) : ''}
        ${item.durationSec !== null ? renderDetail(state, 'workoutDurationSecLabel', escapeHtml(formatDuration(item.durationSec))) : ''}
        ${item.distance !== null ? renderDetail(state, 'workoutDistanceLabel', escapeHtml(item.distance)) : ''}
        ${renderDetail(state, 'workoutRestBetweenSetsLabel', escapeHtml(formatDuration(item.restBetweenSetsSec)))}
        ${renderDetail(state, 'workoutRestAfterExerciseLabel', escapeHtml(formatDuration(item.restAfterExerciseSec ?? 0)))}
        ${renderDetail(state, 'workoutNotesLabel', escapeHtml(item.notes || t(state, 'emptyValue')))}
      </dl>
    </article>
  `;
}

function renderHomeStat(state, value, labelKey) {
  return `
    <div class="home-stat">
      <span class="home-stat__value">${escapeHtml(value)}</span>
      <span class="muted">${t(state, labelKey)}</span>
    </div>
  `;
}

function renderHomeActivityStats(state, stats) {
  const items = [
    ['homeStatsWeekWorkouts', stats.weekWorkouts],
    ['homeStatsMonthWorkouts', stats.monthWorkouts],
    ['homeStatsTotalTime', formatCompactDuration(stats.totalDurationSec, state.settings.language)],
    ['homeStatsCompletedExercises', stats.totalExercisesCompleted],
    ['homeStatsActiveStreak', stats.activeDayStreak],
  ];

  return `
    <section class="home-activity" aria-labelledby="home-activity-heading">
      <div class="section-header">
        <div>
          <h2 id="home-activity-heading">${t(state, 'homeActivityStatsTitle')}</h2>
          <p class="muted">${t(state, 'homeActivityStatsHint')}</p>
        </div>
      </div>

      <div class="home-activity__grid">
        ${items.map(([labelKey, value]) => `
          <article class="home-activity__item">
            <span class="home-activity__value">${escapeHtml(value)}</span>
            <span class="muted">${t(state, labelKey)}</span>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function getHomeActivityStats(history = []) {
  const entries = asArray(history);
  const summary = getStatsSummary(entries);
  const now = new Date();
  const weekStart = getStartOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    weekWorkouts: entries.filter((entry) => isEntryInRange(entry, weekStart, addDays(weekStart, 7))).length,
    monthWorkouts: entries.filter((entry) => isEntryInRange(entry, monthStart, nextMonthStart)).length,
    totalDurationSec: summary.totalDurationSec,
    totalExercisesCompleted: summary.totalExercisesCompleted,
    activeDayStreak: calculateActiveDayStreak(entries, now),
  };
}

function calculateActiveDayStreak(history, now = new Date()) {
  const activeDays = new Set(history
    .map((entry) => normalizeDateKey(entry?.startedAt))
    .filter(Boolean));

  if (activeDays.size === 0) {
    return 0;
  }

  let cursor = startOfDay(now);

  if (!activeDays.has(formatDateKey(cursor))) {
    const yesterday = addDays(cursor, -1);

    if (!activeDays.has(formatDateKey(yesterday))) {
      return 0;
    }

    cursor = yesterday;
  }

  let streak = 0;
  while (activeDays.has(formatDateKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

function isEntryInRange(entry, start, end) {
  const date = new Date(entry?.startedAt);
  return !Number.isNaN(date.getTime()) && date >= start && date < end;
}

function getStartOfWeek(date) {
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(startOfDay(date), mondayOffset);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function normalizeDateKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : formatDateKey(date);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatCompactDuration(totalSec, language = 'ru') {
  const seconds = Math.max(0, Math.round(Number(totalSec) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0 && minutes === 0) {
    return language === 'en' ? '0 min' : '0 мин';
  }

  const hourUnit = language === 'en' ? 'h' : 'ч';
  const minuteUnit = language === 'en' ? 'min' : 'мин';

  if (hours === 0) {
    return `${minutes} ${minuteUnit}`;
  }

  if (minutes === 0) {
    return `${hours} ${hourUnit}`;
  }

  return `${hours} ${hourUnit} ${minutes} ${minuteUnit}`;
}

function renderWorkoutCard(state, workout, exercises, options = {}) {
  const isPresetCard = Boolean(options.isPresetCard);
  const language = state.settings.language;
  const title = isPresetCard
    ? localizedText(workout.title, language)
    : workout.title;
  const description = isPresetCard
    ? localizedText(workout.description, language)
    : workout.description;
  const durationSec = calculateEstimatedWorkoutDuration(workout, exercises);
  const calories = calculateWorkoutCaloriesEstimate(workout, exercises);
  const tags = workout.tags || [];

  return `
    <article class="card workout-card ${isPresetCard ? 'workout-card--preset' : ''}">
      <div class="workout-card__header">
        <div>
          <h3>${escapeHtml(title || t(state, 'workoutViewTitle'))}</h3>
          <p class="muted">${escapeHtml(description || t(state, 'emptyValue'))}</p>
        </div>
        ${isPresetCard ? `<span class="badge">${t(state, 'presetBadge')}</span>` : ''}
      </div>

      <div class="workout-card__meta">
        <span>${escapeHtml(formatDuration(durationSec))}</span>
        <span>${workout.items.length} ${t(state, 'workoutExerciseCountShort')}</span>
        <span>${escapeHtml(formatCalories(calories))}</span>
      </div>

      ${tags.length ? `
        <div class="chip-list">
          ${tags.slice(0, 3).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join('')}
        </div>
      ` : ''}

      <div class="workout-card__actions">
        ${isPresetCard ? `
          <button class="button button--primary" type="button" data-preset-workout-action="open" data-preset-workout-id="${escapeAttribute(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'openWorkout')}: ${title}`)}">${t(state, 'openWorkout')}</button>
          <button class="button" type="button" data-preset-workout-action="edit" data-preset-workout-id="${escapeAttribute(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'editWorkout')}: ${title}`)}">${t(state, 'editWorkout')}</button>
          <button class="button" type="button" data-preset-workout-action="duplicate" data-preset-workout-id="${escapeAttribute(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'duplicateWorkout')}: ${title}`)}">${t(state, 'duplicateWorkout')}</button>
        ` : `
          <a class="button button--primary" href="#workout-view/${encodeURIComponent(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'openWorkout')}: ${title}`)}">${t(state, 'openWorkout')}</a>
          <a class="button" href="#workout-edit/${encodeURIComponent(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'editWorkout')}: ${title}`)}">${t(state, 'editWorkout')}</a>
          <button class="button" type="button" data-workout-action="duplicate" data-workout-id="${escapeAttribute(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'duplicateWorkout')}: ${title}`)}">${t(state, 'duplicateWorkout')}</button>
          <button class="button button--danger" type="button" data-workout-action="delete" data-workout-id="${escapeAttribute(workout.id)}" aria-label="${escapeAttribute(`${t(state, 'deleteWorkout')}: ${title}`)}">${t(state, 'deleteWorkout')}</button>
        `}
      </div>
    </article>
  `;
}

function renderWorkoutExerciseSidebar(state, exercises) {
  const language = state.settings.language;
  const favoriteIds = new Set(state.store.favorites);
  const sortedExercises = [...exercises].sort((left, right) => {
    const favoriteDelta = Number(favoriteIds.has(right.id)) - Number(favoriteIds.has(left.id));
    if (favoriteDelta !== 0) return favoriteDelta;

    return getExerciseDisplayName(left, language).localeCompare(getExerciseDisplayName(right, language), language);
  });
  const typeOptions = uniqueStrings(exercises.map((exercise) => getExerciseTypeLabel(exercise, language)))
    .sort((left, right) => left.localeCompare(right));
  const muscleOptions = uniqueStrings(exercises.flatMap((exercise) => exercise.muscles || []))
    .sort((left, right) => left.localeCompare(right));

  return `
    <aside class="workout-exercise-sidebar" data-workout-exercise-sidebar>
      <div class="workout-exercise-sidebar__header">
        <h3>${t(state, 'workoutExercisePickerTitle')}</h3>
        <p class="muted">${t(state, 'workoutExercisePickerHint')}</p>
      </div>

      <div class="workout-exercise-filters">
        <label class="field" for="workout-exercise-search">
          <span>${t(state, 'exerciseSearchLabel')}</span>
          <input id="workout-exercise-search" type="search" data-workout-exercise-search placeholder="${escapeAttribute(t(state, 'exerciseSearchPlaceholder'))}" ${exercises.length ? '' : 'disabled'}>
        </label>

        <label class="field" for="workout-exercise-type-filter">
          <span>${t(state, 'exerciseType')}</span>
          <select id="workout-exercise-type-filter" data-workout-exercise-type-filter ${exercises.length ? '' : 'disabled'}>
            <option value="">${t(state, 'filterAll')}</option>
            ${typeOptions.map((type) => `<option value="${escapeAttribute(type.toLowerCase())}">${escapeHtml(type)}</option>`).join('')}
          </select>
        </label>

        <label class="field" for="workout-exercise-muscle-filter">
          <span>${t(state, 'exerciseMuscles')}</span>
          <select id="workout-exercise-muscle-filter" data-workout-exercise-muscle-filter ${exercises.length ? '' : 'disabled'}>
            <option value="">${t(state, 'filterAll')}</option>
            ${muscleOptions.map((muscle) => `<option value="${escapeAttribute(muscle.toLowerCase())}">${escapeHtml(muscle)}</option>`).join('')}
          </select>
        </label>
      </div>

      <div class="workout-exercise-results" data-workout-exercise-results>
        ${sortedExercises.map((exercise) => renderWorkoutExerciseOption(state, exercise, favoriteIds.has(exercise.id))).join('')}
        <p class="muted" data-workout-exercise-no-results ${exercises.length ? 'hidden' : ''}>${exercises.length ? t(state, 'exerciseFilterNoResults') : t(state, 'emptyExercises')}</p>
      </div>
    </aside>
  `;
}

function renderWorkoutExerciseOption(state, exercise, isFavorite) {
  const language = state.settings.language;
  const name = getExerciseDisplayName(exercise, language);
  const type = getExerciseTypeLabel(exercise, language);
  const description = localizedText(exercise.shortDescription, language) || t(state, 'emptyValue');
  const muscles = exercise.muscles || [];
  const searchableText = [
    name,
    localizedText(exercise.name, 'ru'),
    localizedText(exercise.name, 'en'),
    description,
    localizedText(exercise.shortDescription, 'ru'),
    localizedText(exercise.shortDescription, 'en'),
    type,
    exercise.executionMode,
    ...muscles,
    ...(exercise.tags || []),
  ].join(' ').toLowerCase();

  return `
    <article
      class="workout-exercise-option"
      data-workout-exercise-option
      data-exercise-id="${escapeAttribute(exercise.id)}"
      data-exercise-type="${escapeAttribute(type.toLowerCase())}"
      data-exercise-muscles="${escapeAttribute(muscles.join('|').toLowerCase())}"
      data-exercise-search="${escapeAttribute(searchableText)}"
    >
      <div class="workout-exercise-option__body">
        <div class="workout-exercise-option__title">
          <h4>${escapeHtml(name)}</h4>
          ${isFavorite ? `<span class="badge">${t(state, 'favoritesLabel')}</span>` : ''}
        </div>
        <p class="muted">${escapeHtml(description)}</p>
        <div class="chip-list">
          <span class="chip">${escapeHtml(type)}</span>
          ${muscles.slice(0, 3).map((muscle) => `<span class="chip">${escapeHtml(muscle)}</span>`).join('')}
        </div>
      </div>
      <button class="button button--primary" type="button" data-workout-add-exercise data-workout-add-exercise-id="${escapeAttribute(exercise.id)}">${t(state, 'addExerciseShort')}</button>
    </article>
  `;
}

function getExerciseDisplayName(exercise, language) {
  return localizedText(exercise?.name, language) || exercise?.id || '';
}

function getExerciseTypeLabel(exercise, language) {
  return localizedText(exercise?.type, language) || exercise?.executionMode || '';
}

function createExerciseMap(exercises) {
  return exercises.reduce((map, exercise) => {
    map.set(exercise.id, exercise);
    return map;
  }, new Map());
}

function renderDetail(state, labelKey, value) {
  return `
    <div class="detail">
      <dt>${t(state, labelKey)}</dt>
      <dd>${value}</dd>
    </div>
  `;
}

function renderText(value, language, state) {
  return escapeHtml(localizedText(value, language) || t(state, 'emptyValue'));
}

function renderChips(items, state) {
  if (!items.length) {
    return `<span class="muted">${t(state, 'emptyValue')}</span>`;
  }

  return `
    <div class="chip-list">
      ${items.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('')}
    </div>
  `;
}

function formatTempo(tempo, state) {
  if (!tempo) {
    return t(state, 'emptyValue');
  }

  return `${tempo.eccentric}-${tempo.pauseBottom}-${tempo.concentric}-${tempo.pauseTop}`;
}

function formatFileSize(bytes) {
  const size = Math.max(0, Number(bytes) || 0);

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function getCustomAudioDataUrl(audioEntry) {
  if (typeof audioEntry === 'string') {
    return audioEntry;
  }

  return audioEntry?.dataUrl || '';
}

function getCustomAudioName(audioEntry) {
  if (typeof audioEntry === 'string') {
    return audioEntry ? 'Data URL' : '';
  }

  return audioEntry?.name || '';
}

function getCustomAudioSize(audioEntry) {
  if (!audioEntry || typeof audioEntry === 'string') {
    return 0;
  }

  return Number(audioEntry.size) || 0;
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
