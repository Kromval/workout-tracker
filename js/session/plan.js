/**
 * @module js/session/plan
 */
import {
  SESSION_PHASES,
  SESSION_PLAN_VERSION,
  SESSION_STEP_TYPES,
  STEP_TYPES,
  WORKOUT_BLOCK_TYPES,
} from './model.js';
import { normalizeWorkout } from '../features/workouts.js';
import { buildWorkoutSteps } from './steps.js';
import { asArray, isPlainObject, nonNegativeInteger, normalizeString } from './utils.js';

/**
 * Shared plan timing templates by workout type.
 * @type {Readonly<object>}
 */
const PLAN_TIMING_TEMPLATES = Object.freeze({
  straight: Object.freeze({
    warmupDurationSec: 300,
    cooldownDurationSec: 180,
    prepareDurationSec: 10,
  }),
  circuit: Object.freeze({
    warmupDurationSec: 240,
    cooldownDurationSec: 180,
    prepareDurationSec: 5,
  }),
  interval: Object.freeze({
    warmupDurationSec: 300,
    cooldownDurationSec: 240,
    prepareDurationSec: 5,
  }),
  mobility: Object.freeze({
    warmupDurationSec: 120,
    cooldownDurationSec: 180,
    prepareDurationSec: 5,
  }),
});

/**
 * Compiles a workout into a v2 session plan.
 * @param {object} workout workout input
 * @param {Array} [exercises=[]] exercise catalog input
 * @param {object} [options={}] compiler options
 * @returns {import('./model.js').SessionPlan} compiled plan
 */
export function compileSessionPlan(workout, exercises = [], options = {}) {
  const normalizedWorkout = normalizeWorkout(workout);
  const blocks = normalizeWorkoutBlocks(workout, normalizedWorkout);
  const workoutType = resolveWorkoutType(workout, blocks);
  const timing = createPlanTiming(workout, workoutType, options);
  const steps = [];
  const hasExecutableWork = blocks.some((block) => block.items.some((item) => item.exerciseId));

  if (hasExecutableWork && options.includeWarmup !== false && timing.warmupDurationSec > 0) {
    steps.push(
      createTemplateStep(normalizedWorkout, {
        id: 'warmup',
        type: SESSION_STEP_TYPES.PREPARE,
        phase: SESSION_PHASES.PREPARE,
        title: 'Warmup',
        durationSec: timing.warmupDurationSec,
        source: 'warmup-template',
      }),
    );
  }

  blocks.forEach((block, blockIndex) => {
    const blockSteps = compileWorkoutBlock(block, normalizedWorkout, exercises, blockIndex);
    steps.push(...insertPrepareSteps(blockSteps, block, timing.prepareDurationSec));
  });

  if (hasExecutableWork && options.includeCooldown !== false && timing.cooldownDurationSec > 0) {
    steps.push(
      createTemplateStep(normalizedWorkout, {
        id: 'cooldown',
        type: SESSION_STEP_TYPES.COOLDOWN,
        phase: SESSION_PHASES.COOLDOWN,
        title: 'Cooldown',
        durationSec: timing.cooldownDurationSec,
        source: 'cooldown-template',
      }),
    );
  }

  const orderedSteps = steps.map((step, order) => ({ ...step, order }));

  return {
    version: SESSION_PLAN_VERSION,
    workoutId: normalizedWorkout.id,
    workoutTitle: normalizedWorkout.title,
    workoutType,
    blocks,
    steps: orderedSteps,
    legacySteps: buildWorkoutSteps(normalizedWorkout, exercises),
    totalDurationSec: orderedSteps.reduce((total, step) => total + step.durationSec, 0),
  };
}

/**
 * Compiles a workout directly into v2 session steps.
 * @param {object} workout workout input
 * @param {Array} [exercises=[]] exercise catalog input
 * @param {object} [options={}] compiler options
 * @returns {Array} compiled session steps
 */
export function compileWorkoutToSessionSteps(workout, exercises = [], options = {}) {
  return compileSessionPlan(workout, exercises, options).steps;
}

/**
 * Normalizes workout blocks from v2 blocks or legacy workout items.
 * @param {object} workout workout input
 * @param {object} [normalizedWorkout=normalizeWorkout(workout)] normalized workout input
 * @returns {Array} normalized blocks
 */
