/**
 * @module js/pages/components
 */
import { t } from '../i18n/index.js';
import { escapeAttribute, escapeHtml } from '../core/utils.js';

/**
 * Renders empty state markup.
 * @param {object} state state input
 * @param {string} titleKey title key input
 * @param {string} descriptionKey description key input
 * @param {string} actionKey action key input
 * @param {*} actionHref action href input
 * @returns {string} rendered markup
 */
export function renderEmptyState(state, titleKey, descriptionKey, actionKey, actionHref) {
  return `
    <article class="empty-state">
      <div class="empty-state__icon" aria-hidden="true">+</div>
      <div class="empty-state__content">
        <h3>${t(state, titleKey)}</h3>
        <p class="muted">${t(state, descriptionKey)}</p>
      </div>
      <a class="button button--primary" href="${actionHref}">${t(state, actionKey)}</a>
    </article>
  `;
}

/**
 * Renders list item markup.
 * @param {string} name name input
 * @param {string} value value input
 * @param {string} [stateOrLanguage="ru"] state or language input
 * @returns {string} rendered markup
 */
export function renderListItem(name, value, stateOrLanguage = 'ru') {
  return `
    <span class="chip chip--editable" data-list-value="${escapeAttribute(value)}">
      ${escapeHtml(value)}
      <input type="hidden" name="${name}[]" value="${escapeAttribute(value)}">
      <button class="chip__remove" type="button" data-list-remove aria-label="${escapeAttribute(createRemoveLabel(name, value, stateOrLanguage))}">x</button>
    </span>
  `;
}

/**
 * Creates remove label.
 * @param {string} name name input
 * @param {string} value value input
 * @param {object|string} stateOrLanguage state or language input
 * @returns {*} result
 */
function createRemoveLabel(name, value, stateOrLanguage) {
  return t(stateOrLanguage, 'removeListItemLabel').replace('{item}', value || name);
}
