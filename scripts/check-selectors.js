import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function main() {
  const selectors = await import(pathToFileURL(path.resolve('js/core/selectors.js')));

  const state = {
    route: 'workout-run',
    exercises: [{
      id: 'builtin-a',
      name: { ru: 'Built in A', en: 'Built in A' },
      type: { ru: 'Type', en: 'Type' },
      muscles: ['chest'],
      tags: [],
      executionMode: 'reps',
    }],
    store: {
      settings: {
        language: 'en',
        theme: 'dark',
        favoriteExerciseIds: ['builtin-a'],
        customAudio: { tick: 'data:audio/wav;base64,AAAA' },
      },
      customExercises: [{
        id: 'custom-a',
        name: { ru: 'Custom A', en: 'Custom A' },
        type: { ru: 'Type', en: 'Type' },
        muscles: ['legs'],
        tags: [],
        executionMode: 'time',
      }],
      workouts: [
        { id: 'workout-a', title: 'Workout A', items: [], isPreset: false },
        { id: 'preset-a', title: 'Preset A', items: [], isPreset: true },
      ],
      history: [{ id: 'history-a' }],
    },
    settings: null,
  };
  state.settings = state.store.settings;

  assert.equal(selectors.selectRoute(state), 'workout-run');
  assert.equal(selectors.selectLanguage(state), 'en');
  assert.equal(selectors.selectTheme(state), 'dark');
  assert.deepEqual(selectors.selectFavoriteExerciseIds(state), ['builtin-a']);
  assert.equal(selectors.selectFavoriteExerciseIdSet(state), selectors.selectFavoriteExerciseIdSet(state));

  const catalog = selectors.selectExerciseCatalog(state);
  assert.deepEqual(catalog.map((exercise) => exercise.id), ['builtin-a', 'custom-a']);
  assert.equal(selectors.selectExerciseCatalog(state), catalog);

  assert.deepEqual(selectors.selectUserWorkouts(state).map((workout) => workout.id), ['workout-a']);
  assert.equal(selectors.selectWorkoutById(state, 'workout-a').id, 'workout-a');
  assert.equal(selectors.selectCustomExerciseCount(state), 1);
  assert.deepEqual(selectors.selectHistory(state), [{ id: 'history-a' }]);

  console.log('selectors ok');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
