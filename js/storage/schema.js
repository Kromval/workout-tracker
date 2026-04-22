export const STORAGE_KEY = 'workout-tracker:data';
export const STORAGE_VERSION = 3;
export const MIN_SUPPORTED_STORAGE_VERSION = 1;
export const EXPORT_DATA_KEYS = [
  'settings',
  'customExercises',
  'workouts',
  'history',
];
export const LEGACY_IMPORT_DATA_KEYS = [
  'favorites',
  'customAudio',
];
export const IMPORT_DATA_KEYS = [
  ...EXPORT_DATA_KEYS,
  ...LEGACY_IMPORT_DATA_KEYS,
];

export const EXECUTION_MODES = ['reps', 'time', 'hold', 'custom'];
export const HISTORY_STATUSES = ['completed', 'aborted', 'interrupted'];
export const LANGUAGES = ['ru', 'en'];
export const THEMES = ['light', 'dark', 'system'];
export const CALENDAR_VIEW_MODES = ['month', 'week'];

export const AUDIO_EVENTS = [
  'tick',
  'phaseChange',
  'exerciseStart',
  'restStart',
  'restEnd',
  'exerciseComplete',
  'workoutComplete',
];

export const STORAGE_META = Object.freeze({
  key: STORAGE_KEY,
  version: STORAGE_VERSION,
});

export const IMPORT_MODES = Object.freeze({
  MERGE: 'merge',
  REPLACE: 'replace',
});

export const DEFAULT_SETTINGS = Object.freeze({
  language: 'ru',
  theme: 'system',
  soundEnabled: true,
  volume: 0.7,
  customAudio: {},
  favoriteExerciseIds: [],
  calendarViewMode: 'month',
  lastOpenedWorkoutId: null,
});

export const DEFAULT_STORE = Object.freeze({
  version: STORAGE_VERSION,
  settings: DEFAULT_SETTINGS,
  customExercises: [],
  workouts: [],
  history: [],
  activeSession: null,
});

