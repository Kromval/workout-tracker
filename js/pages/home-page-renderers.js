import { renderProgressCalendar } from '../features/calendar.js';
import { t } from '../i18n/index.js';
import { renderEmptyState } from './components.js';
import {
  selectCustomExerciseCount,
  selectExerciseCatalog,
  selectHistory,
  selectLanguage,
  selectLastOpenedWorkout,
  selectPresetWorkouts,
  selectUserWorkouts,
} from '../core/selectors.js';
import { escapeAttribute } from '../core/utils.js';
import { getHomeActivityStats, renderHomeActivityStats, renderHomeStat } from './home-stats.js';
import { renderWorkoutCard } from './workout-renderers.js';

export function renderHomePage(state) {
  return `
    <section class="page home-page" data-page-route="home">
      <div data-page-region="home-overview">
        ${renderHomeOverviewRegion(state)}
      </div>
      <div data-page-region="home-activity">
        ${renderHomeActivityRegion(state)}
      </div>
      <div data-page-region="home-user-workouts">
        ${renderHomeUserWorkoutsRegion(state)}
      </div>
      <div data-page-region="home-preset-workouts">
        ${renderHomePresetWorkoutsRegion(state)}
      </div>
    </section>
  `;
}

export function renderHomeOverviewRegion(state) {
  const exercises = selectExerciseCatalog(state);
  const userWorkouts = selectUserWorkouts(state);
  const customExerciseCount = selectCustomExerciseCount(state);
  const lastOpenedWorkout = selectLastOpenedWorkout(state);

  return `
    <section class="home-hero" aria-labelledby="home-hero-title">
      <article class="home-hero__content">
        <span class="eyebrow">${t(state, 'quickActions')}</span>
        <h1 id="home-hero-title">${t(state, 'appBrand')}</h1>
        <p class="muted">${t(state, 'userWorkoutsHint')}</p>

        <div class="quick-actions" aria-label="${t(state, 'quickActions')}">
          <a class="quick-action quick-action--primary" href="#workout-create">
            <span class="quick-action__label">${t(state, 'quickActionNewTrain')}</span>
          </a>
          ${
            lastOpenedWorkout
              ? `
            <a class="quick-action" href="#workout-view/${encodeURIComponent(lastOpenedWorkout.id)}" aria-label="${escapeAttribute(`${t(state, 'returnToLastWorkout')}: ${lastOpenedWorkout.title}`)}">
              <span class="quick-action__label">${t(state, 'returnToLastWorkout')}</span>
            </a>
          `
              : ''
          }
          <a class="quick-action" href="#exercises">
            <span class="quick-action__label">${t(state, 'quickActionExercises')}</span>
          </a>
          <a class="quick-action" href="#settings">
            <span class="quick-action__label">${t(state, 'quickActionSettings')}</span>
          </a>
        </div>
      </article>

      <aside class="home-stats" aria-label="${escapeAttribute(t(state, 'homeActivityStatsTitle'))}">
        ${renderHomeStat(state, userWorkouts.length, 'totalWorkouts')}
        ${renderHomeStat(state, exercises.length, 'exercisesTitle')}
        ${renderHomeStat(state, customExerciseCount, 'customExercises')}
      </aside>
    </section>
  `;
}

export function renderHomeActivityRegion(state) {
  const history = selectHistory(state);
  const activityStats = getHomeActivityStats(history);

  return `
    ${renderHomeActivityStats(state, activityStats)}
    ${renderProgressCalendar(history, { language: selectLanguage(state) })}
  `;
}

export function renderHomeUserWorkoutsRegion(state) {
  const exercises = selectExerciseCatalog(state);
  const userWorkouts = selectUserWorkouts(state);

  return `
    <section class="home-section" aria-labelledby="user-workouts-heading">
      <div class="section-header">
        <div>
          <h2 id="user-workouts-heading">${t(state, 'workoutsTitle')}</h2>
          <p class="muted">${t(state, 'userWorkoutsHint')}</p>
        </div>
        <a class="button button--primary" href="#workout-create"><span>${t(state, 'quickActionCreate')}</span></a>
      </div>

      ${
        userWorkouts.length
          ? `<div class="workout-card-grid">${userWorkouts.map((workout) => renderWorkoutCard(state, workout, exercises)).join('')}</div>`
          : renderEmptyState(
              state,
              'emptyWorkoutsTitle',
              'emptyWorkoutsDescription',
              'createWorkout',
              '#workout-create',
            )
      }
    </section>
  `;
}

export function renderHomePresetWorkoutsRegion(state) {
  const exercises = selectExerciseCatalog(state);
  const presetWorkouts = selectPresetWorkouts();

  return `
    <section class="home-section" aria-labelledby="preset-workouts-heading">
      <div class="section-header">
        <div>
          <h2 id="preset-workouts-heading">${t(state, 'presetWorkoutsTitle')}</h2>
          <p class="muted">${t(state, 'presetWorkoutsHint')}</p>
        </div>
      </div>

      ${
        presetWorkouts.length
          ? `<div class="preset-workouts-strip">
            ${presetWorkouts
              .map((workout) =>
                renderWorkoutCard(state, workout, exercises, { isPresetCard: true }),
              )
              .join('')}
          </div>`
          : renderEmptyState(
              state,
              'emptyPresetsTitle',
              'emptyPresetsDescription',
              'createWorkout',
              '#workout-create',
            )
      }
    </section>
  `;
}
