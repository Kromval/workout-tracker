import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { updateServiceWorkerPrecache } from './precache-utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'data', 'exercises.json');
const targetPath = path.join(rootDir, 'js', 'features', 'exercises-data.js');

const records = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

if (!Array.isArray(records)) {
  throw new TypeError('data/exercises.json must contain an array.');
}

const content = [
  '// Generated from data/exercises.json. Keep this module static so built-in exercises work without fetch or a server.',
  `export const builtInExerciseRecords = ${JSON.stringify(records, null, 2)};`,
  '',
].join('\n');

fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Generated js/features/exercises-data.js with ${records.length} records.`);

const precacheResult = updateServiceWorkerPrecache(rootDir);

if (precacheResult.updated) {
  console.log(`Updated sw.js cache revision: ${precacheResult.cacheName}.`);
}
