import {
  DEFAULT_EQUIPMENT,
  DEFAULT_PROFILE,
  AUDIO_EVENTS,
  CALENDAR_VIEW_MODES,
  DENSITIES,
  DEFAULT_SETTINGS,
  EXECUTION_MODES,
  HISTORY_STATUSES,
  LANGUAGES,
  PROFILE_GOALS,
  PROFILE_BODY_FOCUS_GOALS,
  PROFILE_RECOVERY_AREAS,
  PROFILE_SCORING_GOALS,
  PROFILE_SEXES,
  PROFILE_TRAINING_LEVELS,
  STORAGE_VERSION,
  THEMES,
} from './schema.js';
import {
  asArray,
  clampNumber,
  createId,
  isPlainObject,
  nonNegativeInteger,
  nonNegativeNumber,
  normalizeIsoDate,
  normalizeString,
  nowIso,
  optionalNonNegativeInteger,
  optionalNonNegativeNumber,
  sortByUpdatedAtDesc,
  sortHistoryEntries,
  uniqueStrings,
} from './helpers.js';

export function createLocalizedText(value = '') {
  if (isPlainObject(value)) {
    return {
      ru: normalizeString(value.ru),
      en: normalizeString(value.en),
    };
  }

  return {
    ru: normalizeString(value),
    en: '',
  };
}



export function createExercise(overrides = {}) {
  const now = nowIso();

  return sanitizeExercise({
    id: createId('exercise'),
    createdAt: now,
    updatedAt: now,
    name: createLocalizedText(),
    shortDescription: createLocalizedText(),
    instruction: createLocalizedText(),
    effect: createLocalizedText(),
    type: createLocalizedText(),
    muscles: [],
    tags: [],
    executionMode: 'reps',
    tempo: null,
    estimatedCalories: 0,
    image: '',
    isCustom: true,
    ...overrides,
  });
}



export function createWorkoutItem(overrides = {}) {
  return sanitizeWorkoutItem({
    id: createId('workout-item'),
    exerciseId: '',
    sets: 1,
    reps: null,
    durationSec: null,
    distance: null,
    restBetweenSetsSec: 60,
    restAfterExerciseSec: null,
    tempoOverride: null,
    notes: '',
    order: 0,
    ...overrides,
  });
}



export function createWorkout(overrides = {}) {
  const now = nowIso();

  return sanitizeWorkout({
    id: createId('workout'),
    title: '',
    description: '',
    createdAt: now,
    updatedAt: now,
    isPreset: false,
    items: [],
    defaultRestBetweenExercises: 90,
    themeColor: '',
    tags: [],
    ...overrides,
  });
}



export function createHistoryEntry(overrides = {}) {
  const now = nowIso();
  const startedAt = normalizeString(overrides.startedAt) || nowIso();
  const endedAt = normalizeString(overrides.endedAt) || startedAt;

  return sanitizeHistoryEntry({
    id: createId('history'),
    createdAt: now,
    updatedAt: now,
    workoutId: '',
    workoutTitleSnapshot: '',
    startedAt,
    endedAt,
    durationSec: 0,
    status: 'completed',
    completedItems: [],
    note: '',
    ratingEmoji: '',
    estimatedCaloriesBurned: 0,
    totalExercisesCompleted: 0,
    totalSetsCompleted: 0,
    ...overrides,
  });
}



export function createSettings(overrides = {}) {
  return sanitizeSettings({
    ...DEFAULT_SETTINGS,
    ...overrides,
  });
}

export function createProfile(overrides = {}) {
  return sanitizeProfile({
    ...DEFAULT_PROFILE,
    ...overrides,
  });
}

export function createEquipmentItem(overrides = {}) {
  const now = nowIso();

  return sanitizeEquipmentItem({
    id: createId('equipment'),
    name: '',
    createdAt: now,
    updatedAt: now,
    isCustom: true,
    ...overrides,
  });
}

export function createEquipment(overrides = {}) {
  return sanitizeEquipment({
    ...DEFAULT_EQUIPMENT,
    ...overrides,
  });
}



