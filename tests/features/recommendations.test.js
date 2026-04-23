import {
  RECOMMENDATION_EXCLUSION_REASONS,
  buildExerciseRecommendationMetadata,
  filterExercisesForRecommendations,
  getExerciseGoalIds,
} from '../../js/features/recommendations.js';

describe('recommendation exercise filtering', () => {
  test('keeps only exercises compatible with selected equipment and profile level', () => {
    const result = filterExercisesForRecommendations({
      exercises: [
        {
          id: 'push-ups',
          type: { en: 'strength' },
          equipment: ['bodyweight'],
          difficulty: 'beginner',
          tags: ['bodyweight', 'beginner'],
        },
        {
          id: 'kettlebell-snatch',
          type: { en: 'cardio' },
          equipment: ['kettlebell'],
          difficulty: 'advanced',
          tags: ['kettlebell', 'advanced'],
        },
      ],
      profile: {
        trainingLevel: 'intermediate',
        goal: 'strength',
      },
      equipment: {
        selectedIds: ['bodyweight'],
      },
      equipmentCatalog: [
        { id: 'bodyweight' },
        { id: 'kettlebell' },
      ],
    });

    expect(result.eligibleExercises).toHaveLength(1);
    expect(result.eligibleExercises[0].exercise.id).toBe('push-ups');
    expect(result.excludedExercises).toHaveLength(1);
    expect(result.excludedExercises[0].exercise.id).toBe('kettlebell-snatch');
    expect(result.excludedExercises[0].reasons).toEqual(expect.arrayContaining([
      RECOMMENDATION_EXCLUSION_REASONS.MISSING_REQUIRED_EQUIPMENT,
      RECOMMENDATION_EXCLUSION_REASONS.DIFFICULTY_ABOVE_PROFILE_LEVEL,
    ]));
  });

  test('deduplicates repeated exercise ids inside recommendation pool', () => {
    const result = filterExercisesForRecommendations({
      exercises: [
        { id: 'bird-dog', type: { en: 'strength' }, equipment: ['bodyweight'], difficulty: 'beginner', tags: ['bodyweight', 'beginner'] },
        { id: 'bird-dog', type: { en: 'strength' }, equipment: ['bodyweight'], difficulty: 'beginner', tags: ['bodyweight', 'beginner'] },
      ],
      profile: {},
      equipment: { selectedIds: ['bodyweight'] },
      equipmentCatalog: [{ id: 'bodyweight' }],
    });

    expect(result.eligibleExercises).toHaveLength(1);
    expect(result.excludedExercises).toHaveLength(1);
    expect(result.excludedExercises[0].reasons).toEqual([
      RECOMMENDATION_EXCLUSION_REASONS.DUPLICATE_EXERCISE_ID,
    ]);
  });

  test('supports strict goal filtering and goal affinity metadata', () => {
    const result = filterExercisesForRecommendations({
      exercises: [
        { id: 'push-ups', type: { en: 'strength' }, equipment: ['bodyweight'], difficulty: 'beginner', tags: ['bodyweight', 'beginner'] },
        { id: 'jumping-jacks', type: { en: 'cardio' }, equipment: ['bodyweight'], difficulty: 'beginner', tags: ['bodyweight', 'beginner', 'cardio'] },
      ],
      profile: {
        goal: 'fat-loss',
      },
      equipment: { selectedIds: ['bodyweight'] },
      equipmentCatalog: [{ id: 'bodyweight' }],
      goalMode: 'require',
    });

    expect(result.eligibleExercises).toHaveLength(1);
    expect(result.eligibleExercises[0].exercise.id).toBe('jumping-jacks');
    expect(result.excludedExercises[0].reasons).toContain(
      RECOMMENDATION_EXCLUSION_REASONS.GOAL_NOT_MATCHED,
    );
  });

  test('derives recommendation metadata and goal ids from exercise shape', () => {
    const metadata = buildExerciseRecommendationMetadata(
      {
        id: 'sun-salutation',
        type: { en: 'yoga' },
        equipment: ['bodyweight'],
        difficulty: 'intermediate',
        tags: ['bodyweight', 'intermediate', 'yoga'],
      },
      {
        profile: { trainingLevel: 'advanced', goal: 'general-fitness' },
        selectedEquipmentIds: ['bodyweight'],
        knownEquipmentIds: ['bodyweight', 'bands'],
      },
    );

    expect(metadata.requiredEquipmentIds).toEqual(['bodyweight']);
    expect(metadata.profileLevel).toBe('intermediate');
    expect(metadata.goalIds).toEqual(expect.arrayContaining(['endurance', 'general-fitness']));
    expect(metadata.hasRequiredEquipment).toBe(true);
    expect(metadata.isCompatibleWithProfileLevel).toBe(true);
    expect(metadata.matchesGoal).toBe(true);

    expect(getExerciseGoalIds({
      type: { en: 'strength' },
      equipment: ['dumbbells'],
      difficulty: 'intermediate',
      tags: ['dumbbells', 'intermediate'],
    })).toEqual(expect.arrayContaining(['strength', 'hypertrophy', 'general-fitness']));
  });
});
