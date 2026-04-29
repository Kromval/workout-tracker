/**
 * @module js/ui/form-utils
 */
/**
 * Runs clear form invalid state.
 * @param {*} form form input
 */
export function clearFormInvalidState(form) {
  form?.querySelectorAll?.('[aria-invalid="true"]').forEach((control) => {
    control.removeAttribute('aria-invalid');
  });
}

/**
 * Runs mark invalid controls.
 * @param {HTMLFormElement} form form input
 * @param {*} [controls=[]] controls input
 */
export function markInvalidControls(form, controls = []) {
  controls.filter(Boolean).forEach((control) => {
    control.setAttribute('aria-invalid', 'true');
  });

  controls.find(Boolean)?.focus?.({ preventScroll: false });

  if (form) {
    form.dataset.hasErrors = controls.some(Boolean) ? 'true' : 'false';
  }
}

/**
 * Checks whether valid optional url.
 * @param {string} value value input
 * @returns {boolean} predicate result
 */
export function isValidOptionalUrl(value) {
  const text = normalizeFormString(value);

  if (!text) {
    return true;
  }

  if (text.startsWith('data:image/')) {
    return true;
  }

  try {
    const baseUrl = window.location?.href || 'http://localhost/';
    const url = new URL(text, baseUrl);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

/**
 * Normalizes form string.
 * @param {string} value value input
 * @returns {*} result
 */
export function normalizeFormString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Runs unique form strings.
 * @param {Array} values values input
 * @returns {*} result
 */
export function uniqueFormStrings(values) {
  return Array.from(new Set(values.map(normalizeFormString).filter(Boolean)));
}

/**
 * Runs non negative form number.
 * @param {string} value value input
 * @returns {*} result
 */
export function nonNegativeFormNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}
