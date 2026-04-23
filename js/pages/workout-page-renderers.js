import { t } from '../i18n/index.js';
import { renderEmptyState } from './components.js';
import { getRouteParams } from '../core/router.js';
import { selectExerciseCatalog, selectUserWorkouts, selectWorkoutById } from '../core/selectors.js';
import { escapeAttribute, escapeHtml, formatCalories, formatDuration } from '../core/utils.js';
import {
  calculateEstimatedWorkoutDuration,
  calculateWorkoutCaloriesEstimate,
} from '../features/workouts.js';
import { renderWorkoutFormPage } from './form-renderers.js';
import { renderWorkoutCard, renderWorkoutViewItem } from './workout-renderers.js';

export function renderWorkoutCreatePage(state) {
  return renderWorkoutFormPage(state, null);
}

export function renderWorkoutEditPage(state) {
  const { id } = getRouteParams();
  const workout = selectWorkoutById(state, id);

  return renderWorkoutFormPage(state, workout || null, id);
}

export function renderWorkoutViewPage(state) {
  return `
    <section class="page" data-page-route="workout-view">
      <div data-page-region="workout-view-content">
        ${renderWorkoutViewContentRegion(state)}
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
      </div>

      <div class="session-layout">
        <aside class="session-sidebar card" aria-label="${escapeAttribute(t(state, 'workoutsTitle'))}">
          <div class="session-sidebar__header">
            <div>
              <h2>${t(state, 'workoutsTitle')}</h2>
              <p class="muted">${t(state, 'sessionCurrentDetails')}</p>
            </div>
            <span class="badge" data-session-exercise-counter>0 / 0</span>
          </div>
          <div class="session-playlist" data-session-playlist></div>
        </aside>

        <article class="session-panel">
          <div class="session-panel__head">
            <div class="session-kicker" data-session-step-kind>${t(state, 'sessionExerciseStep')}</div>
            <div class="session-status" data-session-status aria-live="polite">${t(state, 'sessionStatus_idle')}</div>
          </div>

          <div class="session-panel__main">
            <div class="session-panel__title">
              <p class="session-panel__index" data-session-exercise-counter-inline>0 / 0</p>
              <h2 data-session-exercise>${t(state, 'emptyValue')}</h2>
              <p class="session-panel__description muted" data-session-description>${t(state, 'emptyValue')}</p>
            </div>

            <div class="session-current-timer" data-session-current-time aria-live="polite">00:00</div>

            <div class="session-progress">
              <div class="session-progress__label">
                <span>${t(state, 'sessionWorkoutProgress')}</span>
                <strong data-session-progress-value>0%</strong>
              </div>
              <div class="session-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <span data-session-progress></span>
              </div>
            </div>

            <section class="session-grid" aria-label="${t(state, 'sessionCurrentDetails')}">
              <article class="session-metric">
                <span>${t(state, 'sessionCurrentSet')}</span>
                <strong data-session-sets>${t(state, 'sessionNotApplicable')}</strong>
              </article>
              <article class="session-metric">
                <span>${t(state, 'sessionCurrentRep')}</span>
                <strong data-session-reps>${t(state, 'sessionNotApplicable')}</strong>
              </article>
              <article class="session-metric">
                <span>${t(state, 'sessionTotalTimer')}</span>
                <strong data-session-total-time>00:00</strong>
              </article>
              <article class="session-metric session-metric--wide">
                <span>${t(state, 'sessionNextStep')}</span>
                <strong data-session-next>${t(state, 'emptyValue')}</strong>
              </article>
            </section>
          </div>

          <div class="session-controls" aria-label="${t(state, 'sessionControls')}">
            <div class="session-controls__primary">
              <button class="button" type="button" data-session-action="subtract-time">${t(state, 'sessionSubtractTen')}</button>
              <button class="button button--primary" type="button" data-session-action="pause-resume">${t(state, 'sessionPause')}</button>
              <button class="button" type="button" data-session-action="skip">${t(state, 'sessionSkip')}</button>
            </div>
            <div class="session-controls__secondary">
              <button class="button" type="button" data-session-action="add-time">${t(state, 'sessionAddTen')}</button>
              <button class="button button--danger" type="button" data-session-action="abort">${t(state, 'sessionAbort')}</button>
            </div>
          </div>
        </article>
      </div>

      <section class="session-finish" data-session-finish hidden aria-live="polite"></section>
    </section>
  `;
}

export function renderWorkoutViewContentRegion(state) {
  const { id } = getRouteParams();
  const exercises = selectExerciseCatalog(state);

  if (!id) {
    const userWorkouts = selectUserWorkouts(state);

    return `
      <div class="page-header">
        <h1>${t(state, 'workoutsTitle')}</h1>
        <a class="button button--primary" href="#workout-create">${t(state, 'createWorkout')}</a>
      </div>

      <p class="muted">${t(state, 'userWorkoutsHint')}</p>

      ${userWorkouts.length
        ? `<div class="workout-card-grid">${userWorkouts.map((workout) => renderWorkoutCard(state, workout, exercises)).join('')}</div>`
        : renderEmptyState(state, 'emptyWorkoutsTitle', 'emptyWorkoutsDescription', 'createWorkout', '#workout-create')}
    `;
  }

  const workout = selectWorkoutById(state, id);

  if (!workout) {
    return `
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
    `;
  }

  const durationSec = calculateEstimatedWorkoutDuration(workout, exercises);
  const calories = calculateWorkoutCaloriesEstimate(workout, exercises);

  return `
    <div class="page-header">
      <div>
        <a class="back-link" href="#workout-view">← ${t(state, 'workoutsTitle')}</a>
        <h1>${escapeHtml(workout.title || t(state, 'workoutViewTitle'))}</h1>
        <p class="muted">${escapeHtml(workout.description || t(state, 'emptyValue'))}</p>
      </div>
    </div>

    ${workout.items.length ? '' : renderEmptyState(state, 'workoutEmptyViewTitle', 'workoutEmptyViewDescription', 'editWorkout', `#workout-edit/${encodeURIComponent(workout.id)}`)}

    <article class="card workout-summary workout-summary--hero">
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
      ${workout.items.map((item, index) => renderWorkoutViewItem(state, item, exercises.find((exercise) => exercise.id === item.exerciseId), index)).join('')}
    </div>

    <div class="toolbar">
      <a class="button button--primary" href="#workout-run/${encodeURIComponent(workout.id)}" ${workout.items.length ? '' : 'aria-disabled="true" tabindex="-1"'}>${t(state, 'startWorkout')}</a>
      <a class="button" href="#workout-edit/${encodeURIComponent(workout.id)}">${t(state, 'editWorkout')}</a>
      <button class="button" type="button" data-workout-action="duplicate" data-workout-id="${escapeAttribute(workout.id)}">${t(state, 'duplicateWorkout')}</button>
      <button class="button button--danger" type="button" data-workout-action="delete" data-workout-id="${escapeAttribute(workout.id)}">${t(state, 'deleteWorkout')}</button>
    </div>
  `;
}
