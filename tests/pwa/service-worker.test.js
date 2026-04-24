import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  collectAppShell,
  parseServiceWorkerAppShell,
  resolveAppShellEntry,
} from '../../scripts/precache-utils.js';

const rootDir = path.resolve('.');

describe('service worker app shell precache', () => {
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