export function validateWorkoutForSave(workout) {
  const errors = [];
  const source = isPlainObject(workout) ? workout : {};
  const items = asArray(source.items);

  if (normalizeString(source.title).length === 0) {
    errors.push('Workout title is required.');
  }

  if (items.length === 0) {
    errors.push('Workout must contain at least one exercise.');
  }

  items.forEach((item, index) => {
    const label = `Workout item #${index + 1}`;
    const hasReps = Number.isInteger(item.reps) && item.reps > 0;
    const hasDuration = Number.isInteger(item.durationSec) && item.durationSec > 0;

    if (normalizeString(item.exerciseId).length === 0) {
      errors.push(`${label}: exerciseId is required.`);
    }

    if (hasReps === hasDuration) {
      errors.push(`${label}: set either positive reps or positive durationSec.`);
    }
  });

  if (errors.length > 0) {
    const error = new Error(errors.join(' '));
    error.name = 'WorkoutValidationError';
    error.details = errors;
    throw error;
  }
}



export function sanitizeStore(store) {
  const source = isPlainObject(store) ? store : {};
  const settings = createSettings(source.settings);

  return {
    version: STORAGE_VERSION,
    settings,
    profile: createProfile(source.profile),
    equipment: createEquipment(source.equipment),
    customExercises: sortByUpdatedAtDesc(asArray(source.customExercises).map(sanitizeCustomExercise)),
    workouts: sortByUpdatedAtDesc(asArray(source.workouts).map(sanitizeWorkout)),
    history: sortHistoryEntries(asArray(source.history).map(sanitizeHistoryEntry)),
    activeSession: sanitizeActiveSession(source.activeSession),
  };
}



export function sanitizeSettings(settings) {
  const source = isPlainObject(settings) ? settings : {};
  const language = LANGUAGES.includes(source.language) ? source.language : DEFAULT_SETTINGS.language;
  const theme = THEMES.includes(source.theme) ? source.theme : DEFAULT_SETTINGS.theme;
  const density = DENSITIES.includes(source.density) ? source.density : DEFAULT_SETTINGS.density;
  const calendarViewMode = CALENDAR_VIEW_MODES.includes(source.calendarViewMode)
    ? source.calendarViewMode
    : DEFAULT_SETTINGS.calendarViewMode;

  return {
    language,
    theme,
    density,
    soundEnabled: typeof source.soundEnabled === 'boolean'
      ? source.soundEnabled
      : DEFAULT_SETTINGS.soundEnabled,
    volume: clampNumber(source.volume, 0, 1, DEFAULT_SETTINGS.volume),
    customAudio: sanitizeCustomAudio(source.customAudio),
    favoriteExerciseIds: uniqueStrings(source.favoriteExerciseIds),
    calendarViewMode,
    lastOpenedWorkoutId: source.lastOpenedWorkoutId ? normalizeString(source.lastOpenedWorkoutId) : null,
  };
}

export function sanitizeProfile(profile) {
  const source = isPlainObject(profile) ? profile : {};
  const goals = sanitizeProfileGoals(source.goals, source.goal);
  const bodyFocusGoals = sanitizeBodyFocusGoals(source.bodyFocusGoals);
  const trainingLevel = PROFILE_TRAINING_LEVELS.includes(source.trainingLevel) ? source.trainingLevel : '';

  return {
    age: optionalNonNegativeInteger(source.age),
    sex: PROFILE_SEXES.includes(source.sex) ? source.sex : '',
    weightKg: optionalNonNegativeNumber(source.weightKg),
    heightCm: optionalNonNegativeNumber(source.heightCm),
    bodyFatPercent: source.bodyFatPercent === null || source.bodyFatPercent === undefined || source.bodyFatPercent === ''
      ? null
      : clampNumber(source.bodyFatPercent, 0, 100, null),
    wristCm: optionalNonNegativeNumber(source.wristCm),
    waistCm: optionalNonNegativeNumber(source.waistCm),
    neckCm: optionalNonNegativeNumber(source.neckCm),
    chestCm: optionalNonNegativeNumber(source.chestCm),
    hipsCm: optionalNonNegativeNumber(source.hipsCm),
    forearmCm: optionalNonNegativeNumber(source.forearmCm),
    calfCm: optionalNonNegativeNumber(source.calfCm),
    trainingLevel,
    goal: sanitizeLegacyGoal(source.goal, goals),
    goals,
    bodyFocusGoals,
    limitations: sanitizeProfileTokenList(source.limitations),
    dislikedExercises: uniqueStrings(source.dislikedExercises),
    likedTags: sanitizeProfileTokenList(source.likedTags),
    sessionDurationMin: optionalNonNegativeInteger(source.sessionDurationMin),
    frequencyPerWeek: optionalNonNegativeInteger(source.frequencyPerWeek),
    recoveryProfile: sanitizeRecoveryProfile(source.recoveryProfile),
    recentHistory: sanitizeRecentHistory(source.recentHistory),
  };
}

