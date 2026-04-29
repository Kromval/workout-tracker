/**
 * @module scripts/generate-exercises-data
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
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
 * Module-level source content value.
 * @type {*}
 */
const sourceContent = [
  '/**',
  ' * @module js/features/exercises-data',
  ' */',
  '// Generated from data/exercises.json. Keep this module static so built-in exercises work without fetch or a server.',
  '/**',
  ' * Module-level built in exercise records value.',
  ' * @type {Array}',
  ' */',
  `export const builtInExerciseRecords = ${JSON.stringify(records, null, 2)};`,
  '',
].join('\n');

/**
 * Module-level prettier options value.
 * @type {*}
 */
const prettierOptions = (await prettier.resolveConfig(targetPath)) || {};
/**
 * Module-level content value.
 * @type {*}
 */
const content = await prettier.format(sourceContent, { ...prettierOptions, filepath: targetPath });

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
