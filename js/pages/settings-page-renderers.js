import { audioEvents } from '../features/audio.js';
import { SUPPORTED_CONTRAINDICATION_TAGS } from '../features/contraindications.js';
import { localizedText, t } from '../i18n/index.js';
import {
  selectEquipmentCatalog,
  selectEquipmentSelectedIdSet,
  selectExerciseCatalog,
  selectLanguage,
  selectProfile,
} from '../core/selectors.js';
import {
  asArray,
  escapeAttribute,
  escapeHtml,
  normalizeString,
  uniqueStrings,
} from '../core/utils.js';
import { renderCustomAudioRow } from './settings-renderers.js';
import { capitalize } from './workout-renderers.js';

const PROFILE_SELECT_OPTIONS = {
  sex: ['', 'male', 'female'],
  trainingLevel: ['', 'beginner', 'intermediate', 'advanced'],
  goal: ['', 'strength', 'hypertrophy', 'endurance', 'fat-loss', 'general-fitness'],
};
const PROFILE_GOAL_FIELDS = ['strength', 'hypertrophy', 'endurance', 'fatLoss', 'mobility'];
const PROFILE_BODY_FOCUS_FIELDS = ['upperBody', 'lowerBody', 'vTaper', 'core', 'arms', 'glutes'];
const PROFILE_RECOVERY_FIELDS = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];

