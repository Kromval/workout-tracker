import { asArray, normalizeString } from '../core/utils.js';

const PROFILE_LEVELS = ['beginner', 'intermediate', 'advanced'];

export function getExerciseEquipmentIds(exercise, knownEquipmentIds = []) {
  const tags = asArray(exercise?.tags).map(normalizeTag);
  const knownIds = new Set(asArray(knownEquipmentIds).map(normalizeTag));

  return Array.from(new Set(tags.filter((tag) => knownIds.has(tag))));
}

export function getExerciseProfileLevel(exercise) {
  const tags = asArray(exercise?.tags).map(normalizeTag);
  return PROFILE_LEVELS.find((level) => tags.includes(level)) || '';
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
