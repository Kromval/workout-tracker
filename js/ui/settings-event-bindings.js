import { t } from '../i18n/index.js';
import {
  applyProfilePicker,
  closeOpenedProfilePicker,
  closeProfilePicker,
  handleAudioPreview,
  handleCustomAudioReset,
  handleCustomAudioUpload,
  handleEquipmentAdd,
  handleEquipmentRemove,
  handleEquipmentToggle,
  handleExportData,
  handleImportData,
  openProfilePicker,
  handleProfileChange,
  handleSettingChange,
  updateVolumeOutput,
} from './settings-actions.js';

export function bindSettingsEvents(state) {
  document.addEventListener('click', (event) => {
    const profilePickerOpenButton = event.target?.closest?.('[data-profile-picker-open]');
    if (profilePickerOpenButton) {
      openProfilePicker(profilePickerOpenButton, state);
      return;
    }

    const profilePickerApplyButton = event.target?.closest?.('[data-profile-picker-apply]');
    if (profilePickerApplyButton) {
      applyProfilePicker(profilePickerApplyButton, state);
      return;
    }

    const profilePickerCloseButton = event.target?.closest?.('[data-profile-picker-close]');
    if (profilePickerCloseButton) {
      closeProfilePicker(profilePickerCloseButton);
      return;
    }

    const profilePickerBackdrop = event.target?.closest?.('[data-profile-picker-modal]');
    if (profilePickerBackdrop && event.target === profilePickerBackdrop) {
      closeProfilePicker(profilePickerBackdrop);
      return;
    }

    if (event.target?.id === 'export-data-button') {
      handleExportData(state);
    }

    if (event.target?.id === 'import-data-button') {
      document.querySelector('#import-data-file')?.click();
      return;
    }

    const equipmentAddButton = event.target?.closest?.('[data-equipment-add]');
    if (equipmentAddButton) {
      handleEquipmentAdd(state);
      return;
    }

    const equipmentRemoveButton = event.target?.closest?.('[data-equipment-remove]');
    if (equipmentRemoveButton) {
      if (!window.confirm(t(state, 'removeListItemConfirm'))) {
        return;
      }

      handleEquipmentRemove(equipmentRemoveButton, state);
      return;
    }

    const audioPreviewButton = event.target?.closest?.('[data-custom-audio-preview]');
    if (audioPreviewButton) {
      handleAudioPreview(audioPreviewButton);
      return;
    }

    const audioResetButton = event.target?.closest?.('[data-custom-audio-reset]');
    if (audioResetButton) {
      handleCustomAudioReset(audioResetButton, state);
    }
  });

  document.addEventListener('change', (event) => {
    const audioUploadInput = event.target?.closest?.('[data-custom-audio-upload]');
    if (audioUploadInput) {
      handleCustomAudioUpload(audioUploadInput, state);
      return;
    }

    if (event.target?.id === 'import-data-file') {
      handleImportData(event.target, state);
      return;
    }

    const profileField = event.target?.dataset?.profileField;
    if (profileField) {
      handleProfileChange(event.target, state);
      return;
    }

    const equipmentToggle = event.target?.dataset?.equipmentToggle;
    if (equipmentToggle) {
      handleEquipmentToggle(event.target, state);
      return;
    }

    const settingName = event.target?.dataset?.setting;
    if (settingName) {
      handleSettingChange(event.target, state);
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target?.dataset?.setting === 'volume') {
      updateVolumeOutput(Number(event.target.value));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeOpenedProfilePicker();
    }

    if (event.key === 'Enter' && event.target?.matches?.('[data-equipment-custom-input]')) {
      event.preventDefault();
      handleEquipmentAdd(state);
    }
  });
}
