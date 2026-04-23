import {
  renderHomeActivityRegion,
  renderHomeOverviewRegion,
  renderHomePresetWorkoutsRegion,
  renderHomeUserWorkoutsRegion,
  renderExercisesCatalogRegion,
  renderSettingsAudioRegion,
  renderSettingsEquipmentRegion,
  renderSettingsProfileRegion,
  renderRecommendationsContentRegion,
  renderWorkoutViewContentRegion,
} from '../pages/renderers.js';
import { applyExerciseCatalogFilters } from './catalog-filters.js';

export function updateCurrentPage(state, meta = {}) {
  const route = state?.route || 'home';

  if (route === 'exercises') {
    return updateExercisesPage(state, meta);
  }

  if (route === 'home') {
    return updateHomePage(state, meta);
  }

  if (route === 'workout-view') {
    return updateWorkoutViewPage(state, meta);
  }

  if (route === 'settings') {
    return updateSettingsPage(state, meta);
  }

  if (route === 'recommendations') {
    return updateRecommendationsPage(state, meta);
  }

  return false;
}

function updateExercisesPage(state, meta) {
  if (meta.type === 'settings' && Array.isArray(meta.changedKeys) && meta.changedKeys.includes('language')) {
    return false;
  }

  const region = document.querySelector('[data-page-route="exercises"] [data-page-region="exercises-catalog"]');

  if (!region) {
    return false;
  }

  const controlState = captureControlValues(region, [
    '#exercises-search',
    '#exercises-type-filter',
    '#exercises-muscle-filter',
    '#exercises-equipment-filter',
    '#exercises-profile-level-filter',
  ]);

  region.innerHTML = renderExercisesCatalogRegion(state);
  restoreControlValues(controlState);
  applyExerciseCatalogFilters();
  return true;
}

function updateHomePage(state, meta) {
  if (meta.type === 'settings' && Array.isArray(meta.changedKeys) && meta.changedKeys.includes('language')) {
    return false;
  }

  if (!['store', 'exercises'].includes(meta.type)) {
    if (meta.type === 'settings' || meta.type === 'profile' || meta.type === 'equipment') {
      return true;
    }

    return false;
  }

  const overviewRegion = document.querySelector('[data-page-route="home"] [data-page-region="home-overview"]');
  const activityRegion = document.querySelector('[data-page-route="home"] [data-page-region="home-activity"]');
  const userWorkoutsRegion = document.querySelector('[data-page-route="home"] [data-page-region="home-user-workouts"]');
  const presetWorkoutsRegion = document.querySelector('[data-page-route="home"] [data-page-region="home-preset-workouts"]');

  if (!overviewRegion || !activityRegion || !userWorkoutsRegion || !presetWorkoutsRegion) {
    return false;
  }

  if (meta.type === 'store') {
    overviewRegion.innerHTML = renderHomeOverviewRegion(state);
    activityRegion.innerHTML = renderHomeActivityRegion(state);
    userWorkoutsRegion.innerHTML = renderHomeUserWorkoutsRegion(state);
  }

  if (meta.type === 'exercises') {
    overviewRegion.innerHTML = renderHomeOverviewRegion(state);
    userWorkoutsRegion.innerHTML = renderHomeUserWorkoutsRegion(state);
    presetWorkoutsRegion.innerHTML = renderHomePresetWorkoutsRegion(state);
  }

  return true;
}

function updateWorkoutViewPage(state, meta) {
  if (meta.type === 'settings' && Array.isArray(meta.changedKeys) && meta.changedKeys.includes('language')) {
    return false;
  }

  if (!['store', 'exercises'].includes(meta.type)) {
    if (meta.type === 'settings' || meta.type === 'profile' || meta.type === 'equipment') {
      return true;
    }

    return false;
  }

  const region = document.querySelector('[data-page-route="workout-view"] [data-page-region="workout-view-content"]');

  if (!region) {
    return false;
  }

  region.innerHTML = renderWorkoutViewContentRegion(state);
  return true;
}

function updateSettingsPage(state, meta) {
  if (meta.type === 'equipment') {
    const region = document.querySelector('[data-page-route="settings"] [data-page-region="settings-equipment"]');
    if (!region) {
      return false;
    }

    const controlState = captureControlValues(region, [
      '#equipment-custom-name',
    ]);

    region.innerHTML = renderSettingsEquipmentRegion(state);
    restoreControlValues(controlState);
    return true;
  }

  if (meta.type === 'settings' && Array.isArray(meta.changedKeys) && meta.changedKeys.includes('customAudio')) {
    const region = document.querySelector('[data-page-route="settings"] [data-page-region="settings-audio"]');
    if (!region) {
      return false;
    }

    region.innerHTML = renderSettingsAudioRegion(state);
    return true;
  }

  if (meta.type === 'profile') {
    const region = document.querySelector('[data-page-route="settings"] [data-page-region="settings-profile"]');
    if (!region) {
      return false;
    }

    region.innerHTML = renderSettingsProfileRegion(state);
    return true;
  }

  if (meta.type === 'settings' && Array.isArray(meta.changedKeys)) {
    const changedKeys = new Set(meta.changedKeys);
    if (!changedKeys.has('language') && !changedKeys.has('customAudio')) {
      return true;
    }
  }

  return false;
}

function updateRecommendationsPage(state, meta) {
  if (meta.type === 'settings' && Array.isArray(meta.changedKeys) && meta.changedKeys.includes('language')) {
    return false;
  }

  if (!['store', 'exercises', 'profile', 'equipment'].includes(meta.type)) {
    if (meta.type === 'settings') {
      return true;
    }

    return false;
  }

  const region = document.querySelector('[data-page-route="recommendations"] [data-page-region="recommendations-content"]');

  if (!region) {
    return false;
  }

  region.innerHTML = renderRecommendationsContentRegion(state);
  return true;
}

function captureControlValues(root, selectors) {
  return selectors.map((selector) => {
    const element = root.querySelector(selector);
    return {
      selector,
      value: element?.value ?? '',
    };
  });
}

function restoreControlValues(controlState) {
  controlState.forEach(({ selector, value }) => {
    const element = document.querySelector(selector);
    if (element) {
      element.value = value;
    }
  });
}
