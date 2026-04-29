/**
 * @module js/features/history
 */
import {
  createHistoryEntry as createStoredHistoryEntry,
  getHistoryByDate as getStoredHistoryByDate,
  listHistory,
  saveHistoryEntry as saveStoredHistoryEntry,
} from '../storage/core.js';

/**
 * Shared history statuses constant.
 * @type {Array}
 */
const HISTORY_STATUSES = ['completed', 'aborted', 'interrupted'];

// History module keeps workout-run code away from storage implementation details.
/**
 * Creates history entry.
 * @param {object} [overrides={}] overrides input
 * @returns {*} result
 */
export function createHistoryEntry(overrides = {}) {
  const source = isPlainObject(overrides) ? overrides : {};
  const completedItems = asArray(source.completedItems);
  const startedAt = normalizeIsoDate(source.startedAt, nowIso());
  const endedAt = normalizeIsoDate(source.endedAt, startedAt);
  const durationSec = hasNonNegativeNumber(source.durationSec)
    ? nonNegativeInteger(source.durationSec, 0)
    : calculateDurationSec(startedAt, endedAt);

  return createStoredHistoryEntry({
    ...source,
    startedAt,
    endedAt,
    durationSec,
    status: HISTORY_STATUSES.includes(source.status) ? source.status : 'completed',
    completedItems,
    estimatedCaloriesBurned: nonNegativeNumber(source.estimatedCaloriesBurned, 0),
    totalExercisesCompleted: hasNonNegativeNumber(source.totalExercisesCompleted)
      ? nonNegativeInteger(source.totalExercisesCompleted, 0)
      : countCompletedExercises(completedItems),
    totalSetsCompleted: hasNonNegativeNumber(source.totalSetsCompleted)
      ? nonNegativeInteger(source.totalSetsCompleted, 0)
      : countCompletedSets(completedItems),
  });
}

/**
 * Saves history entry.
 * @param {object} [entry={}] entry input
 * @returns {*} result
 */
export function saveHistoryEntry(entry = {}) {
  if (!isPlainObject(entry)) {
    throw new TypeError('History entry must be an object.');
  }

  return saveStoredHistoryEntry(entry.id ? entry : createHistoryEntry(entry));
}

/**
 * Gets history.
 * @returns {*} result
 */
export function getHistory() {
  return sortByStartedAtDesc(listHistory());
}

/**
 * Gets history by date.
 * @param {*} date date input
 * @returns {*} result
 */
export function getHistoryByDate(date) {
  return sortByStartedAtDesc(getStoredHistoryByDate(date));
}

/**
 * Gets history grouped by month.
 * @param {object} [history=getHistory()] history input
 * @returns {*} result
 */
export function getHistoryGroupedByMonth(history = getHistory()) {
  return sortMonthGroups(
    asArray(history).reduce((months, entry) => {
      const monthKey = normalizeMonthKey(entry.startedAt);

      if (!monthKey) {
        return months;
      }

      months[monthKey] = months[monthKey] || [];
      months[monthKey].push(entry);
      return months;
    }, {}),
  );
}

/**
 * Gets stats summary.
 * @param {object} [history=getHistory()] history input
 * @returns {*} result
 */
export function getStatsSummary(history = getHistory()) {
  const entries = asArray(history);
  const statusCounts = entries.reduce(
    (counts, entry) => {
      const status = HISTORY_STATUSES.includes(entry.status) ? entry.status : 'completed';
      counts[status] += 1;
      return counts;
    },
    {
      completed: 0,
      aborted: 0,
      interrupted: 0,
    },
  );

  const totals = entries.reduce(
    (summary, entry) => ({
      durationSec: summary.durationSec + nonNegativeNumber(entry.durationSec, 0),
      caloriesBurned: summary.caloriesBurned + nonNegativeNumber(entry.estimatedCaloriesBurned, 0),
      exercisesCompleted:
        summary.exercisesCompleted + nonNegativeInteger(entry.totalExercisesCompleted, 0),
      setsCompleted: summary.setsCompleted + nonNegativeInteger(entry.totalSetsCompleted, 0),
    }),
    {
      durationSec: 0,
      caloriesBurned: 0,
      exercisesCompleted: 0,
      setsCompleted: 0,
    },
  );

  return {
    totalEntries: entries.length,
    total: entries.length,
    completed: statusCounts.completed,
    aborted: statusCounts.aborted,
    interrupted: statusCounts.interrupted,
    totalDurationSec: Math.round(totals.durationSec),
    totalCaloriesBurned: roundToOneDecimal(totals.caloriesBurned),
    totalExercisesCompleted: totals.exercisesCompleted,
    totalSetsCompleted: totals.setsCompleted,
    averageDurationSec: entries.length ? Math.round(totals.durationSec / entries.length) : 0,
    averageCaloriesBurned: entries.length
      ? roundToOneDecimal(totals.caloriesBurned / entries.length)
      : 0,
  };
}

