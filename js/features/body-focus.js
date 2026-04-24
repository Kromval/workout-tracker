export const BODY_FOCUS_MUSCLE_GROUPS = Object.freeze({
  upperBody: Object.freeze([
    'chest',
    'back',
    'shoulders',
    'arms',
    'biceps',
    'triceps',
    'lats',
    'upper-back',
  ]),
  lowerBody: Object.freeze([
    'legs',
    'quads',
    'hamstrings',
    'glutes',
    'calves',
    'adductors',
    'abductors',
  ]),
  vTaper: Object.freeze(['back', 'lats', 'shoulders', 'rear-delts', 'traps']),
  core: Object.freeze(['core', 'abs', 'obliques', 'lower-back']),
  arms: Object.freeze(['arms', 'biceps', 'triceps', 'forearms']),
  glutes: Object.freeze(['glutes', 'hamstrings']),
});

export function getBodyFocusMuscleGroups(goalId) {
  return BODY_FOCUS_MUSCLE_GROUPS[goalId] || [];
}
