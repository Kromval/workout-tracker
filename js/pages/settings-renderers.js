import { t } from '../i18n/index.js';
import { escapeAttribute, escapeHtml } from '../core/utils.js';

export function renderCustomAudioRow(state, eventName, audioEntry) {
  const hasAudio = Boolean(getCustomAudioDataUrl(audioEntry));
  const fileName = getCustomAudioName(audioEntry) || t(state, 'customAudioDefault');
  const fileSize = getCustomAudioSize(audioEntry);

  return `
    <div class="custom-audio-row" data-custom-audio-row="${escapeAttribute(eventName)}">
      <div class="custom-audio-row__main">
        <strong>${t(state, `audioEvent_${eventName}`)}</strong>
        <span class="muted">${escapeHtml(fileName)}${fileSize ? ` · ${escapeHtml(formatFileSize(fileSize))}` : ''}</span>
      </div>

      <div class="custom-audio-row__actions">
        <label class="button custom-audio-upload">
          <span>${t(state, hasAudio ? 'customAudioReplace' : 'customAudioUpload')}</span>
          <input class="sr-only" type="file" accept="audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/ogg,.mp3,.wav,.ogg" data-custom-audio-upload="${escapeAttribute(eventName)}">
        </label>
        <button class="button" type="button" data-custom-audio-preview="${escapeAttribute(eventName)}">${t(state, 'customAudioPreview')}</button>
        <button class="button" type="button" data-custom-audio-reset="${escapeAttribute(eventName)}" ${hasAudio ? '' : 'disabled'}>${t(state, 'customAudioReset')}</button>
      </div>
    </div>
  `;
}



export function formatFileSize(bytes) {
  const size = Math.max(0, Number(bytes) || 0);

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}



export function getCustomAudioDataUrl(audioEntry) {
  if (typeof audioEntry === 'string') {
    return audioEntry;
  }

  return audioEntry?.dataUrl || '';
}



export function getCustomAudioName(audioEntry) {
  if (typeof audioEntry === 'string') {
    return audioEntry ? 'Data URL' : '';
  }

  return audioEntry?.name || '';
}



export function getCustomAudioSize(audioEntry) {
  if (!audioEntry || typeof audioEntry === 'string') {
    return 0;
  }

  return Number(audioEntry.size) || 0;
}