export function renderSettingsPage(state) {
  return `
    <section class="page" data-page-route="settings">
      <div class="page-header">
        <h1>${t(state, 'settingsTitle')}</h1>
      </div>

      ${renderSettingsInterfaceRegion(state)}
      <div data-page-region="settings-profile">
        ${renderSettingsProfileRegion(state)}
      </div>
      <div data-page-region="settings-equipment">
        ${renderSettingsEquipmentRegion(state)}
      </div>
      <div data-page-region="settings-audio">
        ${renderSettingsAudioRegion(state)}
      </div>

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

export function renderSettingsInterfaceRegion(state) {
  const { settings } = state;
  const volumePercent = Math.round(settings.volume * 100);

  return `
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

        <label class="field" for="setting-density">
          <span>${t(state, 'densityLabel')}</span>
          <select id="setting-density" data-setting="density">
            <option value="comfortable" ${settings.density !== 'compact' ? 'selected' : ''}>${t(state, 'densityComfortable')}</option>
            <option value="compact" ${settings.density === 'compact' ? 'selected' : ''}>${t(state, 'densityCompact')}</option>
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
  `;
}

export function renderSettingsProfileRegion(state) {
  const profile = selectProfile(state);
  const language = selectLanguage(state);
  const exercises = selectExerciseCatalog(state);
  const equipmentCatalog = selectEquipmentCatalog(state);
  const profilePickers = buildProfilePickerConfigs(state, {
    profile,
    language,
    exercises,
    equipmentCatalog,
  });

  return `
    <article class="card settings-panel">
      <div class="settings-panel__header">
        <h3>${t(state, 'profileSettings')}</h3>
        <p class="muted">${t(state, 'profileSettingsDescription')}</p>
      </div>

      <div class="settings-grid">
        ${renderProfileNumberField(state, 'age', 'profileAge', profile.age, { min: 0, step: 1 })}
        ${renderProfileSelectField(state, 'sex', 'profileSex', profile.sex, PROFILE_SELECT_OPTIONS.sex)}
        ${renderProfileNumberField(state, 'weightKg', 'profileWeight', profile.weightKg, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'heightCm', 'profileHeight', profile.heightCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'bodyFatPercent', 'profileBodyFat', profile.bodyFatPercent, { min: 0, max: 100, step: 0.1 })}
        ${renderProfileNumberField(state, 'wristCm', 'profileWrist', profile.wristCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'waistCm', 'profileWaist', profile.waistCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'neckCm', 'profileNeck', profile.neckCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'chestCm', 'profileChest', profile.chestCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'hipsCm', 'profileHips', profile.hipsCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'forearmCm', 'profileForearm', profile.forearmCm, { min: 0, step: 0.1 })}
        ${renderProfileNumberField(state, 'calfCm', 'profileCalf', profile.calfCm, { min: 0, step: 0.1 })}
        ${renderProfileSelectField(state, 'trainingLevel', 'profileTrainingLevel', profile.trainingLevel, PROFILE_SELECT_OPTIONS.trainingLevel)}
        ${renderProfileSelectField(state, 'goal', 'profileGoal', profile.goal, PROFILE_SELECT_OPTIONS.goal)}
        ${renderProfileNumberField(state, 'sessionDurationMin', 'profileSessionDuration', profile.sessionDurationMin, { min: 0, step: 1 })}
        ${renderProfileNumberField(state, 'frequencyPerWeek', 'profileFrequencyPerWeek', profile.frequencyPerWeek, { min: 0, step: 1 })}
        <div class="field settings-grid__wide">
          <span>${t(state, 'profileGoalsWeighted')}</span>
          <div class="settings-grid">
            ${PROFILE_GOAL_FIELDS.map((goalId) =>
              renderProfilePriorityField(
                state,
                `goals.${goalId}`,
                `profileGoalWeight${capitalize(goalId)}`,
                profile.goals?.[goalId],
                { min: 0, max: 1, step: 0.1 },
              ),
            ).join('')}
          </div>
        </div>
        <div class="field settings-grid__wide">
          <span>${t(state, 'profileBodyFocusGoals')}</span>
          <div class="settings-grid">
            ${PROFILE_BODY_FOCUS_FIELDS.map((goalId) =>
              renderProfilePriorityField(
                state,
                `bodyFocusGoals.${goalId}`,
                `profileBodyFocus${capitalize(goalId)}`,
                profile.bodyFocusGoals?.[goalId],
                { min: 0, max: 1, step: 0.1 },
              ),
            ).join('')}
          </div>
        </div>
        <div class="field settings-grid__wide">
          <span>${t(state, 'profileRecoveryProfile')}</span>
          <div class="settings-grid">
            ${PROFILE_RECOVERY_FIELDS.map((areaId) =>
              renderProfilePriorityField(
                state,
                `recoveryProfile.${areaId}`,
                `profileRecovery${capitalize(areaId)}`,
                profile.recoveryProfile?.[areaId],
                { min: 0, max: 1, step: 0.1 },
              ),
            ).join('')}
          </div>
        </div>
        ${renderProfilePickerField(state, profilePickers.limitations)}
        ${renderProfilePickerField(state, profilePickers.dislikedExercises)}
        ${renderProfilePickerField(state, profilePickers.likedTags)}
      </div>

      <p class="notice" id="profile-status" role="status" aria-live="polite"></p>
    </article>
  `;
}

export function renderSettingsEquipmentRegion(state) {
  const equipment = selectEquipmentCatalog(state);
  const selectedEquipmentIds = selectEquipmentSelectedIdSet(state);

  return `
    <article class="card settings-panel">
      <div class="settings-panel__header">
        <h3>${t(state, 'equipmentSettings')}</h3>
        <p class="muted">${t(state, 'equipmentSettingsDescription')}</p>
      </div>

      <div class="inline-control">
        <label class="field settings-inline-field" for="equipment-custom-name">
          <span>${t(state, 'equipmentCustomLabel')}</span>
          <input
            id="equipment-custom-name"
            type="text"
            data-equipment-custom-input
            placeholder="${escapeAttribute(t(state, 'equipmentCustomPlaceholder'))}"
          >
        </label>
        <button class="button button--primary" type="button" data-equipment-add>${t(state, 'equipmentAdd')}</button>
      </div>

      <div class="settings-checkbox-list" data-equipment-list>
        ${equipment.map((item) => renderEquipmentOption(state, item, selectedEquipmentIds.has(item.id))).join('')}
      </div>

      <p class="notice" id="equipment-status" role="status" aria-live="polite"></p>
    </article>
  `;
}

export function renderSettingsAudioRegion(state) {
  const { settings } = state;

  return `
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
  `;
}

function renderProfileNumberField(state, fieldName, labelKey, value, options = {}) {
  const id = `profile-${fieldName}`;
  const { min = 0, max = '', step = 1 } = options;

  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <input
        id="${id}"
        type="number"
        min="${escapeAttribute(min)}"
        ${max !== '' ? `max="${escapeAttribute(max)}"` : ''}
        step="${escapeAttribute(step)}"
        inputmode="decimal"
        data-profile-field="${fieldName}"
        value="${escapeAttribute(value ?? '')}"
      >
    </label>
  `;
}

