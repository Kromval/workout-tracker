import {
  createHistoryEntry as createStoredHistoryEntry,
  getHistoryByDate as getStoredHistoryByDate,
  listHistory,
  saveHistoryEntry as saveStoredHistoryEntry,
} from './storage.js';

const HISTORY_STATUSES = ['completed', 'aborted', 'interrupted'];

// History module keeps workout-run code away from storage implementation details.
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

export function saveHistoryEntry(entry = {}) {
  if (!isPlainObject(entry)) {
    throw new TypeError('History entry must be an object.');
  }

  return saveStoredHistoryEntry(entry.id ? entry : createHistoryEntry(entry));
}

export function getHistory() {
  return sortByStartedAtDesc(listHistory());
}

export function getHistoryByDate(date) {
  return sortByStartedAtDesc(getStoredHistoryByDate(date));
}

export function getHistoryGroupedByMonth(history = getHistory()) {
  return sortMonthGroups(asArray(history).reduce((months, entry) => {
    const monthKey = normalizeMonthKey(entry.startedAt);

    if (!monthKey) {
      return months;
    }

    months[monthKey] = months[monthKey] || [];
    months[monthKey].push(entry);
    return months;
  }, {}));
}

export function getStatsSummary(history = getHistory()) {
  const entries = asArray(history);
  const statusCounts = entries.reduce((counts, entry) => {
    const status = HISTORY_STATUSES.includes(entry.status) ? entry.status : 'completed';
    counts[status] += 1;
    return counts;
  }, {
    completed: 0,
    aborted: 0,
    interrupted: 0,
  });

  const totals = entries.reduce((summary, entry) => ({
    durationSec: summary.durationSec + nonNegativeNumber(entry.durationSec, 0),
    caloriesBurned: summary.caloriesBurned + nonNegativeNumber(entry.estimatedCaloriesBurned, 0),
    exercisesCompleted: summary.exercisesCompleted + nonNegativeInteger(entry.totalExercisesCompleted, 0),
    setsCompleted: summary.setsCompleted + nonNegativeInteger(entry.totalSetsCompleted, 0),
  }), {
    durationSec: 0,
    caloriesBurned: 0,
    exercisesCompleted: 0,
    setsCompleted: 0,
  });

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
    averageCaloriesBurned: entries.length ? roundToOneDecimal(totals.caloriesBurned / entries.length) : 0,
  };
}

// Backward-compatible alias used by existing pages/placeholders.
export function getHistoryStats() {
  return getStatsSummary();
}

function sortByStartedAtDesc(history) {
  return [...asArray(history)].sort((left, right) => getTime(right.startedAt) - getTime(left.startedAt));
}

function sortMonthGroups(groups) {
  return Object.keys(groups)
    .sort((left, right) => right.localeCompare(left))
    .reduce((result, monthKey) => {
      result[monthKey] = sortByStartedAtDesc(groups[monthKey]);
      return result;
    }, {});
}

function calculateDurationSec(startedAt, endedAt) {
  const startedTime = getTime(startedAt);
  const endedTime = getTime(endedAt);

  if (!startedTime || !endedTime || endedTime < startedTime) {
    return 0;
  }

  return Math.round((endedTime - startedTime) / 1000);
}

function countCompletedExercises(completedItems) {
  return asArray(completedItems).filter((item) => {
    if (!isPlainObject(item) || item.skipped) {
      return false;
    }

    return nonNegativeInteger(item.setsCompleted, 0) > 0
      || nonNegativeInteger(item.repsCompleted, 0) > 0
      || nonNegativeInteger(item.durationSec, 0) > 0;
  }).length;
}

function countCompletedSets(completedItems) {
  return asArray(completedItems).reduce((total, item) => {
    if (!isPlainObject(item) || item.skipped) {
      return total;
    }

    return total + nonNegativeInteger(item.setsCompleted, 0);
  }, 0);
}

function normalizeMonthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function normalizeIsoDate(value, fallback) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function getTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function hasNonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0;
}

function nonNegativeInteger(value, fallback) {
  return Math.trunc(nonNegativeNumber(value, fallback));
}

function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function roundToOneDecimal(value) {
  return Math.round(nonNegativeNumber(value, 0) * 10) / 10;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function nowIso() {
  return new Date().toISOString();
}
