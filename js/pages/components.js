import { t } from '../i18n/index.js';
import { escapeAttribute, escapeHtml } from '../core/utils.js';

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

export function renderListItem(name, value, stateOrLanguage = 'ru') {
  return `
    <span class="chip chip--editable" data-list-value="${escapeAttribute(value)}">
      ${escapeHtml(value)}
      <input type="hidden" name="${name}[]" value="${escapeAttribute(value)}">
      <button class="chip__remove" type="button" data-list-remove aria-label="${escapeAttribute(createRemoveLabel(name, value, stateOrLanguage))}">x</button>
    </span>
  `;
}

function createRemoveLabel(name, value, stateOrLanguage) {
  return t(stateOrLanguage, 'removeListItemLabel').replace('{item}', value || name);
}

