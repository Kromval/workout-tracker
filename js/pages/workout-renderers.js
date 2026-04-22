import { localizedText, t } from '../i18n/index.js';
import { escapeAttribute, escapeHtml, formatCalories, formatDuration } from '../core/utils.js';
import { calculateEstimatedWorkoutDuration, calculateWorkoutCaloriesEstimate } from '../features/workouts.js';

export function renderWorkoutViewItem(state, item, exercise, index) {
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



export function renderWorkoutCard(state, workout, exercises, options = {}) {
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



export function renderWorkoutExerciseSidebar(state, exercises) {
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



export function renderWorkoutExerciseOption(state, exercise, isFavorite) {
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



export function getExerciseDisplayName(exercise, language) {
  return localizedText(exercise?.name, language) || exercise?.id || '';
}



export function getExerciseTypeLabel(exercise, language) {
  return localizedText(exercise?.type, language) || exercise?.executionMode || '';
}



export function createExerciseMap(exercises) {
  return exercises.reduce((map, exercise) => {
    map.set(exercise.id, exercise);
    return map;
  }, new Map());
}



export function renderDetail(state, labelKey, value) {
  return `
    <div class="detail">
      <dt>${t(state, labelKey)}</dt>
      <dd>${value}</dd>
    </div>
  `;
}



export function renderText(value, language, state) {
  return escapeHtml(localizedText(value, language) || t(state, 'emptyValue'));
}



export function renderChips(items, state) {
  if (!items.length) {
    return `<span class="muted">${t(state, 'emptyValue')}</span>`;
  }

  return `
    <div class="chip-list">
      ${items.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('')}
    </div>
  `;
}



export function formatTempo(tempo, state) {
  if (!tempo) {
    return t(state, 'emptyValue');
  }

  return `${tempo.eccentric}-${tempo.pauseBottom}-${tempo.concentric}-${tempo.pauseTop}`;
}



export function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}


