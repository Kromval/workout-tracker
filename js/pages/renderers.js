export { renderListItem } from './components.js';
export { renderWorkoutDraftItem } from './form-renderers.js';

export {
  renderHomePage,
  renderHomeOverviewRegion,
  renderHomeActivityRegion,
  renderHomeUserWorkoutsRegion,
  renderHomePresetWorkoutsRegion,
} from './home-page-renderers.js';

export {
  renderExercisesPage,
  renderExerciseViewPage,
  renderExerciseCreatePage,
  renderExerciseEditPage,
  renderExercisesCatalogRegion,
} from './exercise-page-renderers.js';

export {
  renderRecommendationsPage,
  renderRecommendationsContentRegion,
} from './recommendation-page-renderers.js';

export {
  renderWorkoutCreatePage,
  renderWorkoutGeneratePage,
  renderWorkoutEditPage,
  renderWorkoutViewPage,
  renderWorkoutRunPage,
  renderWorkoutViewContentRegion,
} from './workout-page-renderers.js';

export {
  renderSettingsPage,
  renderSettingsInterfaceRegion,
  renderSettingsProfileRegion,
  renderSettingsEquipmentRegion,
  renderSettingsAudioRegion,
} from './settings-page-renderers.js';

import { renderHomePage } from './home-page-renderers.js';
import {
  renderExercisesPage,
  renderExerciseViewPage,
  renderExerciseCreatePage,
  renderExerciseEditPage,
} from './exercise-page-renderers.js';
import { renderRecommendationsPage } from './recommendation-page-renderers.js';
import {
  renderWorkoutCreatePage,
  renderWorkoutGeneratePage,
  renderWorkoutEditPage,
  renderWorkoutRunPage,
  renderWorkoutViewPage,
} from './workout-page-renderers.js';
import { renderSettingsPage } from './settings-page-renderers.js';

export const pageRenderers = {
  home: renderHomePage,
  exercises: renderExercisesPage,
  recommendations: renderRecommendationsPage,
  'exercise-create': renderExerciseCreatePage,
  'exercise-edit': renderExerciseEditPage,
  'exercise-view': renderExerciseViewPage,
  'workout-create': renderWorkoutCreatePage,
  'workout-generate': renderWorkoutGeneratePage,
  'workout-edit': renderWorkoutEditPage,
  'workout-view': renderWorkoutViewPage,
  'workout-run': renderWorkoutRunPage,
  settings: renderSettingsPage,
};
