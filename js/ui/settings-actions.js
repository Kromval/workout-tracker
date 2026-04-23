import { preview as previewAudio, setVolume, stopAll } from '../features/audio.js';
import { t } from '../i18n/index.js';
import { refreshStore, updateEquipment, updateProfile, updateSettings } from '../core/state.js';
import { selectCustomAudio, selectEquipment, selectEquipmentSelectedIdSet, selectProfile } from '../core/selectors.js';
import {
  createCustomEquipmentRecord,
  createEquipment,
  exportStore,
  importStore,
  IMPORT_MODES,
} from '../storage/core.js';
import {
  getAudioMimeFromName,
  isSupportedAudioFile,
  normalizeAudioDataUrl,
  readFileAsDataUrl,
} from './audio-file-utils.js';
import { setPendingNotice } from './notices.js';
import { normalizeString } from '../core/utils.js';

const CUSTOM_AUDIO_MAX_BYTES = 512 * 1024;

export function handleSettingChange(input, state) {
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

export function handleProfileChange(input, state) {
  const fieldName = input.dataset.profileField;

  if (!fieldName) {
    return;
  }

  const currentProfile = selectProfile(state);
  let value = input.value;

  if (input instanceof HTMLInputElement && ['number', 'range'].includes(input.type)) {
    value = value === '' ? null : Number(value);
  }

  if (input instanceof HTMLTextAreaElement && ['limitations', 'dislikedExercises', 'likedTags'].includes(fieldName)) {
    value = parseCommaSeparatedList(value);
  }

  const profilePatch = buildProfilePatch(currentProfile, fieldName, value);
  syncProfileFieldInputs(fieldName, input.value, input);
  updateProfile(profilePatch);
  setProfileStatus(t(state, 'settingsSaved'));
}

export function handleEquipmentToggle(input, state) {
  const equipmentId = input.dataset.equipmentToggle;

  if (!equipmentId) {
    return;
  }

  const selectedIds = new Set(selectEquipmentSelectedIdSet(state));

  if (input.checked) {
    selectedIds.add(equipmentId);
  } else {
    selectedIds.delete(equipmentId);
  }

  updateEquipment(createEquipment({
    ...selectEquipment(state),
    selectedIds: Array.from(selectedIds),
  }));
  setEquipmentStatus(t(state, 'settingsSaved'));
}

export function handleEquipmentAdd(state) {
  const input = document.querySelector('[data-equipment-custom-input]');
  const name = normalizeString(input?.value);

  if (!name) {
    setEquipmentStatus(t(state, 'equipmentNameRequired'), 'error');
    return;
  }

  const { equipment } = createCustomEquipmentRecord(name);
  updateEquipment(equipment);

  if (input) {
    input.value = '';
  }

  setEquipmentStatus(t(state, 'equipmentAdded'));
}

export function handleEquipmentRemove(button, state) {
  const equipmentId = button.dataset.equipmentRemove;

  if (!equipmentId) {
    return;
  }

  const currentEquipment = selectEquipment(state);
  updateEquipment(createEquipment({
    ...currentEquipment,
    customItems: currentEquipment.customItems.filter((item) => item.id !== equipmentId),
    selectedIds: currentEquipment.selectedIds.filter((itemId) => itemId !== equipmentId),
  }));
  setEquipmentStatus(t(state, 'equipmentRemoved'));
}

export function updateVolumeOutput(volume) {
  const output = document.querySelector('#setting-volume-value');
  if (output) {
    output.textContent = `${Math.round(volume * 100)}%`;
  }
}

export async function handleCustomAudioUpload(input, state) {
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
      ...selectCustomAudio(state),
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

export function handleCustomAudioReset(button, state) {
  const eventName = button.dataset.customAudioReset;

  if (!eventName) {
    return;
  }

  const customAudio = { ...selectCustomAudio(state) };
  delete customAudio[eventName];
  updateSettings({ customAudio });
  setCustomAudioStatus(t(state, 'customAudioRemoved'));
}

export function handleAudioPreview(button) {
  previewAudio(button.dataset.customAudioPreview);
}

export function handleExportData(state) {
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

export async function handleImportData(input, state) {
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

function setProfileStatus(message, type = 'success') {
  const status = document.querySelector('#profile-status');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function setEquipmentStatus(message, type = 'success') {
  const status = document.querySelector('#equipment-status');
  if (!status) return;

  status.textContent = message;
  if (message) {
    status.dataset.type = type;
  } else {
    delete status.dataset.type;
  }
}

function buildProfilePatch(currentProfile, fieldName, value) {
  if (!fieldName.includes('.')) {
    return { [fieldName]: value };
  }

  const [rootKey, leafKey] = fieldName.split('.');
  const currentGroup = currentProfile?.[rootKey] && typeof currentProfile[rootKey] === 'object'
    ? currentProfile[rootKey]
    : {};

  return {
    [rootKey]: {
      ...currentGroup,
      [leafKey]: value,
    },
  };
}

function parseCommaSeparatedList(value) {
  return normalizeString(value)
    .split(/[\n,;]+/)
    .map((item) => normalizeString(item).toLowerCase().replaceAll(' ', '-'))
    .filter(Boolean);
}

function syncProfileFieldInputs(fieldName, rawValue, sourceInput) {
  document.querySelectorAll(`[data-profile-field="${fieldName}"]`).forEach((element) => {
    if (element === sourceInput) {
      return;
    }

    element.value = rawValue;
  });
}
