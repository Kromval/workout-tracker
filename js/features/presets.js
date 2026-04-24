export const popularPresetWorkouts = [
  {
    id: 'preset-general-warmup',
    title: {
      ru: 'Общая разминка',
      en: 'General warm-up',
    },
    description: {
      ru: 'Мягко разогреть суставы, корпус и пульс перед основной нагрузкой.',
      en: 'A gentle joint, core, and heart-rate warm-up before the main work.',
    },
    isPreset: true,
    defaultRestBetweenExercises: 20,
    tags: ['warmup', 'mobility', 'beginner'],
    items: [
      {
        exerciseId: 'cat-cow',
        sets: 1,
        reps: 8,
        durationSec: null,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'inchworm',
        sets: 1,
        reps: 6,
        durationSec: null,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'jumping-jacks',
        sets: 1,
        reps: null,
        durationSec: 45,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'high-knees',
        sets: 1,
        reps: null,
        durationSec: 30,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 0,
      },
    ],
  },
  {
    id: 'preset-home-strength',
    title: {
      ru: 'Домашняя силовая',
      en: 'Home strength',
    },
    description: {
      ru: 'Базовая силовая тренировка с весом тела для ног, груди, ягодиц и корпуса.',
      en: 'A basic bodyweight strength session for legs, chest, glutes, and core.',
    },
    isPreset: true,
    defaultRestBetweenExercises: 60,
    tags: ['home', 'strength', 'bodyweight'],
    items: [
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 12,
        durationSec: null,
        restBetweenSetsSec: 45,
        restAfterExerciseSec: 60,
      },
      {
        exerciseId: 'push-ups',
        sets: 3,
        reps: 8,
        durationSec: null,
        restBetweenSetsSec: 60,
        restAfterExerciseSec: 60,
      },
      {
        exerciseId: 'lunges',
        sets: 3,
        reps: 10,
        durationSec: null,
        restBetweenSetsSec: 45,
        restAfterExerciseSec: 60,
      },
      {
        exerciseId: 'glute-bridge',
        sets: 3,
        reps: 14,
        durationSec: null,
        restBetweenSetsSec: 45,
        restAfterExerciseSec: 60,
      },
      {
        exerciseId: 'plank',
        sets: 2,
        reps: null,
        durationSec: 40,
        restBetweenSetsSec: 45,
        restAfterExerciseSec: 0,
      },
    ],
  },
  {
    id: 'preset-quick-cardio',
    title: {
      ru: 'Короткое кардио',
      en: 'Quick cardio',
    },
    description: {
      ru: 'Интенсивный короткий блок, чтобы поднять пульс без сложного оборудования.',
      en: 'A short high-energy block to raise your heart rate with no complex equipment.',
    },
    isPreset: true,
    defaultRestBetweenExercises: 30,
    tags: ['cardio', 'short', 'energy'],
    items: [
      {
        exerciseId: 'jumping-jacks',
        sets: 3,
        reps: null,
        durationSec: 40,
        restBetweenSetsSec: 20,
        restAfterExerciseSec: 30,
      },
      {
        exerciseId: 'mountain-climbers',
        sets: 3,
        reps: null,
        durationSec: 30,
        restBetweenSetsSec: 20,
        restAfterExerciseSec: 30,
      },
      {
        exerciseId: 'high-knees',
        sets: 3,
        reps: null,
        durationSec: 30,
        restBetweenSetsSec: 20,
        restAfterExerciseSec: 30,
      },
      {
        exerciseId: 'burpees',
        sets: 2,
        reps: 8,
        durationSec: null,
        restBetweenSetsSec: 35,
        restAfterExerciseSec: 0,
      },
    ],
  },
  {
    id: 'preset-stretch-and-release',
    title: {
      ru: 'Растяжка',
      en: 'Stretch and release',
    },
    description: {
      ru: 'Спокойная растяжка после тренировки или в конце дня.',
      en: 'A calm stretching flow for after training or the end of the day.',
    },
    isPreset: true,
    defaultRestBetweenExercises: 15,
    tags: ['stretch', 'mobility', 'recovery'],
    items: [
      {
        exerciseId: 'downward-facing-dog',
        sets: 1,
        reps: null,
        durationSec: 45,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'childs-pose',
        sets: 1,
        reps: null,
        durationSec: 45,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'pigeon-pose',
        sets: 2,
        reps: null,
        durationSec: 35,
        restBetweenSetsSec: 10,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'seated-forward-bend',
        sets: 1,
        reps: null,
        durationSec: 45,
        restBetweenSetsSec: 0,
        restAfterExerciseSec: 15,
      },
      {
        exerciseId: 'supine-twist',
        sets: 2,
        reps: null,
        durationSec: 35,
        restBetweenSetsSec: 10,
        restAfterExerciseSec: 0,
      },
    ],
  },
  {
    id: 'preset-core-abs',
    title: {
      ru: 'Пресс/кор',
      en: 'Abs and core',
    },
    description: {
      ru: 'Фокус на пресс, глубокие мышцы корпуса и устойчивость.',
      en: 'Focused work for abs, deep core muscles, and stability.',
    },
    isPreset: true,
    defaultRestBetweenExercises: 45,
    tags: ['core', 'abs', 'stability'],
    items: [
      {
        exerciseId: 'dead-bug',
        sets: 3,
        reps: 10,
        durationSec: null,
        restBetweenSetsSec: 35,
        restAfterExerciseSec: 45,
      },
      {
        exerciseId: 'bicycle-crunches',
        sets: 3,
        reps: 16,
        durationSec: null,
        restBetweenSetsSec: 35,
        restAfterExerciseSec: 45,
      },
      {
        exerciseId: 'leg-raises',
        sets: 3,
        reps: 10,
        durationSec: null,
        restBetweenSetsSec: 40,
        restAfterExerciseSec: 45,
      },
      {
        exerciseId: 'side-plank',
        sets: 2,
        reps: null,
        durationSec: 30,
        restBetweenSetsSec: 30,
        restAfterExerciseSec: 45,
      },
      {
        exerciseId: 'plank',
        sets: 2,
        reps: null,
        durationSec: 45,
        restBetweenSetsSec: 35,
        restAfterExerciseSec: 0,
      },
    ],
  },
];

export function getPopularPresetWorkouts() {
  return popularPresetWorkouts.map(normalizePresetWorkout);
}

export function getPopularPresetWorkout(id) {
  return getPopularPresetWorkouts().find((workout) => workout.id === id) || null;
}

function normalizePresetWorkout(workout) {
  return {
    ...workout,
    title: workout.title || { ru: '', en: '' },
    description: workout.description || { ru: '', en: '' },
    items: workout.items.map((item, order) => ({
      id: `${workout.id}-item-${order}`,
      distance: null,
      tempoOverride: null,
      notes: '',
      order,
      ...item,
    })),
  };
}
