import {
  asArray,
  escapeAttribute,
  escapeHtml,
  normalizeString,
} from '../core/utils.js';
import { t } from '../i18n/index.js';

const WEEKDAY_LABELS = {
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

let visibleMonth = startOfMonth(new Date());
let selectedDateKey = formatDateKey(new Date());

export function renderProgressCalendar(history = [], options = {}) {
  const language = getLanguage(options.language);
  const days = groupEntriesByDay(history);
  const monthKey = formatMonthKey(visibleMonth);
  const selectedEntries = days[selectedDateKey] || [];
  const title = t(language, 'calendarTitle');

  return `
    <section class="home-section progress-calendar" aria-labelledby="progress-calendar-heading">
      <div class="section-header">
        <div>
          <h2 id="progress-calendar-heading">${t(language, 'calendarTitle')}</h2>
          <p class="muted">${t(language, 'calendarHint')}</p>
        </div>
        <div class="progress-calendar__controls" aria-label="${escapeAttribute(title)}">
          <button class="icon-button" type="button" data-progress-calendar-action="previous" aria-label="${escapeAttribute(t(language, 'calendarPreviousMonth'))}">&lt;</button>
          <time class="progress-calendar__month" datetime="${escapeAttribute(monthKey)}">${escapeHtml(formatMonthLabel(visibleMonth, language))}</time>
          <button class="icon-button" type="button" data-progress-calendar-action="next" aria-label="${escapeAttribute(t(language, 'calendarNextMonth'))}">&gt;</button>
        </div>
      </div>

      <div class="progress-calendar__layout">
        <div class="progress-calendar__panel" role="grid" aria-label="${escapeAttribute(`${title}: ${formatMonthLabel(visibleMonth, language)}`)}">
          ${renderWeekdayHeader(language)}
          ${renderMonthDays(visibleMonth, days, selectedDateKey, language)}
        </div>

        <aside class="progress-calendar__details" aria-live="polite">
          <div class="progress-calendar__details-header">
            <h3>${escapeHtml(formatDayLabel(selectedDateKey, language))}</h3>
            <span class="badge">${formatWorkoutCount(selectedEntries.length, language)}</span>
          </div>
          ${renderDayEntries(selectedEntries, language)}
        </aside>
      </div>
    </section>
  `;
}

export function moveProgressCalendarMonth(delta) {
  const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + delta, 1);
  visibleMonth = startOfMonth(nextMonth);

  if (formatMonthKey(selectedDateKey) !== formatMonthKey(visibleMonth)) {
    selectedDateKey = formatDateKey(visibleMonth);
  }
}

export function selectProgressCalendarDay(dateKey) {
  if (!isDateKey(dateKey)) {
    return;
  }

  selectedDateKey = dateKey;
  visibleMonth = startOfMonth(parseDateKey(dateKey));
}

function renderWeekdayHeader(language) {
  return WEEKDAY_LABELS[language]
    .map((label) => `<div class="progress-calendar__weekday" role="columnheader">${escapeHtml(label)}</div>`)
    .join('');
}

function renderMonthDays(monthDate, days, activeDateKey, language) {
  const todayKey = formatDateKey(new Date());
  const cells = getMonthCells(monthDate);

  return cells.map((date) => {
    const dateKey = formatDateKey(date);
    const entries = days[dateKey] || [];
    const inMonth = date.getMonth() === monthDate.getMonth();
    const hasEntries = entries.length > 0;
    const isSelected = dateKey === activeDateKey;
    const classNames = [
      'progress-calendar__day',
      inMonth ? '' : 'progress-calendar__day--muted',
      hasEntries ? 'progress-calendar__day--has-workout' : '',
      isSelected ? 'progress-calendar__day--selected' : '',
    ].filter(Boolean).join(' ');

    return `
      <button
        class="${classNames}"
        type="button"
        role="gridcell"
        data-progress-calendar-day="${escapeAttribute(dateKey)}"
        aria-selected="${isSelected ? 'true' : 'false'}"
        aria-label="${escapeAttribute(getDayAriaLabel(date, entries.length, isSelected, language))}"
      >
        <span class="progress-calendar__day-number">${date.getDate()}</span>
        ${dateKey === todayKey ? `<span class="sr-only">${t(language, 'calendarToday')}</span>` : ''}
        ${hasEntries ? `<span class="progress-calendar__day-count">${entries.length}</span>` : ''}
      </button>
    `;
  }).join('');
}

function renderDayEntries(entries, language) {
  if (!entries.length) {
    return `<p class="muted progress-calendar__empty">${t(language, 'calendarNoWorkouts')}</p>`;
  }

  return `
    <div class="progress-calendar__entry-list">
      ${entries.map((entry) => renderDayEntry(entry, language)).join('')}
    </div>
  `;
}

function renderDayEntry(entry, language) {
  const status = getStatus(entry.status);
  const title = normalizeString(entry.workoutTitleSnapshot) || t(language, 'calendarUnnamedWorkout');
  const startedAt = formatTime(entry.startedAt, language);
  const rating = normalizeString(entry.ratingEmoji);

  return `
    <article class="progress-calendar__entry progress-calendar__entry--${escapeAttribute(status)}">
      <div>
        <h4>${escapeHtml(title)}</h4>
        <p class="muted">${escapeHtml(startedAt)}</p>
      </div>
      <div class="progress-calendar__entry-meta">
        <span class="badge">${escapeHtml(t(language, `calendarStatus_${status}`))}</span>
        ${rating ? `<span class="progress-calendar__rating" aria-label="${escapeAttribute(t(language, 'calendarRatingLabel'))}">${escapeHtml(rating)}</span>` : ''}
      </div>
    </article>
  `;
}

function formatWorkoutCount(count, language) {
  return t(language, 'calendarWorkoutCount').replace('{count}', String(count));
}

function getDayAriaLabel(date, entryCount, isSelected, language) {
  const parts = [
    formatDayLabel(formatDateKey(date), language),
    formatWorkoutCount(entryCount, language),
  ];

  if (formatDateKey(date) === formatDateKey(new Date())) {
    parts.push(t(language, 'calendarToday'));
  }

  if (isSelected) {
    parts.push(t(language, 'calendarSelectedDay'));
  }

  return parts.join(', ');
}

function groupEntriesByDay(history) {
  return asArray(history).reduce((days, entry) => {
    const dateKey = normalizeDateKey(entry?.startedAt);
    if (!dateKey) {
      return days;
    }

    days[dateKey] = days[dateKey] || [];
    days[dateKey].push(entry);
    return days;
  }, {});
}

function getMonthCells(monthDate) {
  const firstDay = startOfMonth(monthDate);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
}

function startOfMonth(value) {
  const date = value instanceof Date ? value : new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function normalizeDateKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : formatDateKey(date);
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDateKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatMonthKey(value) {
  if (typeof value === 'string') {
    return value.slice(0, 7);
  }

  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function formatMonthLabel(value, language) {
  return new Intl.DateTimeFormat(language, {
    month: 'long',
    year: 'numeric',
  }).format(value);
}

function formatDayLabel(dateKey, language) {
  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseDateKey(dateKey));
}

function formatTime(value, language) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(language, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function getLanguage(language) {
  return language === 'en' ? 'en' : 'ru';
}

function getStatus(status) {
  return ['completed', 'aborted', 'interrupted'].includes(status) ? status : 'completed';
}

function isDateKey(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

