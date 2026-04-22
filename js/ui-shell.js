import {
  moveProgressCalendarMonth,
  selectProgressCalendarDay,
} from './calendar.js';
import { preview as previewAudio, setVolume, stopAll } from './audio.js';
import { getExerciseCatalog } from './exercises.js';
import { localizedText, t } from './i18n.js';
import { pageRenderers, renderListItem, renderWorkoutDraftItem } from './pages.js';
import { getPopularPresetWorkout } from './presets.js';
import { defaultRoute, routes } from './router.js';
import { initWorkoutRunUi } from './session-ui.js';
import { refreshStore, updateSettings } from './state.js';
import { navRoutes, routeLabels } from './ui-navigation.js';
import {
  createCustomExercise,
  createWorkoutItem,
  createWorkoutRecord,
  deleteCustomExercise,
  deleteWorkout,
  duplicateWorkout,
  exportStore,
  importStore,
  IMPORT_MODES,
  saveCustomExercise,
  saveWorkout,
  toggleFavoriteExercise,
} from './storage.js';

const themeQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
const CUSTOM_AUDIO_MAX_BYTES = 512 * 1024;
const CUSTOM_AUDIO_TYPES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
]);
let draggedWorkoutItem = null;
let pendingNotice = null;

/**
 * Initializes persistent shell behavior that survives route re-renders.
 */
export function initShell(state) {
  // Shell bindings are registered once; route renders happen separately.
  renderNav(state);
  updateHeaderControls(state);
  updateShellLabels(state);
  bindHeaderActions(state);
  applyTheme(state.settings.theme);
  syncDocumentLanguage(state);
  bindSystemThemeListener(state);
}

/**
 * Renders the current route into #app and runs page-specific initializers.
 */
export function renderApp(state) {
  renderNav(state);
  updateHeaderControls(state);
  updateShellLabels(state);
  applyTheme(state.settings.theme);
  syncDocumentLanguage(state);

  const app = document.querySelector('#app');
  if (!app) return;

  const renderPage = pageRenderers[state.route] || pageRenderers[defaultRoute];
  app.innerHTML = renderPage(state);
  renderPendingNotice(app);
  app.focus({ preventScroll: true });
  initWorkoutRunUi(state);
}

function renderNav(state) {
  const nav = document.querySelector('#app-nav');
  if (!nav) return;

  nav.innerHTML = routes.filter((route) => navRoutes.includes(route)).map((route) => `
    <a class="nav__link" href="#${route}" ${state.route === route ? 'aria-current="page"' : ''}>${t(state, routeLabels[route])}</a>
  `).join('');

  document.querySelector('#nav-toggle')?.setAttribute('aria-label', t(state, 'navigationToggleLabel'));
  nav.setAttribute('aria-label', t(state, 'mainNavigationLabel'));
}

function renderPendingNotice(app) {
  if (!pendingNotice || !noticeMatchesCurrentHash(pendingNotice)) {
    return;
  }

  const notice = document.createElement('p');
  notice.className = 'notice notice--global';
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.dataset.type = pendingNotice.type;
  notice.textContent = pendingNotice.message;
  app.prepend(notice);
  pendingNotice = null;
}

function closeNavMenu() {
  const nav = document.querySelector('#app-nav');
  const button = document.querySelector('#nav-toggle');

  if (nav) {
    nav.dataset.open = 'false';
    nav.removeAttribute('data-open');
  }

  button?.setAttribute('aria-expanded', 'false');
}

function setPendingNotice(message, type = 'success', targetHash = '') {
  if (!message) {
    pendingNotice = null;
    return;
  }

  pendingNotice = {
    message,
    type,
    targetHash: normalizeNoticeHash(targetHash),
  };
}

function navigateWithNotice(hash, message, type = 'success') {
  setPendingNotice(message, type, hash);
  const previousHash = normalizeNoticeHash(window.location.hash || '#home');
  window.location.hash = hash;

  if (previousHash === normalizeNoticeHash(hash)) {
    window.dispatchEvent(new Event('hashchange'));
  }
}

function noticeMatchesCurrentHash(notice) {
  return !notice.targetHash || normalizeNoticeHash(window.location.hash || '#home') === notice.targetHash;
}

