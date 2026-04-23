import { asArray, normalizeString } from '../core/utils.js';

const PROFILE_LEVELS = ['beginner', 'intermediate', 'advanced'];

export function getExerciseEquipmentIds(exercise, knownEquipmentIds = []) {
  const equipment = asArray(exercise?.equipment).map(normalizeEquipmentId);
  const tags = asArray(exercise?.tags).map(normalizeTag);
  const knownIds = new Set(asArray(knownEquipmentIds).map(normalizeTag));
  const source = equipment.length > 0 ? equipment : tags;

  return Array.from(new Set(source.filter((tag) => knownIds.has(tag))));
}

export function getExerciseProfileLevel(exercise) {
  const difficulty = normalizeDifficulty(exercise?.difficulty);
  const tags = asArray(exercise?.tags).map(normalizeTag);
  return difficulty || PROFILE_LEVELS.find((level) => tags.includes(level)) || '';
}

export function isExerciseAvailableForSelectedEquipment(exercise, selectedEquipmentIds, knownEquipmentIds = []) {
  const requiredEquipmentIds = getExerciseEquipmentIds(exercise, knownEquipmentIds);

  if (requiredEquipmentIds.length === 0) {
    return true;
  }

  const selected = new Set(asArray(selectedEquipmentIds).map(normalizeTag));
  return requiredEquipmentIds.every((id) => selected.has(id));
}

export function isExerciseCompatibleWithProfileLevel(exercise, trainingLevel) {
  const normalizedProfileLevel = normalizeTag(trainingLevel);
  const exerciseLevel = getExerciseProfileLevel(exercise);

  if (!normalizedProfileLevel || !PROFILE_LEVELS.includes(normalizedProfileLevel) || !exerciseLevel) {
    return true;
  }

  return PROFILE_LEVELS.indexOf(exerciseLevel) <= PROFILE_LEVELS.indexOf(normalizedProfileLevel);
}

function normalizeTag(value) {
  return normalizeString(value).toLowerCase().replaceAll(' ', '-');
}

function normalizeEquipmentId(value) {
  const normalized = normalizeTag(value);

  if (normalized === 'resistance-band') {
    return 'bands';
  }

  return normalized;
}

function normalizeDifficulty(value) {
  const normalized = normalizeTag(value);
  return PROFILE_LEVELS.includes(normalized) ? normalized : '';
}
