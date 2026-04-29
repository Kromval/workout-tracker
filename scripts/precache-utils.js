/**
 * @module scripts/precache-utils
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Shared cache name prefix constant.
 * @type {string}
 */
const CACHE_NAME_PREFIX = 'workout-planner';
/**
 * Shared cache revision length constant.
 * @type {number}
 */
const CACHE_REVISION_LENGTH = 12;

/**
 * Collects app shell.
 * @param {string} [rootDir=process.cwd()] root dir input
 * @returns {*} result
 */
export function collectAppShell(rootDir = process.cwd()) {
  const context = createCollectContext(rootDir);

  collectHtmlAssets(context);
  collectManifestAssets(context);
  collectJsImports(context);

  return sortAppShellEntries(context.appShell);
}

/**
 * Creates cache name.
 * @param {string} [rootDir=process.cwd()] root dir input
 * @param {Array} [entries=collectAppShell(rootDir)] entries input
 * @returns {*} result
 */
export function createCacheName(rootDir = process.cwd(), entries = collectAppShell(rootDir)) {
  return `${CACHE_NAME_PREFIX}-${createAppShellRevision(rootDir, entries)}`;
}

/**
 * Creates app shell revision.
 * @param {string} [rootDir=process.cwd()] root dir input
 * @param {Array} [entries=collectAppShell(rootDir)] entries input
 * @returns {*} result
 */
export function createAppShellRevision(
  rootDir = process.cwd(),
  entries = collectAppShell(rootDir),
) {
  const hash = createHash('sha256');

  entries.forEach((entry) => {
    hash.update(entry);
    hash.update('\0');

    if (entry !== './') {
      hash.update(readFileSync(resolveAppShellEntry(rootDir, entry)));
    }

    hash.update('\0');
  });

  return hash.digest('hex').slice(0, CACHE_REVISION_LENGTH);
}

/**
 * Parses service worker cache name.
 * @param {string} source source input
 * @returns {*} result
 */
export function parseServiceWorkerCacheName(source) {
  const cacheNameMatch = source.match(/const CACHE_NAME = ['"]([^'"]+)['"];/);

  if (!cacheNameMatch) {
    throw new Error('Could not find CACHE_NAME in service worker source.');
  }

  return cacheNameMatch[1];
}

/**
 * Formats cache name.
 * @param {string} cacheName cache name input
 * @returns {*} result
 */
export function formatCacheName(cacheName) {
  return `const CACHE_NAME = '${cacheName}';`;
}

/**
 * Parses service worker app shell.
 * @param {string} source source input
 * @returns {*} result
 */
export function parseServiceWorkerAppShell(source) {
  const appShellMatch = source.match(/const APP_SHELL = \[([\s\S]*?)\];/);

  if (!appShellMatch) {
    throw new Error('Could not find APP_SHELL in service worker source.');
  }

  const entries = [];
  const stringPattern = /['"]([^'"]+)['"]/g;

  for (const match of appShellMatch[1].matchAll(stringPattern)) {
    entries.push(match[1]);
  }

  return entries;
}

/**
 * Formats app shell.
 * @param {Array} entries entries input
 * @returns {*} result
 */
export function formatAppShell(entries) {
  return `const APP_SHELL = [\n${entries.map((entry) => `  '${entry}'`).join(',\n')},\n];`;
}

/**
 * Updates service worker precache.
 * @param {string} [rootDir=process.cwd()] root dir input
 * @returns {*} result
 */
export function updateServiceWorkerPrecache(rootDir = process.cwd()) {
  const serviceWorkerPath = path.join(rootDir, 'sw.js');
  const serviceWorker = readFileSync(serviceWorkerPath, 'utf8');
  const cacheNamePattern = /const CACHE_NAME = ['"][^'"]+['"];/;
  const appShellPattern = /const APP_SHELL = \[[\s\S]*?\];/;

  if (!cacheNamePattern.test(serviceWorker)) {
    throw new Error('Could not find CACHE_NAME in sw.js.');
  }

  if (!appShellPattern.test(serviceWorker)) {
    throw new Error('Could not find APP_SHELL in sw.js.');
  }

  const appShell = collectAppShell(rootDir);
  const cacheName = createCacheName(rootDir, appShell);
  const updatedServiceWorker = serviceWorker
    .replace(cacheNamePattern, formatCacheName(cacheName))
    .replace(appShellPattern, formatAppShell(appShell));

  if (updatedServiceWorker !== serviceWorker) {
    writeFileSync(serviceWorkerPath, updatedServiceWorker);
  }

  return {
    appShell,
    cacheName,
    updated: updatedServiceWorker !== serviceWorker,
  };
}

