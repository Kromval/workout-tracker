# Workout Planner

Workout Planner is a framework-free PWA for building workouts, running guided sessions, tracking history, and ranking exercises against a user profile.

## Current State

The app already includes:

- Exercise catalog with search, filters, favorites, and custom exercises.
- Workout builder with exercise ordering, sets, reps, durations, rest timers, and notes.
- Workout run screen with timers, pause/resume, skip, time adjustment, finish form, and active session recovery.
- User profile with anthropometrics, training level, goals, body-focus priorities, recovery profile, limitations, preferred tags, disliked exercises, session duration, and weekly frequency.
- Equipment management with built-in equipment plus user-defined items.
- Exercise recommendations page powered by:
  - hard filtering by equipment and difficulty
  - scoring by goals, body-focus, level, recovery, safety, variety, preferences, and time fit
- Workout history with notes, ratings, estimated calories, and progress calendar.
- Preset workouts that can be copied and edited.
- Russian and English localization.
- Light, dark, and system themes.
- Comfortable/compact interface density toggle.
- Custom audio signals for workout events.
- JSON import/export with schema migrations.
- Local persistence in `localStorage`.
- PWA shell with service worker and offline app shell caching.

## Tech Stack

- HTML
- CSS
- JavaScript ES modules
- `localStorage`
- Static exercise source in `data/exercises.json`
- Jest for tests

No framework or bundler is required for the app itself.

## Project Structure

```text
.
├── index.html
├── data/
│   └── exercises.json
├── docs/
│   └── Техническое задание.md
├── js/
│   ├── app.js
│   ├── core/
│   ├── features/
│   ├── i18n/
│   ├── pages/
│   ├── session/
│   ├── storage/
│   └── ui/
├── scripts/
│   └── generate-exercises-data.js
├── styles/
├── sw.js
└── manifest.webmanifest
```

## Getting Started

Run the app from any static file server:

```bash
python -m http.server 8000
```

or:

```bash
npx serve .
```

Then open:

```text
http://localhost:8000
```

Because the app uses ES modules and a service worker, use `localhost` or HTTPS.

## Tests

Install dependencies and run:

```bash
npm install
npm test
```

Current tests cover:

- storage schema migrations
- store sanitizers and normalizers
- import/export merge behavior
- exercise compatibility
- recommendation filtering
- exercise scoring
- selector-level recommendation flow

## Exercise Data

Built-in exercises are authored in:

```text
data/exercises.json
```

The browser uses the generated module:

```text
js/features/exercises-data.js
```

After editing `data/exercises.json`, regenerate it:

```bash
node scripts/generate-exercises-data.js
```

## Storage

Storage schema metadata lives in `js/storage/schema.js`. The current schema is:

- `STORAGE_VERSION = 6`
- `settings`
- `profile`
- `equipment`
- `customExercises`
- `workouts`
- `history`
- `activeSession`

Notable profile fields:

- anthropometrics
- `trainingLevel`
- legacy `goal`
- weighted `goals`
- weighted `bodyFocusGoals`
- `limitations`
- `dislikedExercises`
- `likedTags`
- `sessionDurationMin`
- `frequencyPerWeek`
- `recoveryProfile`
- `recentHistory`

Notable settings fields:

- `language`
- `theme`
- `density`
- `soundEnabled`
- `volume`

Version migrations live in:

```text
js/storage/migrations.js
```

## Recommendations

Recommendations are currently exercise-level, not full workout-plan generation.

Flow:

1. Filter incompatible exercises by equipment, difficulty, duplicates, and optional goal mode.
2. Score eligible exercises.
3. Rank and display top-N results on `#recommendations`.

Main modules:

- `js/features/recommendations.js`
- `js/features/exercise-scoring.js`
- `js/features/body-focus.js`
- `js/core/selectors.js`

Public API (see JSDoc in source):

- `filterExercisesForRecommendations(options)`
- `rankExercisesForRecommendations(options)`
- `scoreExercise(exercise, profile, context, weights)` in `js/features/recommendations.js`
- `buildExerciseRecommendationMetadata(exercise, context)`
- `getExerciseGoalIds(exercise)`
- `rankRecommendedExercises(options)`
- `scoreExercise(user, exercise, context, weights)` in `js/features/exercise-scoring.js`
- `scoreGoalAlignment(...)`
- `scoreLevelMatch(...)`
- `scorePreferences(...)`
- `scoreRecovery(...)`
- `scoreSafety(...)`
- `scoreVariety(...)`
- `scoreTimeFit(...)`
- `scoreFatiguePenalty(...)`
- `scoreContraindicationRisk(...)`
- `normalizeContraindicationTag(value)` and `normalizeContraindicationTags(values)`
- `getContraindicationDefinition(tag)`
- `getContraindicationRelatedMuscles(tag)`
- `getContraindicationRelatedJoints(tag)`

Notes:

- `js/features/exercises-data.js` is generated from `data/exercises.json`.
- After changing exercise source data, run `node scripts/generate-exercises-data.js`.

## Main Routes

The app uses hash routing:

- `#home`
- `#exercises`
- `#recommendations`
- `#exercise-create`
- `#exercise-view/<id>`
- `#exercise-edit/<id>`
- `#workout-create`
- `#workout-view/<id>`
- `#workout-edit/<id>`
- `#workout-run/<id>`
- `#settings`

## PWA

The app includes:

- `manifest.webmanifest`
- `sw.js`
- install icons in `assets/icons/`
- offline caching of the app shell

PWA installability requires `localhost` or HTTPS.

## Browser Support

Use a modern browser with support for:

- ES modules
- `localStorage`
- service workers
- Web Audio API
- File API

## Documentation

Original requirements:

```text
docs/Техническое задание.md
```

## License

MIT. See [LICENSE](LICENSE).
