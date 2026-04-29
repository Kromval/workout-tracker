/**
 * @module js/features/exercise-compatibility
 */
import { asArray, normalizeString } from '../core/utils.js';

/**
 * Shared profile levels constant.
 * @type {Array}
 */
const PROFILE_LEVELS = ['beginner', 'intermediate', 'advanced'];

/**
 * Gets exercise equipment ids.
 * @param {object} exercise exercise input
 * @param {Array} [knownEquipmentIds=[]] known equipment ids input
 * @returns {*} result
 */
export function getExerciseEquipmentIds(exercise, knownEquipmentIds = []) {
  const explicitEquipment = asArray(exercise?.equipment);
  const classificationEquipment = asArray(exercise?.classification?.equipment);
  const equipment = (explicitEquipment.length ? explicitEquipment : classificationEquipment).map(
    normalizeEquipmentId,
  );
  const tags = asArray(exercise?.tags).map(normalizeTag);
  const knownIds = new Set(asArray(knownEquipmentIds).map(normalizeTag));
  const source = equipment.length > 0 ? equipment : tags;

  return Array.from(new Set(source.filter((tag) => knownIds.has(tag))));
}

/**
 * Gets exercise profile level.
 * @param {object} exercise exercise input
 * @returns {*} result
 */
export function getExerciseProfileLevel(exercise) {
  const difficulty = normalizeDifficulty(
    exercise?.difficulty || exercise?.classification?.difficulty,
  );
  const tags = asArray(exercise?.tags).map(normalizeTag);
  return difficulty || PROFILE_LEVELS.find((level) => tags.includes(level)) || '';
}

/**
 * Checks whether exercise available for selected equipment.
 * @param {object} exercise exercise input
 * @param {Array} selectedEquipmentIds selected equipment ids input
 * @param {Array} [knownEquipmentIds=[]] known equipment ids input
 * @returns {boolean} predicate result
 */
export function isExerciseAvailableForSelectedEquipment(
  exercise,
  selectedEquipmentIds,
  knownEquipmentIds = [],
) {
  const requiredEquipmentIds = getExerciseEquipmentIds(exercise, knownEquipmentIds);

  if (requiredEquipmentIds.length === 0) {
    return true;
  }

  const selected = new Set(['bodyweight', ...asArray(selectedEquipmentIds).map(normalizeTag)]);
  return requiredEquipmentIds.every((id) => selected.has(id));
}

/**
 * Checks whether exercise compatible with profile level.
 * @param {object} exercise exercise input
 * @param {*} trainingLevel training level input
 * @returns {boolean} predicate result
 */
export function isExerciseCompatibleWithProfileLevel(exercise, trainingLevel) {
  const normalizedProfileLevel = normalizeTag(trainingLevel);
  const exerciseLevel = getExerciseProfileLevel(exercise);

  if (
    !normalizedProfileLevel ||
    !PROFILE_LEVELS.includes(normalizedProfileLevel) ||
    !exerciseLevel
  ) {
    return true;
  }

  return PROFILE_LEVELS.indexOf(exerciseLevel) <= PROFILE_LEVELS.indexOf(normalizedProfileLevel);
}

/**
 * Normalizes tag.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeTag(value) {
  return normalizeString(value).toLowerCase().replaceAll(' ', '-');
}

/**
 * Normalizes equipment id.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeEquipmentId(value) {
  const normalized = normalizeTag(value);

  return (
    {
      bar: 'pull-up-bar',
      cable: 'cable-station',
      'cable-machine': 'cable-station',
      dumbbell: 'dumbbells',
      machine: 'machines',
      'resistance-band': 'bands',
    }[normalized] || normalized
  );
}

/**
 * Normalizes difficulty.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeDifficulty(value) {
  const normalized = normalizeTag(value);
  return PROFILE_LEVELS.includes(normalized) ? normalized : '';
}
