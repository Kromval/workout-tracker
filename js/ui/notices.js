let pendingNotice = null;

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

export function navigateWithNotice(hash, message, type = 'success') {
  setPendingNotice(message, type, hash);
  const previousHash = normalizeNoticeHash(window.location.hash || '#home');
  window.location.hash = hash;

  if (previousHash === normalizeNoticeHash(hash)) {
    window.dispatchEvent(new Event('hashchange'));
  }
}

function noticeMatchesCurrentHash(notice) {
  return !notice.targetHash || normalizeNoticeHash(window.location.hash || '#home') === notice.targetHash;
}

function normalizeNoticeHash(hash) {
  return String(hash || '')
    .replace(/^#\/?/, '')
    .trim() || 'home';
}
