/**
 * @module scripts/generate-exercises-data
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { updateServiceWorkerPrecache } from './precache-utils.js';

/**
 * Module-level dirname value.
 * @type {*}
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * Module-level root dir value.
 * @type {*}
 */
const rootDir = path.resolve(__dirname, '..');
/**
 * Module-level source path value.
 * @type {*}
 */
const sourcePath = path.join(rootDir, 'data', 'exercises.json');
/**
 * Module-level target path value.
 * @type {*}
 */
const targetPath = path.join(rootDir, 'js', 'features', 'exercises-data.js');

/**
 * Module-level records value.
 * @type {*}
 */
const records = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

if (!Array.isArray(records)) {
  throw new TypeError('data/exercises.json must contain an array.');
}

/**
 * Module-level content value.
 * @type {*}
 */
const content = [
  '// Generated from data/exercises.json. Keep this module static so built-in exercises work without fetch or a server.',
  `export const builtInExerciseRecords = ${JSON.stringify(records, null, 2)};`,
  '',
].join('\n');

fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Generated js/features/exercises-data.js with ${records.length} records.`);

/**
 * Module-level precache result value.
 * @type {*}
 */
const precacheResult = updateServiceWorkerPrecache(rootDir);

if (precacheResult.updated) {
  console.log(`Updated sw.js cache revision: ${precacheResult.cacheName}.`);
}
