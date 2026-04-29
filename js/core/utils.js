/**
 * @module js/core/utils
 */
/**
 * Shared low-level helpers used by UI and data modules.
 * Keep this file dependency-free so it can be imported anywhere.
 */

export function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Runs as array.
 * @param {string} value value input
 * @returns {*} result
 */
export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * Checks whether plain object.
 * @param {string} value value input
 * @returns {boolean} predicate result
 */
export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Runs unique strings.
 * @param {Array} values values input
 * @returns {*} result
 */
export function uniqueStrings(values) {
  return Array.from(new Set(asArray(values).map(normalizeString).filter(Boolean)));
}

/**
 * Runs non negative number.
 * @param {string} value value input
 * @param {number} [fallback=0] fallback input
 * @returns {*} result
 */
export function nonNegativeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

/**
 * Runs non negative integer.
 * @param {string} value value input
 * @param {number} [fallback=0] fallback input
 * @returns {*} result
 */
export function nonNegativeInteger(value, fallback = 0) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

/**
 * Runs clamp.
 * @param {string} value value input
 * @param {number} min min input
 * @param {number} max max input
 * @returns {*} result
 */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

/**
 * Escapes html.
 * @param {string} value value input
 * @returns {*} result
 */
export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/**
 * Escapes attribute.
 * @param {string} value value input
 * @returns {*} result
 */
export function escapeAttribute(value) {
  return escapeHtml(value);
}

/**
 * Sets text.
 * @param {HTMLElement} root root input
 * @param {*} selector selector input
 * @param {string} value value input
 */
export function setText(root, selector, value) {
  const element = root?.querySelector?.(selector);
  if (element) {
    element.textContent = value;
  }
}

/**
 * Formats clock.
 * @param {number} totalSec total sec input
 * @returns {*} result
 */
export function formatClock(totalSec) {
  const seconds = Math.max(0, Math.round(Number(totalSec) || 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

/**
 * Formats duration.
 * @param {number} totalSec total sec input
 * @returns {*} result
 */
export function formatDuration(totalSec) {
  const seconds = Math.max(0, Math.round(Number(totalSec) || 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  if (minutes === 0) {
    return `${remainder} sec`;
  }

  if (remainder === 0) {
    return `${minutes} min`;
  }

  return `${minutes} min ${remainder} sec`;
}

/**
 * Formats calories.
 * @param {string} value value input
 * @returns {*} result
 */
export function formatCalories(value) {
  const calories = Math.max(0, Number(value) || 0);
  return `${Number.isInteger(calories) ? calories : calories.toFixed(1)} kcal`;
}
