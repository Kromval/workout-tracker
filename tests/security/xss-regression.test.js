import { renderProgressCalendar } from '../../js/features/calendar.js';
import { renderListItem } from '../../js/pages/components.js';
import {
  renderExerciseEditPage,
  renderExercisesCatalogRegion,
  renderExerciseViewPage,
} from '../../js/pages/exercise-page-renderers.js';
import { renderExerciseFormPage, renderWorkoutFormPage } from '../../js/pages/form-renderers.js';
import {
  renderHomeOverviewRegion,
  renderHomeUserWorkoutsRegion,
} from '../../js/pages/home-page-renderers.js';
import { renderRecommendationsContentRegion } from '../../js/pages/recommendation-page-renderers.js';
import { renderCustomAudioRow } from '../../js/pages/settings-renderers.js';
import {
  renderSettingsAudioRegion,
  renderSettingsEquipmentRegion,
  renderSettingsProfileRegion,
} from '../../js/pages/settings-page-renderers.js';
import {
  renderWorkoutCard,
  renderWorkoutExerciseOption,
  renderWorkoutExerciseSidebar,
  renderWorkoutViewItem,
} from '../../js/pages/workout-renderers.js';
import {
  renderWorkoutEditPage,
  renderWorkoutViewContentRegion,
} from '../../js/pages/workout-page-renderers.js';
import { IMPORT_MODES, importStore } from '../../js/storage/core.js';
import { STORAGE_KEY } from '../../js/storage/schema.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

const XSS_TEXT =
  '<img data-xss-probe="text" src=x onerror="window.__xssProbe = true"><svg data-xss-probe="text" onload="window.__xssProbe = true"></svg><script data-xss-probe="text">window.__xssProbe = true</script>';
const XSS_ATTRIBUTE = 'x" autofocus onfocus="window.__xssProbe = true" data-xss-probe="attr';
const XSS_PAYLOAD = `${XSS_TEXT} ${XSS_ATTRIBUTE}`;

describe('XSS regression coverage', () => {
  let memoryStorage;

  beforeEach(() => {
    memoryStorage = createMemoryStorage();
    globalThis.window = {
      location: { hash: '#home' },
      localStorage: memoryStorage,
    };
    globalThis.__xssProbe = false;
  });

  afterEach(() => {
    delete globalThis.window;
    delete globalThis.__xssProbe;
  });

  test('escapes user-controlled text across rendered app surfaces', () => {
    const state = createStateWithMaliciousUserText();
    const exercise = state.store.customExercises[0];
    const workout = state.store.workouts[0];
    const history = state.store.history;
    const settings = state.store.settings;
    const html = [];

    globalThis.window.location.hash = '#exercise-view/custom-xss';
    html.push(renderExerciseViewPage(state));
    html.push(renderExercisesCatalogRegion(state));
    html.push(renderExerciseFormPage(state, exercise, exercise.id));
    html.push(renderExerciseEditPage(state));

    globalThis.window.location.hash = '#workout-view/workout-xss';
    html.push(renderWorkoutViewContentRegion(state));
    html.push(renderWorkoutCard(state, workout, [exercise]));
    html.push(renderWorkoutViewItem(state, workout.items[0], exercise, 0));
    html.push(renderWorkoutFormPage(state, workout, workout.id));
    html.push(renderWorkoutExerciseSidebar(state, [exercise]));
    html.push(renderWorkoutExerciseOption(state, exercise, false, ['bodyweight'], ['bodyweight']));
    html.push(renderWorkoutEditPage(state));

    html.push(renderHomeOverviewRegion(state));
    html.push(renderHomeUserWorkoutsRegion(state));
    html.push(renderRecommendationsContentRegion(state));
    html.push(renderSettingsProfileRegion(state));
    html.push(renderSettingsEquipmentRegion(state));
    html.push(renderSettingsAudioRegion(state));
    html.push(renderCustomAudioRow(state, 'tick', settings.customAudio.tick));
    html.push(renderProgressCalendar(history, { language: 'en' }));
    html.push(renderListItem('tags', XSS_PAYLOAD, state));

    const markup = html.join('\n');

    expect(markup).toContain('&lt;img');
    expect(markup).toContain('&lt;script');
    expect(markup).toContain('&quot; autofocus');
    expectMarkupToKeepXssProbeInert(markup);
    expect(globalThis.__xssProbe).toBe(false);
  });

  test('imports JSON text payloads as data without evaluating or creating raw markup', () => {
    const imported = importStore(JSON.stringify(createMaliciousImportPayload()), {
      mode: IMPORT_MODES.REPLACE,
    });
    const persisted = JSON.parse(memoryStorage.getItem(STORAGE_KEY));

    expect(globalThis.__xssProbe).toBe(false);
    expect(imported.workouts[0].title).toContain('<img');
    expect(imported.workouts[0].description).toContain('<script');
    expect(imported.workouts[0].items[0].notes).toContain('onfocus');
    expect(imported.customExercises[0].name.en).toContain('<img');
    expect(imported.equipment.customItems[0].name).toContain('<img');
    expect(imported.settings.customAudio.tick.name).toContain('<img');
    expect(persisted.workouts[0].title).toBe(imported.workouts[0].title);
  });
});