function normalizeNoticeHash(hash) {
  return String(hash || '')
    .replace(/^#\/?/, '')
    .trim() || 'home';
}

function bindHeaderActions(state) {
  document.querySelector('#nav-toggle')?.addEventListener('click', () => {
    const nav = document.querySelector('#app-nav');
    const button = document.querySelector('#nav-toggle');
    const isOpen = nav?.dataset.open === 'true';

    nav?.toggleAttribute('data-open', !isOpen);
    if (nav) {
      nav.dataset.open = String(!isOpen);
    }
    button?.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const nextTheme = getResolvedTheme(state.settings.theme) === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
  });

  document.querySelector('#language-toggle')?.addEventListener('click', () => {
    const nextLanguage = state.settings.language === 'ru' ? 'en' : 'ru';
    updateSettings({ language: nextLanguage });
  });

  document.addEventListener('click', (event) => {
    const exerciseActionButton = event.target?.closest?.('[data-exercise-action]');
    if (exerciseActionButton) {
      handleExerciseAction(exerciseActionButton, state);
      return;
    }

    const workoutActionButton = event.target?.closest?.('[data-workout-action]');
    if (workoutActionButton) {
      handleWorkoutAction(workoutActionButton, state);
      return;
    }

    const presetWorkoutActionButton = event.target?.closest?.('[data-preset-workout-action]');
    if (presetWorkoutActionButton) {
      handlePresetWorkoutAction(presetWorkoutActionButton, state);
      return;
    }

    const calendarActionButton = event.target?.closest?.('[data-progress-calendar-action]');
    if (calendarActionButton) {
      handleProgressCalendarAction(calendarActionButton, state);
      return;
    }

    const calendarDayButton = event.target?.closest?.('[data-progress-calendar-day]');
    if (calendarDayButton) {
      selectProgressCalendarDay(calendarDayButton.dataset.progressCalendarDay);
      renderApp(state);
      return;
    }

    if (event.target?.closest?.('#app-nav .nav__link')) {
      closeNavMenu();
    }

    const listAddButton = event.target?.closest?.('[data-list-add]');
    if (listAddButton) {
      handleEditableListAdd(listAddButton, state);
      return;
    }

    const listRemoveButton = event.target?.closest?.('[data-list-remove]');
    if (listRemoveButton) {
      if (!window.confirm(t(state, 'removeListItemConfirm'))) {
        return;
      }

      listRemoveButton.closest('[data-list-value]')?.remove();
      return;
    }

    const workoutAddButton = event.target?.closest?.('[data-workout-add-exercise]');
    if (workoutAddButton) {
      handleWorkoutAddExercise(workoutAddButton, state);
      return;
    }

    const workoutRemoveButton = event.target?.closest?.('[data-workout-remove]');
    if (workoutRemoveButton) {
      const form = workoutRemoveButton.closest('[data-workout-form]');
      if (!window.confirm(t(state, 'deleteWorkoutItemConfirm'))) {
        return;
      }

      workoutRemoveButton.closest('[data-workout-item]')?.remove();
      syncWorkoutItemsState(form);
      setWorkoutFormStatus(form, t(state, 'workoutItemRemoved'), 'success');
      return;
    }

    const workoutMoveButton = event.target?.closest?.('[data-workout-move]');
    if (workoutMoveButton) {
      handleWorkoutItemMove(workoutMoveButton);
      return;
    }

    if (event.target?.id === 'export-data-button') {
      handleExportData(state);
    }

    if (event.target?.id === 'import-data-button') {
      document.querySelector('#import-data-file')?.click();
    }

    const audioPreviewButton = event.target?.closest?.('[data-custom-audio-preview]');
    if (audioPreviewButton) {
      previewAudio(audioPreviewButton.dataset.customAudioPreview);
      return;
    }

    const audioResetButton = event.target?.closest?.('[data-custom-audio-reset]');
    if (audioResetButton) {
      handleCustomAudioReset(audioResetButton, state);
    }
  });

  document.addEventListener('click', (event) => {
    const nav = document.querySelector('#app-nav');

    if (
      nav?.dataset.open === 'true'
      && !event.target?.closest?.('#app-nav')
      && !event.target?.closest?.('#nav-toggle')
    ) {
      closeNavMenu();
    }
  });

  document.addEventListener('change', (event) => {
    event.target?.removeAttribute?.('aria-invalid');

    const audioUploadInput = event.target?.closest?.('[data-custom-audio-upload]');
    if (audioUploadInput) {
      handleCustomAudioUpload(audioUploadInput, state);
      return;
    }

    if (event.target?.id === 'import-data-file') {
      handleImportData(event.target, state);
      return;
    }

    const settingName = event.target?.dataset?.setting;
    if (settingName) {
      handleSettingChange(event.target);
    }
  });

  document.addEventListener('submit', (event) => {
    const exerciseForm = event.target?.closest?.('[data-exercise-form]');
    if (exerciseForm) {
      event.preventDefault();
      handleExerciseFormSubmit(exerciseForm, state);
      return;
    }

    const workoutForm = event.target?.closest?.('[data-workout-form]');
    if (workoutForm) {
      event.preventDefault();
      handleWorkoutFormSubmit(workoutForm, state);
    }
  });

  document.addEventListener('input', (event) => {
    event.target?.removeAttribute?.('aria-invalid');

    if (event.target?.dataset?.setting === 'volume') {
      updateVolumeOutput(Number(event.target.value));
      return;
    }

    if (event.target?.matches?.('[data-workout-exercise-search]')) {
      const sidebar = event.target.closest('[data-workout-exercise-sidebar]');
      if (sidebar) applyWorkoutExerciseFilters(sidebar);
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target?.matches?.('[data-workout-exercise-type-filter], [data-workout-exercise-muscle-filter]')) {
      const sidebar = event.target.closest('[data-workout-exercise-sidebar]');
      if (sidebar) applyWorkoutExerciseFilters(sidebar);
    }
  });

  document.addEventListener('dragstart', (event) => {
    const handle = event.target?.closest?.('[data-workout-drag-handle]');
    if (!handle) return;

    handleWorkoutDragStart(event, handle);
  });

  document.addEventListener('dragover', (event) => {
    const itemsRoot = event.target?.closest?.('[data-workout-items]');
    if (!itemsRoot || !draggedWorkoutItem) return;

    handleWorkoutDragOver(event, itemsRoot);
  });

  document.addEventListener('drop', (event) => {
    const itemsRoot = event.target?.closest?.('[data-workout-items]');
    if (!itemsRoot || !draggedWorkoutItem) return;

    event.preventDefault();
    syncWorkoutItemsState(itemsRoot.closest('[data-workout-form]'));
  });

  document.addEventListener('dragend', () => {
    clearWorkoutDragState();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNavMenu();
    }

    const listName = event.target?.dataset?.listEntry;
    if (listName && event.key === 'Enter') {
      event.preventDefault();
      event.target
        .closest(`[data-editable-list="${listName}"]`)
        ?.querySelector(`[data-list-add="${listName}"]`)
        ?.click();
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target?.matches?.('[data-exercises-search]')) {
      applyExerciseCatalogFilters();
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target?.matches?.('[data-exercises-type-filter], [data-exercises-muscle-filter]')) {
      applyExerciseCatalogFilters();
    }
  });
}

