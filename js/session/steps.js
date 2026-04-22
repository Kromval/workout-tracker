import {
  DEFAULT_REP_DURATION_SEC,
  DEFAULT_REP_TEMPO,
  EXECUTION_MODES,
  REP_PHASE_SEQUENCE,
  SESSION_PHASES,
  STEP_TYPES,
  TEMPO_FIELDS,
} from './model.js';
import { normalizeWorkout } from '../features/workouts.js';
import { asArray, isPlainObject, nonNegativeNumber, normalizeString } from './utils.js';

export function buildWorkoutSteps(workout, exercises = []) {
  const normalizedWorkout = normalizeWorkout(workout);
  const exerciseMap = createExerciseMap(exercises);
  const workoutItems = normalizedWorkout.items.filter((item) => item.exerciseId);

  return workoutItems.flatMap((item, exerciseIndex) => {
    const exercise = exerciseMap.get(item.exerciseId) || null;
    const steps = [];

    for (let setIndex = 0; setIndex < item.sets; setIndex += 1) {
      steps.push(createExerciseStep(item, exercise, exerciseIndex, setIndex));

      if (setIndex < item.sets - 1 && item.restBetweenSetsSec > 0) {
        steps.push(createRestBetweenSetsStep(item, exercise, exerciseIndex, setIndex));
      }
    }

    if (exerciseIndex < workoutItems.length - 1) {
      const durationSec = item.restAfterExerciseSec ?? normalizedWorkout.defaultRestBetweenExercises;

      if (durationSec > 0) {
        steps.push(createRestBetweenExercisesStep(item, exercise, exerciseIndex, durationSec));
      }
    }

    return steps;
  });
}



function createExerciseStep(item, exercise, exerciseIndex, setIndex) {
  const effort = createExerciseEffort(item, exercise);

  return {
    id: `${item.id}:set-${setIndex + 1}:exercise`,
    type: STEP_TYPES.EXERCISE,
    phase: SESSION_PHASES.EXERCISE,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    exercise,
    executionMode: effort.executionMode,
    exerciseIndex,
    setIndex,
    setNumber: setIndex + 1,
    totalSets: item.sets,
    reps: effort.reps,
    distance: item.distance,
    notes: item.notes,
    durationSec: effort.durationSec,
    effort,
  };
}



function createRestBetweenSetsStep(item, exercise, exerciseIndex, setIndex) {
  return {
    id: `${item.id}:set-${setIndex + 1}:rest`,
    type: STEP_TYPES.REST_BETWEEN_SETS,
    phase: SESSION_PHASES.REST_BETWEEN_SETS,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    exercise,
    exerciseIndex,
    setIndex,
    fromSetNumber: setIndex + 1,
    toSetNumber: setIndex + 2,
    durationSource: 'restBetweenSetsSec',
    durationSec: item.restBetweenSetsSec,
  };
}



function createRestBetweenExercisesStep(item, exercise, exerciseIndex, durationSec) {
  return {
    id: `${item.id}:rest-after-exercise`,
    type: STEP_TYPES.REST_AFTER_EXERCISE,
    phase: SESSION_PHASES.REST_BETWEEN_EXERCISES,
    workoutItemId: item.id,
    exerciseId: item.exerciseId,
    exercise,
    exerciseIndex,
    durationSource: item.restAfterExerciseSec === null ? 'workout.defaultRestBetweenExercises' : 'restAfterExerciseSec',
    durationSec,
  };
}



function createExerciseEffort(item, exercise) {
  const executionMode = resolveExecutionMode(item, exercise);

  if (executionMode === EXECUTION_MODES.TIME || executionMode === EXECUTION_MODES.HOLD) {
    return {
      executionMode,
      reps: null,
      durationSource: 'durationSec',
      durationSec: item.durationSec ?? 0,
    };
  }

  if (executionMode === EXECUTION_MODES.REPS) {
    const tempoDetails = getTempoDetails(item, exercise);
    const reps = item.reps ?? 0;

    return {
      executionMode,
      reps,
      durationSource: 'reps*tempo',
      durationSec: reps * tempoDetails.repDurationSec,
      tempo: tempoDetails.tempo,
      tempoSource: tempoDetails.tempoSource,
      repDurationSec: tempoDetails.repDurationSec,
      repPhases: tempoDetails.repPhases,
    };
  }

  return {
    executionMode,
    reps: item.reps,
    durationSource: item.durationSec !== null ? 'durationSec' : 'unknown',
    durationSec: item.durationSec ?? 0,
  };
}



function resolveExecutionMode(item, exercise) {
  const exerciseMode = normalizeString(exercise?.executionMode);

  if (exerciseMode === EXECUTION_MODES.REPS || exerciseMode === EXECUTION_MODES.TIME || exerciseMode === EXECUTION_MODES.HOLD) {
    return exerciseMode;
  }

  if (item.reps !== null) {
    return EXECUTION_MODES.REPS;
  }

  if (item.durationSec !== null) {
    return exerciseMode === EXECUTION_MODES.HOLD ? EXECUTION_MODES.HOLD : EXECUTION_MODES.TIME;
  }

  return exerciseMode || EXECUTION_MODES.CUSTOM;
}



function getTempoDetails(item, exercise) {
  const tempoOverride = normalizeTempo(item.tempoOverride);
  const exerciseTempo = normalizeTempo(exercise?.tempo);
  const tempo = tempoOverride || exerciseTempo;
  const tempoSource = tempoOverride ? 'tempoOverride' : exerciseTempo ? 'exercise.tempo' : 'default';

  if (!tempo) {
    return {
      tempo: null,
      tempoSource,
      repDurationSec: DEFAULT_REP_DURATION_SEC,
      repPhases: createDefaultRepPhases(),
    };
  }

  const tempoSec = TEMPO_FIELDS.reduce((sum, field) => sum + tempo[field], 0);
  const repDurationSec = tempoSec > 0 ? tempoSec : DEFAULT_REP_DURATION_SEC;

  return {
    tempo,
    tempoSource: tempoSec > 0 ? tempoSource : 'default',
    repDurationSec,
    repPhases: tempoSec > 0 ? createTempoRepPhases(tempo) : createDefaultRepPhases(),
  };
}



function createTempoRepPhases(tempo) {
  return REP_PHASE_SEQUENCE.map((phase, phaseIndex) => ({
    key: phase.key,
    name: phase.name,
    tempoField: phase.tempoField,
    durationSec: tempo[phase.tempoField],
    phaseIndex,
  }));
}



function createDefaultRepPhases() {
  return createTempoRepPhases(DEFAULT_REP_TEMPO);
}



function createExerciseMap(exercises) {
  return asArray(exercises).reduce((map, exercise) => {
    if (isPlainObject(exercise) && normalizeString(exercise.id)) {
      map.set(normalizeString(exercise.id), exercise);
    }

    return map;
  }, new Map());
}



function normalizeTempo(tempo) {
  if (!isPlainObject(tempo)) {
    return null;
  }

  return TEMPO_FIELDS.reduce((result, field) => ({
    ...result,
    [field]: nonNegativeNumber(tempo[field], 0),
  }), {});
}


