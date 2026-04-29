/**
 * @module js/session/hooks
 */
import { noop } from './utils.js';

/**
 * Normalizes hooks.
 * @param {object} options options input
 * @returns {*} result
 */
export function normalizeHooks(options) {
  return {
    onTick: normalizeHook(options.onTick),
    onStepChange: normalizeHook(options.onStepChange),
    onPhaseChange: normalizeHook(options.onPhaseChange),
    onWorkoutComplete: normalizeHook(options.onWorkoutComplete),
    onWorkoutAbort: normalizeHook(options.onWorkoutAbort),
  };
}

/**
 * Normalizes hook.
 * @param {Function} callback callback input
 * @returns {*} result
 */
function normalizeHook(callback) {
  return typeof callback === 'function' ? callback : noop;
}
