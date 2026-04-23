import {
  getExerciseEquipmentIds,
  getExerciseProfileLevel,
  isExerciseAvailableForSelectedEquipment,
  isExerciseCompatibleWithProfileLevel,
} from '../features/exercise-compatibility.js';
import { localizedText, t } from '../i18n/index.js';
import { renderEmptyState } from './components.js';
import { getRouteParams } from '../core/router.js';
import {
  selectEquipmentCatalog,
  selectEquipmentSelectedIdSet,
  selectExerciseCatalog,
  selectFavoriteExerciseIdSet,
  selectLanguage,
  selectProfile,
} from '../core/selectors.js';
import { asArray, escapeAttribute, escapeHtml, normalizeString } from '../core/utils.js';
import { renderExerciseFormPage } from './form-renderers.js';
import { formatTempo, renderChips, renderDetail, renderText } from './workout-renderers.js';

export function renderExercisesPage(state) {
  return `
    <section class="page exercises-page" data-page-route="exercises">
      <div class="page-header">
        <h1>${t(state, 'exercisesTitle')}</h1>
        <a class="button button--primary" href="#exercise-create">${t(state, 'createExercise')}</a>
      </div>
      <div data-page-region="exercises-catalog">
        ${renderExercisesCatalogRegion(state)}
      </div>
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
  const dislikedExerciseIds = new Set(asArray(selectProfile(state)?.dislikedExercises).map((item) => normalizeString(item)));
  const isDisliked = dislikedExerciseIds.has(exercise.id);
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
            <button class="button" type="button" data-exercise-action="dislike" data-exercise-id="${escapeAttribute(exercise.id)}">
              ${isDisliked ? t(state, 'removeFromDisliked') : t(state, 'addToDisliked')}
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

export function renderExercisesCatalogRegion(state) {
  const language = selectLanguage(state);
  const exercises = selectExerciseCatalog(state);
  const equipmentCatalog = selectEquipmentCatalog(state);
  const selectedEquipmentIds = selectEquipmentSelectedIdSet(state);
  const profile = selectProfile(state);
  const knownEquipmentIds = equipmentCatalog.map((item) => item.id);
  const favoriteIds = selectFavoriteExerciseIdSet(state);
  const dislikedExerciseIds = new Set(asArray(profile?.dislikedExercises).map((item) => normalizeString(item)));
  const allMuscles = new Set();
  const allTypes = new Set();

  exercises.forEach((exercise) => {
    exercise.muscles?.forEach((muscle) => allMuscles.add(muscle));
    const typeName = localizedText(exercise.type, language);
    if (typeName) {
      allTypes.add(typeName);
    }
  });

  const muscleOptions = Array.from(allMuscles).sort().map((muscle) =>
    `<option value="${escapeAttribute(muscle)}">${escapeHtml(muscle)}</option>`
  ).join('');
  const typeOptions = Array.from(allTypes).sort().map((type) =>
    `<option value="${escapeAttribute(type.toLowerCase())}">${escapeHtml(type)}</option>`
  ).join('');
  const equipmentOptions = equipmentCatalog.map((item) => {
    const itemName = localizedText(item.name, language) || item.id;
    return `<option value="${escapeAttribute(item.id)}">${escapeHtml(itemName)}</option>`;
  }).join('');
  const exerciseCardsHTML = exercises.map((exercise) => {
    const name = localizedText(exercise.name, language);
    const desc = localizedText(exercise.shortDescription, language);
    const searchText = `${name} ${desc} ${exercise.muscles.join(' ')}`.toLowerCase();
    const typeText = localizedText(exercise.type, language).toLowerCase();
    const musclesText = exercise.muscles.join('|');
    const exerciseEquipmentIds = getExerciseEquipmentIds(exercise, knownEquipmentIds);
    const exerciseProfileLevel = getExerciseProfileLevel(exercise);
    const equipmentAvailable = isExerciseAvailableForSelectedEquipment(exercise, Array.from(selectedEquipmentIds), knownEquipmentIds);
    const profileCompatible = isExerciseCompatibleWithProfileLevel(exercise, profile.trainingLevel);
    const isFavorite = favoriteIds.has(exercise.id);
    const isDisliked = dislikedExerciseIds.has(normalizeString(exercise.id));

    return `
      <a class="exercise-card" href="#exercise-view/${encodeURIComponent(exercise.id)}"
         data-exercise-search="${escapeHtml(searchText)}"
         data-exercise-type="${escapeAttribute(typeText)}"
         data-exercise-muscles="${escapeAttribute(musclesText)}"
         data-exercise-equipment="${escapeAttribute(exerciseEquipmentIds.join('|'))}"
         data-exercise-profile-level="${escapeAttribute(exerciseProfileLevel)}"
         data-exercise-equipment-available="${equipmentAvailable ? 'true' : 'false'}"
         data-exercise-profile-compatible="${profileCompatible ? 'true' : 'false'}">
        <div class="exercise-card__content">
          <div class="exercise-card__header">
            <h3>${escapeHtml(name)}</h3>
          </div>
          <p class="muted">${escapeHtml(desc || t(state, 'emptyValue'))}</p>
          <div class="exercise-card__meta">
            ${isFavorite ? `<span class="badge badge--favorite" aria-label="Liked exercise">♥</span>` : ''}
            ${isDisliked ? `<span class="badge badge--disliked" aria-label="Disliked exercise">⊘</span>` : ''}
            <span class="badge">${escapeHtml(localizedText(exercise.type, language) || exercise.executionMode)}</span>
            ${exercise.muscles?.[0] ? `<span class="badge">${escapeHtml(exercise.muscles[0])}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }).join('');

  return `
    <section class="exercise-filters-card">
      <div class="exercise-filters-card__header">
        <h2>${t(state, 'exerciseSearchLabel')}</h2>
        <p class="muted">${t(state, 'exerciseFilterNoResults')}</p>
      </div>

      <div class="exercise-filters">
        <label class="field exercise-filters__search">
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

        <label class="field">
          <span>${t(state, 'exerciseEquipmentFilterLabel')}</span>
          <select id="exercises-equipment-filter" data-exercises-equipment-filter>
            <option value="">${t(state, 'filterAll')}</option>
            <option value="available">${t(state, 'exerciseEquipmentFilterAvailable')}</option>
            ${equipmentOptions}
          </select>
        </label>

        <label class="field">
          <span>${t(state, 'exerciseProfileLevelFilterLabel')}</span>
          <select id="exercises-profile-level-filter" data-exercises-profile-level-filter>
            <option value="">${t(state, 'filterAll')}</option>
            <option value="profile">${t(state, 'exerciseProfileLevelFilterProfile')}</option>
            <option value="beginner">${t(state, 'trainingLevelOptionBeginner')}</option>
            <option value="intermediate">${t(state, 'trainingLevelOptionIntermediate')}</option>
            <option value="advanced">${t(state, 'trainingLevelOptionAdvanced')}</option>
          </select>
        </label>
      </div>
    </section>

    <div
      class="exercise-list"
      data-exercise-list
      data-selected-equipment-ids="${escapeAttribute(Array.from(selectedEquipmentIds).join('|'))}"
      data-profile-training-level="${escapeAttribute(profile.trainingLevel || '')}"
    >
      ${exerciseCardsHTML || `<p class="muted" role="status">${t(state, 'emptyExercises')}</p>`}
    </div>

    <p class="muted exercise-no-results" data-exercise-no-results role="status" aria-live="polite" hidden>${t(state, 'exerciseFilterNoResults')}</p>
  `;
}
