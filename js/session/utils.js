import { STEP_TYPES } from './model.js';

export function positiveInteger(value) {
  return Math.max(0, nonNegativeInteger(value, 0));
}

export function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

export function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

export function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isRestStep(step) {
  return (
    step?.type === STEP_TYPES.REST_BETWEEN_SETS || step?.type === STEP_TYPES.REST_AFTER_EXERCISE
  );
}

export function nowIso() {
  return new Date().toISOString();
}

export function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

export function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

export function getPhaseSignature(phase) {
  if (!phase) {
    return '';
  }

  if (typeof phase !== 'object') {
    return String(phase);
  }

  return [
    phase.type,
    phase.key,
    phase.stepId,
    phase.exerciseIndex,
    phase.setIndex,
    phase.repIndex,
    phase.phaseIndex,
  ].join(':');
}

export function findLastIndex(items, predicate) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (predicate(items[index], index)) {
      return index;
    }
  }

  return -1;
}

export function noop() {}
