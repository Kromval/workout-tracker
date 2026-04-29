/**
 * @module js/session/utils
 */
import { STEP_TYPES } from './model.js';

/**
 * Runs positive integer.
 * @param {string} value value input
 * @returns {*} result
 */
export function positiveInteger(value) {
  return Math.max(0, nonNegativeInteger(value, 0));
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
 * Normalizes string.
 * @param {string} value value input
 * @returns {string} formatted value
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
 * Checks whether rest step.
 * @param {number} step step input
 * @returns {boolean} predicate result
 */
export function isRestStep(step) {
  return (
    step?.type === STEP_TYPES.REST_BETWEEN_SETS || step?.type === STEP_TYPES.REST_AFTER_EXERCISE
  );
}

/**
 * Runs now iso.
 * @returns {string} formatted value
 */
export function nowIso() {
  return new Date().toISOString();
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
 * Runs clone.
 * @param {string} value value input
 * @returns {*} result
 */
export function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

/**
 * Gets phase signature.
 * @param {*} phase phase input
 * @returns {*} result
 */
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

/**
 * Runs find last index.
 * @param {Array} items items input
 * @param {*} predicate predicate input
 * @returns {*} result
 */
export function findLastIndex(items, predicate) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (predicate(items[index], index)) {
      return index;
    }
  }

  return -1;
}

/**
 * Runs noop.
 */
export function noop() {}
