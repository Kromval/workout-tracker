export const STORAGE_KEY = 'workout-tracker:data';
export const STORAGE_VERSION = 4;
export const MIN_SUPPORTED_STORAGE_VERSION = 1;
export const EXPORT_DATA_KEYS = [
  'settings',
  'profile',
  'equipment',
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
export const PROFILE_SEXES = ['male', 'female'];
export const PROFILE_TRAINING_LEVELS = ['beginner', 'intermediate', 'advanced'];
export const PROFILE_GOALS = ['strength', 'hypertrophy', 'endurance', 'fat-loss', 'general-fitness'];

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

export const DEFAULT_PROFILE = Object.freeze({
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
  limitations: '',
});

export const DEFAULT_EQUIPMENT = Object.freeze({
  selectedIds: [],
  customItems: [],
});

export const DEFAULT_STORE = Object.freeze({
  version: STORAGE_VERSION,
  settings: DEFAULT_SETTINGS,
  profile: DEFAULT_PROFILE,
  equipment: DEFAULT_EQUIPMENT,
  customExercises: [],
  workouts: [],
  history: [],
  activeSession: null,
});