function renderProfilePriorityField(state, fieldName, labelKey, value, options = {}) {
  const id = `profile-${fieldName}`;
  const numberValue = value ?? 0;
  const { min = 0, max = 1, step = 0.1 } = options;

  return `
    <label class="field" for="${id}-number">
      <span>${t(state, labelKey)}</span>
      <div class="priority-field">
        <input
          id="${id}-range"
          class="priority-field__range"
          type="range"
          min="${escapeAttribute(min)}"
          max="${escapeAttribute(max)}"
          step="${escapeAttribute(step)}"
          data-profile-field="${fieldName}"
          data-profile-input-type="priority-range"
          value="${escapeAttribute(numberValue)}"
        >
        <input
          id="${id}-number"
          class="priority-field__number"
          type="number"
          min="${escapeAttribute(min)}"
          max="${escapeAttribute(max)}"
          step="${escapeAttribute(step)}"
          inputmode="decimal"
          data-profile-field="${fieldName}"
          data-profile-input-type="priority-number"
          value="${escapeAttribute(numberValue)}"
        >
      </div>
    </label>
  `;
}

function renderProfileSelectField(state, fieldName, labelKey, value, optionValues) {
  const id = `profile-${fieldName}`;

  return `
    <label class="field" for="${id}">
      <span>${t(state, labelKey)}</span>
      <select id="${id}" data-profile-field="${fieldName}">
        ${optionValues
          .map((optionValue) => {
            const messageKey = buildProfileOptionMessageKey(fieldName, optionValue);
            return `<option value="${escapeAttribute(optionValue)}" ${optionValue === value ? 'selected' : ''}>${t(state, messageKey)}</option>`;
          })
          .join('')}
      </select>
    </label>
  `;
}

function buildProfileOptionMessageKey(fieldName, optionValue) {
  if (!optionValue) {
    return `${fieldName}OptionEmpty`;
  }

  const normalized = optionValue
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return `${fieldName}Option${normalized}`;
}

function renderProfilePickerField(state, config) {
  const selectedValues = asArray(config.selectedValues);
  const selectedLabels = selectedValues
    .slice(0, 6)
    .map((value) => config.optionLabelByValue.get(value) || humanizeToken(value));

  return `
    <div class="field settings-grid__wide profile-picker-field">
      <span>${t(state, config.labelKey)}</span>
      <input type="hidden" data-profile-field="${config.fieldName}" value="${escapeAttribute(selectedValues.join(', '))}">
      <button
        class="button profile-picker-field__trigger"
        type="button"
        data-profile-picker-open="${config.fieldName}"
        aria-haspopup="dialog"
        aria-controls="profile-picker-${config.fieldName}"
      >
        ${t(state, 'profilePickerOpen')}
      </button>
      <div class="chip-list profile-picker-field__summary">
        ${
          selectedLabels.length
            ? selectedLabels
                .map((label) => `<span class="chip">${escapeHtml(label)}</span>`)
                .join('')
            : `<span class="muted">${t(state, 'profilePickerEmpty')}</span>`
        }
      </div>
      <p class="muted">${t(state, 'profilePickerSelectedCount')}: ${selectedValues.length}</p>
      ${renderProfilePickerModal(state, config)}
    </div>
  `;
}