function handleProgressCalendarAction(button, state) {
  const action = button.dataset.progressCalendarAction;
  const delta = action === 'previous' ? -1 : action === 'next' ? 1 : 0;

  if (delta === 0) {
    return;
  }

  moveProgressCalendarMonth(delta);
  renderApp(state);
}

function updateHeaderControls(state) {
  const languageToggle = document.querySelector('#language-toggle');
  if (languageToggle) {
    languageToggle.textContent = state.settings.language.toUpperCase();
    languageToggle.setAttribute('aria-label', t(state, 'languageToggleLabel'));
  }

  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = getResolvedTheme(state.settings.theme) === 'dark' ? '☀' : '◐';
    themeToggle.setAttribute('aria-label', t(state, 'themeToggleLabel'));
  }
}

function updateShellLabels(state) {
  const brandText = document.querySelector('#app-brand-text');
  const brandMark = document.querySelector('#app-brand-mark');
  const brandLink = document.querySelector('#app-brand-link');
  const routeTitle = t(state, routeLabels[state.route] || 'homeTitle');
  const brand = t(state, 'appBrand');

  if (brandText) {
    brandText.textContent = brand;
  }

  if (brandMark) {
    brandMark.textContent = t(state, 'appBrandMark');
  }

  brandLink?.setAttribute('aria-label', t(state, 'brandHomeLabel'));

  document.title = state.route === 'home'
    ? brand
    : `${routeTitle} - ${brand}`;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = getResolvedTheme(theme);
}

function getResolvedTheme(theme) {
  return theme === 'system'
    ? (themeQuery?.matches ? 'dark' : 'light')
    : theme;
}

function syncDocumentLanguage(state) {
  document.documentElement.lang = state.settings.language;
}

function bindSystemThemeListener(state) {
  const handleSystemThemeChange = () => {
    if (state.settings.theme === 'system') {
      applyTheme(state.settings.theme);
      updateHeaderControls(state);
    }
  };

  if (themeQuery?.addEventListener) {
    themeQuery.addEventListener('change', handleSystemThemeChange);
  } else if (themeQuery?.addListener) {
    themeQuery.addListener(handleSystemThemeChange);
  }
}

function handleSettingChange(input) {
  const settingName = input.dataset.setting;
  const settingsPatch = {};

  if (settingName === 'soundEnabled') {
    settingsPatch.soundEnabled = input.checked;
    if (!settingsPatch.soundEnabled) {
      stopAll();
    }
  } else if (settingName === 'volume') {
    settingsPatch.volume = Number(input.value);
    setVolume(settingsPatch.volume);
    updateVolumeOutput(settingsPatch.volume);
  } else if (settingName === 'theme' || settingName === 'language') {
    settingsPatch[settingName] = input.value;
  } else {
    return;
  }

  setPendingNotice(t(state, 'settingsSaved'));
  updateSettings(settingsPatch);
}

