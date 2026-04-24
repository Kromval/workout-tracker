export const SESSION_STATUSES = Object.freeze({
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ABORTED: 'aborted',
});

export const SESSION_PHASES = Object.freeze({
  EXERCISE: 'exercise',
  REST_BETWEEN_SETS: 'rest-between-sets',
  REST_BETWEEN_EXERCISES: 'rest-between-exercises',
  FINISHED: 'finished',
});

export const DEFAULT_REP_DURATION_SEC = 3;
export const DEFAULT_REP_TEMPO = Object.freeze({
  eccentric: 1,
  pauseBottom: 0,
  concentric: 1,
  pauseTop: 1,
});
export const TEMPO_FIELDS = ['eccentric', 'pauseBottom', 'concentric', 'pauseTop'];
export const REP_PHASE_NAMES = Object.freeze({
  eccentric: 'eccentric',
  pauseBottom: 'pauseBottom',
  concentric: 'concentric',
  pauseTop: 'pauseTop',
});
export const EXECUTION_MODES = Object.freeze({
  REPS: 'reps',
  TIME: 'time',
  HOLD: 'hold',
  CUSTOM: 'custom',
});
export const STEP_TYPES = Object.freeze({
  EXERCISE: 'exercise',
  REST_BETWEEN_SETS: 'rest-between-sets',
  REST_AFTER_EXERCISE: 'rest-after-exercise',
});
export const SESSION_SNAPSHOT_VERSION = 1;
export const DEFAULT_SNAPSHOT_SAVE_INTERVAL_MS = 5000;
export const RESTORABLE_STATUSES = [SESSION_STATUSES.RUNNING, SESSION_STATUSES.PAUSED];
export const REP_PHASE_SEQUENCE = Object.freeze([
  { key: REP_PHASE_NAMES.eccentric, name: 'Eccentric', tempoField: 'eccentric' },
  { key: REP_PHASE_NAMES.pauseBottom, name: 'Pause bottom', tempoField: 'pauseBottom' },
  { key: REP_PHASE_NAMES.concentric, name: 'Concentric', tempoField: 'concentric' },
  { key: REP_PHASE_NAMES.pauseTop, name: 'Pause top', tempoField: 'pauseTop' },
]);
export const TICK_INTERVAL_MS = 1000;
