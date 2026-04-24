import { enMessages } from './messages-en.js';
import { ruMessages } from './messages-ru.js';

export const messages = {
  ru: ruMessages,
  en: enMessages,
};

export const fallbackLanguage = 'ru';

export function t(stateOrLanguage, key) {
  const language =
    typeof stateOrLanguage === 'string' ? stateOrLanguage : stateOrLanguage?.settings?.language;

  return messages[language]?.[key] || messages[fallbackLanguage]?.[key] || key;
}

export function localizedText(value, language, fallback = fallbackLanguage) {
  if (typeof value === 'string') {
    return value;
  }

  return value?.[language] || value?.[fallback] || value?.en || value?.ru || '';
}