function updateVolumeOutput(volume) {
  const output = document.querySelector('#setting-volume-value');
  if (output) {
    output.textContent = `${Math.round(volume * 100)}%`;
  }
}

async function handleCustomAudioUpload(input, state) {
  const eventName = input.dataset.customAudioUpload;
  const file = input.files?.[0];
  input.value = '';

  if (!file || !eventName) {
    return;
  }

  if (!isSupportedAudioFile(file)) {
    setCustomAudioStatus(t(state, 'customAudioUnsupported'), 'error');
    return;
  }

  if (file.size > CUSTOM_AUDIO_MAX_BYTES) {
    setCustomAudioStatus(t(state, 'customAudioTooLarge'), 'error');
    return;
  }

  try {
    const mimeType = file.type || getAudioMimeFromName(file.name);
    const dataUrl = normalizeAudioDataUrl(await readFileAsDataUrl(file), mimeType);
    const customAudio = {
      ...(state.settings.customAudio || {}),
      [eventName]: {
        name: file.name,
        type: mimeType,
        size: file.size,
        dataUrl,
        updatedAt: new Date().toISOString(),
      },
    };

    updateSettings({ customAudio });
    setCustomAudioStatus(t(state, 'customAudioSaved'));
  } catch (error) {
    setCustomAudioStatus(t(state, 'customAudioReadFailed'), 'error');
  }
}

function handleCustomAudioReset(button, state) {
  const eventName = button.dataset.customAudioReset;

  if (!eventName) {
    return;
  }

  const customAudio = { ...(state.settings.customAudio || {}) };
  delete customAudio[eventName];
  updateSettings({ customAudio });
  setCustomAudioStatus(t(state, 'customAudioRemoved'));
}

function setCustomAudioStatus(message, type = 'success') {
  const status = document.querySelector('#custom-audio-status');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function isSupportedAudioFile(file) {
  const type = String(file.type || '').toLowerCase();
  return CUSTOM_AUDIO_TYPES.has(type) || ['.mp3', '.wav', '.ogg'].some((extension) => file.name.toLowerCase().endsWith(extension));
}

function getAudioMimeFromName(name) {
  const normalizedName = String(name || '').toLowerCase();

  if (normalizedName.endsWith('.mp3')) return 'audio/mpeg';
  if (normalizedName.endsWith('.wav')) return 'audio/wav';
  if (normalizedName.endsWith('.ogg')) return 'audio/ogg';

  return 'audio/mpeg';
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result || '')));
    reader.addEventListener('error', () => reject(reader.error || new Error('Failed to read file.')));
    reader.readAsDataURL(file);
  });
}

function normalizeAudioDataUrl(dataUrl, mimeType) {
  const value = String(dataUrl || '');

  if (value.startsWith('data:audio/')) {
    return value;
  }

  const base64Marker = ';base64,';
  const markerIndex = value.indexOf(base64Marker);

  if (markerIndex === -1) {
    return value;
  }

  return `data:${mimeType}${base64Marker}${value.slice(markerIndex + base64Marker.length)}`;
}