// Backward-compatible alias used by existing pages/placeholders.
/**
 * Gets history stats.
 * @returns {*} result
 */
export function getHistoryStats() {
  return getStatsSummary();
}

/**
 * Runs sort by started at desc.
 * @param {object} history history input
 * @returns {*} result
 */
function sortByStartedAtDesc(history) {
  return [...asArray(history)].sort(
    (left, right) => getTime(right.startedAt) - getTime(left.startedAt),
  );
}

/**
 * Runs sort month groups.
 * @param {*} groups groups input
 * @returns {*} result
 */
function sortMonthGroups(groups) {
  return Object.keys(groups)
    .sort((left, right) => right.localeCompare(left))
    .reduce((result, monthKey) => {
      result[monthKey] = sortByStartedAtDesc(groups[monthKey]);
      return result;
    }, {});
}

/**
 * Calculates duration sec.
 * @param {*} startedAt started at input
 * @param {*} endedAt ended at input
 * @returns {*} result
 */
function calculateDurationSec(startedAt, endedAt) {
  const startedTime = getTime(startedAt);
  const endedTime = getTime(endedAt);

  if (!startedTime || !endedTime || endedTime < startedTime) {
    return 0;
  }

  return Math.round((endedTime - startedTime) / 1000);
}

/**
 * Runs count completed exercises.
 * @param {Array} completedItems completed items input
 * @returns {*} result
 */
function countCompletedExercises(completedItems) {
  return asArray(completedItems).filter((item) => {
    if (!isPlainObject(item) || item.skipped) {
      return false;
    }

    return (
      nonNegativeInteger(item.setsCompleted, 0) > 0 ||
      nonNegativeInteger(item.repsCompleted, 0) > 0 ||
      nonNegativeInteger(item.durationSec, 0) > 0
    );
  }).length;
}

/**
 * Runs count completed sets.
 * @param {Array} completedItems completed items input
 * @returns {*} result
 */
function countCompletedSets(completedItems) {
  return asArray(completedItems).reduce((total, item) => {
    if (!isPlainObject(item) || item.skipped) {
      return total;
    }

    return total + nonNegativeInteger(item.setsCompleted, 0);
  }, 0);
}

/**
 * Normalizes month key.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeMonthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Normalizes iso date.
 * @param {string} value value input
 * @param {number} fallback fallback input
 * @returns {string} formatted value
 */
function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

/**
 * Gets time.
 * @param {string} value value input
 * @returns {*} result
 */
function getTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

/**
 * Checks whether non negative number.
 * @param {string} value value input
 * @returns {boolean} predicate result
 */
function hasNonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0;
}

/**
 * Runs non negative integer.
 * @param {string} value value input
 * @param {number} fallback fallback input
 * @returns {*} result
 */
function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

/**
 * Runs non negative number.
 * @param {string} value value input
 * @param {number} fallback fallback input
 * @returns {*} result
 */
function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

/**
 * Runs round to one decimal.
 * @param {string} value value input
 * @returns {*} result
 */
function roundToOneDecimal(value) {
  return Math.round(nonNegativeNumber(value, 0) * 10) / 10;
}

/**
 * Runs as array.
 * @param {string} value value input
 * @returns {*} result
 */
function asArray(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * Checks whether plain object.
 * @param {string} value value input
 * @returns {boolean} predicate result
 */
function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Runs now iso.
 * @returns {string} formatted value
 */
function nowIso() {
  return new Date().toISOString();
}