export function normalizeWorkoutBlocks(workout, normalizedWorkout = normalizeWorkout(workout)) {
  const source = isPlainObject(workout) ? workout : {};
  const sourceBlocks = asArray(source.blocks);

  if (sourceBlocks.length > 0) {
    return sourceBlocks
      .map((block, blockIndex) => normalizeWorkoutBlock(block, normalizedWorkout, blockIndex))
      .sort((left, right) => left.order - right.order)
      .map((block, order) => ({ ...block, order }));
  }

  return [
    {
      id: `${normalizedWorkout.id}:block-1`,
      type: resolveBlockType(source.workoutType || source.type),
      title: '',
      order: 0,
      rounds: 1,
      defaultRestBetweenExercises: normalizedWorkout.defaultRestBetweenExercises,
      restBetweenRoundsSec: normalizedWorkout.defaultRestBetweenExercises,
      items: normalizedWorkout.items,
      source: 'legacy-items',
    },
  ];
}

/**
 * Normalizes workout block.
 * @param {object} block block input
 * @param {object} workout workout input
 * @param {number} blockIndex block index input
 * @returns {object} normalized block
 */
function normalizeWorkoutBlock(block, workout, blockIndex) {
  const source = isPlainObject(block) ? block : {};
  const blockWorkout = normalizeWorkout({
    ...workout,
    defaultRestBetweenExercises:
      source.defaultRestBetweenExercises ?? workout.defaultRestBetweenExercises,
    items: source.items,
  });
  const type = resolveBlockType(source.type || source.workoutType || workout.workoutType);
  const rounds = Math.max(
    1,
    nonNegativeInteger(source.rounds, inferBlockRounds(type, blockWorkout.items)),
  );
  const defaultRestBetweenExercises = nonNegativeInteger(
    source.defaultRestBetweenExercises,
    workout.defaultRestBetweenExercises,
  );

  return {
    id: normalizeString(source.id) || `${workout.id}:block-${blockIndex + 1}`,
    type,
    title: normalizeString(source.title),
    order: nonNegativeInteger(source.order, blockIndex),
    rounds,
    defaultRestBetweenExercises,
    restBetweenRoundsSec: nonNegativeInteger(
      source.restBetweenRoundsSec,
      defaultRestBetweenExercises,
    ),
    items: blockWorkout.items,
    source: 'workout.blocks',
  };
}

/**
 * Compiles workout block.
 * @param {object} block block input
 * @param {object} workout workout input
 * @param {Array} exercises exercise catalog input
 * @param {number} blockIndex block index input
 * @returns {Array} compiled block steps
 */
function compileWorkoutBlock(block, workout, exercises, blockIndex) {
  if (block.type === WORKOUT_BLOCK_TYPES.CIRCUIT || block.type === WORKOUT_BLOCK_TYPES.INTERVAL) {
    return compileRoundBlock(block, workout, exercises, blockIndex);
  }

  const legacySteps = buildWorkoutSteps(
    {
      ...workout,
      defaultRestBetweenExercises: block.defaultRestBetweenExercises,
      items: block.items,
    },
    exercises,
  );

  return legacySteps.map((step, stepIndex) =>
    createSessionStepFromLegacy(step, block, blockIndex, stepIndex),
  );
}

/**
 * Compiles circuit and interval blocks by rounds.
 * @param {object} block block input
 * @param {object} workout workout input
 * @param {Array} exercises exercise catalog input
 * @param {number} blockIndex block index input
 * @returns {Array} compiled block steps
 */
function compileRoundBlock(block, workout, exercises, blockIndex) {
  const steps = [];
  const items = block.items.filter((item) => item.exerciseId);

  for (let roundIndex = 0; roundIndex < block.rounds; roundIndex += 1) {
    items.forEach((item, itemIndex) => {
      const workStep = buildSingleSetWorkStep(item, workout, exercises, {
        block,
        blockIndex,
        roundIndex,
        itemIndex,
      });

      if (workStep) {
        steps.push(workStep);
      }

      if (itemIndex < items.length - 1) {
        const durationSec = item.restAfterExerciseSec ?? block.defaultRestBetweenExercises;
        if (durationSec > 0) {
          steps.push(createRoundTransitionStep(item, block, blockIndex, roundIndex, durationSec));
        }
      }
    });

    if (roundIndex < block.rounds - 1 && block.restBetweenRoundsSec > 0) {
      steps.push(createRoundRestStep(block, blockIndex, roundIndex));
    }
  }

  return steps;
}

/**
 * Builds single set work step.
 * @param {object} item item input
 * @param {object} workout workout input
 * @param {Array} exercises exercise catalog input
 * @param {object} context compiler context
 * @returns {*} compiled work step
 */
