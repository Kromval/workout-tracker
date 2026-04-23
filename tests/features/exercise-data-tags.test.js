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

describe('exercise data tags', () => {
  test('every built-in exercise has normalized equipment and difficulty tags', () => {
    const errors = [];

    exerciseRecords.forEach((exercise, index) => {
      const tags = Array.isArray(exercise.tags) ? exercise.tags : [];
      const equipmentTags = tags.filter((tag) => EQUIPMENT_TAGS.has(tag));
      const difficultyTags = tags.filter((tag) => DIFFICULTY_TAGS.has(tag));

      if (equipmentTags.length === 0) {
        errors.push(`${exercise.id || index}: missing equipment tag`);
      }

      if (difficultyTags.length !== 1) {
        errors.push(`${exercise.id || index}: expected exactly one difficulty tag, got ${difficultyTags.length}`);
      }
    });

    expect(errors).toEqual([]);
  });
});
