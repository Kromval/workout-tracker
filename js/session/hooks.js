import { noop } from './utils.js';

export function normalizeHooks(options) {
  return {
    onTick: normalizeHook(options.onTick),
    onStepChange: normalizeHook(options.onStepChange),
    onPhaseChange: normalizeHook(options.onPhaseChange),
    onWorkoutComplete: normalizeHook(options.onWorkoutComplete),
    onWorkoutAbort: normalizeHook(options.onWorkoutAbort),
  };
}

function normalizeHook(callback) {
  return typeof callback === 'function' ? callback : noop;
}
