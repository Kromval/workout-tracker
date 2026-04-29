/**
 * @module js/ui/audio-file-utils
 */
/**
 * Supported custom audio MIME types.
 * @type {Set}
 */
const CUSTOM_AUDIO_TYPES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
]);

/**
 * Checks whether supported audio file.
 * @param {File} file file input
 * @returns {boolean} predicate result
 */
export function isSupportedAudioFile(file) {
  const type = String(file.type || '').toLowerCase();
  return (
    CUSTOM_AUDIO_TYPES.has(type) ||
    ['.mp3', '.wav', '.ogg'].some((extension) => file.name.toLowerCase().endsWith(extension))
  );
}

/**
 * Gets audio mime from name.
 * @param {string} name name input
 * @returns {*} result
 */
export function getAudioMimeFromName(name) {
  const normalizedName = String(name || '').toLowerCase();

  if (normalizedName.endsWith('.mp3')) return 'audio/mpeg';
  if (normalizedName.endsWith('.wav')) return 'audio/wav';
  if (normalizedName.endsWith('.ogg')) return 'audio/ogg';

  return 'audio/mpeg';
}

/**
 * Reads file as data url.
 * @param {File} file file input
 * @returns {*} result
 */
export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result || '')));
    reader.addEventListener('error', () =>
      reject(reader.error || new Error('Failed to read file.')),
    );
    reader.readAsDataURL(file);
  });
}

/**
 * Normalizes audio data url.
 * @param {string} dataUrl data url input
 * @param {string} mimeType mime type input
 * @returns {*} result
 */
export function normalizeAudioDataUrl(dataUrl, mimeType) {
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
