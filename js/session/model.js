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
  PREPARE: 'prepare',
  WORK: 'work',
  REST: 'rest',
  TRANSITION: 'transition',
  COOLDOWN: 'cooldown',
  EXERCISE: 'exercise',
  REST_BETWEEN_SETS: 'rest-between-sets',
  REST_BETWEEN_EXERCISES: 'rest-between-exercises',
  FINISHED: 'finished',
});

/**
 * Shared workout block types constant.
 * @type {Readonly<object>}
 */
export const WORKOUT_BLOCK_TYPES = Object.freeze({
  STRAIGHT: 'straight',
  CIRCUIT: 'circuit',
  INTERVAL: 'interval',
  MOBILITY: 'mobility',
});

/**
 * Shared session step types constant.
 * @type {Readonly<object>}
 */
export const SESSION_STEP_TYPES = Object.freeze({
  PREPARE: 'prepare',
  WORK: 'work',
  REST: 'rest',
  TRANSITION: 'transition',
  CUE: 'cue',
  COOLDOWN: 'cooldown',
});

/**
 * Shared session plan version constant.
 * @type {number}
 */
export const SESSION_PLAN_VERSION = 2;

/**
 * Shared session plan schema metadata.
 * @type {Readonly<object>}
 */
export const SESSION_PLAN_SCHEMA = Object.freeze({
  version: SESSION_PLAN_VERSION,
  blockTypes: Object.freeze(Object.values(WORKOUT_BLOCK_TYPES)),
  stepTypes: Object.freeze(Object.values(SESSION_STEP_TYPES)),
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
 * Editable exercise prescription inside a workout block.
 * @typedef {object} WorkoutItem
 * @property {string} id stable item id
 * @property {string} exerciseId referenced exercise id
 * @property {number} sets prescribed set count
 * @property {?number} reps prescribed reps per set
 * @property {?number} durationSec prescribed duration per set or interval
 * @property {?number} distance prescribed distance
 * @property {number} restBetweenSetsSec rest after non-final sets
 * @property {?number} restAfterExerciseSec rest or transition after the item
 * @property {?object} tempoOverride optional item-level tempo
 * @property {string} notes user-facing item notes
 * @property {number} order display order inside its block
 */

/**
 * Editable workout block grouped by execution style.
 * @typedef {object} WorkoutBlock
 * @property {string} id stable block id
 * @property {'straight'|'circuit'|'interval'|'mobility'} type block execution type
 * @property {string} title block title
 * @property {number} order display and execution order
 * @property {number} rounds circuit/interval round count
 * @property {number} defaultRestBetweenExercises default transition duration
 * @property {number} restBetweenRoundsSec rest between circuit/interval rounds
 * @property {WorkoutItem[]} items block exercise prescriptions
 * @property {string} source source format used to create the block
 */

/**
 * Compiled executable step used by the v2 session plan.
 * @typedef {object} SessionStep
 * @property {string} id stable compiled step id
 * @property {'prepare'|'work'|'rest'|'transition'|'cue'|'cooldown'} type step type
 * @property {string} phase timer phase key
 * @property {number} order execution order
 * @property {string} blockId source block id
 * @property {string} blockType source block type
 * @property {number} blockIndex source block index
 * @property {number} durationSec executable duration in seconds
 * @property {string} source compiler source label
 * @property {string} [workoutItemId] source workout item id
 * @property {string} [exerciseId] referenced exercise id
 * @property {object} [exercise] referenced exercise snapshot
 * @property {object} [effort] compiled effort metadata
 */

/**
 * Pure compiled workout execution plan.
 * @typedef {object} SessionPlan
 * @property {number} version plan schema version
 * @property {string} workoutId source workout id
 * @property {string} workoutTitle source workout title
 * @property {'straight'|'circuit'|'interval'|'mobility'} workoutType resolved workout type
 * @property {WorkoutBlock[]} blocks normalized workout blocks
 * @property {SessionStep[]} steps executable v2 steps
 * @property {Array} legacySteps old runtime-compatible steps without warmup/cooldown
 * @property {number} totalDurationSec total executable duration
 */
/**
 * Shared session snapshot version constant.
 * @type {number}
 */
export const SESSION_SNAPSHOT_VERSION = 2;
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