function handleExportData(state) {
  const json = exportStore();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `workout-planner-${date}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setImportExportStatus(t(state, 'exportReady'));
}

async function handleImportData(input, state) {
  const file = input.files?.[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith('.json') && file.type && file.type !== 'application/json') {
    input.value = '';
    setImportExportStatus(t(state, 'importInvalidFile'), 'error');
    return;
  }

  const mode = document.querySelector('input[name="import-mode"]:checked')?.value || IMPORT_MODES.MERGE;
  const confirmed = window.confirm(t(state, mode === IMPORT_MODES.REPLACE ? 'importWillReplace' : 'importWillMerge'));

  input.value = '';

  if (!confirmed) {
    setImportExportStatus(t(state, 'importCanceled'));
    return;
  }

  try {
    const text = await file.text();
    importStore(text, { mode });
    setPendingNotice(t(state, 'importSuccess'), 'success', '#settings');
    refreshStore();
  } catch (error) {
    setImportExportStatus(error.message || t(state, 'importFailed'), 'error');
  }
}

function setImportExportStatus(message, type = 'success') {
  const status = document.querySelector('#import-export-status');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function handleExerciseAction(button, state) {
  const exerciseId = button.dataset.exerciseId;
  const action = button.dataset.exerciseAction;
  const exercise = getExerciseCatalog(state).find((item) => item.id === exerciseId);

  if (!exercise) {
    window.alert(t(state, 'exerciseNotFound'));
    return;
  }

  if (action === 'favorite') {
    toggleFavoriteExercise(exercise.id);
    refreshStore();
    return;
  }

  if (action === 'add-to-workout') {
    const workout = createWorkoutRecord({
      title: getLocalizedExerciseName(exercise, state),
      description: t(state, 'createdFromExercise'),
      items: [createWorkoutItem({
        exerciseId: exercise.id,
        reps: exercise.executionMode === 'reps' || exercise.executionMode === 'custom' ? 10 : null,
        durationSec: exercise.executionMode === 'time' || exercise.executionMode === 'hold' ? 30 : null,
      })],
    });

    refreshStore();
    navigateWithNotice(`workout-edit/${encodeURIComponent(workout.id)}`, t(state, 'workoutCreated'));
    return;
  }

  if (!exercise.isCustom) {
    return;
  }

  if (action === 'edit') {
    window.location.hash = `exercise-edit/${encodeURIComponent(exercise.id)}`;
    return;
  }

  if (action === 'delete' && window.confirm(t(state, 'deleteExerciseConfirm'))) {
    deleteCustomExercise(exercise.id);
    refreshStore();
    navigateWithNotice('exercises', t(state, 'deleteExerciseSuccess'));
  }
}

function handleWorkoutAction(button, state) {
  const workoutId = button.dataset.workoutId;
  const action = button.dataset.workoutAction;
  const workout = state.store.workouts.find((item) => item.id === workoutId);

  if (!workout) {
    window.alert(t(state, 'workoutNotFound'));
    return;
  }

  if (action === 'duplicate') {
    const copy = duplicateWorkout(workout.id, {
      title: t(state, 'workoutCopyTitle').replace('{title}', workout.title),
    });

    refreshStore();
    if (copy) {
      navigateWithNotice(`workout-view/${encodeURIComponent(copy.id)}`, t(state, 'duplicateWorkoutSuccess'));
    }
    return;
  }

  if (action === 'delete' && window.confirm(t(state, 'deleteWorkoutConfirm'))) {
    deleteWorkout(workout.id);
    refreshStore();
    navigateWithNotice('home', t(state, 'deleteWorkoutSuccess'));
  }
}

function handlePresetWorkoutAction(button, state) {
  const presetId = button.dataset.presetWorkoutId;
  const action = button.dataset.presetWorkoutAction;
  const preset = getPopularPresetWorkout(presetId);

  if (!preset) {
    window.alert(t(state, 'workoutNotFound'));
    return;
  }

  const language = state.settings.language;
  let workout = null;

  try {
    workout = createWorkoutRecord({
      title: localizedText(preset.title, language) || t(state, 'workoutViewTitle'),
      description: localizedText(preset.description, language),
      defaultRestBetweenExercises: preset.defaultRestBetweenExercises,
      items: preset.items.map((item, index) => createWorkoutItem({
        exerciseId: item.exerciseId,
        sets: item.sets,
        reps: item.reps,
        durationSec: item.durationSec,
        distance: item.distance,
        restBetweenSetsSec: item.restBetweenSetsSec,
        restAfterExerciseSec: item.restAfterExerciseSec,
        tempoOverride: item.tempoOverride,
        notes: item.notes,
        order: index,
      })),
    });
  } catch (error) {
    window.alert(error.message || t(state, 'workoutSaveFailed'));
    return;
  }

  refreshStore();

  if (action === 'edit') {
    navigateWithNotice(`workout-edit/${encodeURIComponent(workout.id)}`, t(state, 'presetWorkoutCopied'));
    return;
  }

  navigateWithNotice(`workout-view/${encodeURIComponent(workout.id)}`, t(state, 'presetWorkoutCopied'));
}

function getLocalizedExerciseName(exercise, state) {
  const language = state.settings.language;
  return localizedText(exercise.name, language) || exercise.id;
}

function handleEditableListAdd(button, state) {
  const name = button.dataset.listAdd;
  const root = button.closest(`[data-editable-list="${name}"]`);
  const input = root?.querySelector(`[data-list-entry="${name}"]`);
  const items = root?.querySelector(`[data-list-items="${name}"]`);
  const value = input?.value.trim();

  if (!value || !items) return;

  const exists = Array.from(items.querySelectorAll('[data-list-value]'))
    .some((item) => item.dataset.listValue.toLowerCase() === value.toLowerCase());

  if (!exists) {
    items.insertAdjacentHTML('beforeend', renderListItem(name, value, state));
  }

  input.value = '';
  input.focus();
}

function handleWorkoutAddExercise(button, state) {
  const form = button.closest('[data-workout-form]');
  const picker = form?.querySelector('[data-workout-exercise-picker]');
  const items = form?.querySelector('[data-workout-items]');
  const exerciseId = button.dataset.workoutAddExerciseId || picker?.value;
  const exercise = getExerciseCatalog(state).find((item) => item.id === exerciseId);

  if (!exercise || !items) {
    setWorkoutFormStatus(form, t(state, 'workoutExerciseRequired'), 'error');
    return;
  }

  const order = items.querySelectorAll('[data-workout-item]').length;
  items.insertAdjacentHTML('beforeend', renderWorkoutDraftItem(state, exercise, order));
  syncWorkoutItemsState(form);
  clearWorkoutFormStatus(form);
}

function applyWorkoutExerciseFilters(sidebar) {
  if (!sidebar) return;

  const query = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-search]')?.value
  ).toLowerCase().trim();

  const type = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-type-filter]')?.value
  ).toLowerCase();

  const muscle = normalizeFormString(
    sidebar.querySelector('[data-workout-exercise-muscle-filter]')?.value
  ).toLowerCase();

  const options = Array.from(sidebar.querySelectorAll('.workout-exercise-option'));
  let visibleCount = 0;

  options.forEach(option => {
    const searchText = (option.dataset.exerciseSearch || '').toLowerCase();
    const optionType = (option.dataset.exerciseType || '').toLowerCase();
    const muscles = option.dataset.exerciseMuscles ? option.dataset.exerciseMuscles.split('|') : [];

    const matchesQuery = !query || searchText.includes(query);
    const matchesType = !type || optionType === type;
    const matchesMuscle = !muscle || muscles.includes(muscle);

    const isVisible = matchesQuery && matchesType && matchesMuscle;

    option.style.display = isVisible ? 'grid' : 'none';

    if (isVisible) visibleCount++;
  });

  const empty = sidebar.querySelector('[data-workout-exercise-no-results]');
  if (empty) empty.hidden = visibleCount > 0;
}

function applyExerciseCatalogFilters() {
  const searchInput = document.querySelector('[data-exercises-search]');
  const typeSelect = document.querySelector('[data-exercises-type-filter]');
  const muscleSelect = document.querySelector('[data-exercises-muscle-filter]');
  const list = document.querySelector('[data-exercise-list]');
  const noResults = document.querySelector('[data-exercise-no-results]');

  if (!list) return;

  const query = normalizeFormString(searchInput?.value).toLowerCase().trim();
  const type = normalizeFormString(typeSelect?.value).toLowerCase();
  const muscle = normalizeFormString(muscleSelect?.value).toLowerCase();

  const cards = Array.from(list.querySelectorAll('.exercise-card'));
  let visibleCount = 0;

  cards.forEach(card => {
    const searchText = (card.dataset.exerciseSearch || '').toLowerCase();
    const cardType = (card.dataset.exerciseType || '').toLowerCase();
    const muscles = card.dataset.exerciseMuscles ? card.dataset.exerciseMuscles.split('|') : [];

    const matchesQuery = !query || searchText.includes(query);
    const matchesType = !type || cardType === type;
    const matchesMuscle = !muscle || muscles.includes(muscle);

    const visible = matchesQuery && matchesType && matchesMuscle;
    card.style.display = visible ? 'block' : 'none';

    if (visible) visibleCount++;
  });

  if (noResults) noResults.hidden = visibleCount > 0;
}

function handleWorkoutItemMove(button) {
  const item = button.closest('[data-workout-item]');
  const direction = button.dataset.workoutMove;

  if (!item) return;

  if (direction === 'up' && item.previousElementSibling?.matches('[data-workout-item]')) {
    item.parentElement.insertBefore(item, item.previousElementSibling);
  }

  if (direction === 'down' && item.nextElementSibling?.matches('[data-workout-item]')) {
    item.parentElement.insertBefore(item.nextElementSibling, item);
  }

  syncWorkoutItemsState(item.closest('[data-workout-form]'));
}

function syncWorkoutItemsState(form = document.querySelector('[data-workout-form]')) {
  const itemsRoot = form?.querySelector?.('[data-workout-items]');
  if (!itemsRoot) return;

  const items = Array.from(itemsRoot.querySelectorAll('[data-workout-item]'));
  const empty = itemsRoot.querySelector('[data-workout-empty]');

  if (empty) {
    empty.hidden = items.length > 0;
  }

  items.forEach((item, index) => {
    item.dataset.order = String(index);
    item.setAttribute('aria-posinset', String(index + 1));
    item.setAttribute('aria-setsize', String(items.length));
    item.querySelector('[data-workout-move="up"]')?.toggleAttribute('disabled', index === 0);
    item.querySelector('[data-workout-move="down"]')?.toggleAttribute('disabled', index === items.length - 1);
  });
}

function handleWorkoutDragStart(event, handle) {
  const item = handle.closest('[data-workout-item]');
  if (!item) return;

  draggedWorkoutItem = item;
  item.classList.add('workout-item--dragging');
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', item.dataset.order || '');
}

function handleWorkoutDragOver(event, itemsRoot) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const targetItem = event.target.closest('[data-workout-item]');
  if (!targetItem || targetItem === draggedWorkoutItem || !itemsRoot.contains(targetItem)) {
    return;
  }

  const rect = targetItem.getBoundingClientRect();
  const shouldInsertAfter = event.clientY > rect.top + rect.height / 2;

  if (shouldInsertAfter) {
    targetItem.after(draggedWorkoutItem);
  } else {
    targetItem.before(draggedWorkoutItem);
  }

  syncWorkoutItemsState(itemsRoot.closest('[data-workout-form]'));
}

function clearWorkoutDragState() {
  draggedWorkoutItem?.classList.remove('workout-item--dragging');
  draggedWorkoutItem = null;
}

function handleWorkoutFormSubmit(form, state) {
  clearWorkoutFormStatus(form);
  clearFormInvalidState(form);

  if (!form.checkValidity()) {
    markInvalidControls(form, Array.from(form.querySelectorAll(':invalid')));
    form.reportValidity();
    setWorkoutFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const rows = Array.from(form.querySelectorAll('[data-workout-item]'));
  if (rows.length === 0) {
    setWorkoutFormStatus(form, t(state, 'workoutEmptyRequired'), 'error');
    return;
  }

  const knownExerciseIds = new Set(getExerciseCatalog(state).map((exercise) => exercise.id));
  const unknownExerciseRows = rows.filter((row) => !knownExerciseIds.has(row.dataset.exerciseId || ''));
  if (unknownExerciseRows.length > 0) {
    markInvalidControls(form, unknownExerciseRows);
    setWorkoutFormStatus(form, t(state, 'workoutUnknownExercise'), 'error');
    return;
  }

  const formData = new FormData(form);
  const titleInput = form.querySelector('[name="title"]');
  if (!normalizeFormString(formData.get('title'))) {
    markInvalidControls(form, [titleInput]);
    setWorkoutFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const errors = [];
  const items = rows.map((row, index) => {
    const executionMode = row.dataset.executionMode;
    const usesDuration = executionMode === 'time' || executionMode === 'hold';
    const effortField = usesDuration ? 'durationSec' : 'reps';
    const effort = readWorkoutInteger(row, effortField, { min: 1 }, errors);

    return createWorkoutItem({
      exerciseId: row.dataset.exerciseId || '',
      sets: readWorkoutInteger(row, 'sets', { min: 1 }, errors),
      reps: usesDuration ? null : effort,
      durationSec: usesDuration ? effort : null,
      restBetweenSetsSec: readWorkoutInteger(row, 'restBetweenSetsSec', { min: 0 }, errors),
      restAfterExerciseSec: readWorkoutInteger(row, 'restAfterExerciseSec', { min: 0 }, errors),
      notes: normalizeFormString(row.querySelector('[data-workout-field="notes"]')?.value),
      order: Number(row.dataset.order) || index,
    });
  });

  if (errors.length > 0) {
    setWorkoutFormStatus(form, `${t(state, 'workoutNumberInvalid')} ${t(state, 'formInvalidData')}`, 'error');
    return;
  }

  try {
    const isEdit = Boolean(normalizeFormString(formData.get('id')));
    const workoutPayload = {
      id: normalizeFormString(formData.get('id')),
      title: normalizeFormString(formData.get('title')),
      description: normalizeFormString(formData.get('description')),
      items,
    };
    const workout = workoutPayload.id
      ? saveWorkout(workoutPayload)
      : createWorkoutRecord(workoutPayload);

    setPendingNotice(t(state, isEdit ? 'workoutSaved' : 'workoutCreated'), 'success', `#workout-view/${encodeURIComponent(workout.id)}`);
    refreshStore();
    window.location.hash = `workout-view/${encodeURIComponent(workout.id)}`;
  } catch (error) {
    setWorkoutFormStatus(form, error.message || t(state, 'workoutSaveFailed'), 'error');
  }
}

