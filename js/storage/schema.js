/**
 * @module js/storage/schema
 */
/**
 * Shared storage key constant.
 * @type {string}
 */
export const STORAGE_KEY = 'workout-tracker:data';
/**
 * Shared storage version constant.
 * @type {number}
 */
export const STORAGE_VERSION = 6;
/**
 * Shared min supported storage version constant.
 * @type {number}
 */
export const MIN_SUPPORTED_STORAGE_VERSION = 1;
/**
 * Shared export data keys constant.
 * @type {Array}
 */
export const EXPORT_DATA_KEYS = [
  'settings',
  'profile',
  'equipment',
  'customExercises',
  'workouts',
  'history',
];
/**
 * Shared legacy import data keys constant.
 * @type {Array}
 */
export const LEGACY_IMPORT_DATA_KEYS = ['favorites', 'customAudio'];
/**
 * Shared import data keys constant.
 * @type {Array}
 */
export const IMPORT_DATA_KEYS = [...EXPORT_DATA_KEYS, ...LEGACY_IMPORT_DATA_KEYS];

/**
 * Shared execution modes constant.
 * @type {Array}
 */
export const EXECUTION_MODES = ['reps', 'time', 'hold', 'custom'];
/**
 * Shared history statuses constant.
 * @type {Array}
 */
export const HISTORY_STATUSES = ['completed', 'aborted', 'interrupted'];
/**
 * Shared languages constant.
 * @type {Array}
 */
export const LANGUAGES = ['ru', 'en'];
/**
 * Shared themes constant.
 * @type {Array}
 */
export const THEMES = ['light', 'dark', 'system'];
/**
 * Shared densities constant.
 * @type {Array}
 */
export const DENSITIES = ['comfortable', 'compact'];
/**
 * Shared calendar view modes constant.
 * @type {Array}
 */
export const CALENDAR_VIEW_MODES = ['month', 'week'];
/**
 * Shared profile sexes constant.
 * @type {Array}
 */
export const PROFILE_SEXES = ['male', 'female'];
/**
 * Shared profile training levels constant.
 * @type {Array}
 */
export const PROFILE_TRAINING_LEVELS = ['beginner', 'intermediate', 'advanced'];
/**
 * Shared profile goals constant.
 * @type {Array}
 */
export const PROFILE_GOALS = [
  'strength',
  'hypertrophy',
  'endurance',
  'fat-loss',
  'general-fitness',
];
/**
 * Shared profile scoring goals constant.
 * @type {Array}
 */
export const PROFILE_SCORING_GOALS = [
  'strength',
  'hypertrophy',
  'endurance',
  'fatLoss',
  'mobility',
];
/**
 * Shared profile body focus goals constant.
 * @type {Array}
 */
export const PROFILE_BODY_FOCUS_GOALS = [
  'upperBody',
  'lowerBody',
  'vTaper',
  'core',
  'arms',
  'glutes',
];
/**
 * Shared profile recovery areas constant.
 * @type {Array}
 */
export const PROFILE_RECOVERY_AREAS = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];

/**
 * Shared audio events constant.
 * @type {Array}
 */
export const AUDIO_EVENTS = [
  'tick',
  'phaseChange',
  'exerciseStart',
  'restStart',
  'restEnd',
  'exerciseComplete',
  'workoutComplete',
];

/**
 * Shared storage meta constant.
 * @type {Readonly<object>}
 */
export const STORAGE_META = Object.freeze({
  key: STORAGE_KEY,
  version: STORAGE_VERSION,
});

/**
 * Shared import modes constant.
 * @type {Readonly<object>}
 */
export const IMPORT_MODES = Object.freeze({
  MERGE: 'merge',
  REPLACE: 'replace',
});

/**
 * Shared default settings constant.
 * @type {Readonly<object>}
 */
export const DEFAULT_SETTINGS = Object.freeze({
  language: 'ru',
  theme: 'system',
  density: 'comfortable',
  soundEnabled: true,
  volume: 0.7,
  customAudio: {},
  favoriteExerciseIds: [],
  calendarViewMode: 'month',
  lastOpenedWorkoutId: null,
});

/**
 * Shared default profile constant.
 * @type {Readonly<object>}
 */
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
  goals: Object.freeze({
    strength: 0,
    hypertrophy: 0,
    endurance: 0,
    fatLoss: 0,
    mobility: 0,
  }),
  bodyFocusGoals: Object.freeze({
    upperBody: 0,
    lowerBody: 0,
    vTaper: 0,
    core: 0,
    arms: 0,
    glutes: 0,
  }),
  limitations: [],
  dislikedExercises: [],
  likedTags: [],
  sessionDurationMin: null,
  frequencyPerWeek: null,
  recoveryProfile: Object.freeze({
    chest: 0,
    back: 0,
    legs: 0,
    shoulders: 0,
    arms: 0,
    core: 0,
  }),
  recentHistory: Object.freeze({
    performedExerciseIds: [],
    performedMovementPatterns: {},
  }),
});

/**
 * Shared default equipment constant.
 * @type {Readonly<object>}
 */
export const DEFAULT_EQUIPMENT = Object.freeze({
  selectedIds: [],
  customItems: [],
});

/**
 * Shared default store constant.
 * @type {Readonly<object>}
 */
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
