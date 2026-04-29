/**
 * @module js/ui/notices
 */
/**
 * Shared pending notice constant.
 * @type {object}
 */
let pendingNotice = null;

/**
 * Renders pending notice markup.
 * @param {*} app app input
 */
export function renderPendingNotice(app) {
  if (!pendingNotice || !noticeMatchesCurrentHash(pendingNotice)) {
    return;
  }

  const notice = document.createElement('p');
  notice.className = 'notice notice--global';
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.dataset.type = pendingNotice.type;
  notice.textContent = pendingNotice.message;
  app.prepend(notice);
  pendingNotice = null;
}

/**
 * Sets pending notice.
 * @param {string} message message input
 * @param {string} [type="success"] type input
 * @param {string} [targetHash=""] target hash input
 */
export function setPendingNotice(message, type = 'success', targetHash = '') {
  if (!message) {
    pendingNotice = null;
    return;
  }

  pendingNotice = {
    message,
    type,
    targetHash: normalizeNoticeHash(targetHash),
  };
}

/**
 * Runs navigate with notice.
 * @param {boolean} hash hash input
 * @param {string} message message input
 * @param {string} [type="success"] type input
 */
export function navigateWithNotice(hash, message, type = 'success') {
  setPendingNotice(message, type, hash);
  const previousHash = normalizeNoticeHash(window.location.hash || '#home');
  window.location.hash = hash;

  if (previousHash === normalizeNoticeHash(hash)) {
    window.dispatchEvent(new Event('hashchange'));
  }
}

/**
 * Runs notice matches current hash.
 * @param {*} notice notice input
 * @returns {*} result
 */
function noticeMatchesCurrentHash(notice) {
  return (
    !notice.targetHash || normalizeNoticeHash(window.location.hash || '#home') === notice.targetHash
  );
}

/**
 * Normalizes notice hash.
 * @param {boolean} hash hash input
 * @returns {*} result
 */
function normalizeNoticeHash(hash) {
  return (
    String(hash || '')
      .replace(/^#\/?/, '')
      .trim() || 'home'
  );
}