function renderProfilePickerModal(state, config) {
  return `
    <div
      class="profile-picker-modal"
      id="profile-picker-${config.fieldName}"
      data-profile-picker-modal="${config.fieldName}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-picker-title-${config.fieldName}"
      hidden
    >
      <div class="profile-picker-modal__panel" role="document">
        <div class="profile-picker-modal__header">
          <div>
            <h3 id="profile-picker-title-${config.fieldName}">${t(state, config.titleKey)}</h3>
            <p class="muted">${t(state, config.hintKey)}</p>
          </div>
          <button class="icon-button" type="button" data-profile-picker-close aria-label="${escapeAttribute(t(state, 'profilePickerCancel'))}">x</button>
        </div>

        <div class="profile-picker-modal__groups">
          ${config.groups
            .map(
              (group) => `
            <section class="profile-picker-group" aria-label="${escapeAttribute(group.label)}">
              <h4>${escapeHtml(group.label)}</h4>
              <div class="profile-picker-options">
                ${group.options
                  .map(
                    (option) => `
                  <label class="profile-picker-option">
                    <input
                      type="checkbox"
                      data-profile-picker-option
                      value="${escapeAttribute(option.value)}"
                      ${selectedValueIncludes(config.selectedValues, option.value) ? 'checked' : ''}
                    >
                    <span>${escapeHtml(option.label)}</span>
                    ${option.description ? `<small class="muted">${escapeHtml(option.description)}</small>` : ''}
                  </label>
                `,
                  )
                  .join('')}
              </div>
            </section>
          `,
            )
            .join('')}
        </div>

        <div class="toolbar profile-picker-modal__actions">
          <button class="button" type="button" data-profile-picker-close>${t(state, 'profilePickerCancel')}</button>
          <button class="button button--primary" type="button" data-profile-picker-apply>${t(state, 'profilePickerApply')}</button>
        </div>
      </div>
    </div>
  `;
}

function buildProfilePickerConfigs(state, context) {
  const limitationsGroups = buildLimitationsPickerGroups(state);
  const dislikedExerciseGroups = buildDislikedExercisePickerGroups(
    context.exercises,
    context.language,
  );
  const preferredTagGroups = buildPreferredTagsPickerGroups(
    state,
    context.exercises,
    context.equipmentCatalog,
  );

  return {
    limitations: buildProfilePickerConfig({
      fieldName: 'limitations',
      labelKey: 'profileLimitations',
      titleKey: 'profilePickerLimitationsTitle',
      hintKey: 'profilePickerLimitationsHint',
      selectedValues: context.profile.limitations,
      groups: limitationsGroups,
    }),
    dislikedExercises: buildProfilePickerConfig({
      fieldName: 'dislikedExercises',
      labelKey: 'profileDislikedExercises',
      titleKey: 'profilePickerDislikedExercisesTitle',
      hintKey: 'profilePickerDislikedExercisesHint',
      selectedValues: context.profile.dislikedExercises,
      groups: dislikedExerciseGroups,
    }),
    likedTags: buildProfilePickerConfig({
      fieldName: 'likedTags',
      labelKey: 'profileLikedTags',
      titleKey: 'profilePickerPreferredTagsTitle',
      hintKey: 'profilePickerPreferredTagsHint',
      selectedValues: context.profile.likedTags,
      groups: preferredTagGroups,
    }),
  };
}

function buildProfilePickerConfig(config) {
  const selectedValues = uniqueStrings(
    asArray(config.selectedValues).map((item) => normalizeString(item).toLowerCase()),
  );
  const groups = asArray(config.groups)
    .map((group) => ({
      ...group,
      options: asArray(group.options)
        .map((option) => ({
          value: normalizeString(option.value).toLowerCase(),
          label: normalizeString(option.label) || humanizeToken(option.value),
          description: normalizeString(option.description),
        }))
        .filter((option) => option.value),
    }))
    .filter((group) => group.options.length > 0);
  const optionLabelByValue = new Map();

  groups.forEach((group) => {
    group.options.forEach((option) => {
      optionLabelByValue.set(option.value, option.label);
    });
  });

  return {
    ...config,
    selectedValues,
    groups,
    optionLabelByValue,
  };
}

function buildLimitationsPickerGroups(state) {
  const groups = new Map([
    ['joint', { label: t(state, 'profilePickerGroupJoints'), options: [] }],
    ['region', { label: t(state, 'profilePickerGroupRegions'), options: [] }],
    ['cardio', { label: t(state, 'profilePickerGroupCardio'), options: [] }],
    ['other', { label: t(state, 'profilePickerGroupOther'), options: [] }],
  ]);

  SUPPORTED_CONTRAINDICATION_TAGS.forEach((value) => {
    const prefix = normalizeString(value).split('-')[0];
    const groupKey = groups.has(prefix) ? prefix : 'other';
    groups.get(groupKey).options.push({
      value,
      label: humanizeToken(value),
    });
  });

  return Array.from(groups.values());
}

