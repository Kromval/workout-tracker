# Workout Planner

Workout Planner is a framework-free web app for building, running, and tracking personal workouts. It includes an exercise catalog, custom workouts, workout timers, history, progress calendar, themes, localization, and local data import/export.

## Features

- Exercise catalog with search, filters, favorites, and custom exercises.
- Workout builder with editable exercise order, sets, reps, durations, rest timers, and notes.
- Workout session screen with timers, pause/resume, skip, and time adjustment controls.
- Workout history with notes, ratings, estimated calories, and progress calendar.
- Preset workouts that can be copied and edited.
- Light, dark, and system themes.
- Russian and English interface localization.
- Custom audio signals for workout events.
- Import and export of user data as JSON.
- Local persistence through `localStorage`, including unfinished session recovery.
- Progressive Web App support with installable metadata and offline app shell caching.

## Tech Stack

- HTML
- CSS
- JavaScript ES modules
- `localStorage` for user data
- Static JSON source for built-in exercises

No frontend framework, bundler, or package manager is required for the app itself.

Jest is used for storage and data-normalization tests.

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
└── styles/
    ├── variables.css
    ├── base.css
    ├── layout.css
    ├── components.css
    └── fixes.css
```

## Getting Started

Clone the repository and run it with any static file server.

```bash
git clone <repository-url>
cd workout-tracker
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also use another static server, for example:

```bash
npx serve .
```

Because the app uses ES modules, running it through a local HTTP server is recommended.

## Tests

Install development dependencies and run the Jest suite:

```bash
npm install
npm test
```

The current tests cover storage import/export behavior, schema migrations, and normalizers/sanitizers.

## Exercise Data

Built-in exercises are stored in:

```text
data/exercises.json
```

The browser app imports a generated module:

```text
js/features/exercises-data.js
```

After changing `data/exercises.json`, regenerate the module:

```bash
node scripts/generate-exercises-data.js
```

## Data Storage

User data is stored locally in the browser under the app storage key. It includes:

- settings
- custom exercises
- workouts
- workout history
- active workout session

Favorites and custom audio signals are stored inside `settings` so persisted data has a single source of truth for user preferences.

The app supports JSON export and import from the Settings page. Export is useful for backups or moving data to another browser.

Storage schema metadata lives in `js/storage/schema.js`; version-to-version migrations live in `js/storage/migrations.js`. When changing persisted data shape, bump `STORAGE_VERSION`, add a migration, and run:

```bash
node scripts/check-storage-migrations.js
```

Derived state selectors live in `js/core/selectors.js`. They keep UI modules away from raw persisted shape and memoize by stable state references. Check them with:

```bash
node scripts/check-selectors.js
```

## Progressive Web App

The app includes:

- `manifest.webmanifest` for install metadata.
- `sw.js` for offline caching of the application shell.
- SVG and PNG icons in `assets/icons/`.

PWA features require HTTPS or `localhost`. GitHub Pages provides HTTPS, so the app can be installed from the browser after deployment.

## Main Routes

The app uses hash-based routing:

- `#home` - dashboard
- `#exercises` - exercise catalog
- `#exercise-create` - create exercise
- `#exercise-view/<id>` - exercise details
- `#exercise-edit/<id>` - edit custom exercise
- `#workout-create` - create workout
- `#workout-view/<id>` - workout details
- `#workout-edit/<id>` - edit workout
- `#workout-run/<id>` - run workout
- `#settings` - settings, audio, import/export

## Browser Support

Use a modern browser with support for:

- ES modules
- `localStorage`
- Web Audio API
- File API for JSON/audio import

## Documentation

The original product requirements are in:

```text
docs/Техническое задание.md
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
