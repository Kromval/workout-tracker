# Workout Planner

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-1f6feb)](.github/workflows/ci.yml)
[![PWA](https://img.shields.io/badge/PWA-offline%20ready-0f766e)](manifest.webmanifest)
[![Coverage](https://img.shields.io/badge/coverage-%E2%89%A570%25-15803d)](package.json)
[![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20ESM-334155)](#technology)

Workout Planner is a framework-free progressive web app for building workouts, generating recommended sessions, running guided training sessions, tracking history, and ranking exercises against a user's profile. It runs as a static site, stores data locally, and supports offline startup through a generated service-worker precache.

## Features

- Exercise catalog with 172 built-in exercises, search, filters, favorites, disliked exercises, custom exercises, equipment compatibility, and profile-level compatibility.
- Workout builder with exercise ordering, sets, reps, duration, rest intervals, notes, drag-and-drop ordering, preset copying, duplication, editing, and deletion.
- Single-workout generator available from `#workout-create`, using duration, workout type, profile goals, body-focus priorities, equipment, contraindications, and recommendation scoring.
- Guided workout runner with timers, rest steps, pause/resume, skip, time adjustment, completion flow, active-session recovery, and audio cues.
- Exercise recommendations with hard eligibility filters and weighted scoring for goals, level fit, equipment, body focus, recovery, safety, preferences, movement variety, and time fit.
- Training history with notes, ratings, estimated calories, progress stats, and calendar activity views.
- User profile for anthropometrics, training level, goals, body focus, limitations, recovery, preferred duration, frequency, liked tags, and disliked exercises.
- Equipment management with built-in and custom equipment, including gym, cable, machine, conditioning, and mobility equipment.
- Settings for language, theme, UI density, sound, volume, and custom audio event files.
- Local JSON import/export with schema validation and localStorage migrations.
- PWA app shell with manifest, service worker, generated precache, and offline import coverage tests.

## Quick Start

Requirements:

- Node.js 22+ for development scripts.
- A modern browser with ES modules, service workers, localStorage, Web Audio API, and File API.

Install dependencies:

```bash
npm ci
```

Run a static server from the repository root:

```bash
npx serve .
```

Open the URL printed by the server. For service-worker behavior, use `localhost`, `127.0.0.1`, or HTTPS. Opening `index.html` through `file://` is not supported.

Alternative without an npm static server:

```bash
python -m http.server 8000
```

## Scripts

| Command                                   | Purpose                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `npm test`                                | Run the Jest test suite.                                                         |
| `npm run test:watch`                      | Run Jest in watch mode.                                                          |
| `npm run e2e`                             | Run Playwright smoke tests in Chromium.                                          |
| `npm run e2e:headed`                      | Run Playwright smoke tests with a visible browser.                               |
| `npm run e2e:ui`                          | Open the Playwright interactive test runner.                                     |
| `npm run e2e:install`                     | Install the Chromium browser used by Playwright.                                 |
| `npm run coverage`                        | Run coverage with the global 70% threshold for statements, functions, and lines. |
| `npm run lint`                            | Run ESLint across source, tests, scripts, and config.                            |
| `npm run format:check`                    | Check formatting with Prettier.                                                  |
| `npm run format`                          | Format files with Prettier.                                                      |
| `npm run generate:precache`               | Regenerate the service-worker app shell precache list.                           |
| `node scripts/generate-exercises-data.js` | Regenerate `js/features/exercises-data.js` from `data/exercises.json`.           |

## Quality

The project uses Jest, ESLint, and Prettier. Coverage is collected for `js/storage`, `js/features`, and `js/session`; generated exercise data is excluded from coverage.

The current global coverage gate is defined in `package.json`:

```json
"coverageThreshold": {
  "global": {
    "statements": 70,
    "functions": 70,
    "lines": 70
  }
}
```

CI lives in `.github/workflows/ci.yml` and runs install, tests, and coverage. The coverage output is uploaded as an artifact.

The test suite also includes focused checks for:

- storage repositories, records, imports, and migrations;
- exercise data tags, equipment compatibility, and contraindication normalization;
- recommendation scoring and workout generation;
- guided session steps, snapshots, timers, and UI formatting;
- service-worker app shell completeness.

Playwright smoke tests live in `tests/e2e/`. They start a static Node server through
`playwright.config.js`, isolate `localStorage` per test, and cover the app shell,
exercise catalog filtering, the workout creation entry point, and single-workout
generation.

## Architecture

```text
.
├── index.html                 # Static app shell
├── manifest.webmanifest       # PWA manifest
├── sw.js                      # Service worker with generated precache
├── data/
│   └── exercises.json         # Source records for built-in exercises
├── js/
│   ├── app.js                 # App bootstrap
│   ├── core/                  # Router, state, selectors, PWA registration
│   ├── features/              # Domain logic: exercises, recommendations, workouts, history
│   ├── i18n/                  # Russian and English UI messages
│   ├── pages/                 # Page renderers and reusable page components
│   ├── session/               # Guided workout engine, steps, snapshots, UI helpers
│   ├── storage/               # Store, schema, migrations, records, repositories
│   └── ui/                    # Event bindings, actions, shell chrome, page updates
├── scripts/                   # Data, precache, selector, and migration utilities
├── styles/                    # CSS split by application area
└── tests/                     # Jest tests
```

## Domain Modules

| Module                                  | Responsibility                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| `js/features/exercises.js`              | Normalizes built-in and custom exercise records.                                    |
| `js/features/exercises-data.js`         | Generated ESM module built from `data/exercises.json`.                              |
| `js/features/equipment.js`              | Built-in and custom equipment catalog.                                              |
| `js/features/contraindications.js`      | Canonical contraindication definitions and legacy alias normalization.              |
| `js/features/exercise-compatibility.js` | Equipment and training-level compatibility helpers.                                 |
| `js/features/recommendations.js`        | Hard filtering and weighted exercise recommendation scoring.                        |
| `js/features/exercise-scoring.js`       | Backward-compatible adapter for older scoring calls.                                |
| `js/features/workout-generation.js`     | Single-workout generation from profile, priorities, duration, and ranked exercises. |
| `js/features/workouts.js`               | Workout normalization, item creation, duration estimates, calorie estimates.        |
| `js/features/history.js`                | History summaries, calendar data, duration and calorie aggregation.                 |
| `js/features/presets.js`                | Built-in preset workout definitions.                                                |
| `js/features/audio.js`                  | Audio event playback and custom audio integration.                                  |

## Storage

Storage is local-first and backed by `localStorage`. `js/storage/core.js` is the public facade, while domain operations are split into repositories:

| Repository              | Responsibility                                          |
| ----------------------- | ------------------------------------------------------- |
| `settingsRepository.js` | Settings, favorites, custom audio, last opened workout. |
| `profileRepository.js`  | Profile, equipment, custom equipment.                   |
| `workoutRepository.js`  | Workout CRUD, duplication, sorting.                     |
| `historyRepository.js`  | History CRUD and lookup by date.                        |
| `sessionRepository.js`  | Active guided-session snapshot.                         |

Schema constants and defaults live in `js/storage/schema.js`. Migrations live in `js/storage/migrations.js`. The current persisted sections are:

- `settings`
- `profile`
- `equipment`
- `customExercises`
- `workouts`
- `history`
- `activeSession`

## Routing

The application uses hash routing.

| Route                 | Screen                                               |
| --------------------- | ---------------------------------------------------- |
| `#home`               | Dashboard, stats, user workouts, preset workouts.    |
| `#exercises`          | Exercise catalog.                                    |
| `#recommendations`    | Ranked exercise recommendations.                     |
| `#exercise-create`    | Create a custom exercise.                            |
| `#exercise-view/<id>` | View an exercise.                                    |
| `#exercise-edit/<id>` | Edit a custom exercise.                              |
| `#workout-create`     | Manual workout builder with a link to generation.    |
| `#workout-generate`   | Single-workout generator.                            |
| `#workout-view`       | Saved workout list.                                  |
| `#workout-view/<id>`  | Workout details.                                     |
| `#workout-edit/<id>`  | Workout editor.                                      |
| `#workout-run/<id>`   | Guided workout session.                              |
| `#settings`           | Interface, profile, equipment, audio, import/export. |

## Recommendation And Generation Flow

Exercise recommendations are built in two stages:

1. `filterExercisesForRecommendations` applies hard checks: duplicate IDs, equipment availability, profile level, contraindications, excluded IDs, and optional strict goal matching.
2. `rankExercisesForRecommendations` scores eligible exercises by goal alignment, difficulty fit, equipment fit, movement focus, movement variety, contraindications, preferences, recovery, and time fit.

Single-workout generation then adds a session-structure layer:

1. Normalize the request: target duration, workout type, and priority overrides.
2. Select a workout type when the request is `auto`: `straight`, `circuit`, `interval`, or `mobility`.
3. Build workout slots such as warm-up, main, accessory, core, finisher, or mobility.
4. Select unique exercises for slots using recommendation score, slot fit, diversity, and role fit.
5. Prescribe sets, reps or duration, rest between sets, and rest after exercises.
6. Fit the workout volume toward the requested duration.
7. Save the generated result as a regular workout record.

## Exercise Data

Built-in exercises are authored in `data/exercises.json`. The browser does not fetch that JSON directly; it imports the generated module `js/features/exercises-data.js`.

After editing `data/exercises.json`, run:

```bash
node scripts/generate-exercises-data.js
```

Exercise records should include:

- localized `name`, `shortDescription`, `instruction`, `effect`, and `type`;
- `muscles`, `muscleGroups.primary`, and optionally `muscleGroups.secondary`;
- `tags`, `movementPatterns`, `difficulty`, `equipment`, and `contraindications`;
- `executionMode`, `tempo`, `estimatedCalories`, and `intensityProfile`.

Data quality is checked by `tests/features/exercise-data-tags.test.js`. Equipment IDs are backed by the built-in catalog in `js/features/equipment.js`. Contraindication IDs are backed by `SUPPORTED_CONTRAINDICATION_TAGS` in `js/features/contraindications.js`.

## PWA And Offline

The service worker caches the app shell, CSS, static assets, and all static ES module imports needed for startup.

After changing static imports, `index.html`, CSS, the manifest, icons, or generated exercise data, run:

```bash
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
```

The PWA smoke test verifies that the precache covers every local static module import needed by the app shell.

## UI Event Boundaries

Event bindings are split by feature area:

| File                         | Area                                                                      |
| ---------------------------- | ------------------------------------------------------------------------- |
| `shell-event-bindings.js`    | Shell-level navigation and chrome behavior.                               |
| `exercise-event-bindings.js` | Exercise catalog and exercise actions.                                    |
| `workout-event-bindings.js`  | Workout builder, workout generation, workout cards, and run entry points. |
| `settings-event-bindings.js` | Settings, profile, equipment, custom audio, import/export.                |
| `calendar-event-bindings.js` | Progress calendar interactions.                                           |

## Browser Support

Use a modern browser with support for:

- ES modules
- service workers
- localStorage
- Web Audio API
- File API
- standard form and drag-and-drop APIs

## Documentation

The original project documents are in `docs/`. They are currently written in Russian and include the technical specification and graduation-project presentation notes.

## License

MIT. See [LICENSE](LICENSE).
