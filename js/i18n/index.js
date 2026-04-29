/**
 * @module js/i18n/index
 */
import { enMessages } from './messages-en.js';
import { ruMessages } from './messages-ru.js';

/**
 * Module-level messages value.
 * @type {object}
 */
export const messages = {
  ru: ruMessages,
  en: enMessages,
};

/**
 * Module-level fallback language value.
 * @type {string}
 */
export const fallbackLanguage = 'ru';

/**
 * Resolves a localized message by key.
 * @param {object|string} stateOrLanguage state or language input
 * @param {string} key key input
 * @returns {string} formatted value
 */
export function t(stateOrLanguage, key) {
  const language =
    typeof stateOrLanguage === 'string' ? stateOrLanguage : stateOrLanguage?.settings?.language;

  return messages[language]?.[key] || messages[fallbackLanguage]?.[key] || key;
}

/**
 * Runs localized text.
 * @param {string} value value input
 * @param {string} language language input
 * @param {number} [fallback=fallbackLanguage] fallback input
 * @returns {string} formatted value
 */
export function localizedText(value, language, fallback = fallbackLanguage) {
  if (typeof value === 'string') {
    return value;
  }

  return value?.[language] || value?.[fallback] || value?.en || value?.ru || '';
}
