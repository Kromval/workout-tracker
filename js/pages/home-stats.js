/**
 * @module js/pages/home-stats
 */
import { getStatsSummary } from '../features/history.js';
import { t } from '../i18n/index.js';
import { asArray, escapeHtml } from '../core/utils.js';
import { selectLanguage } from '../core/selectors.js';

/**
 * Renders home stat markup.
 * @param {object} state state input
 * @param {string} value value input
 * @param {string} labelKey label key input
 * @returns {string} rendered markup
 */
export function renderHomeStat(state, value, labelKey) {
  return `
    <div class="home-stat">
      <span class="home-stat__value">${escapeHtml(value)}</span>
      <span class="muted">${t(state, labelKey)}</span>
    </div>
  `;
}

/**
 * Renders home activity stats markup.
 * @param {object} state state input
 * @param {*} stats stats input
 * @returns {Array} rendered markup
 */
export function renderHomeActivityStats(state, stats) {
  const items = [
    ['homeStatsWeekWorkouts', stats.weekWorkouts],
    ['homeStatsMonthWorkouts', stats.monthWorkouts],
    ['homeStatsTotalTime', formatCompactDuration(stats.totalDurationSec, selectLanguage(state))],
    ['homeStatsCompletedExercises', stats.totalExercisesCompleted],
    ['homeStatsActiveStreak', stats.activeDayStreak],
  ];

  return `
    <section class="home-activity" aria-labelledby="home-activity-heading">
      <div class="section-header">
        <div>
          <h2 id="home-activity-heading">${t(state, 'homeActivityStatsTitle')}</h2>
          <p class="muted">${t(state, 'homeActivityStatsHint')}</p>
        </div>
      </div>

      <div class="home-activity__grid">
        ${items
          .map(
            ([labelKey, value]) => `
          <article class="home-activity__item">
            <span class="home-activity__value">${escapeHtml(value)}</span>
            <span class="muted">${t(state, labelKey)}</span>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}

/**
 * Gets home activity stats.
 * @param {object} [history=[]] history input
 * @returns {*} result
 */
export function getHomeActivityStats(history = []) {
  const entries = asArray(history);
  const summary = getStatsSummary(entries);
  const now = new Date();
  const weekStart = getStartOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    weekWorkouts: entries.filter((entry) => isEntryInRange(entry, weekStart, addDays(weekStart, 7)))
      .length,
    monthWorkouts: entries.filter((entry) => isEntryInRange(entry, monthStart, nextMonthStart))
      .length,
    totalDurationSec: summary.totalDurationSec,
    totalExercisesCompleted: summary.totalExercisesCompleted,
    activeDayStreak: calculateActiveDayStreak(entries, now),
  };
}

/**
 * Calculates active day streak.
 * @param {object} history history input
 * @param {Date} [now=new Date()] now input
 * @returns {*} result
 */
export function calculateActiveDayStreak(history, now = new Date()) {
  const activeDays = new Set(
    history.map((entry) => normalizeDateKey(entry?.startedAt)).filter(Boolean),
  );

  if (activeDays.size === 0) {
    return 0;
  }

  let cursor = startOfDay(now);

  if (!activeDays.has(formatDateKey(cursor))) {
    const yesterday = addDays(cursor, -1);

    if (!activeDays.has(formatDateKey(yesterday))) {
      return 0;
    }

    cursor = yesterday;
  }

  let streak = 0;
  while (activeDays.has(formatDateKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

/**
 * Checks whether entry in range.
 * @param {object} entry entry input
 * @param {*} start start input
 * @param {*} end end input
 * @returns {boolean} predicate result
 */
export function isEntryInRange(entry, start, end) {
  const date = new Date(entry?.startedAt);
  return !Number.isNaN(date.getTime()) && date >= start && date < end;
}

/**
 * Gets start of week.
 * @param {*} date date input
 * @returns {*} result
 */
export function getStartOfWeek(date) {
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(startOfDay(date), mondayOffset);
}

/**
 * Runs start of day.
 * @param {*} date date input
 * @returns {*} result
 */
export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Runs add days.
 * @param {*} date date input
 * @param {*} days days input
 * @returns {*} result
 */
export function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

/**
 * Normalizes date key.
 * @param {string} value value input
 * @returns {*} result
 */
export function normalizeDateKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : formatDateKey(date);
}

/**
 * Formats date key.
 * @param {*} date date input
 * @returns {*} result
 */
export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats compact duration.
 * @param {number} totalSec total sec input
 * @param {string} [language="ru"] language input
 * @returns {*} result
 */
export function formatCompactDuration(totalSec, language = 'ru') {
  const seconds = Math.max(0, Math.round(Number(totalSec) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0 && minutes === 0) {
    return language === 'en' ? '0 min' : '0 мин';
  }

  const hourUnit = language === 'en' ? 'h' : 'ч';
  const minuteUnit = language === 'en' ? 'min' : 'мин';

  if (hours === 0) {
    return `${minutes} ${minuteUnit}`;
  }

  if (minutes === 0) {
    return `${hours} ${hourUnit}`;
  }

  return `${hours} ${hourUnit} ${minutes} ${minuteUnit}`;
}
