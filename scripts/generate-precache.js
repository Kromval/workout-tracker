import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { collectAppShell, formatAppShell } from './precache-utils.js';

const rootDir = process.cwd();
const serviceWorkerPath = path.join(rootDir, 'sw.js');

const serviceWorker = readFileSync(serviceWorkerPath, 'utf8');
const appShellPattern = /const APP_SHELL = \[[\s\S]*?\];/;

if (!appShellPattern.test(serviceWorker)) {
  throw new Error('Could not find APP_SHELL in sw.js.');
}

const updatedServiceWorker = serviceWorker.replace(
  appShellPattern,
  formatAppShell(collectAppShell(rootDir)),
);

if (updatedServiceWorker === serviceWorker) {
  console.log('Precache is already up to date.');
} else {
  writeFileSync(serviceWorkerPath, updatedServiceWorker);
  console.log('Updated sw.js precache list.');
}
