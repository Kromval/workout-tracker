import {
  DEFAULT_STORE,
  MIN_SUPPORTED_STORAGE_VERSION,
  STORAGE_VERSION,
} from './schema.js';
import {
  clone,
  isPlainObject,
  nonNegativeInteger,
  normalizeString,
  uniqueStrings,
} from './helpers.js';
import { sanitizeCustomAudio, sanitizeStore } from './records.js';

const MIGRATIONS = Object.freeze({
  1: migrateV1ToV2,
  2: migrateV2ToV3,
  3: migrateV3ToV4,
  4: migrateV4ToV5,
  5: migrateV5ToV6,
});

export function migrateStore(store) {
  const source = isPlainObject(store) ? clone(store) : clone(DEFAULT_STORE);
  let version = getStorageVersion(source.version);
  let nextStore = source;

  if (version > STORAGE_VERSION) {
    console.warn(
      `Stored workout tracker data is from a newer schema (${version}). Current schema is ${STORAGE_VERSION}.`
    );
    return sanitizeStore(nextStore);
  }

  while (version < STORAGE_VERSION) {
    const migration = MIGRATIONS[version];

    if (typeof migration !== 'function') {
      throw new Error(`Missing workout tracker storage migration from v${version} to v${version + 1}.`);
    }

    nextStore = migration(nextStore);
    version = getStorageVersion(nextStore.version);
  }

  return sanitizeStore(nextStore);
}

export function isFutureStorageVersion(store) {
  return isPlainObject(store) && getStorageVersion(store.version) > STORAGE_VERSION;
}

export function getStorageVersion(version) {
  const normalized = nonNegativeInteger(version, MIN_SUPPORTED_STORAGE_VERSION);
  return normalized >= MIN_SUPPORTED_STORAGE_VERSION ? normalized : MIN_SUPPORTED_STORAGE_VERSION;
}

function migrateV1ToV2(store) {
  const nextStore = {
    ...clone(DEFAULT_STORE),
    ...clone(store),
    version: 2,
  };

  const settings = isPlainObject(nextStore.settings) ? nextStore.settings : {};
  const favoriteExerciseIds = uniqueStrings([
    ...uniqueStrings(settings.favoriteExerciseIds),
    ...uniqueStrings(nextStore.favorites),
  ]);
  const customAudio = sanitizeCustomAudio({
    ...(isPlainObject(settings.customAudio) ? settings.customAudio : {}),
    ...(isPlainObject(nextStore.customAudio) ? nextStore.customAudio : {}),
  });

  nextStore.settings = {
    ...settings,
    favoriteExerciseIds,
    customAudio,
  };
  nextStore.favorites = favoriteExerciseIds;
  nextStore.customAudio = customAudio;
  nextStore.activeSession = migrateV1ActiveSession(nextStore.activeSession);

  return nextStore;
}

function migrateV2ToV3(store) {
  const nextStore = {
    ...clone(DEFAULT_STORE),
    ...clone(store),
    version: 3,
  };

  const settings = isPlainObject(nextStore.settings) ? nextStore.settings : {};
  nextStore.settings = {
    ...settings,
    favoriteExerciseIds: uniqueStrings([
      ...uniqueStrings(settings.favoriteExerciseIds),
      ...uniqueStrings(nextStore.favorites),
    ]),
    customAudio: sanitizeCustomAudio({
      ...(isPlainObject(settings.customAudio) ? settings.customAudio : {}),
      ...(isPlainObject(nextStore.customAudio) ? nextStore.customAudio : {}),
    }),
  };

  delete nextStore.favorites;
  delete nextStore.customAudio;

  return nextStore;
}

function migrateV1ActiveSession(session) {
  if (!isPlainObject(session)) {
    return null;
  }

  const currentStep = isPlainObject(session.currentStep) ? session.currentStep : null;
  const remainingSec = session.remainingSec ?? currentStep?.remainingSec;

  return {
    ...session,
    version: nonNegativeInteger(session.version, 1) || 1,
    status: normalizeString(session.status),
    currentStepIndex: nonNegativeInteger(session.currentStepIndex, -1),
    remainingSec: nonNegativeInteger(remainingSec, -1),
  };
}

function migrateV3ToV4(store) {
  return {
    ...clone(DEFAULT_STORE),
    ...clone(store),
    version: 4,
  };
}

function migrateV4ToV5(store) {
  const nextStore = {
    ...clone(DEFAULT_STORE),
    ...clone(store),
    version: 5,
  };
  const profile = isPlainObject(nextStore.profile) ? nextStore.profile : {};

  nextStore.profile = {
    ...clone(DEFAULT_STORE.profile),
    ...profile,
    goals: migrateLegacyGoals(profile.goal),
    limitations: migrateLegacyLimitations(profile.limitations),
  };

  return nextStore;
}

function migrateV5ToV6(store) {
  const nextStore = {
    ...clone(DEFAULT_STORE),
    ...clone(store),
    version: 6,
  };
  const profile = isPlainObject(nextStore.profile) ? nextStore.profile : {};

  nextStore.profile = {
    ...clone(DEFAULT_STORE.profile),
    ...profile,
    bodyFocusGoals: {
      ...clone(DEFAULT_STORE.profile.bodyFocusGoals),
      ...(isPlainObject(profile.bodyFocusGoals) ? profile.bodyFocusGoals : {}),
    },
  };

  return nextStore;
}

function migrateLegacyGoals(goal) {
  const base = clone(DEFAULT_STORE.profile.goals);
  const normalizedGoal = normalizeString(goal);

  if (!normalizedGoal) {
    return base;
  }

  if (normalizedGoal === 'general-fitness') {
    return {
      ...base,
      strength: 0.5,
      hypertrophy: 0.4,
      endurance: 0.5,
      fatLoss: 0.4,
      mobility: 0.4,
    };
  }

  if (normalizedGoal === 'fat-loss') {
    return {
      ...base,
      fatLoss: 1,
    };
  }

  if (Object.prototype.hasOwnProperty.call(base, normalizedGoal)) {
    return {
      ...base,
      [normalizedGoal]: 1,
    };
  }

  return base;
}

function migrateLegacyLimitations(limitations) {
  if (Array.isArray(limitations)) {
    return limitations;
  }

  return uniqueStrings(normalizeString(limitations).split(/[\n,;]+/));
}
