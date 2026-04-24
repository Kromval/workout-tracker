import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const serviceWorkerPath = path.join(rootDir, 'sw.js');
const indexPath = path.join(rootDir, 'index.html');
const manifestPath = path.join(rootDir, 'manifest.webmanifest');

const appShell = new Set(['./', './index.html']);
const jsQueue = [];
const seenJs = new Set();

function toWebPath(filePath) {
  const relativePath = path.relative(rootDir, filePath).split(path.sep).join('/');

  return relativePath ? `./${relativePath}` : './';
}

function resolveAssetUrl(url, baseFilePath = rootDir) {
  if (!url || /^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith('data:')) {
    return null;
  }

  const cleanUrl = url.split(/[?#]/)[0];

  if (!cleanUrl) {
    return null;
  }

  const baseDir = existsSync(baseFilePath) ? path.dirname(baseFilePath) : baseFilePath;
  const resolvedPath = path.resolve(baseDir, cleanUrl);

  if (!resolvedPath.startsWith(rootDir)) {
    return null;
  }

  return resolvedPath;
}

function addAsset(filePath) {
  if (!filePath || !existsSync(filePath)) {
    return;
  }

  appShell.add(toWebPath(filePath));

  if (filePath.endsWith('.js') && !seenJs.has(filePath)) {
    seenJs.add(filePath);
    jsQueue.push(filePath);
  }
}

function collectHtmlAssets() {
  const html = readFileSync(indexPath, 'utf8');
  const assetPattern = /<(?:link|script)\b[^>]*\b(?:href|src)=["']([^"']+)["']/gi;

  for (const match of html.matchAll(assetPattern)) {
    addAsset(resolveAssetUrl(match[1], indexPath));
  }
}

function collectManifestAssets() {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
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
      addAsset(resolveAssetUrl(current.src, manifestPath));
    }

    stack.push(...Object.values(current));
  }
}

function collectJsImports() {
  const importPattern =
    /\b(?:import|export)\s+(?:[\s\S]*?\s+from\s*)?["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;

  while (jsQueue.length) {
    const filePath = jsQueue.shift();
    const source = readFileSync(filePath, 'utf8');

    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1] || match[2];

      if (!specifier?.startsWith('.')) {
        continue;
      }

      addAsset(resolveAssetUrl(specifier, filePath));
    }
  }
}

function formatAppShell() {
  const entries = [...appShell].sort((left, right) => {
    if (left === './') return -1;
    if (right === './') return 1;
    if (left === './index.html') return -1;
    if (right === './index.html') return 1;

    return left.localeCompare(right);
  });

  return `const APP_SHELL = [\n${entries.map((entry) => `  '${entry}'`).join(',\n')},\n];`;
}

collectHtmlAssets();
collectManifestAssets();
collectJsImports();

const serviceWorker = readFileSync(serviceWorkerPath, 'utf8');
const appShellPattern = /const APP_SHELL = \[[\s\S]*?\];/;

if (!appShellPattern.test(serviceWorker)) {
  throw new Error('Could not find APP_SHELL in sw.js.');
}

const updatedServiceWorker = serviceWorker.replace(appShellPattern, formatAppShell());

if (updatedServiceWorker === serviceWorker) {
  console.log('Precache is already up to date.');
} else {
  writeFileSync(serviceWorkerPath, updatedServiceWorker);
  console.log('Updated sw.js precache list.');
}
