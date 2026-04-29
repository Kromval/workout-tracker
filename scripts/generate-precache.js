/**
 * @module scripts/generate-precache
 */
import { updateServiceWorkerPrecache } from './precache-utils.js';

/**
 * Module-level result value.
 * @type {*}
 */
const result = updateServiceWorkerPrecache(process.cwd());

if (!result.updated) {
  console.log('Precache and cache revision are already up to date.');
} else {
  console.log(`Updated sw.js precache list and cache revision: ${result.cacheName}.`);
}
