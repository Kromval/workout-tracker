/**
 * @module js/storage/helpers
 */
/**
 * Upserts by id.
 * @param {*} items items input
 * @param {*} nextItem next item input
 * @returns {*} result
 */
export function upsertById(items, nextItem) {
  const index = items.findIndex((item) => item.id === nextItem.id);

  if (index === -1) {
    return [...items, nextItem];
  }

  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

/**
 * Merges by id.
 * @param {Array} currentItems current items input
 * @param {Array} importedItems imported items input
 * @returns {*} result
 */
export function mergeById(currentItems, importedItems) {
  return importedItems.reduce((result, item) => upsertById(result, item), [...currentItems]);
}

/**
 * Runs find by id.
 * @param {Array} items items input
 * @param {string} id id input
 * @returns {*} result
 */
export function findById(items, id) {
  return clone(items.find((item) => item.id === id) || null);
}

/**
 * Runs sort by updated at desc.
 * @param {Array} items items input
 * @returns {*} result
 */
export function sortByUpdatedAtDesc(items) {
  return sortByDateDesc(items, (item) => item.updatedAt || item.createdAt);
}

/**
 * Runs sort history entries.
 * @param {Array} items items input
 * @returns {*} result
 */
export function sortHistoryEntries(items) {
  return sortByDateDesc(
    items,
    (item) => item.updatedAt || item.endedAt || item.startedAt || item.createdAt,
  );
}

/**
 * Runs sort by date desc.
 * @param {Array} items items input
 * @param {string} getDateValue get date value input
 * @returns {*} result
 */
export function sortByDateDesc(items, getDateValue) {
  return [...items].sort(
    (left, right) => getTime(getDateValue(right)) - getTime(getDateValue(left)),
  );
}

/**
 * Gets time.
 * @param {string} value value input
 * @returns {*} result
 */
export function getTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

/**
 * Normalizes date key.
 * @param {string} value value input
 * @returns {*} result
 */
export function normalizeDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Normalizes iso date.
 * @param {string} value value input
 * @param {number} fallback fallback input
 * @returns {string} formatted value
 */
export function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

/**
 * Runs now iso.
 * @returns {string} formatted value
 */
export function nowIso() {
  return new Date().toISOString();
}

/**
 * Creates id.
 * @param {string} prefix prefix input
 * @returns {string} formatted value
 */
export function createId(prefix) {
  const cryptoApi = typeof globalThis !== 'undefined' ? globalThis.crypto : null;

  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return `${prefix}-${cryptoApi.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Normalizes string.
 * @param {string} value value input
 * @returns {string} formatted value
 */
export function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
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
 * Runs as array.
 * @param {string} value value input
 * @returns {*} result
 */
export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * Runs optional non negative integer.
 * @param {string} value value input
 * @returns {*} result
 */
export function optionalNonNegativeInteger(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeInteger(value, 0);
}

/**
 * Runs optional non negative number.
 * @param {string} value value input
 * @returns {*} result
 */
export function optionalNonNegativeNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeNumber(value, 0);
}

/**
 * Runs non negative integer.
 * @param {string} value value input
 * @param {number} fallback fallback input
 * @returns {*} result
 */
export function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

/**
 * Runs non negative number.
 * @param {string} value value input
 * @param {number} fallback fallback input
 * @returns {*} result
 */
export function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

/**
 * Runs clamp number.
 * @param {string} value value input
 * @param {number} min min input
 * @param {number} max max input
 * @param {number} fallback fallback input
 * @returns {*} result
 */
export function clampNumber(value, min, max, fallback) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, number));
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
 * Runs clone.
 * @param {string} value value input
 * @returns {*} result
 */
export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
