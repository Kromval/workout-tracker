# Workout Planner

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-1f6feb)](.github/workflows/ci.yml)
[![PWA](https://img.shields.io/badge/PWA-offline%20ready-0f766e)](manifest.webmanifest)
[![Coverage](https://img.shields.io/badge/coverage-%E2%89%A570%25-15803d)](package.json)
[![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20ESM-334155)](#технологии)

Workout Planner — framework-free PWA для планирования тренировок, запуска guided-сессий, ведения истории и подбора упражнений под профиль пользователя. Приложение работает как статический сайт, хранит данные локально и может открываться offline после установки app shell.

## Возможности

- Каталог упражнений с поиском, фильтрами, избранным, пользовательскими упражнениями и проверкой совместимости с оборудованием.
- Конструктор тренировок: порядок упражнений, подходы, повторы, длительность, отдых, заметки, копирование пресетов.
- Экран выполнения тренировки: таймеры, пауза/продолжение, пропуск шага, корректировка времени, завершение, восстановление активной сессии.
- Рекомендации упражнений с hard-фильтрами и скорингом по целям, уровню, восстановлению, безопасности, предпочтениям, разнообразию и доступному времени.
- История тренировок с заметками, оценками, расчетными калориями, статистикой и календарем прогресса.
- Профиль пользователя: антропометрия, уровень подготовки, цели, фокус по телу, ограничения, восстановление, частота и длительность занятий.
- Настройки оборудования, темы, языка, плотности интерфейса, громкости и пользовательских аудиосигналов.
- JSON import/export с миграциями схемы `localStorage`.
- PWA shell с service worker, manifest, generated precache и smoke-тестом offline static imports.

## Быстрый Старт

Требования: Node.js 22 для разработки и любой современный браузер для запуска приложения.

```bash
npm ci
npx serve .
```

Открой `http://localhost:3000` или адрес, который покажет static server. Для service worker нужен `localhost` или HTTPS; запуск через `file://` не подходит.

Альтернатива без npm-сервера:

```bash
python -m http.server 8000
```

## Команды

| Команда                                   | Назначение                                                       |
| ----------------------------------------- | ---------------------------------------------------------------- |
| `npm test`                                | Запуск Jest-тестов                                               |
| `npm run coverage`                        | Coverage с глобальным порогом 70% для statements/functions/lines |
| `npm run lint`                            | ESLint для JS, тестов и конфигов                                 |
| `npm run format:check`                    | Проверка форматирования Prettier                                 |
| `npm run format`                          | Автоформатирование Prettier                                      |
| `npm run generate:precache`               | Перегенерация precache-списка для `sw.js`                        |
| `node scripts/generate-exercises-data.js` | Генерация ESM-модуля упражнений из JSON                          |

## Качество

Проект использует Jest, ESLint и Prettier. Coverage считается по ключевым доменам `js/storage`, `js/features`, `js/session`; generated exercise data исключен из покрытия.

Текущий ориентир качества закреплен в `package.json`:

```json
"coverageThreshold": {
  "global": {
    "statements": 70,
    "functions": 70,
    "lines": 70
  }
}
```

CI находится в `.github/workflows/ci.yml` и выполняет `npm ci`, `npm test`, `npm run coverage`, после чего публикует `coverage/` как artifact.

## Архитектура

```text
.
├── index.html                 # App shell
├── manifest.webmanifest       # PWA manifest
├── sw.js                      # Service worker с generated precache
├── data/
│   └── exercises.json         # Исходные данные встроенных упражнений
├── js/
│   ├── app.js                 # Bootstrap приложения
│   ├── core/                  # Router, state, selectors, PWA registration
│   ├── features/              # Доменная логика упражнений, рекомендаций, истории
│   ├── i18n/                  # RU/EN сообщения
│   ├── pages/                 # Page renderers
│   ├── session/               # Workout session engine, steps, snapshots, UI formatters
│   ├── storage/               # Store, schema, migrations, domain repositories
│   └── ui/                    # Actions, page updates, feature event bindings, shell chrome
├── scripts/                   # Генераторы и проверки
├── styles/                    # CSS
└── tests/                     # Jest-тесты
```

### Storage

`js/storage/core.js` остается совместимым facade, а доменные операции вынесены в репозитории:

| Репозиторий             | Ответственность                                         |
| ----------------------- | ------------------------------------------------------- |
| `settingsRepository.js` | Настройки, избранное, custom audio, last opened workout |
| `profileRepository.js`  | Профиль, оборудование, custom equipment                 |
| `workoutRepository.js`  | CRUD тренировок, duplicate, сортировка                  |
| `historyRepository.js`  | CRUD истории и выборка по дате                          |
| `sessionRepository.js`  | Active session snapshot                                 |

Схема и миграции живут в `js/storage/schema.js` и `js/storage/migrations.js`. Текущие основные секции стора: `settings`, `profile`, `equipment`, `customExercises`, `workouts`, `history`, `activeSession`.

### UI События

Feature bindings разделены по областям, чтобы `event-bindings.js` не превращался в общий контейнер:

| Файл                         | Область                                         |
| ---------------------------- | ----------------------------------------------- |
| `shell-event-bindings.js`    | Навигация и shell-level поведение               |
| `exercise-event-bindings.js` | Каталог и действия упражнений                   |
| `workout-event-bindings.js`  | Конструктор, карточки и запуск тренировок       |
| `settings-event-bindings.js` | Настройки, профиль, оборудование, import/export |
| `calendar-event-bindings.js` | Календарь прогресса                             |

## PWA И Offline

Service worker кэширует app shell и статические ES module imports. Список precache генерируется из shell entrypoints и импорт-графа, чтобы новые модули не выпадали из offline-режима.

После изменения статических импортов, `index.html`, CSS, manifest или иконок запусти:

```bash
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
```

Smoke-тест проверяет, что все static module imports, необходимые app shell, доступны offline через precache.

## Данные Упражнений

Встроенный каталог редактируется в `data/exercises.json`. Браузер импортирует generated module `js/features/exercises-data.js`, поэтому после изменения JSON нужно выполнить:

```bash
node scripts/generate-exercises-data.js
```

Рекомендации используют `js/features/recommendations.js`; `js/features/exercise-scoring.js` оставлен как compatibility adapter для старого API.

## Основные Маршруты

Приложение использует hash routing:

| Route                 | Экран                                |
| --------------------- | ------------------------------------ |
| `#home`               | Главная, статистика и тренировки     |
| `#exercises`          | Каталог упражнений                   |
| `#recommendations`    | Рекомендации                         |
| `#exercise-create`    | Создание упражнения                  |
| `#exercise-view/<id>` | Просмотр упражнения                  |
| `#exercise-edit/<id>` | Редактирование упражнения            |
| `#workout-create`     | Создание тренировки                  |
| `#workout-view/<id>`  | Просмотр тренировки                  |
| `#workout-edit/<id>`  | Редактирование тренировки            |
| `#workout-run/<id>`   | Выполнение тренировки                |
| `#settings`           | Настройки, профиль, импорт и экспорт |

## Поддержка Браузеров

Нужен современный браузер с поддержкой ES modules, service workers, `localStorage`, Web Audio API и File API.

## Документация

Исходное техническое задание находится в `docs/Техническое задание.md`.

## Лицензия

MIT. См. [LICENSE](LICENSE).