function buildDislikedExercisePickerGroups(exercises, language) {
  const groupMap = new Map();

  asArray(exercises).forEach((exercise) => {
    const typeLabel =
      localizedText(exercise.type, language) ||
      humanizeToken(exercise.type?.en || exercise.type) ||
      'Other';
    const exerciseName = localizedText(exercise.name, language) || exercise.id;

    if (!exercise.id || !exerciseName) {
      return;
    }

    if (!groupMap.has(typeLabel)) {
      groupMap.set(typeLabel, []);
    }

    groupMap.get(typeLabel).push({
      value: exercise.id,
      label: exerciseName,
    });
  });

  return Array.from(groupMap.entries())
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([label, options]) => ({
      label,
      options: options.sort((left, right) => left.label.localeCompare(right.label)),
    }));
}

function buildPreferredTagsPickerGroups(state, exercises, equipmentCatalog) {
  const equipmentIds = new Set(
    asArray(equipmentCatalog)
      .map((item) => normalizeString(item.id).toLowerCase())
      .filter(Boolean),
  );
  const tagGroups = new Map([
    ['goal', { label: t(state, 'profilePickerGroupGoal'), options: [] }],
    ['equipment', { label: t(state, 'profilePickerGroupEquipment'), options: [] }],
    ['context', { label: t(state, 'profilePickerGroupContext'), options: [] }],
    ['movement', { label: t(state, 'profilePickerGroupMovement'), options: [] }],
  ]);

  const goalTags = new Set([
    'strength',
    'hypertrophy',
    'endurance',
    'fat-loss',
    'general-fitness',
    'cardio',
    'yoga',
    'compound',
    'conditioning',
    'mobility',
    'static',
    'hold',
  ]);
  const contextTags = new Set([
    'beginner',
    'intermediate',
    'advanced',
    'home',
    'warmup',
    'cooldown',
    'recovery',
  ]);
  const allTags = uniqueStrings(
    asArray(exercises).flatMap((exercise) =>
      asArray(exercise.tags).map((tag) => normalizeString(tag).toLowerCase()),
    ),
  );

  allTags.forEach((tag) => {
    if (!tag) {
      return;
    }

    let groupKey = 'movement';

    if (
      equipmentIds.has(tag) ||
      tag.includes('dumbbell') ||
      tag.includes('kettlebell') ||
      tag.includes('barbell')
    ) {
      groupKey = 'equipment';
    } else if (goalTags.has(tag)) {
      groupKey = 'goal';
    } else if (contextTags.has(tag)) {
      groupKey = 'context';
    }

    tagGroups.get(groupKey).options.push({
      value: tag,
      label: humanizeToken(tag),
    });
  });

  return Array.from(tagGroups.values())
    .map((group) => ({
      ...group,
      options: group.options.sort((left, right) => left.label.localeCompare(right.label)),
    }))
    .filter((group) => group.options.length > 0);
}

function selectedValueIncludes(selectedValues, value) {
  return asArray(selectedValues).includes(value);
}

function humanizeToken(value) {
  const normalized = normalizeString(value);

  if (!normalized) {
    return '';
  }

  return normalized
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) =>
      part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(' ');
}

function renderEquipmentOption(state, item, isSelected) {
  const language = selectLanguage(state);
  const itemName = localizedText(item.name, language) || item.id || t(state, 'emptyValue');

  return `
    <div class="settings-checkbox-item">
      <label class="settings-checkbox-item__main">
        <input type="checkbox" data-equipment-toggle="${escapeAttribute(item.id)}" ${isSelected ? 'checked' : ''}>
        <span>${escapeHtml(itemName)}</span>
      </label>
      ${item.isCustom ? `<button class="button button--ghost settings-checkbox-item__remove" type="button" data-equipment-remove="${escapeAttribute(item.id)}">${t(state, 'deleteEquipment')}</button>` : ''}
    </div>
  `;
}
