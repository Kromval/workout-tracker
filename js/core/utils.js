/**
 * Shared low-level helpers used by UI and data modules.
 * Keep this file dependency-free so it can be imported anywhere.
 */

export function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function uniqueStrings(values) {
  return Array.from(new Set(asArray(values).map(normalizeString).filter(Boolean)));
}

export function nonNegativeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

export function nonNegativeInteger(value, fallback = 0) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function escapeAttribute(value) {
  return escapeHtml(value);
}

export function setText(root, selector, value) {
  const element = root?.querySelector?.(selector);
  if (element) {
    element.textContent = value;
  }
}

export function formatClock(totalSec) {
  const seconds = Math.max(0, Math.round(Number(totalSec) || 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

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

export function formatCalories(value) {
  const calories = Math.max(0, Number(value) || 0);
  return `${Number.isInteger(calories) ? calories : calories.toFixed(1)} kcal`;
}