/**
 * Runs resolve app shell entry.
 * @param {string} rootDir root dir input
 * @param {object} entry entry input
 * @returns {*} result
 */
export function resolveAppShellEntry(rootDir, entry) {
  if (entry === './') {
    return rootDir;
  }

  return path.resolve(rootDir, entry.replace(/^\.\//, ''));
}

/**
 * Creates collect context.
 * @param {string} rootDir root dir input
 * @returns {*} result
 */
function createCollectContext(rootDir) {
  return {
    rootDir,
    indexPath: path.join(rootDir, 'index.html'),
    manifestPath: path.join(rootDir, 'manifest.webmanifest'),
    appShell: new Set(['./', './index.html']),
    jsQueue: [],
    seenJs: new Set(),
  };
}

/**
 * Runs to web path.
 * @param {string} rootDir root dir input
 * @param {string} filePath file path input
 * @returns {string} formatted value
 */
function toWebPath(rootDir, filePath) {
  const relativePath = path.relative(rootDir, filePath).split(path.sep).join('/');

  return relativePath ? `./${relativePath}` : './';
}

/**
 * Runs resolve asset url.
 * @param {object} context context input
 * @param {string} url url input
 * @param {string} [baseFilePath=context.rootDir] base file path input
 * @returns {*} result
 */
function resolveAssetUrl(context, url, baseFilePath = context.rootDir) {
  if (!url || /^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith('data:')) {
    return null;
  }

  const cleanUrl = url.split(/[?#]/)[0];

  if (!cleanUrl) {
    return null;
  }

  const baseDir = existsSync(baseFilePath) ? path.dirname(baseFilePath) : baseFilePath;
  const resolvedPath = path.resolve(baseDir, cleanUrl);

  if (!resolvedPath.startsWith(context.rootDir)) {
    return null;
  }

  return resolvedPath;
}

/**
 * Runs add asset.
 * @param {object} context context input
 * @param {string} filePath file path input
 */
function addAsset(context, filePath) {
  if (!filePath || !existsSync(filePath)) {
    return;
  }

  context.appShell.add(toWebPath(context.rootDir, filePath));

  if (filePath.endsWith('.js') && !context.seenJs.has(filePath)) {
    context.seenJs.add(filePath);
    context.jsQueue.push(filePath);
  }
}

/**
 * Collects html assets.
 * @param {object} context context input
 */
function collectHtmlAssets(context) {
  const html = readFileSync(context.indexPath, 'utf8');
  const assetPattern = /<(?:link|script)\b[^>]*\b(?:href|src)=["']([^"']+)["']/gi;

  for (const match of html.matchAll(assetPattern)) {
    addAsset(context, resolveAssetUrl(context, match[1], context.indexPath));
  }
}

/**
 * Collects manifest assets.
 * @param {object} context context input
 */
function collectManifestAssets(context) {
  const manifest = JSON.parse(readFileSync(context.manifestPath, 'utf8'));
  const stack = [manifest];

  while (stack.length) {
    const current = stack.pop();

    if (Array.isArray(current)) {
      stack.push(...current);
      continue;
    }

    if (!current || typeof current !== 'object') {
      continue;
    }

    if (typeof current.src === 'string') {
      addAsset(context, resolveAssetUrl(context, current.src, context.manifestPath));
    }

    stack.push(...Object.values(current));
  }
}

/**
 * Collects js imports.
 * @param {object} context context input
 */
function collectJsImports(context) {
  const importPattern =
    /\b(?:import|export)\s+(?:[\s\S]*?\s+from\s*)?["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;

  while (context.jsQueue.length) {
    const filePath = context.jsQueue.shift();
    const source = readFileSync(filePath, 'utf8');

    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1] || match[2];

      if (!specifier?.startsWith('.')) {
        continue;
      }

      addAsset(context, resolveAssetUrl(context, specifier, filePath));
    }
  }
}

/**
 * Runs sort app shell entries.
 * @param {*} appShell app shell input
 * @returns {*} result
 */
function sortAppShellEntries(appShell) {
  return [...appShell].sort((left, right) => {
    if (left === './') return -1;
    if (right === './') return 1;
    if (left === './index.html') return -1;
    if (right === './index.html') return 1;

    return left.localeCompare(right);
  });
}
