import { getStatsSummary } from '../features/history.js';
import { t } from '../i18n/index.js';
import { asArray, escapeHtml } from '../core/utils.js';

export function renderHomeStat(state, value, labelKey) {
  return `
    <div class="home-stat">
      <span class="home-stat__value">${escapeHtml(value)}</span>
      <span class="muted">${t(state, labelKey)}</span>
    </div>
  `;
}



export function renderHomeActivityStats(state, stats) {
  const items = [
    ['homeStatsWeekWorkouts', stats.weekWorkouts],
    ['homeStatsMonthWorkouts', stats.monthWorkouts],
    ['homeStatsTotalTime', formatCompactDuration(stats.totalDurationSec, state.settings.language)],
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
        ${items.map(([labelKey, value]) => `
          <article class="home-activity__item">
            <span class="home-activity__value">${escapeHtml(value)}</span>
            <span class="muted">${t(state, labelKey)}</span>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}



export function getHomeActivityStats(history = []) {
  const entries = asArray(history);
  const summary = getStatsSummary(entries);
  const now = new Date();
  const weekStart = getStartOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    weekWorkouts: entries.filter((entry) => isEntryInRange(entry, weekStart, addDays(weekStart, 7))).length,
    monthWorkouts: entries.filter((entry) => isEntryInRange(entry, monthStart, nextMonthStart)).length,
    totalDurationSec: summary.totalDurationSec,
    totalExercisesCompleted: summary.totalExercisesCompleted,
    activeDayStreak: calculateActiveDayStreak(entries, now),
  };
}



export function calculateActiveDayStreak(history, now = new Date()) {
  const activeDays = new Set(history
    .map((entry) => normalizeDateKey(entry?.startedAt))
    .filter(Boolean));

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



export function isEntryInRange(entry, start, end) {
  const date = new Date(entry?.startedAt);
  return !Number.isNaN(date.getTime()) && date >= start && date < end;
}



export function getStartOfWeek(date) {
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(startOfDay(date), mondayOffset);
}



export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}



export function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}



export function normalizeDateKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : formatDateKey(date);
}



export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



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