function buildSingleSetWorkStep(item, workout, exercises, context) {
  const legacyStep = buildWorkoutSteps(
    {
      ...workout,
      defaultRestBetweenExercises: 0,
      items: [
        {
          ...item,
          sets: 1,
          restBetweenSetsSec: 0,
          restAfterExerciseSec: 0,
        },
      ],
    },
    exercises,
  ).find((step) => step.type === STEP_TYPES.EXERCISE);

  if (!legacyStep) {
    return null;
  }

  const { block, blockIndex, roundIndex, itemIndex } = context;
  return {
    ...createSessionStepFromLegacy(legacyStep, block, blockIndex, itemIndex),
    id: `${block.id}:round-${roundIndex + 1}:${item.id}:work`,
    setIndex: roundIndex,
    setNumber: roundIndex + 1,
    totalSets: block.rounds,
    roundIndex,
    roundNumber: roundIndex + 1,
  };
}

/**
 * Creates v2 session step from legacy runtime step.
 * @param {object} step legacy step input
 * @param {object} block block input
 * @param {number} blockIndex block index input
 * @param {number} stepIndex step index input
 * @returns {object} v2 session step
 */
function createSessionStepFromLegacy(step, block, blockIndex, stepIndex) {
  const type = mapLegacyStepType(step.type);

  return {
    ...step,
    id: `${block.id}:${step.id}`,
    type,
    phase: mapSessionStepPhase(type),
    order: stepIndex,
    blockId: block.id,
    blockType: block.type,
    blockIndex,
    source: 'workout-item',
    legacyType: step.type,
    legacyId: step.id,
    durationSec: nonNegativeInteger(step.durationSec, 0),
  };
}

/**
 * Inserts prepare steps before new exercise work steps.
 * @param {Array} steps compiled steps input
 * @param {object} block block input
 * @param {number} prepareDurationSec prepare duration input
 * @returns {Array} compiled steps with prepare steps
 */
function insertPrepareSteps(steps, block, prepareDurationSec) {
  if (prepareDurationSec <= 0) {
    return steps;
  }

  let previousWorkItemId = '';

  return steps.flatMap((step) => {
    if (step.type !== SESSION_STEP_TYPES.WORK) {
      return [step];
    }

    const currentWorkItemId = step.workoutItemId || step.id;
    const shouldPrepare = previousWorkItemId !== currentWorkItemId;
    previousWorkItemId = currentWorkItemId;

    if (!shouldPrepare) {
      return [step];
    }

    return [
      {
        id: `${step.id}:prepare`,
        type: SESSION_STEP_TYPES.PREPARE,
        phase: SESSION_PHASES.PREPARE,
        order: step.order,
        blockId: block.id,
        blockType: block.type,
        blockIndex: step.blockIndex,
        workoutItemId: step.workoutItemId,
        exerciseId: step.exerciseId,
        exercise: step.exercise,
        durationSec: prepareDurationSec,
        source: 'exercise-prepare',
      },
      step,
    ];
  });
}

/**
 * Creates round transition step.
 * @param {object} item item input
 * @param {object} block block input
 * @param {number} blockIndex block index input
 * @param {number} roundIndex round index input
 * @param {number} durationSec duration input
 * @returns {object} transition step
 */
function createRoundTransitionStep(item, block, blockIndex, roundIndex, durationSec) {
  return {
    id: `${block.id}:round-${roundIndex + 1}:${item.id}:transition`,
    type: SESSION_STEP_TYPES.TRANSITION,
    phase: SESSION_PHASES.TRANSITION,
    order: 0,
    blockId: block.id,
    blockType: block.type,
    blockIndex,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    durationSource:
      item.restAfterExerciseSec === null
        ? 'block.defaultRestBetweenExercises'
        : 'restAfterExerciseSec',
    durationSec,
    source: 'round-transition',
    roundIndex,
    roundNumber: roundIndex + 1,
  };
}

/**
 * Creates round rest step.
 * @param {object} block block input
 * @param {number} blockIndex block index input
 * @param {number} roundIndex round index input
 * @returns {object} rest step
 */