function expectMarkupToKeepXssProbeInert(markup) {
  expect(markup).not.toMatch(/<\s*(script|svg)\b/i);
  expect(markup).not.toMatch(/<\s*img\b[^>]*\bdata-xss-probe\s*=\s*["']/i);
  expect(markup).not.toMatch(/\bdata-xss-probe\s*=\s*["']/i);
  expect(markup).not.toMatch(/\bon(?:error|load|focus)\s*=\s*["']/i);
}

function createStateWithMaliciousUserText() {
  const store = createMaliciousImportPayload();
  const state = {
    route: 'home',
    settings: store.settings,
    store,
    exercises: [],
  };

  return state;
}

function createMaliciousImportPayload() {
  const now = new Date().toISOString();

  return {
    version: 6,
    settings: {
      language: 'en',
      theme: 'system',
      density: 'comfortable',
      soundEnabled: false,
      volume: 0.7,
      calendarViewMode: 'month',
      lastOpenedWorkoutId: 'workout-xss',
      favoriteExerciseIds: ['custom-xss'],
      customAudio: {
        tick: {
          name: XSS_PAYLOAD,
          type: 'audio/wav',
          size: 12,
          dataUrl: 'data:audio/wav;base64,AAAA',
          updatedAt: now,
        },
      },
    },
    profile: {
      trainingLevel: 'beginner',
      goals: { strength: 1 },
      bodyFocusGoals: { upperBody: 1 },
      limitations: [XSS_PAYLOAD],
      dislikedExercises: ['custom-xss', XSS_PAYLOAD],
      likedTags: [XSS_PAYLOAD],
      sessionDurationMin: 30,
      recoveryProfile: {
        chest: 0,
        back: 0,
        legs: 0,
        shoulders: 0,
        arms: 0,
        core: 0,
      },
      recentHistory: {
        performedExerciseIds: ['custom-xss'],
        performedMovementPatterns: { [XSS_PAYLOAD]: 1 },
      },
    },
    equipment: {
      selectedIds: ['bodyweight', 'equipment-xss'],
      customItems: [
        {
          id: 'equipment-xss',
          name: XSS_PAYLOAD,
          createdAt: now,
          updatedAt: now,
          isCustom: true,
        },
      ],
    },
    customExercises: [
      {
        id: 'custom-xss',
        createdAt: now,
        updatedAt: now,
        name: { ru: XSS_PAYLOAD, en: XSS_PAYLOAD },
        shortDescription: { ru: XSS_PAYLOAD, en: XSS_PAYLOAD },
        instruction: { ru: XSS_PAYLOAD, en: XSS_PAYLOAD },
        effect: { ru: XSS_PAYLOAD, en: XSS_PAYLOAD },
        type: { ru: XSS_PAYLOAD, en: XSS_PAYLOAD },
        muscles: [XSS_PAYLOAD],
        tags: [XSS_PAYLOAD, 'bodyweight', 'strength'],
        executionMode: 'reps',
        tempo: null,
        estimatedCalories: 6,
        image: XSS_ATTRIBUTE,
        isCustom: true,
        equipment: ['bodyweight'],
        difficulty: 'beginner',
        contraindications: [],
        movementPatterns: [XSS_PAYLOAD],
        muscleGroups: {
          primary: [XSS_PAYLOAD],
          secondary: [],
        },
        intensityProfile: {
          strength: 'medium',
          cardio: 'low',
          endurance: 'medium',
          impact: 'low',
        },
      },
    ],
    workouts: [
      {
        id: 'workout-xss',
        title: XSS_PAYLOAD,
        description: XSS_PAYLOAD,
        createdAt: now,
        updatedAt: now,
        isPreset: false,
        tags: [XSS_PAYLOAD],
        defaultRestBetweenExercises: 30,
        items: [
          {
            id: 'workout-item-xss',
            exerciseId: 'custom-xss',
            sets: 1,
            reps: 5,
            durationSec: null,
            distance: null,
            restBetweenSetsSec: 30,
            restAfterExerciseSec: 0,
            notes: XSS_PAYLOAD,
            order: 0,
          },
        ],
      },
    ],
    history: [
      {
        id: 'history-xss',
        createdAt: now,
        updatedAt: now,
        workoutId: 'workout-xss',
        workoutTitleSnapshot: XSS_PAYLOAD,
        startedAt: now,
        endedAt: now,
        durationSec: 60,
        status: 'completed',
        note: XSS_PAYLOAD,
        ratingEmoji: XSS_PAYLOAD,
        estimatedCaloriesBurned: 1,
        totalExercisesCompleted: 1,
        totalSetsCompleted: 1,
        completedItems: [
          {
            workoutItemId: 'workout-item-xss',
            exerciseId: 'custom-xss',
            exerciseNameSnapshot: { ru: XSS_PAYLOAD, en: XSS_PAYLOAD },
            setsCompleted: 1,
            repsCompleted: 5,
            durationSec: null,
            skipped: false,
            note: XSS_PAYLOAD,
          },
        ],
      },
    ],
  };
}