export function sanitizeEquipment(equipment) {
  const source = isPlainObject(equipment) ? equipment : {};

  return {
    selectedIds: uniqueStrings(source.selectedIds),
    customItems: sortByUpdatedAtDesc(
      asArray(source.customItems)
        .map(sanitizeEquipmentItem)
        .filter((item) => Boolean(item.name))
    ),
  };
}

export function sanitizeEquipmentItem(item) {
  const source = isPlainObject(item) ? item : {};
  const createdAt = normalizeIsoDate(source.createdAt, nowIso());

  return {
    id: normalizeString(source.id) || createId('equipment'),
    name: normalizeString(source.name),
    createdAt,
    updatedAt: normalizeIsoDate(source.updatedAt, createdAt),
    isCustom: source.isCustom !== false,
  };
}



export function sanitizeExercise(exercise) {
  const source = isPlainObject(exercise) ? exercise : {};
  const createdAt = normalizeIsoDate(source.createdAt, nowIso());

  return {
    id: normalizeString(source.id) || createId('exercise'),
    createdAt,
    updatedAt: normalizeIsoDate(source.updatedAt, createdAt),
    name: createLocalizedText(source.name),
    shortDescription: createLocalizedText(source.shortDescription),
    instruction: createLocalizedText(source.instruction),
    effect: createLocalizedText(source.effect),
    type: createLocalizedText(source.type),
    muscles: uniqueStrings(source.muscles),
    tags: uniqueStrings(source.tags),
    executionMode: EXECUTION_MODES.includes(source.executionMode) ? source.executionMode : 'reps',
    tempo: sanitizeTempo(source.tempo),
    estimatedCalories: nonNegativeNumber(source.estimatedCalories, 0),
    image: normalizeString(source.image),
    isCustom: source.isCustom !== false,
  };
}



export function sanitizeCustomExercise(exercise) {
  return {
    ...sanitizeExercise(exercise),
    isCustom: true,
  };
}



export function sanitizeWorkout(workout) {
  const source = isPlainObject(workout) ? workout : {};

  return {
    id: normalizeString(source.id) || createId('workout'),
    title: normalizeString(source.title),
    description: normalizeString(source.description),
    createdAt: normalizeIsoDate(source.createdAt, nowIso()),
    updatedAt: normalizeIsoDate(source.updatedAt, nowIso()),
    isPreset: Boolean(source.isPreset),
    items: asArray(source.items)
      .map(sanitizeWorkoutItem)
      .sort((left, right) => left.order - right.order)
      .map((item, order) => ({ ...item, order })),
    defaultRestBetweenExercises: nonNegativeInteger(source.defaultRestBetweenExercises, 90),
    themeColor: normalizeString(source.themeColor),
    tags: uniqueStrings(source.tags),
  };
}



export function sanitizeWorkoutItem(item) {
  const source = isPlainObject(item) ? item : {};

  return {
    id: normalizeString(source.id) || createId('workout-item'),
    exerciseId: normalizeString(source.exerciseId),
    sets: Math.max(1, nonNegativeInteger(source.sets, 1)),
    reps: optionalNonNegativeInteger(source.reps),
    durationSec: optionalNonNegativeInteger(source.durationSec),
    distance: optionalNonNegativeNumber(source.distance),
    restBetweenSetsSec: nonNegativeInteger(source.restBetweenSetsSec, 60),
    restAfterExerciseSec: optionalNonNegativeInteger(source.restAfterExerciseSec),
    tempoOverride: sanitizeTempo(source.tempoOverride),
    notes: normalizeString(source.notes),
    order: nonNegativeInteger(source.order, 0),
  };
}



