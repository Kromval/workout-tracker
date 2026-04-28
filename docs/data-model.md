# Модель данных

## Общие принципы

Данные нормализуются перед сохранением и перед использованием в runtime. Пользовательские сущности получают ID с префиксом, даты хранятся в ISO-формате, массивы строк очищаются от дублей.

Основные типы описаны в `js/storage/schema.js` и `js/storage/records.js`.

## Store

```js
{
  version: 6,
  settings: {},
  profile: {},
  equipment: {},
  customExercises: [],
  workouts: [],
  history: [],
  activeSession: null
}
```

## Settings

```js
{
  language: 'ru',
  theme: 'system',
  density: 'comfortable',
  soundEnabled: true,
  volume: 0.7,
  customAudio: {},
  favoriteExerciseIds: [],
  calendarViewMode: 'month',
  lastOpenedWorkoutId: null
}
```

Разрешенные значения:

- `language`: `ru`, `en`;
- `theme`: `light`, `dark`, `system`;
- `density`: `comfortable`, `compact`;
- `calendarViewMode`: `month`, `week`.

## Profile

Профиль содержит:

- антропометрию: возраст, пол, вес, рост и замеры;
- уровень подготовки;
- legacy-цель `goal`;
- взвешенные цели `goals`;
- приоритеты зон тела `bodyFocusGoals`;
- ограничения `limitations`;
- нелюбимые упражнения;
- любимые теги;
- желаемую длительность и частоту;
- профиль восстановления;
- недавнюю историю.

Цели скоринга:

- `strength`;
- `hypertrophy`;
- `endurance`;
- `fatLoss`;
- `mobility`.

Приоритеты зон тела:

- `upperBody`;
- `lowerBody`;
- `vTaper`;
- `core`;
- `arms`;
- `glutes`.

Зоны восстановления:

- `chest`;
- `back`;
- `legs`;
- `shoulders`;
- `arms`;
- `core`.

## Equipment

```js
{
  selectedIds: [],
  customItems: []
}
```

Пользовательское оборудование:

```js
{
  id: 'equipment-...',
  name: '',
  createdAt: '...',
  updatedAt: '...',
  isCustom: true
}
```

## Exercise

Runtime-форма упражнения:

```js
{
  id: '',
  name: { ru: '', en: '' },
  shortDescription: { ru: '', en: '' },
  instruction: { ru: '', en: '' },
  effect: { ru: '', en: '' },
  type: { ru: '', en: '' },
  muscles: [],
  tags: [],
  executionMode: 'reps',
  tempo: null,
  estimatedCalories: 0,
  image: '',
  movementPatterns: [],
  muscleGroups: { primary: [], secondary: [] },
  difficulty: '',
  equipment: [],
  contraindications: [],
  intensityProfile: {},
  isCustom: false
}
```

Встроенные упражнения могут храниться в новой вложенной authoring-модели `data/exercises.json`:

- `names`;
- `classification`;
- `mechanics`;
- `muscles`;
- `technique`;
- `dosage`;
- `safety`;
- `progression`;
- `media`.

`js/features/exercises.js` мигрирует эту модель в runtime-форму.

## Workout

```js
{
  id: 'workout-...',
  title: '',
  description: '',
  createdAt: '...',
  updatedAt: '...',
  isPreset: false,
  items: [],
  defaultRestBetweenExercises: 90,
  themeColor: '',
  tags: []
}
```

## Workout item

```js
{
  id: 'workout-item-...',
  exerciseId: '',
  sets: 1,
  reps: null,
  durationSec: null,
  distance: null,
  restBetweenSetsSec: 60,
  restAfterExerciseSec: null,
  tempoOverride: null,
  notes: '',
  order: 0
}
```

Правило сохранения: для элемента тренировки должно быть задано либо положительное `reps`, либо положительное `durationSec`.

## Tempo

```js
{
  eccentric: 1,
  pauseBottom: 1,
  concentric: 1,
  pauseTop: 0
}
```

Tempo используется для расчета длительности повторений и фаз внутри активной сессии.

## History entry

```js
{
  id: 'history-...',
  createdAt: '...',
  updatedAt: '...',
  workoutId: '',
  workoutTitleSnapshot: '',
  startedAt: '...',
  endedAt: '...',
  durationSec: 0,
  status: 'completed',
  completedItems: [],
  note: '',
  ratingEmoji: '',
  estimatedCaloriesBurned: 0,
  totalExercisesCompleted: 0,
  totalSetsCompleted: 0
}
```

Статусы истории:

- `completed`;
- `aborted`;
- `interrupted`.

## Completed item

```js
{
  workoutItemId: '',
  exerciseId: '',
  exerciseNameSnapshot: { ru: '', en: '' },
  setsCompleted: 0,
  repsCompleted: null,
  durationSec: null,
  skipped: false,
  note: ''
}
```

## Active session

```js
{
  version: 1,
  savedAt: '...',
  status: 'running',
  workout: {},
  steps: [
    { id: '...', durationSec: 30 }
  ],
  currentStepIndex: 0,
  remainingSec: 30,
  elapsedSec: 0,
  startedAt: '...'
}
```

Допустимые статусы для сохранения: `running`, `paused`.

## Custom audio

`settings.customAudio` хранит записи по событиям:

```js
{
  exerciseStart: {
    name: 'Custom audio',
    type: 'audio/mpeg',
    size: 12345,
    dataUrl: 'data:audio/mpeg;base64,...',
    updatedAt: '...'
  }
}
```

Поддерживаемые MIME-типы:

- `audio/mpeg`;
- `audio/mp3`;
- `audio/wav`;
- `audio/x-wav`;
- `audio/ogg`.
