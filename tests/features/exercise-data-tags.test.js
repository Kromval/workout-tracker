/**
 * @module tests/features/exercise-data-tags.test
 */
import fs from 'node:fs';
import path from 'node:path';
import { SUPPORTED_CONTRAINDICATION_TAGS } from '../../js/features/contraindications.js';
import { getBuiltInEquipmentCatalog } from '../../js/features/equipment.js';

/**
 * Module-level source path value.
 * @type {*}
 */
const sourcePath = path.resolve(process.cwd(), 'data', 'exercises.json');
/**
 * Module-level exercise records value.
 * @type {*}
 */
const exerciseRecords = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

/**
 * Shared equipment tags constant.
 * @type {Set}
 */
const EQUIPMENT_TAGS = new Set(getBuiltInEquipmentCatalog().map((item) => item.id));
/**
 * Shared difficulty tags constant.
 * @type {Set}
 */
const DIFFICULTY_TAGS = new Set(['beginner', 'intermediate', 'advanced']);
/**
 * Shared contraindication tags constant.
 * @type {Set}
 */
const CONTRAINDICATION_TAGS = new Set(SUPPORTED_CONTRAINDICATION_TAGS);
/**
 * Shared equipment aliases constant.
 * @type {Map}
 */
const EQUIPMENT_ALIASES = new Map([
  ['bar', 'pull-up-bar'],
  ['cable', 'cable-station'],
  ['cable-machine', 'cable-station'],
  ['dumbbell', 'dumbbells'],
  ['machine', 'machines'],
  ['resistance-band', 'bands'],
]);

/**
 * Normalizes equipment id.
 * @param {string} value value input
 * @returns {*} result
 */
function normalizeEquipmentId(value) {
  const normalized = String(value || '')
    .trim()
    .toLowerCase();
  return EQUIPMENT_ALIASES.get(normalized) || normalized;
}

describe('exercise data tags', () => {
  test('every built-in exercise has normalized equipment and difficulty metadata', () => {
    const errors = [];

    exerciseRecords.forEach((exercise, index) => {
      const classification =
        exercise && typeof exercise.classification === 'object' ? exercise.classification : {};
      const safety = exercise && typeof exercise.safety === 'object' ? exercise.safety : {};
      const tags = Array.isArray(exercise.tags) ? exercise.tags : [];
      const explicitEquipment = Array.isArray(classification.equipment)
        ? classification.equipment
        : exercise.equipment;
      const normalizedEquipment = Array.isArray(explicitEquipment)
        ? explicitEquipment.map(normalizeEquipmentId)
        : [];
      const explicitDifficulty =
        typeof classification.difficulty === 'string'
          ? classification.difficulty
          : typeof exercise.difficulty === 'string'
            ? exercise.difficulty
            : '';
      const contraindications = Array.isArray(safety.contraindications)
        ? safety.contraindications
        : exercise.contraindications;
      const equipmentTags = tags.map(normalizeEquipmentId).filter((tag) => EQUIPMENT_TAGS.has(tag));
      const difficultyTags = tags.filter((tag) => DIFFICULTY_TAGS.has(tag));
      const effectiveEquipment =
        normalizedEquipment.length > 0 ? normalizedEquipment : equipmentTags;
      const effectiveDifficulty =
        explicitDifficulty || (difficultyTags.length === 1 ? difficultyTags[0] : '');

      if (effectiveEquipment.length === 0) {
        errors.push(`${exercise.id || index}: missing equipment metadata`);
      }

      if (!effectiveDifficulty) {
        errors.push(`${exercise.id || index}: missing difficulty metadata`);
      }

      normalizedEquipment.forEach((item) => {
        if (!EQUIPMENT_TAGS.has(item)) {
          errors.push(`${exercise.id || index}: unsupported equipment "${item}"`);
        }
      });

      if (explicitDifficulty && !DIFFICULTY_TAGS.has(explicitDifficulty)) {
        errors.push(`${exercise.id || index}: unsupported difficulty "${explicitDifficulty}"`);
      }

      (Array.isArray(contraindications) ? contraindications : []).forEach((item) => {
        if (!CONTRAINDICATION_TAGS.has(item)) {
          errors.push(`${exercise.id || index}: unsupported contraindication "${item}"`);
        }
      });
    });

    expect(errors).toEqual([]);
  });
});
