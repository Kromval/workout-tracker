import { expect, test } from '@playwright/test';

const STORAGE_KEY = 'workout-tracker:data';

test('loads the app shell and home route', async ({ page }) => {
  const pageErrors = collectPageErrors(page);

  await startWithStore(page);
  await page.goto('/#home');

  await expect(page.locator('[data-page-route="home"]')).toBeVisible();
  await expect(page.locator('#app-brand-link')).toBeVisible();
  await expect(page.locator('#app-nav a[href="#exercises"]')).toBeVisible();
  await expect(page.locator('#mobile-app-nav')).toHaveCount(1);
  expect(pageErrors).toEqual([]);
});

test('opens exercise catalog and applies search filtering', async ({ page }) => {
  const pageErrors = collectPageErrors(page);

  await startWithStore(page);
  await page.goto('/#exercises');

  const exerciseList = page.locator('[data-exercise-list]');
  const visibleCards = exerciseList.locator('.exercise-card:visible');

  await expect(page.locator('[data-page-route="exercises"]')).toBeVisible();
  await expect(visibleCards.first()).toBeVisible();

  const initialCount = await visibleCards.count();
  await page.locator('[data-exercises-search]').fill('push');
  await expect(visibleCards.first()).toBeVisible();
  await expect.poll(() => visibleCards.count()).toBeLessThanOrEqual(initialCount);

  expect(pageErrors).toEqual([]);
});

test('navigates from manual workout creation to the generator', async ({ page }) => {
  const pageErrors = collectPageErrors(page);

  await startWithStore(page, createWorkoutReadyStore());
  await page.goto('/#workout-create');

  await expect(page.locator('[data-workout-form]')).toBeVisible();
  await page.locator('a[href="#workout-generate"]').click();

  await expect(page.locator('[data-page-route="workout-generate"]')).toBeVisible();
  await expect(page.locator('[data-workout-generation-form]')).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test('generates and saves a single workout', async ({ page }) => {
  const pageErrors = collectPageErrors(page);

  await startWithStore(page, createWorkoutReadyStore());
  await page.goto('/#workout-generate');

  await page.locator('#workout-generate-duration').fill('35');
  await page.locator('#workout-generate-type').selectOption('straight');
  await page.locator('[name="goals.strength"]').evaluate((input) => {
    input.value = '0.8';
  });
  await page.locator('[name="bodyFocusGoals.upperBody"]').evaluate((input) => {
    input.value = '0.7';
  });
  await page.locator('[data-workout-generation-form]').locator('button[type="submit"]').click();

  await expect(page.locator('[data-page-route="workout-view"]')).toBeVisible();
  await expect(page.locator('.workout-view-list')).toBeVisible();
  await expect(page.locator('.workout-view-list .workout-view-item').first()).toBeVisible();

  const storedWorkoutCount = await page.evaluate((key) => {
    const store = JSON.parse(window.localStorage.getItem(key) || '{}');
    return Array.isArray(store.workouts) ? store.workouts.length : 0;
  }, STORAGE_KEY);

  expect(storedWorkoutCount).toBe(1);
  expect(pageErrors).toEqual([]);
});

function collectPageErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

async function startWithStore(page, store = createEmptyStore()) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: STORAGE_KEY, value: store },
  );
}

function createWorkoutReadyStore() {
  const store = createEmptyStore();

  store.profile = {
    ...store.profile,
    trainingLevel: 'beginner',
    goal: 'general-fitness',
    sessionDurationMin: 35,
    frequencyPerWeek: 3,
    goals: {
      strength: 0.6,
      hypertrophy: 0.4,
      endurance: 0.5,
      fatLoss: 0.3,
      mobility: 0.2,
    },
    bodyFocusGoals: {
      upperBody: 0.5,
      lowerBody: 0.5,
      vTaper: 0.2,
      core: 0.5,
      arms: 0.2,
      glutes: 0.2,
    },
  };
  store.equipment = {
    selectedIds: [
      'bodyweight',
      'dumbbells',
      'kettlebell',
      'barbell',
      'bench',
      'pull-up-bar',
      'bands',
      'machines',
      'cable-station',
    ],
    customItems: [],
  };

  return store;
}

function createEmptyStore() {
  return {
    version: 6,
    settings: {
      language: 'en',
      theme: 'system',
      density: 'comfortable',
      soundEnabled: false,
      volume: 0.7,
      customAudio: {},
      favoriteExerciseIds: [],
      calendarViewMode: 'month',
      lastOpenedWorkoutId: null,
    },
    profile: {
      age: null,
      sex: '',
      weightKg: null,
      heightCm: null,
      bodyFatPercent: null,
      wristCm: null,
      waistCm: null,
      neckCm: null,
      chestCm: null,
      hipsCm: null,
      forearmCm: null,
      calfCm: null,
      trainingLevel: '',
      goal: '',
      goals: {
        strength: 0,
        hypertrophy: 0,
        endurance: 0,
        fatLoss: 0,
        mobility: 0,
      },
      bodyFocusGoals: {
        upperBody: 0,
        lowerBody: 0,
        vTaper: 0,
        core: 0,
        arms: 0,
        glutes: 0,
      },
      limitations: [],
      dislikedExercises: [],
      likedTags: [],
      sessionDurationMin: null,
      frequencyPerWeek: null,
      recoveryProfile: {
        chest: 0,
        back: 0,
        legs: 0,
        shoulders: 0,
        arms: 0,
        core: 0,
      },
      recentHistory: {
        performedExerciseIds: [],
        performedMovementPatterns: {},
      },
    },
    equipment: {
      selectedIds: [],
      customItems: [],
    },
    customExercises: [],
    workouts: [],
    history: [],
    activeSession: null,
  };
}
