import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function collectAppShell(rootDir = process.cwd()) {
  const context = createCollectContext(rootDir);

  collectHtmlAssets(context);
  collectManifestAssets(context);
  collectJsImports(context);

  return sortAppShellEntries(context.appShell);
}

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

export function formatAppShell(entries) {
  return `const APP_SHELL = [\n${entries.map((entry) => `  '${entry}'`).join(',\n')},\n];`;
}

export function resolveAppShellEntry(rootDir, entry) {
  if (entry === './') {
    return rootDir;
  }

  return path.resolve(rootDir, entry.replace(/^\.\//, ''));
}

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

function toWebPath(rootDir, filePath) {
  const relativePath = path.relative(rootDir, filePath).split(path.sep).join('/');

  return relativePath ? `./${relativePath}` : './';
}

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

function collectHtmlAssets(context) {
  const html = readFileSync(context.indexPath, 'utf8');
  const assetPattern = /<(?:link|script)\b[^>]*\b(?:href|src)=["']([^"']+)["']/gi;

  for (const match of html.matchAll(assetPattern)) {
    addAsset(context, resolveAssetUrl(context, match[1], context.indexPath));
  }
}

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

function sortAppShellEntries(appShell) {
  return [...appShell].sort((left, right) => {
    if (left === './') return -1;
    if (right === './') return 1;
    if (left === './index.html') return -1;
    if (right === './index.html') return 1;

    return left.localeCompare(right);
  });
}
