import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve(process.cwd(), 'data', 'exercises.json');
const exerciseRecords = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const EQUIPMENT_TAGS = new Set([
  'bodyweight',
  'dumbbells',
  'kettlebell',
  'bands',
  'bench',
  'pull-up-bar',
  'barbell',
  'machines',
  'cable-station',
  'gymnastic-rings',
  'jump-rope',
  'medicine-ball',
]);

const DIFFICULTY_TAGS = new Set(['beginner', 'intermediate', 'advanced']);
const CONTRAINDICATION_TAGS = new Set([
  'joint-wrist-pain',
  'joint-elbow-irritation',
  'joint-shoulder-pain',
  'joint-shoulder-irritation',
  'joint-shoulder-impingement',
  'joint-hip-pain',
  'joint-knee-pain',
  'joint-knee-instability',
  'joint-ankle-pain',
  'joint-ankle-instability',
  'region-lower-back-pain',
  'region-back-severe-pain',
  'region-neck-pain',
  'cardio-high-blood-pressure',
]);
const EQUIPMENT_ALIASES = new Map([
  ['resistance-band', 'bands'],
]);

function normalizeEquipmentId(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return EQUIPMENT_ALIASES.get(normalized) || normalized;
}

describe('exercise data tags', () => {
  test('every built-in exercise has normalized equipment and difficulty metadata', () => {
    const errors = [];

    exerciseRecords.forEach((exercise, index) => {
      const tags = Array.isArray(exercise.tags) ? exercise.tags : [];
      const explicitEquipment = Array.isArray(exercise.equipment)
        ? exercise.equipment.map(normalizeEquipmentId)
        : [];
      const explicitDifficulty = typeof exercise.difficulty === 'string'
        ? exercise.difficulty
        : '';
      const equipmentTags = tags.filter((tag) => EQUIPMENT_TAGS.has(tag));
      const difficultyTags = tags.filter((tag) => DIFFICULTY_TAGS.has(tag));
      const effectiveEquipment = explicitEquipment.length > 0 ? explicitEquipment : equipmentTags;
      const effectiveDifficulty = explicitDifficulty || (difficultyTags.length === 1 ? difficultyTags[0] : '');

      if (effectiveEquipment.length === 0) {
        errors.push(`${exercise.id || index}: missing equipment metadata`);
      }

      if (!effectiveDifficulty) {
        errors.push(`${exercise.id || index}: missing difficulty metadata`);
      }

      explicitEquipment.forEach((item) => {
        if (!EQUIPMENT_TAGS.has(item)) {
          errors.push(`${exercise.id || index}: unsupported equipment "${item}"`);
        }
      });

      if (explicitDifficulty && !DIFFICULTY_TAGS.has(explicitDifficulty)) {
        errors.push(`${exercise.id || index}: unsupported difficulty "${explicitDifficulty}"`);
      }

      (Array.isArray(exercise.contraindications) ? exercise.contraindications : []).forEach((item) => {
        if (!CONTRAINDICATION_TAGS.has(item)) {
          errors.push(`${exercise.id || index}: unsupported contraindication "${item}"`);
        }
      });
    });

    expect(errors).toEqual([]);
  });
});
