export function upsertById(items, nextItem) {
  const index = items.findIndex((item) => item.id === nextItem.id);

  if (index === -1) {
    return [...items, nextItem];
  }

  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

export function mergeById(currentItems, importedItems) {
  return importedItems.reduce((result, item) => upsertById(result, item), [...currentItems]);
}

export function findById(items, id) {
  return clone(items.find((item) => item.id === id) || null);
}

export function sortByUpdatedAtDesc(items) {
  return sortByDateDesc(items, (item) => item.updatedAt || item.createdAt);
}

export function sortHistoryEntries(items) {
  return sortByDateDesc(
    items,
    (item) => item.updatedAt || item.endedAt || item.startedAt || item.createdAt,
  );
}

export function sortByDateDesc(items, getDateValue) {
  return [...items].sort(
    (left, right) => getTime(getDateValue(right)) - getTime(getDateValue(left)),
  );
}

export function getTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export function normalizeDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

export function nowIso() {
  return new Date().toISOString();
}

export function createId(prefix) {
  const cryptoApi = typeof globalThis !== 'undefined' ? globalThis.crypto : null;

  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return `${prefix}-${cryptoApi.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function uniqueStrings(values) {
  return Array.from(new Set(asArray(values).map(normalizeString).filter(Boolean)));
}

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function optionalNonNegativeInteger(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeInteger(value, 0);
}

export function optionalNonNegativeNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return nonNegativeNumber(value, 0);
}

export function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

export function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

export function clampNumber(value, min, max, fallback) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, number));
}

export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
