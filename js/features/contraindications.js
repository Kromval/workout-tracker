import { asArray, normalizeString, uniqueStrings } from '../core/utils.js';

const LEGACY_CONTRAINDICATION_ALIASES = Object.freeze({
  'ankle-issues': ['joint-ankle-instability'],
  'ankle-pain': ['joint-ankle-pain'],
  'ankle-knee-issues': ['joint-ankle-instability', 'joint-knee-instability'],
  'elbow-issues': ['joint-elbow-irritation'],
  'high-blood-pressure': ['cardio-high-blood-pressure'],
  'hip-pain': ['joint-hip-pain'],
  'knee-pain': ['joint-knee-pain'],
  'knee-ankle-issues': ['joint-knee-instability', 'joint-ankle-instability'],
  'lower-back-issues': ['region-lower-back-pain'],
  'lower-back-pain': ['region-lower-back-pain'],
  'neck-pain': ['region-neck-pain'],
  'severe-back-pain': ['region-back-severe-pain'],
  'shoulder-impingement': ['joint-shoulder-impingement'],
  'shoulder-issues': ['joint-shoulder-irritation'],
  'shoulder-pain': ['joint-shoulder-pain'],
  'wrist-pain': ['joint-wrist-pain'],
});

/**
 * Canonical contraindication definitions used across filtering and scoring.
 * @readonly
 */
export const CONTRAINDICATION_DEFINITIONS = Object.freeze({
  'joint-wrist-pain': Object.freeze({
    jointTags: Object.freeze(['joint-wrist']),
    muscleTags: Object.freeze(['forearms', 'triceps', 'chest', 'shoulders']),
  }),
  'joint-elbow-irritation': Object.freeze({
    jointTags: Object.freeze(['joint-elbow']),
    muscleTags: Object.freeze(['forearms', 'biceps', 'triceps']),
  }),
  'joint-shoulder-pain': Object.freeze({
    jointTags: Object.freeze(['joint-shoulder']),
    muscleTags: Object.freeze(['shoulders', 'chest', 'triceps', 'back', 'lats', 'traps']),
  }),
  'joint-shoulder-irritation': Object.freeze({
    jointTags: Object.freeze(['joint-shoulder']),
    muscleTags: Object.freeze(['shoulders', 'chest', 'triceps', 'back', 'lats', 'traps']),
  }),
  'joint-shoulder-impingement': Object.freeze({
    jointTags: Object.freeze(['joint-shoulder']),
    muscleTags: Object.freeze(['shoulders', 'chest', 'triceps', 'back', 'lats', 'traps']),
  }),
  'joint-hip-pain': Object.freeze({
    jointTags: Object.freeze(['joint-hip']),
    muscleTags: Object.freeze(['glutes', 'hamstrings', 'hip-flexors', 'adductors', 'abductors']),
  }),
  'joint-knee-pain': Object.freeze({
    jointTags: Object.freeze(['joint-knee']),
    muscleTags: Object.freeze(['quads', 'hamstrings', 'glutes', 'calves']),
  }),
  'joint-knee-instability': Object.freeze({
    jointTags: Object.freeze(['joint-knee']),
    muscleTags: Object.freeze(['quads', 'hamstrings', 'glutes', 'calves']),
  }),
  'joint-ankle-pain': Object.freeze({
    jointTags: Object.freeze(['joint-ankle']),
    muscleTags: Object.freeze(['calves', 'quads', 'hamstrings', 'feet']),
  }),
  'joint-ankle-instability': Object.freeze({
    jointTags: Object.freeze(['joint-ankle']),
    muscleTags: Object.freeze(['calves', 'quads', 'hamstrings', 'feet']),
  }),
  'region-lower-back-pain': Object.freeze({
    jointTags: Object.freeze(['joint-spine', 'joint-lumbar-spine']),
    muscleTags: Object.freeze(['lower-back', 'back', 'core', 'glutes', 'hamstrings']),
  }),
  'region-back-severe-pain': Object.freeze({
    jointTags: Object.freeze(['joint-spine']),
    muscleTags: Object.freeze(['lower-back', 'back', 'core', 'glutes', 'hamstrings']),
  }),
  'region-neck-pain': Object.freeze({
    jointTags: Object.freeze(['joint-cervical-spine']),
    muscleTags: Object.freeze(['neck', 'traps', 'shoulders', 'upper-back']),
  }),
  'cardio-high-blood-pressure': Object.freeze({
    jointTags: Object.freeze([]),
    muscleTags: Object.freeze([]),
  }),
});

/**
 * All supported canonical contraindication tags.
 * @readonly
 */
export const SUPPORTED_CONTRAINDICATION_TAGS = Object.freeze(Object.keys(CONTRAINDICATION_DEFINITIONS));

/**
 * Normalizes one raw contraindication token to canonical tags.
 * @param {unknown} value raw value from user/profile/exercise
 * @returns {string[]} canonical contraindication tags
 */
export function normalizeContraindicationTag(value) {
  const normalized = toToken(value);
  if (!normalized) {
    return [];
  }

  if (LEGACY_CONTRAINDICATION_ALIASES[normalized]) {
    return [...LEGACY_CONTRAINDICATION_ALIASES[normalized]];
  }

  return CONTRAINDICATION_DEFINITIONS[normalized] ? [normalized] : [];
}

/**
 * Normalizes multiple contraindication values and deduplicates output.
 * @param {unknown[]|unknown} values raw contraindication values
 * @returns {string[]} canonical contraindication tags
 */
export function normalizeContraindicationTags(values) {
  return uniqueStrings(
    asArray(values).flatMap((value) => normalizeContraindicationTag(value))
  );
}

/**
 * Returns definition for a canonical contraindication tag.
 * @param {unknown} tag contraindication tag
 * @returns {{jointTags:readonly string[], muscleTags:readonly string[]} | null}
 */
export function getContraindicationDefinition(tag) {
  const normalized = toToken(tag);
  return CONTRAINDICATION_DEFINITIONS[normalized] || null;
}

/**
 * Gets muscle signals related to a contraindication.
 * @param {unknown} tag contraindication tag
 * @returns {string[]} related muscle tags
 */
export function getContraindicationRelatedMuscles(tag) {
  return [...(getContraindicationDefinition(tag)?.muscleTags || [])];
}

/**
 * Gets joint signals related to a contraindication.
 * @param {unknown} tag contraindication tag
 * @returns {string[]} related joint tags
 */
export function getContraindicationRelatedJoints(tag) {
  return [...(getContraindicationDefinition(tag)?.jointTags || [])];
}

function toToken(value) {
  return normalizeString(value).toLowerCase().replaceAll('/', '-').replaceAll(' ', '-');
}
