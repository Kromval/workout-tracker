import {
  DEFAULT_SCORING_WEIGHTS,
  rankRecommendedExercises,
  scoreContraindicationRisk,
  scoreExercise,
  scoreGoalAlignment,
  scoreLevelMatch,
  scorePreferences,
  scoreRecovery,
  scoreSafety,
  scoreTimeFit,
  scoreVariety,
} from '../../js/features/exercise-scoring.js';

describe('exercise scoring engine', () => {
  test('scores individual parts from user profile and exercise metadata', () => {
    const user = {
      goals: {
        strength: 0.6,
        hypertrophy: 0.8,
        endurance: 0.3,
        fatLoss: 0.5,
        mobility: 0.2,
      },
      bodyFocusGoals: {
        upperBody: 0.9,
        vTaper: 0.7,
      },
      trainingLevel: 'beginner',
      limitations: ['mild-knee-pain'],
      dislikedExercises: ['burpee'],
      likedTags: ['dumbbells', 'compound'],
      sessionDurationMin: 45,
      recoveryProfile: {
        chest: 0.8,
        legs: 0.4,
        shoulders: 0.7,
      },
      recentHistory: {
        performedExerciseIds: ['squat', 'push-up', 'plank'],
        performedMovementPatterns: {
          squat: 3,
          'horizontal-push': 2,
        },
      },
    };
    const exercise = {
      id: 'dumbbell-bench-press',
      difficulty: 'beginner',
      executionMode: 'reps',
      equipment: ['dumbbells', 'bench'],
      tags: ['compound', 'dumbbells'],
      movementPatterns: ['horizontal-push'],
      muscleGroups: {
        primary: ['chest', 'shoulders'],
      },
      contraindications: ['shoulder-impingement'],
      intensityProfile: {
        strength: 'high',
        cardio: 'low',
        endurance: 'medium',
        impact: 'low',
      },
      type: { en: 'strength' },
    };

    expect(scoreGoalAlignment(user, exercise)).toBeGreaterThan(0.75);
    expect(scoreLevelMatch(user, exercise)).toBe(1);
    expect(scorePreferences(user, exercise)).toBeCloseTo(0.7, 5);
    expect(scoreRecovery(user, exercise)).toBeCloseTo(0.75, 5);
    expect(scoreSafety(user, exercise)).toBeGreaterThan(0.7);
    expect(scoreVariety(user, exercise)).toBeCloseTo(0.6, 5);
    expect(scoreTimeFit(user, exercise, {})).toBeGreaterThan(0);
    expect(scoreContraindicationRisk(user, exercise)).toBe(0);
  });

  test('ranks filtered recommendation candidates and keeps hard-filter exclusions out', () => {
    const result = rankRecommendedExercises({
      exercises: [
        {
          id: 'push-ups',
          type: { en: 'strength' },
          equipment: ['bodyweight'],
          difficulty: 'beginner',
          tags: ['bodyweight', 'compound'],
          movementPatterns: ['horizontal-push'],
          muscleGroups: { primary: ['chest', 'triceps'] },
          contraindications: [],
          intensityProfile: { strength: 'high', cardio: 'low', endurance: 'medium', impact: 'low' },
          executionMode: 'reps',
        },
        {
          id: 'sun-salutation',
          type: { en: 'yoga' },
          equipment: ['bodyweight'],
          difficulty: 'intermediate',
          tags: ['bodyweight', 'yoga'],
          movementPatterns: ['full-body-dynamic'],
          muscleGroups: { primary: ['full-body'] },
          contraindications: [],
          intensityProfile: { strength: 'medium', cardio: 'medium', endurance: 'high', impact: 'medium' },
          executionMode: 'reps',
        },
        {
          id: 'kettlebell-swing',
          type: { en: 'cardio' },
          equipment: ['kettlebell'],
          difficulty: 'intermediate',
          tags: ['kettlebell', 'cardio'],
          movementPatterns: ['hinge', 'cardio'],
          muscleGroups: { primary: ['glutes', 'hamstrings'] },
          contraindications: ['lower-back-pain'],
          intensityProfile: { strength: 'medium', cardio: 'high', endurance: 'high', impact: 'medium' },
          executionMode: 'reps',
        },
      ],
      profile: {
        trainingLevel: 'beginner',
        goals: {
          strength: 0.8,
          hypertrophy: 0.7,
          endurance: 0.2,
          fatLoss: 0.1,
          mobility: 0,
        },
        bodyFocusGoals: {
          upperBody: 0.9,
        },
        likedTags: ['compound'],
        recoveryProfile: {
          chest: 0.9,
          triceps: 0.8,
        },
        recentHistory: {
          performedExerciseIds: ['plank'],
          performedMovementPatterns: {},
        },
      },
      equipment: {
        selectedIds: ['bodyweight'],
      },
      equipmentCatalog: [
        { id: 'bodyweight' },
        { id: 'kettlebell' },
      ],
      context: {
        targetDurationMin: 30,
      },
    });

    expect(result.scoredExercises).toHaveLength(1);
    expect(result.scoredExercises[0].exercise.id).toBe('push-ups');
    expect(result.excludedExercises).toHaveLength(2);
    expect(result.scoredExercises[0].total).toBeGreaterThan(0);
  });

  test('returns stable score parts and penalties object', () => {
    const result = scoreExercise(
      {
        goals: { mobility: 1 },
        bodyFocusGoals: { core: 1 },
        trainingLevel: 'advanced',
        limitations: ['wrist-pain'],
        recentHistory: {
          performedExerciseIds: ['sun-salutation'],
          performedMovementPatterns: {
            'full-body-dynamic': 2,
          },
        },
      },
      {
        id: 'sun-salutation',
        type: { en: 'yoga' },
        difficulty: 'intermediate',
        equipment: ['bodyweight'],
        tags: ['yoga'],
        movementPatterns: ['full-body-dynamic', 'stretch'],
        muscleGroups: { primary: ['full-body'] },
        contraindications: ['wrist-pain'],
        intensityProfile: { strength: 'medium', cardio: 'medium', endurance: 'high', impact: 'medium' },
        executionMode: 'reps',
      },
      { targetDurationMin: 20 },
      DEFAULT_SCORING_WEIGHTS
    );

    expect(result.excluded).toBe(false);
    expect(result.parts.goalAlignment).toBeGreaterThan(0.5);
    expect(result.parts.safety).toBe(0);
    expect(result.penalties.contraindicationRisk).toBe(1);
    expect(result.penalties.fatiguePenalty).toBeGreaterThan(0.6);
  });

  test('matches body focus goals against primary muscle groups', () => {
    const score = scoreGoalAlignment(
      {
        goals: {},
        bodyFocusGoals: {
          lowerBody: 1,
          glutes: 0.8,
        },
      },
      {
        muscleGroups: {
          primary: ['glutes', 'hamstrings'],
        },
      }
    );

    expect(score).toBeGreaterThan(0.5);
  });

  test('does not over-reward narrow body-part matches against broad active focus priorities', () => {
    const score = scoreGoalAlignment(
      {
        goals: {},
        bodyFocusGoals: {
          upperBody: 0.7,
          lowerBody: 0.4,
          vTaper: 0.6,
          core: 0.4,
          arms: 0.8,
          glutes: 0.2,
        },
      },
      {
        muscleGroups: {
          primary: ['glutes'],
        },
      }
    );

    expect(score).toBeGreaterThan(0.05);
    expect(score).toBeLessThan(0.2);
  });
});
