/**
 * @module tests/features/exercise-compatibility.test
 */
import {
  getExerciseEquipmentIds,
  getExerciseProfileLevel,
  isExerciseAvailableForSelectedEquipment,
  isExerciseCompatibleWithProfileLevel,
} from '../../js/features/exercise-compatibility.js';

describe('exercise compatibility helpers', () => {
  test('extracts equipment ids from explicit equipment field with tag fallback', () => {
    const exercise = {
      equipment: ['bodyweight', 'resistance-band', 'dumbbell', 'cable-machine'],
      tags: ['home', 'bodyweight', 'kettlebell'],
    };

    expect(
      getExerciseEquipmentIds(exercise, [
        'bodyweight',
        'kettlebell',
        'bands',
        'dumbbells',
        'cable-station',
      ]),
    ).toEqual(['bodyweight', 'bands', 'dumbbells', 'cable-station']);
  });

  test('allows untagged and bodyweight exercises while respecting selected external equipment', () => {
    expect(isExerciseAvailableForSelectedEquipment({ tags: ['cardio'] }, [], ['bodyweight'])).toBe(
      true,
    );
    expect(
      isExerciseAvailableForSelectedEquipment(
        { tags: ['bodyweight'] },
        ['bodyweight'],
        ['bodyweight'],
      ),
    ).toBe(true);
    expect(
      isExerciseAvailableForSelectedEquipment({ tags: ['bodyweight'] }, [], ['bodyweight']),
    ).toBe(true);
    expect(
      isExerciseAvailableForSelectedEquipment({ tags: ['kettlebell'] }, [], ['kettlebell']),
    ).toBe(false);
  });

  test('reads equipment and difficulty from the current classification model', () => {
    const exercise = {
      classification: {
        equipment: ['resistance-band'],
        difficulty: 'intermediate',
      },
    };

    expect(getExerciseEquipmentIds(exercise, ['bands'])).toEqual(['bands']);
    expect(getExerciseProfileLevel(exercise)).toBe('intermediate');
  });

  test('supports profile level compatibility as a soft upper bound', () => {
    expect(getExerciseProfileLevel({ difficulty: 'advanced', tags: ['strength'] })).toBe(
      'advanced',
    );
    expect(isExerciseCompatibleWithProfileLevel({ tags: ['beginner'] }, 'intermediate')).toBe(true);
    expect(isExerciseCompatibleWithProfileLevel({ difficulty: 'advanced' }, 'intermediate')).toBe(
      false,
    );
    expect(isExerciseCompatibleWithProfileLevel({ tags: ['strength'] }, 'beginner')).toBe(true);
  });
});
