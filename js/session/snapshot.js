import { getActiveSession, saveActiveSession, clearActiveSession } from '../storage/core.js';
import { RESTORABLE_STATUSES, SESSION_SNAPSHOT_VERSION } from './model.js';
import { normalizeWorkout } from '../features/workouts.js';
import {
  asArray,
  isPlainObject,
  nonNegativeInteger,
  normalizeIsoDate,
  normalizeString,
  nowIso,
  positiveInteger,
} from './utils.js';

export function getSessionSnapshot() {
  const snapshot = normalizeSessionSnapshot(getActiveSession());

  if (!snapshot) {
    discardSessionSnapshot();
  }

  return snapshot;
}



export function saveSessionSnapshot(snapshot) {
  const normalized = normalizeSessionSnapshot(snapshot);

  if (!normalized) {
    discardSessionSnapshot();
    return null;
  }

  return saveActiveSession(normalized);
}



export function discardSessionSnapshot() {
  clearActiveSession();
}



export function createPersistedSessionSnapshot(snapshot) {
  if (!isPlainObject(snapshot) || !RESTORABLE_STATUSES.includes(snapshot.status)) {
    return null;
  }

  return normalizeSessionSnapshot({
    version: SESSION_SNAPSHOT_VERSION,
    savedAt: nowIso(),
    status: snapshot.status,
    workout: snapshot.workout,
    steps: asArray(snapshot.steps).map((step) => ({
      id: normalizeString(step?.id),
      durationSec: nonNegativeInteger(step?.durationSec, 0),
    })),
    currentStepIndex: snapshot.currentStepIndex,
    remainingSec: snapshot.currentStep?.remainingSec ?? snapshot.remainingSec,
    elapsedSec: snapshot.elapsedSec,
    startedAt: snapshot.startedAt,
  });
}



export function normalizeSessionSnapshot(snapshot) {
  if (!isPlainObject(snapshot)) {
    return null;
  }

  const status = normalizeString(snapshot.status);
  const steps = asArray(snapshot.steps).map((step) => ({
    id: normalizeString(step?.id),
    durationSec: nonNegativeInteger(step?.durationSec, 0),
  }));
  const currentStepIndex = nonNegativeInteger(snapshot.currentStepIndex, -1);
  const currentStep = steps[currentStepIndex];
  const remainingSec = nonNegativeInteger(snapshot.currentStep?.remainingSec ?? snapshot.remainingSec, -1);
  const elapsedSec = nonNegativeInteger(snapshot.elapsedSec, 0);

  if (
    !RESTORABLE_STATUSES.includes(status)
    || !isPlainObject(snapshot.workout)
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
    version: positiveInteger(snapshot.version) || SESSION_SNAPSHOT_VERSION,
    savedAt: normalizeIsoDate(snapshot.savedAt, nowIso()),
    status,
    workout: normalizeWorkout(snapshot.workout),
    steps,
    currentStepIndex,
    remainingSec,
    elapsedSec,
    startedAt: normalizeIsoDate(snapshot.startedAt, nowIso()),
  };
}