export function sanitizeHistoryEntry(entry) {
  const source = isPlainObject(entry) ? entry : {};
  const startedAt = normalizeIsoDate(source.startedAt, nowIso());
  const endedAt = normalizeIsoDate(source.endedAt, startedAt);
  const createdAt = normalizeIsoDate(source.createdAt, startedAt);

  return {
    id: normalizeString(source.id) || createId('history'),
    createdAt,
    updatedAt: normalizeIsoDate(source.updatedAt, endedAt),
    workoutId: normalizeString(source.workoutId),
    workoutTitleSnapshot: normalizeString(source.workoutTitleSnapshot),
    startedAt,
    endedAt,
    durationSec: nonNegativeInteger(source.durationSec, 0),
    status: HISTORY_STATUSES.includes(source.status) ? source.status : 'completed',
    completedItems: asArray(source.completedItems).map(sanitizeCompletedItem),
    note: normalizeString(source.note),
    ratingEmoji: normalizeString(source.ratingEmoji),
    estimatedCaloriesBurned: nonNegativeNumber(source.estimatedCaloriesBurned, 0),
    totalExercisesCompleted: nonNegativeInteger(source.totalExercisesCompleted, 0),
    totalSetsCompleted: nonNegativeInteger(source.totalSetsCompleted, 0),
  };
}



export function sanitizeCompletedItem(item) {
  const source = isPlainObject(item) ? item : {};

  return {
    workoutItemId: normalizeString(source.workoutItemId),
    exerciseId: normalizeString(source.exerciseId),
    exerciseNameSnapshot: createLocalizedText(source.exerciseNameSnapshot),
    setsCompleted: nonNegativeInteger(source.setsCompleted, 0),
    repsCompleted: optionalNonNegativeInteger(source.repsCompleted),
    durationSec: optionalNonNegativeInteger(source.durationSec),
    skipped: Boolean(source.skipped),
    note: normalizeString(source.note),
  };
}



export function sanitizeTempo(tempo) {
  if (!isPlainObject(tempo)) {
    return null;
  }

  return {
    eccentric: nonNegativeNumber(tempo.eccentric, 0),
    concentric: nonNegativeNumber(tempo.concentric, 0),
    pauseTop: nonNegativeNumber(tempo.pauseTop, 0),
    pauseBottom: nonNegativeNumber(tempo.pauseBottom, 0),
  };
}



export function sanitizeCustomAudio(customAudio) {
  if (!isPlainObject(customAudio)) {
    return {};
  }

  return AUDIO_EVENTS.reduce((result, eventName) => {
    const audioEntry = sanitizeCustomAudioEntry(customAudio[eventName]);

    if (audioEntry) {
      result[eventName] = audioEntry;
    }

    return result;
  }, {});
}



export function sanitizeCustomAudioEntry(value) {
  if (typeof value === 'string') {
    return normalizeAudioDataUrl(value);
  }

  if (!isPlainObject(value)) {
    return null;
  }

  const dataUrl = normalizeAudioDataUrl(value.dataUrl);

  if (!dataUrl) {
    return null;
  }

  return {
    name: normalizeString(value.name) || 'Custom audio',
    type: normalizeAudioMime(value.type) || getDataUrlMime(dataUrl),
    size: nonNegativeInteger(value.size, 0),
    dataUrl,
    updatedAt: normalizeIsoDate(value.updatedAt, nowIso()),
  };
}



export function normalizeAudioDataUrl(value) {
  const dataUrl = normalizeString(value);

  if (!dataUrl.startsWith('data:audio/') || !dataUrl.includes(';base64,')) {
    return '';
  }

  return dataUrl;
}



export function normalizeAudioMime(value) {
  const mime = normalizeString(value).toLowerCase();
  return ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/ogg'].includes(mime) ? mime : '';
}



export function getDataUrlMime(dataUrl) {
  const match = dataUrl.match(/^data:([^;,]+)[;,]/);
  return match ? normalizeAudioMime(match[1]) : '';
}



