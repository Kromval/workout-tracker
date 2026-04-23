import {
  getExerciseEquipmentIds,
  getExerciseProfileLevel,
  isExerciseAvailableForSelectedEquipment,
  isExerciseCompatibleWithProfileLevel,
} from '../../js/features/exercise-compatibility.js';

describe('exercise compatibility helpers', () => {
  test('extracts equipment ids from exercise tags', () => {
    const exercise = {
      tags: ['home', 'bodyweight', 'kettlebell'],
    };

    expect(getExerciseEquipmentIds(exercise, ['bodyweight', 'kettlebell', 'bands'])).toEqual([
      'bodyweight',
      'kettlebell',
    ]);
  });

  test('allows untagged exercises and respects selected equipment for tagged ones', () => {
    expect(isExerciseAvailableForSelectedEquipment({ tags: ['cardio'] }, [], ['bodyweight'])).toBe(true);
    expect(isExerciseAvailableForSelectedEquipment({ tags: ['bodyweight'] }, ['bodyweight'], ['bodyweight'])).toBe(true);
    expect(isExerciseAvailableForSelectedEquipment({ tags: ['bodyweight'] }, [], ['bodyweight'])).toBe(false);
  });

  test('supports profile level compatibility as a soft upper bound', () => {
    expect(getExerciseProfileLevel({ tags: ['advanced', 'strength'] })).toBe('advanced');
    expect(isExerciseCompatibleWithProfileLevel({ tags: ['beginner'] }, 'intermediate')).toBe(true);
    expect(isExerciseCompatibleWithProfileLevel({ tags: ['advanced'] }, 'intermediate')).toBe(false);
    expect(isExerciseCompatibleWithProfileLevel({ tags: ['strength'] }, 'beginner')).toBe(true);
  });
});
