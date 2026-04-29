/**
 * @module js/session/model
 */
/**
 * Shared session statuses constant.
 * @type {*}
 */
export const SESSION_STATUSES = Object.freeze({
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ABORTED: 'aborted',
});

/**
 * Shared session phases constant.
 * @type {Readonly<object>}
 */
export const SESSION_PHASES = Object.freeze({
  EXERCISE: 'exercise',
  REST_BETWEEN_SETS: 'rest-between-sets',
  REST_BETWEEN_EXERCISES: 'rest-between-exercises',
  FINISHED: 'finished',
});

/**
 * Shared default rep duration sec constant.
 * @type {number}
 */
export const DEFAULT_REP_DURATION_SEC = 3;
/**
 * Shared default rep tempo constant.
 * @type {Readonly<object>}
 */
export const DEFAULT_REP_TEMPO = Object.freeze({
  eccentric: 1,
  pauseBottom: 1,
  concentric: 1,
  pauseTop: 0,
});
/**
 * Shared tempo fields constant.
 * @type {Array}
 */
export const TEMPO_FIELDS = ['eccentric', 'pauseBottom', 'concentric', 'pauseTop'];
/**
 * Shared rep phase names constant.
 * @type {Readonly<object>}
 */
export const REP_PHASE_NAMES = Object.freeze({
  eccentric: 'eccentric',
  pauseBottom: 'pauseBottom',
  concentric: 'concentric',
  pauseTop: 'pauseTop',
});
/**
 * Shared execution modes constant.
 * @type {Readonly<object>}
 */
export const EXECUTION_MODES = Object.freeze({
  REPS: 'reps',
  TIME: 'time',
  HOLD: 'hold',
  CUSTOM: 'custom',
});
/**
 * Shared step types constant.
 * @type {Readonly<object>}
 */
export const STEP_TYPES = Object.freeze({
  EXERCISE: 'exercise',
  REST_BETWEEN_SETS: 'rest-between-sets',
  REST_AFTER_EXERCISE: 'rest-after-exercise',
});
/**
 * Shared session snapshot version constant.
 * @type {number}
 */
export const SESSION_SNAPSHOT_VERSION = 1;
/**
 * Shared default snapshot save interval ms constant.
 * @type {number}
 */
export const DEFAULT_SNAPSHOT_SAVE_INTERVAL_MS = 5000;
/**
 * Shared restorable statuses constant.
 * @type {Array}
 */
export const RESTORABLE_STATUSES = [SESSION_STATUSES.RUNNING, SESSION_STATUSES.PAUSED];
/**
 * Shared rep phase sequence constant.
 * @type {Readonly<Array>}
 */
export const REP_PHASE_SEQUENCE = Object.freeze([
  { key: REP_PHASE_NAMES.eccentric, name: 'Eccentric', tempoField: 'eccentric' },
  { key: REP_PHASE_NAMES.pauseBottom, name: 'Pause bottom', tempoField: 'pauseBottom' },
  { key: REP_PHASE_NAMES.concentric, name: 'Concentric', tempoField: 'concentric' },
  { key: REP_PHASE_NAMES.pauseTop, name: 'Pause top', tempoField: 'pauseTop' },
]);
/**
 * Shared tick interval ms constant.
 * @type {number}
 */
export const TICK_INTERVAL_MS = 1000;
