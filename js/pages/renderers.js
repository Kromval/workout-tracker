import { renderProgressCalendar } from '../features/calendar.js';
import { audioEvents } from '../features/audio.js';
import { getStatsSummary } from '../features/history.js';
import { localizedText, t } from '../i18n/index.js';
import { renderEmptyState, renderListItem } from './components.js';
import { getRouteParams } from '../core/router.js';
import {
  selectCustomExerciseCount,
  selectExerciseCatalog,
  selectFavoriteExerciseIdSet,
  selectHistory,
  selectLanguage,
  selectLastOpenedWorkout,
  selectPresetWorkouts,
  selectUserWorkouts,
  selectWorkoutById,
  selectWorkouts,
} from '../core/selectors.js';
import {
  asArray,
  escapeAttribute,
  escapeHtml,
  formatCalories,
  formatDuration,
  uniqueStrings,
} from '../core/utils.js';
import {
  calculateEstimatedWorkoutDuration,
  calculateWorkoutCaloriesEstimate,
} from '../features/workouts.js';

export { renderListItem } from './components.js';
export { renderWorkoutDraftItem } from './form-renderers.js';

import { getHomeActivityStats, renderHomeActivityStats, renderHomeStat } from './home-stats.js';
import { renderWorkoutDraftItem, renderWorkoutFormPage, renderExerciseFormPage } from './form-renderers.js';
import { renderCustomAudioRow } from './settings-renderers.js';
import {
  formatTempo,
  renderChips,
  renderDetail,
  renderText,
  renderWorkoutCard,
  renderWorkoutExerciseSidebar,
  renderWorkoutViewItem,
} from './workout-renderers.js';

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
  const exercises = selectExerciseCatalog(state);
  const userWorkouts = selectUserWorkouts(state);
  const presetWorkouts = selectPresetWorkouts();
  const customExerciseCount = selectCustomExerciseCount(state);
  const history = selectHistory(state);
  const activityStats = getHomeActivityStats(history);
  const lastOpenedWorkout = selectLastOpenedWorkout(state);

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

      ${renderProgressCalendar(history, { language: selectLanguage(state) })}

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

export function renderExercisesPage(state) {
  const language = selectLanguage(state);
  const exercises = selectExerciseCatalog(state);
  const favoriteIds = selectFavoriteExerciseIdSet(state);

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
    const isFavorite = favoriteIds.has(exercise.id);

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
  const language = selectLanguage(state);
  const { id } = getRouteParams();
  const exercise = selectExerciseCatalog(state).find((item) => item.id === id);

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
  const isFavorite = selectFavoriteExerciseIdSet(state).has(exercise.id);
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
  const exercise = selectExerciseCatalog(state).find((item) => item.id === id && item.isCustom);

  return renderExerciseFormPage(state, exercise || null, id);
}

export function renderWorkoutCreatePage(state) {
  return renderWorkoutFormPage(state, null);
}

export function renderWorkoutEditPage(state) {
  const { id } = getRouteParams();
  const workout = selectWorkoutById(state, id);

  return renderWorkoutFormPage(state, workout || null, id);
}

export function renderWorkoutViewPage(state) {
  const { id } = getRouteParams();           // id из хеша
  const exercises = selectExerciseCatalog(state);

  // === Если ID нет — показываем список всех пользовательских тренировок ===
  if (!id) {
    const userWorkouts = selectUserWorkouts(state);

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
  const workout = selectWorkoutById(state, id);

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
  const workout = selectWorkoutById(state, id);

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
