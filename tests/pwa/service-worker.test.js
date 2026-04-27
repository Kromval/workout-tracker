import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  collectAppShell,
  createCacheName,
  parseServiceWorkerAppShell,
  parseServiceWorkerCacheName,
  resolveAppShellEntry,
} from '../../scripts/precache-utils.js';

const rootDir = path.resolve('.');

describe('service worker app shell precache', () => {
  test('uses a cache name derived from app shell contents', () => {
    const serviceWorker = readFileSync(path.join(rootDir, 'sw.js'), 'utf8');
    const expectedAppShell = collectAppShell(rootDir);

    expect(parseServiceWorkerCacheName(serviceWorker)).toBe(
      createCacheName(rootDir, expectedAppShell),
    );
  });

  test('covers every static module import for offline startup', () => {
    const expectedAppShell = collectAppShell(rootDir);
    const actualAppShell = parseServiceWorkerAppShell(
      readFileSync(path.join(rootDir, 'sw.js'), 'utf8'),
    );
    const actualEntries = new Set(actualAppShell);
    const missingEntries = expectedAppShell.filter((entry) => !actualEntries.has(entry));

    expect(missingEntries).toEqual([]);
  });

  test('contains only existing local app shell assets', () => {
    const appShell = parseServiceWorkerAppShell(readFileSync(path.join(rootDir, 'sw.js'), 'utf8'));
    const missingFiles = appShell
      .filter((entry) => entry !== './')
      .filter((entry) => !existsSync(resolveAppShellEntry(rootDir, entry)));

    expect(missingFiles).toEqual([]);
  });
});