export function sanitizeActiveSession(session) {
  if (!isPlainObject(session)) {
    return null;
  }

  const status = normalizeString(session.status);
  const steps = asArray(session.steps).map((step) => ({
    id: normalizeString(step?.id),
    durationSec: nonNegativeInteger(step?.durationSec, 0),
  }));
  const currentStepIndex = nonNegativeInteger(session.currentStepIndex, -1);
  const currentStep = steps[currentStepIndex];
  const remainingSec = nonNegativeInteger(session.currentStep?.remainingSec ?? session.remainingSec, -1);

  if (
    !['running', 'paused'].includes(status)
    || !isPlainObject(session.workout)
    || steps.length === 0
    || currentStepIndex < 0
    || currentStepIndex >= steps.length
    || !currentStep?.id
    || remainingSec < 0
    || remainingSec > currentStep.durationSec
  ) {
    return null;
  }

  return {
    version: nonNegativeInteger(session.version, 1) || 1,
    savedAt: normalizeIsoDate(session.savedAt, nowIso()),
    status,
    workout: sanitizeWorkout(session.workout),
    steps,
    currentStepIndex,
    remainingSec,
    elapsedSec: nonNegativeInteger(session.elapsedSec, 0),
    startedAt: normalizeIsoDate(session.startedAt, nowIso()),
  };
}

function sanitizeProfileGoals(goals, legacyGoal) {
  const source = isPlainObject(goals) ? goals : {};
  const result = PROFILE_SCORING_GOALS.reduce((accumulator, goalId) => ({
    ...accumulator,
    [goalId]: clampNumber(source[goalId], 0, 1, 0),
  }), {});

  if (PROFILE_SCORING_GOALS.some((goalId) => result[goalId] > 0)) {
    return result;
  }

  const legacyWeights = getLegacyGoalWeights(legacyGoal);
  return {
    ...result,
    ...legacyWeights,
  };
}

function sanitizeBodyFocusGoals(bodyFocusGoals) {
  const source = isPlainObject(bodyFocusGoals) ? bodyFocusGoals : {};

  return PROFILE_BODY_FOCUS_GOALS.reduce((result, goalId) => ({
    ...result,
    [goalId]: clampNumber(source[goalId], 0, 1, 0),
  }), {});
}

function getLegacyGoalWeights(goal) {
  const normalizedGoal = normalizeString(goal);

  if (normalizedGoal === 'general-fitness') {
    return {
      strength: 0.5,
      hypertrophy: 0.4,
      endurance: 0.5,
      fatLoss: 0.4,
      mobility: 0.4,
    };
  }

  if (normalizedGoal === 'fat-loss') {
    return { fatLoss: 1 };
  }

  if (PROFILE_SCORING_GOALS.includes(normalizedGoal)) {
    return { [normalizedGoal]: 1 };
  }

  return {};
}

function sanitizeLegacyGoal(goal, goals) {
  const normalizedGoal = normalizeString(goal);

  if (PROFILE_GOALS.includes(normalizedGoal)) {
    return normalizedGoal;
  }

  const rankedGoals = Object.entries(goals)
    .filter(([, weight]) => weight > 0)
    .sort((left, right) => right[1] - left[1]);
  const topGoal = rankedGoals[0]?.[0] || '';

  if (!topGoal) {
    return '';
  }

  if (topGoal === 'fatLoss') {
    return 'fat-loss';
  }

  return PROFILE_GOALS.includes(topGoal) ? topGoal : 'general-fitness';
}

function sanitizeProfileTokenList(value) {
  return uniqueStrings(
    (Array.isArray(value) ? value : normalizeString(value).split(/[\n,;]+/))
      .map((item) => normalizeString(item).toLowerCase().replaceAll(' ', '-'))
  );
}

function sanitizeRecoveryProfile(recoveryProfile) {
  const source = isPlainObject(recoveryProfile) ? recoveryProfile : {};

  return PROFILE_RECOVERY_AREAS.reduce((result, area) => ({
    ...result,
    [area]: clampNumber(source[area], 0, 1, 0),
  }), {});
}

function sanitizeRecentHistory(recentHistory) {
  const source = isPlainObject(recentHistory) ? recentHistory : {};
  const performedMovementPatterns = isPlainObject(source.performedMovementPatterns)
    ? Object.entries(source.performedMovementPatterns).reduce((result, [pattern, count]) => {
      const normalizedPattern = normalizeString(pattern).toLowerCase().replaceAll(' ', '-');

      if (!normalizedPattern) {
        return result;
      }

      result[normalizedPattern] = nonNegativeInteger(count, 0);
      return result;
    }, {})
    : {};

  return {
    performedExerciseIds: uniqueStrings(source.performedExerciseIds),
    performedMovementPatterns,
  };
}
