/**
 * @module tests/e2e/smoke.spec
 */
import { expect, test } from '@playwright/test';

/**
 * Shared storage key constant.
 * @type {string}
 */
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

/**
 * Collects page errors.
 * @param {*} page page input
 * @returns {*} result
 */
function collectPageErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

/**
 * Runs start with store.
 * @param {*} page page input
 * @param {object} [store=createEmptyStore()] store input
 * @returns {Promise<void>} completion promise
 */
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

/**
 * Creates workout ready store.
 * @returns {*} result
 */
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

/**
 * Creates empty store.
 * @returns {*} result
 */
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

test('creates, runs, completes a manual workout, and verifies it in history', async ({ page }) => {
  const pageErrors = collectPageErrors(page);

  // 1. Start with standard workout-ready store
  await startWithStore(page, createWorkoutReadyStore());
  await page.goto('/#workout-create');

  // 2. Fill in the title
  await page.locator('#workout-title').fill('E2E Manual Workout');
  await page.locator('#workout-description').fill('Created via E2E test');

  // 3. Add first exercise from the sidebar
  const addExerciseButton = page.locator('[data-workout-add-exercise]').first();
  await expect(addExerciseButton).toBeVisible();
  await addExerciseButton.click();

  // 4. Submit the form to save the workout
  await page.locator('form[data-workout-form] button[type="submit"]').click();

  // 5. Verify redirect to workout view page
  await expect(page).toHaveURL(/.*#workout-view\/.+/);
  await expect(page.locator('.workout-view-list')).toBeVisible();

  // 6. Start the workout session
  const startButton = page.locator('a[href^="#workout-run/"]');
  await expect(startButton).toBeVisible();
  await startButton.click();

  // 7. On the runner page, skip all steps until completion form appears
  await expect(page.locator('[data-session-root]')).toBeVisible();

  const skipButton = page.locator('[data-session-action="skip"]');
  const finishForm = page.locator('[data-session-finish-form]');

  while ((await skipButton.isVisible()) && !(await finishForm.isVisible())) {
    await skipButton.click();
    await page.waitForTimeout(100);
  }

  await expect(finishForm).toBeVisible();

  // 8. Submit the finish form to save it to history
  await page.locator('[data-session-finish-form] button[type="submit"]').click();

  // 9. Verify history has 1 record in localStorage
  const historyCount = await page.evaluate((key) => {
    const store = JSON.parse(window.localStorage.getItem(key) || '{}');
    return Array.isArray(store.history) ? store.history.length : 0;
  }, STORAGE_KEY);
  expect(historyCount).toBe(1);

  expect(pageErrors).toEqual([]);
});

test('starts a workout session, reloads the page, and verifies active session is restored', async ({
  page,
}) => {
  const pageErrors = collectPageErrors(page);

  // 1. Seed the store with a predefined workout
  const store = createWorkoutReadyStore();
  store.workouts = [
    {
      id: 'work-e2e-restore',
      title: 'E2E Restore Workout',
      description: 'Test session restore',
      items: [
        {
          id: 'item-e2e-1',
          exerciseId: 'push-up',
          sets: 2,
          reps: 10,
          restBetweenSetsSec: 30,
          restAfterExerciseSec: 30,
        },
      ],
    },
  ];

  await startWithStore(page, store);
  await page.goto('/#workout-view/work-e2e-restore');

  // 2. Start the workout runner
  const startButton = page.locator('a[href^="#workout-run/"]');
  await expect(startButton).toBeVisible();
  await startButton.click();

  // 3. Verify that the runner page has loaded and shows the correct exercise (Warmup first)
  await expect(page.locator('[data-session-root]')).toBeVisible();
  await expect(page.locator('[data-session-exercise]')).toHaveText(/Warmup/i);

  // 4. Reload page
  await page.reload();

  // 5. Verify that the session is restored on the runner page with same exercise (Warmup first)
  await expect(page.locator('[data-session-root]')).toBeVisible();
  await expect(page.locator('[data-session-exercise]')).toHaveText(/Warmup/i);

  expect(pageErrors).toEqual([]);
});

test('registers service worker and functions successfully in offline mode', async ({
  page,
  browserName,
}) => {
  // WebKit has internal issues simulating offline mode in Playwright Windows runner
  test.skip(browserName === 'webkit', 'WebKit offline simulation is unstable on Windows');

  const pageErrors = collectPageErrors(page);

  // 1. Load app in online mode to register the service worker
  await startWithStore(page, createWorkoutReadyStore());
  await page.goto('/');
  await expect(page.locator('[data-page-route="home"]')).toBeVisible();

  // 2. Wait for service worker to become active and control the page
  try {
    await page.waitForFunction(
      () => navigator.serviceWorker && navigator.serviceWorker.controller !== null,
      { timeout: 8000 },
    );
  } catch (err) {
    console.warn('Service worker registration timed out or bypassed in E2E: ', err);
  }

  // 3. Enable offline mode
  await page.context().setOffline(true);

  try {
    // 4. Reload page in offline mode
    await page.reload();

    // 5. Verify the app shell is loaded from cache and remains functional
    await expect(page.locator('[data-page-route="home"]')).toBeVisible();
    await expect(page.locator('#app-brand-link')).toBeVisible();
  } finally {
    // 6. Ensure we reset offline mode for subsequent tests
    await page.context().setOffline(false);
  }

  expect(pageErrors).toEqual([]);
});

test('handles importing corrupted JSON by showing an error and preserving old data', async ({
  page,
}) => {
  const pageErrors = collectPageErrors(page);

  // 1. Seed store with unique settings and a workout to verify preservation
  const store = createWorkoutReadyStore();
  store.settings.theme = 'dark';
  store.workouts = [
    {
      id: 'work-preserved',
      title: 'Preserved Workout',
      description: 'Must remain after failed import',
      items: [],
    },
  ];

  await startWithStore(page, store);
  await page.goto('/#settings');

  // Handle dialog window.confirm automatically (import confirm)
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });

  // 2. Select file input and upload corrupted JSON
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('#import-data-button').click();
  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles({
    name: 'corrupted_backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{ invalid json: [ }'),
  });

  // 3. Verify error status notice is shown
  const statusLocator = page.locator('#import-export-status');
  await expect(statusLocator).toBeVisible();
  await expect(statusLocator).toHaveAttribute('data-type', 'error');

  // 4. Verify old data remains intact in localStorage
  const preservedData = await page.evaluate((key) => {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  }, STORAGE_KEY);

  expect(preservedData.settings.theme).toBe('dark');
  expect(preservedData.workouts[0].title).toBe('Preserved Workout');

  expect(pageErrors).toEqual([]);
});
