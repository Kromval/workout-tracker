import { renderWorkoutDraftItem, renderWorkoutFormPage } from '../../js/pages/form-renderers.js';
import { renderWorkoutExerciseOption } from '../../js/pages/workout-renderers.js';

describe('workout create renderers', () => {
  test('renders picker filters and exercise metadata from the current exercise model', () => {
    const state = createWorkoutCreateState();
    const exercise = state.store.customExercises[0];

    const pageMarkup = renderWorkoutFormPage(state);
    const optionMarkup = renderWorkoutExerciseOption(
      state,
      exercise,
      false,
      ['bodyweight', 'dumbbells'],
      ['bodyweight'],
      'beginner',
    );

    expect(pageMarkup).toContain('data-workout-exercise-movement-filter');
    expect(pageMarkup).toContain('value="squat"');
    expect(optionMarkup).toContain('data-exercise-movement="squat|push"');
    expect(optionMarkup).toContain('Primary muscles');
    expect(optionMarkup).toContain('Quadriceps');
    expect(optionMarkup).toContain('Movement');
    expect(optionMarkup).toContain('Squat, Push');
    expect(optionMarkup).toContain('Missing equipment');
    expect(optionMarkup).toContain('Above profile level');
  });

  test('uses exercise model defaults for workout draft fields', () => {
    const state = createWorkoutCreateState();
    const beginnerStrength = {
      ...state.store.customExercises[0],
      difficulty: 'beginner',
      executionMode: 'reps',
      tags: ['strength'],
    };
    const mobilityHold = {
      ...state.store.customExercises[0],
      id: 'hold',
      type: { en: 'Yoga', ru: 'Йога' },
      difficulty: 'intermediate',
      executionMode: 'hold',
      tags: ['mobility'],
    };

    const repsMarkup = renderWorkoutDraftItem(state, beginnerStrength);
    const holdMarkup = renderWorkoutDraftItem(state, mobilityHold);

    expect(repsMarkup).toContain(
      'data-workout-field="sets" type="number" min="1" step="1" value="2"',
    );
    expect(repsMarkup).toContain(
      'data-workout-field="reps" type="number" min="1" step="1" value="8"',
    );
    expect(holdMarkup).toContain(
      'data-workout-field="sets" type="number" min="1" step="1" value="1"',
    );
    expect(holdMarkup).toContain(
      'data-workout-field="durationSec" type="number" min="1" step="1" value="45"',
    );
    expect(holdMarkup).toContain(
      'data-workout-field="restBetweenSetsSec" type="number" min="0" step="1" value="15"',
    );
  });
});

function createWorkoutCreateState() {
  const exercise = {
    id: 'split-squat-press',
    name: { en: 'Split Squat Press', ru: 'Сплит-присед с жимом' },
    shortDescription: { en: 'Leg and shoulder strength drill.', ru: 'Силовое упражнение.' },
    instruction: { en: 'Brace and move with control.', ru: 'Двигайтесь подконтрольно.' },
    effect: { en: 'Builds unilateral strength.', ru: 'Развивает силу.' },
    type: { en: 'Strength', ru: 'Силовое' },
    muscles: ['quadriceps', 'shoulders', 'core'],
    tags: ['strength', 'dumbbells'],
    executionMode: 'reps',
    tempo: { eccentric: 3, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    estimatedCalories: 8,
    equipment: ['dumbbells'],
    movementPatterns: ['squat', 'push'],
    muscleGroups: {
      primary: ['quadriceps'],
      secondary: ['shoulders'],
    },
    difficulty: 'advanced',
    contraindications: [],
    intensityProfile: {
      strength: 'high',
      cardio: 'medium',
      endurance: 'low',
      impact: 'low',
    },
  };

  return {
    settings: {
      language: 'en',
      favoriteExerciseIds: [],
    },
    store: {
      settings: {
        language: 'en',
        favoriteExerciseIds: [],
      },
      profile: {
        trainingLevel: 'beginner',
      },
      equipment: {
        selectedIds: ['bodyweight'],
        customItems: [],
      },
      customExercises: [exercise],
      workouts: [],
      history: [],
    },
    exercises: [],
  };
}
