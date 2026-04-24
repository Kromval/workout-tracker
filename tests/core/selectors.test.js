import {
  DEFAULT_RECOMMENDATION_LIMIT,
  selectRecommendedExercises,
} from '../../js/core/selectors.js';

describe('core selectors', () => {
  test('selectRecommendedExercises returns ranked top-N list for UI flow', () => {
    const state = {
      exercises: [
        {
          id: 'push-ups',
          name: { ru: 'Отжимания', en: 'Push-ups' },
          shortDescription: { ru: 'База на грудь', en: 'Chest compound staple' },
          type: { ru: 'Силовое', en: 'strength' },
          muscles: ['chest', 'triceps'],
          tags: ['bodyweight', 'compound'],
          executionMode: 'reps',
          movementPatterns: ['horizontal-push'],
          muscleGroups: { primary: ['chest', 'triceps'], secondary: [] },
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          contraindications: [],
          intensityProfile: { strength: 'high', cardio: 'low', endurance: 'medium', impact: 'low' },
        },
        {
          id: 'kettlebell-swing',
          name: { ru: 'Мах гирей', en: 'Kettlebell swing' },
          shortDescription: { ru: 'Взрывной хиндж', en: 'Explosive hinge' },
          type: { ru: 'Кардио', en: 'cardio' },
          muscles: ['glutes', 'hamstrings'],
          tags: ['kettlebell', 'cardio'],
          executionMode: 'reps',
          movementPatterns: ['hinge', 'cardio'],
          muscleGroups: { primary: ['glutes', 'hamstrings'], secondary: [] },
          difficulty: 'intermediate',
          equipment: ['kettlebell'],
          contraindications: [],
          intensityProfile: {
            strength: 'medium',
            cardio: 'high',
            endurance: 'high',
            impact: 'medium',
          },
        },
      ],
      store: {
        profile: {
          trainingLevel: 'beginner',
          goals: {
            strength: 0.8,
            hypertrophy: 0.7,
            endurance: 0.1,
            fatLoss: 0.1,
            mobility: 0,
          },
          likedTags: ['compound'],
          recoveryProfile: {
            chest: 0.9,
            triceps: 0.9,
          },
          sessionDurationMin: 30,
          recentHistory: {
            performedExerciseIds: [],
            performedMovementPatterns: {},
          },
        },
        equipment: {
          selectedIds: ['bodyweight'],
          customItems: [],
        },
        customExercises: [],
      },
      settings: {},
    };

    const result = selectRecommendedExercises(state);

    expect(result.limit).toBe(DEFAULT_RECOMMENDATION_LIMIT);
    expect(result.topExercises).toHaveLength(1);
    expect(result.topExercises[0].exercise.id).toBe('push-ups');
    expect(result.summary.excludedCount).toBe(1);
  });
});
