export function clearFormInvalidState(form) {
  form?.querySelectorAll?.('[aria-invalid="true"]').forEach((control) => {
    control.removeAttribute('aria-invalid');
  });
}



export function markInvalidControls(form, controls = []) {
  controls.filter(Boolean).forEach((control) => {
    control.setAttribute('aria-invalid', 'true');
  });

  controls.find(Boolean)?.focus?.({ preventScroll: false });

  if (form) {
    form.dataset.hasErrors = controls.some(Boolean) ? 'true' : 'false';
  }
}



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
  } catch (error) {
    return false;
  }
}



export function normalizeFormString(value) {
  return typeof value === 'string' ? value.trim() : '';
}



export function uniqueFormStrings(values) {
  return Array.from(new Set(values.map(normalizeFormString).filter(Boolean)));
}



export function nonNegativeFormNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}