function readWorkoutInteger(row, fieldName, options, errors) {
  const input = row.querySelector(`[data-workout-field="${fieldName}"]`);
  const value = Number(input?.value);
  const min = options.min ?? 0;

  if (!Number.isInteger(value) || value < min) {
    errors.push(fieldName);
    input?.setAttribute('aria-invalid', 'true');
    return min;
  }

  input?.removeAttribute('aria-invalid');
  return value;
}

function setWorkoutFormStatus(form, message, type = 'success') {
  const status = form?.querySelector?.('[data-workout-form-status]');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function clearWorkoutFormStatus(form) {
  setWorkoutFormStatus(form, '');
}

function handleExerciseFormSubmit(form, state) {
  clearExerciseFormStatus(form);
  clearFormInvalidState(form);

  const formData = new FormData(form);
  const negativeInputs = Array.from(form.querySelectorAll('input[type="number"]'))
    .filter((input) => Number(input.value || 0) < 0);

  if (negativeInputs.length > 0) {
    markInvalidControls(form, negativeInputs);
    setExerciseFormStatus(form, t(state, 'formNoNegativeValues'), 'error');
    return;
  }

  if (!form.checkValidity()) {
    markInvalidControls(form, Array.from(form.querySelectorAll(':invalid')));
    form.reportValidity();
    setExerciseFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  const imageInput = form.querySelector('[name="image"]');
  if (!isValidOptionalUrl(imageInput?.value)) {
    markInvalidControls(form, [imageInput]);
    setExerciseFormStatus(form, t(state, 'exerciseImageInvalid'), 'error');
    return;
  }

  const exercise = {
    id: normalizeFormString(formData.get('id')),
    name: {
      ru: normalizeFormString(formData.get('name.ru')),
      en: normalizeFormString(formData.get('name.en')),
    },
    shortDescription: {
      ru: normalizeFormString(formData.get('shortDescription.ru')),
      en: normalizeFormString(formData.get('shortDescription.en')),
    },
    instruction: {
      ru: normalizeFormString(formData.get('instruction.ru')),
      en: normalizeFormString(formData.get('instruction.en')),
    },
    effect: {
      ru: normalizeFormString(formData.get('effect.ru')),
      en: normalizeFormString(formData.get('effect.en')),
    },
    type: {
      ru: normalizeFormString(formData.get('type.ru')),
      en: normalizeFormString(formData.get('type.en')),
    },
    muscles: uniqueFormStrings(formData.getAll('muscles[]')),
    tags: uniqueFormStrings(formData.getAll('tags[]')),
    executionMode: normalizeFormString(formData.get('executionMode')) || 'reps',
    tempo: {
      eccentric: nonNegativeFormNumber(formData.get('tempo.eccentric')),
      pauseBottom: nonNegativeFormNumber(formData.get('tempo.pauseBottom')),
      concentric: nonNegativeFormNumber(formData.get('tempo.concentric')),
      pauseTop: nonNegativeFormNumber(formData.get('tempo.pauseTop')),
    },
    estimatedCalories: nonNegativeFormNumber(formData.get('estimatedCalories')),
    image: normalizeFormString(formData.get('image')),
  };

  if (!exercise.name.ru || !exercise.name.en || !exercise.type.ru || !exercise.type.en) {
    markInvalidControls(form, [
      form.querySelector('[name="name.ru"]'),
      form.querySelector('[name="name.en"]'),
      form.querySelector('[name="type.ru"]'),
      form.querySelector('[name="type.en"]'),
    ].filter((input) => !normalizeFormString(input?.value)));
    setExerciseFormStatus(form, t(state, 'formRequiredFields'), 'error');
    return;
  }

  try {
    const isEdit = Boolean(exercise.id);
    const savedExercise = isEdit
      ? saveCustomExercise(exercise)
      : createCustomExercise(exercise);

    setPendingNotice(t(state, 'exerciseSaved'), 'success', `#exercise-view/${encodeURIComponent(savedExercise.id)}`);
    refreshStore();
    window.location.hash = `exercise-view/${encodeURIComponent(savedExercise.id)}`;
  } catch (error) {
    setExerciseFormStatus(form, error.message || t(state, 'exerciseSaveFailed'), 'error');
  }
}

function setExerciseFormStatus(form, message, type = 'success') {
  const status = form.querySelector('[data-exercise-form-status]');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function clearExerciseFormStatus(form) {
  setExerciseFormStatus(form, '');
}

function clearFormInvalidState(form) {
  form?.querySelectorAll?.('[aria-invalid="true"]').forEach((control) => {
    control.removeAttribute('aria-invalid');
  });
}

function markInvalidControls(form, controls = []) {
  controls.filter(Boolean).forEach((control) => {
    control.setAttribute('aria-invalid', 'true');
  });

  controls.find(Boolean)?.focus?.({ preventScroll: false });

  if (form) {
    form.dataset.hasErrors = controls.some(Boolean) ? 'true' : 'false';
  }
}

function isValidOptionalUrl(value) {
  const text = normalizeFormString(value);

  if (!text) {
    return true;
  }

  if (text.startsWith('data:image/')) {
    return true;
  }

  try {
    const baseUrl = window.location?.href || 'http://localhost/';
    const url = new URL(text, baseUrl);
    return ['http:', 'https:'].includes(url.protocol);
  } catch (error) {
    return false;
  }
}

function normalizeFormString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function uniqueFormStrings(values) {
  return Array.from(new Set(values.map(normalizeFormString).filter(Boolean)));
}

function nonNegativeFormNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}