function createRoundRestStep(block, blockIndex, roundIndex) {
  return {
    id: `${block.id}:round-${roundIndex + 1}:rest`,
    type: SESSION_STEP_TYPES.REST,
    phase: SESSION_PHASES.REST,
    order: 0,
    blockId: block.id,
    blockType: block.type,
    blockIndex,
    fromRoundNumber: roundIndex + 1,
    toRoundNumber: roundIndex + 2,
    durationSource: 'restBetweenRoundsSec',
    durationSec: block.restBetweenRoundsSec,
    source: 'round-rest',
    roundIndex,
    roundNumber: roundIndex + 1,
  };
}

/**
 * Creates template step.
 * @param {object} workout workout input
 * @param {object} template template input
 * @returns {object} template step
 */
function createTemplateStep(workout, template) {
  return {
    id: `${workout.id}:${template.id}`,
    type: template.type,
    phase: template.phase,
    order: 0,
    blockId: '',
    blockType: '',
    blockIndex: -1,
    title: template.title,
    durationSec: template.durationSec,
    source: template.source,
  };
}

/**
 * Creates compiler timing values.
 * @param {object} workout workout input
 * @param {string} workoutType workout type input
 * @param {object} options compiler options input
 * @returns {object} timing values
 */
function createPlanTiming(workout, workoutType, options) {
  const source = isPlainObject(workout) ? workout : {};
  const template = PLAN_TIMING_TEMPLATES[workoutType] || PLAN_TIMING_TEMPLATES.straight;

  return {
    warmupDurationSec: nonNegativeInteger(
      options.warmupDurationSec ?? source.warmupDurationSec,
      template.warmupDurationSec,
    ),
    cooldownDurationSec: nonNegativeInteger(
      options.cooldownDurationSec ?? source.cooldownDurationSec,
      template.cooldownDurationSec,
    ),
    prepareDurationSec: nonNegativeInteger(
      options.prepareDurationSec ?? source.prepareDurationSec,
      template.prepareDurationSec,
    ),
  };
}

/**
 * Maps legacy step type to v2 step type.
 * @param {string} type legacy type input
 * @returns {string} v2 step type
 */
function mapLegacyStepType(type) {
  if (type === STEP_TYPES.EXERCISE) {
    return SESSION_STEP_TYPES.WORK;
  }

  if (type === STEP_TYPES.REST_BETWEEN_SETS) {
    return SESSION_STEP_TYPES.REST;
  }

  return SESSION_STEP_TYPES.TRANSITION;
}

/**
 * Maps v2 step type to phase.
 * @param {string} type v2 step type input
 * @returns {string} phase key
 */
function mapSessionStepPhase(type) {
  if (type === SESSION_STEP_TYPES.WORK) {
    return SESSION_PHASES.WORK;
  }

  if (type === SESSION_STEP_TYPES.REST) {
    return SESSION_PHASES.REST;
  }

  if (type === SESSION_STEP_TYPES.TRANSITION) {
    return SESSION_PHASES.TRANSITION;
  }

  if (type === SESSION_STEP_TYPES.COOLDOWN) {
    return SESSION_PHASES.COOLDOWN;
  }

  return SESSION_PHASES.PREPARE;
}

/**
 * Resolves workout type from source data and blocks.
 * @param {object} workout workout input
 * @param {Array} blocks normalized blocks input
 * @returns {string} workout type
 */
function resolveWorkoutType(workout, blocks) {
  const source = isPlainObject(workout) ? workout : {};
  const sourceType = resolveOptionalBlockType(source.workoutType || source.type);

  if (sourceType) {
    return sourceType;
  }

  return blocks[0]?.type || WORKOUT_BLOCK_TYPES.STRAIGHT;
}

/**
 * Resolves block type.
 * @param {string} type type input
 * @returns {string} block type
 */
function resolveBlockType(type) {
  return resolveOptionalBlockType(type) || WORKOUT_BLOCK_TYPES.STRAIGHT;
}

/**
 * Resolves optional block type.
 * @param {string} type type input
 * @returns {string} block type or empty string
 */
function resolveOptionalBlockType(type) {
  const normalized = normalizeString(type);
  const blockTypes = Object.values(WORKOUT_BLOCK_TYPES);
  return blockTypes.includes(normalized) ? normalized : '';
}

/**
 * Infers block rounds.
 * @param {string} type block type input
 * @param {Array} items items input
 * @returns {number} rounds
 */
function inferBlockRounds(type, items) {
  if (type !== WORKOUT_BLOCK_TYPES.CIRCUIT && type !== WORKOUT_BLOCK_TYPES.INTERVAL) {
    return 1;
  }

  return Math.max(1, ...items.map((item) => nonNegativeInteger(item.sets, 1)));
}
