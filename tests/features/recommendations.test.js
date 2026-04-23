import {
  RECOMMENDATION_EXCLUSION_REASONS,
  buildExerciseRecommendationMetadata,
  filterExercisesForRecommendations,
  getExerciseGoalIds,
  rankExercisesForRecommendations,
  scoreContraindications,
  scoreDifficultyFit,
  scoreExercise,
  scoreGoalAlignment,
  scoreMovementVariety,
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

  test('scores goal alignment from intensity profile instead of binary goal match', () => {
    const score = scoreGoalAlignment(
      {
        type: { en: 'strength' },
        tags: ['compound'],
        intensityProfile: {
          strength: 'high',
          cardio: 'low',
          endurance: 'medium',
          impact: 'low',
        },
      },
      {
        goal: 'strength',
        goals: {
          strength: 1,
          hypertrophy: 0,
          endurance: 0,
          fatLoss: 0,
          mobility: 0,
          generalFitness: 0,
        },
      },
    );

    expect(score).toBeGreaterThan(0.8);
  });

  test('prefers same-level exercise and penalizes lower-level match slightly', () => {
    expect(scoreDifficultyFit(
      { difficulty: 'intermediate' },
      { trainingLevel: 'intermediate' },
    )).toBe(1);

    expect(scoreDifficultyFit(
      { difficulty: 'beginner' },
      { trainingLevel: 'intermediate' },
    )).toBeLessThan(1);
  });

  test('applies contraindication penalty when profile limitations overlap exercise contraindications', () => {
    expect(scoreContraindications(
      { contraindications: ['joint-wrist-pain', 'joint-elbow-irritation'] },
      { limitations: ['joint-wrist'] },
    )).toBe(0);
  });

  test('penalizes repeated movement patterns from recent history', () => {
    const score = scoreMovementVariety(
      { id: 'diamond-push-ups', movementPatterns: ['horizontal-push'] },
      {
        recentHistory: {
          performedExerciseIds: ['push-ups'],
          performedMovementPatterns: {
            'horizontal-push': 3,
          },
        },
      },
    );

    expect(score).toBeLessThan(0.65);
  });

  test('returns explanation payload with matched signals and penalties', () => {
    const result = scoreExercise(
      {
        id: 'diamond-push-ups',
        type: { en: 'strength' },
        tags: ['bodyweight', 'compound'],
        difficulty: 'intermediate',
        equipment: ['bodyweight'],
        movementPatterns: ['horizontal-push'],
        muscleGroups: { primary: ['triceps', 'chest'], secondary: [] },
        contraindications: [],
        intensityProfile: {
          strength: 'high',
          cardio: 'low',
          endurance: 'medium',
          impact: 'low',
        },
      },
      {
        trainingLevel: 'intermediate',
        goals: {
          strength: 1,
          hypertrophy: 0,
          endurance: 0,
          fatLoss: 0,
          mobility: 0,
          generalFitness: 0,
        },
        likedTags: ['compound'],
        recentHistory: {
          performedExerciseIds: [],
          performedMovementPatterns: {},
        },
      },
      {
        selectedEquipmentIds: ['bodyweight'],
        targetDurationMin: 30,
      },
    );

    expect(result.score).toBeGreaterThan(0);
    expect(result.matchedSignals).toEqual(expect.arrayContaining([
      'goal-strength',
      'equipment-bodyweight',
    ]));
    expect(result.reasons.length).toBeGreaterThan(0);
  });

  test('sorts ranked recommendations by score after hard filters', () => {
    const result = rankExercisesForRecommendations({
      exercises: [
        {
          id: 'diamond-push-ups',
          type: { en: 'strength' },
          tags: ['bodyweight', 'compound'],
          difficulty: 'intermediate',
          equipment: ['bodyweight'],
          movementPatterns: ['horizontal-push'],
          muscleGroups: { primary: ['triceps', 'chest'], secondary: [] },
          contraindications: [],
          intensityProfile: {
            strength: 'high',
            cardio: 'low',
            endurance: 'medium',
            impact: 'low',
          },
        },
        {
          id: 'jumping-jacks',
          type: { en: 'cardio' },
          tags: ['bodyweight', 'cardio'],
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          movementPatterns: ['full-body'],
          muscleGroups: { primary: ['legs'], secondary: [] },
          contraindications: [],
          intensityProfile: {
            strength: 'low',
            cardio: 'high',
            endurance: 'high',
            impact: 'medium',
          },
        },
      ],
      profile: {
        trainingLevel: 'intermediate',
        goals: {
          strength: 1,
          hypertrophy: 0,
          endurance: 0,
          fatLoss: 0,
          mobility: 0,
          generalFitness: 0,
        },
      },
      equipment: { selectedIds: ['bodyweight'] },
      equipmentCatalog: [{ id: 'bodyweight' }],
    });

    expect(result.rankedExercises[0].exercise.id).toBe('diamond-push-ups');
    expect(result.rankedExercises[0].score).toBeGreaterThan(result.rankedExercises[1].score);
  });
});
