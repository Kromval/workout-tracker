import { BODY_FOCUS_MUSCLE_GROUPS } from '../features/body-focus.js';
import { localizedText, t } from '../i18n/index.js';
import { renderEmptyState } from './components.js';
import { selectLanguage, selectProfile, selectRecommendedExercises } from '../core/selectors.js';
import { asArray, escapeAttribute, escapeHtml } from '../core/utils.js';
import { capitalize } from './workout-renderers.js';

export function renderRecommendationsPage(state) {
  return `
    <section class="page" data-page-route="recommendations">
      <div data-page-region="recommendations-content">
        ${renderRecommendationsContentRegion(state)}
      </div>
    </section>
  `;
}

export function renderRecommendationsContentRegion(state) {
  const language = selectLanguage(state);
  const recommendations = selectRecommendedExercises(state);
  const profile = selectProfile(state);
  const topExercises = recommendations.topExercises || [];
  const selectedEquipmentCount = Array.isArray(state?.store?.equipment?.selectedIds) ? state.store.equipment.selectedIds.length : 0;
  const exclusionEntries = Object.entries(recommendations.summary?.excludedByReason || {});
  const scoreParts = [
    ['goalAlignment', 'recommendationsPartGoalAlignment'],
    ['levelMatch', 'recommendationsPartLevelMatch'],
    ['preference', 'recommendationsPartPreference'],
    ['recovery', 'recommendationsPartRecovery'],
    ['safety', 'recommendationsPartSafety'],
    ['variety', 'recommendationsPartVariety'],
    ['timeFit', 'recommendationsPartTimeFit'],
  ];

  if (topExercises.length === 0) {
    return `
      <div class="page-header">
        <div>
          <h1>${t(state, 'recommendationsTitle')}</h1>
          <p class="muted">${t(state, 'recommendationsDescription')}</p>
        </div>
      </div>

      <article class="card">
        <div class="chip-list">
          <span class="chip">${t(state, 'recommendationsSummaryEligible')}: 0</span>
          <span class="chip">${t(state, 'recommendationsSummaryExcluded')}: ${recommendations.summary?.excludedCount || 0}</span>
          <span class="chip">${t(state, 'recommendationsSummaryEquipment')}: ${selectedEquipmentCount}</span>
          <span class="chip">${t(state, 'recommendationsSummarySessionDuration')}: ${profile.sessionDurationMin || 0} ${t(state, 'recommendationsMinutesShort')}</span>
        </div>
      </article>

      ${renderEmptyState(state, 'recommendationsEmptyTitle', 'recommendationsEmptyDescription', 'navSettings', '#settings')}
    `;
  }

  return `
    <div class="page-header">
      <div>
        <h1>${t(state, 'recommendationsTitle')}</h1>
        <p class="muted">${t(state, 'recommendationsDescription')}</p>
      </div>
      <a class="button" href="#settings">${t(state, 'recommendationsAdjustProfile')}</a>
    </div>

    <article class="card">
      <div class="chip-list">
        <span class="chip">${t(state, 'recommendationsSummaryEligible')}: ${recommendations.summary?.eligibleCount || 0}</span>
        <span class="chip">${t(state, 'recommendationsSummaryExcluded')}: ${recommendations.summary?.excludedCount || 0}</span>
        <span class="chip">${t(state, 'recommendationsSummaryEquipment')}: ${selectedEquipmentCount}</span>
        <span class="chip">${t(state, 'recommendationsSummarySessionDuration')}: ${profile.sessionDurationMin || 0} ${t(state, 'recommendationsMinutesShort')}</span>
      </div>
      ${exclusionEntries.length ? `
        <div class="chip-list chip-list--spaced">
          ${exclusionEntries.map(([reason, count]) => `<span class="chip">${t(state, getRecommendationReasonMessageKey(reason))}: ${count}</span>`).join('')}
        </div>
      ` : ''}
    </article>

    <section class="workout-view-list" aria-label="${escapeAttribute(t(state, 'recommendationsTitle'))}">
      ${topExercises.map((entry, index) => {
        const exercise = entry.exercise;
        const name = localizedText(exercise.name, language) || exercise.id;
        const shortDescription = localizedText(exercise.shortDescription, language) || t(state, 'emptyValue');
        const partsHtml = scoreParts
          .map(([partId, labelKey]) => {
            const value = entry.parts?.[partId];
            return typeof value === 'number'
              ? `<span class="chip">${t(state, labelKey)}: ${formatRecommendationScore(value)}</span>`
              : '';
          })
          .filter(Boolean)
          .join('');

        return `
          <article class="card">
            <div class="section-header">
              <div>
                <p class="muted">${t(state, 'recommendationsRankLabel')} ${index + 1}</p>
                <h3>${escapeHtml(name)}</h3>
                <p class="muted">${escapeHtml(shortDescription)}</p>
              </div>
              <div class="stat">
                <span class="stat__value">${formatRecommendationScore(entry.total)}</span>
                <span class="muted">${t(state, 'recommendationsTotalScore')}</span>
              </div>
            </div>

            <div class="chip-list">
              <span class="chip">${t(state, 'recommendationsDifficulty')}: ${escapeHtml(exercise.difficulty || t(state, 'emptyValue'))}</span>
              <span class="chip">${t(state, 'recommendationsEquipment')}: ${escapeHtml((entry.metadata?.requiredEquipmentIds || []).join(', ') || t(state, 'emptyValue'))}</span>
              <span class="chip">${t(state, 'recommendationsExerciseGoals')}: ${escapeHtml((entry.metadata?.goalIds || []).join(', ') || t(state, 'emptyValue'))}</span>
              <span class="chip">${t(state, 'recommendationsProfileFocus')}: ${escapeHtml(getRecommendationFocusSummary(state, profile, exercise) || t(state, 'recommendationsNoStrongFocusMatch'))}</span>
            </div>

            <div class="chip-list chip-list--spaced">
              ${partsHtml}
            </div>

            <div class="toolbar toolbar--spaced">
              <a class="button button--primary" href="#exercise-view/${encodeURIComponent(exercise.id)}">${t(state, 'openExerciseRecommendation')}</a>
              <button class="button" type="button" data-exercise-action="add-to-workout" data-exercise-id="${escapeAttribute(exercise.id)}">${t(state, 'addToWorkout')}</button>
            </div>
          </article>
        `;
      }).join('')}
    </section>
  `;
}

function getRecommendationReasonMessageKey(reason) {
  const normalized = String(reason || '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return `recommendationsReason${normalized}`;
}

function formatRecommendationScore(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(2) : '0.00';
}

function getRecommendationFocusSummary(state, profile, exercise) {
  const bodyFocusGoals = profile?.bodyFocusGoals || {};
  const primaryMuscles = new Set(asArray(exercise?.muscleGroups?.primary));
  const activeMatches = Object.entries(bodyFocusGoals)
    .filter(([, weight]) => Number(weight) > 0)
    .map(([goalId, weight]) => {
      const targetMuscles = BODY_FOCUS_MUSCLE_GROUPS[goalId] || [];
      const hasMatch = targetMuscles.some((muscleId) => primaryMuscles.has(muscleId));

      if (!hasMatch) {
        return null;
      }

      return {
        goalId,
        weight: Number(weight) || 0,
      };
    })
    .filter(Boolean)
    .sort((left, right) => right.weight - left.weight);

  if (!activeMatches.length) {
    return '';
  }

  return activeMatches
    .slice(0, 2)
    .map(({ goalId }) => t(state, `bodyFocus${capitalize(goalId)}`))
    .join(', ');
}
