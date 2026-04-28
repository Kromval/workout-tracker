# AI-промпты для проекта

## Назначение

Эти промпты помогают использовать AI-ассистента для поддержки проекта. Перед применением проверяйте результат тестами и ревью кода.

## Анализ архитектуры

```text
Проанализируй архитектуру Workout Planner. Учитывай, что это статическое PWA без фреймворка: HTML, CSS, ES-модули, hash routing, localStorage и service worker. Сначала прочитай js/app.js, js/core, js/ui/shell.js, js/features, js/storage и js/session. Дай краткую карту слоев, поток запуска и риски связности.
```

## Добавление функции

```text
Добавь функцию <описание>. Сначала найди существующие паттерны в js/features, js/pages, js/ui и js/storage. Держи доменную логику отдельно от DOM. Обнови локализацию ru/en, если появляются пользовательские строки. Добавь focused Jest-тесты и укажи команды проверки.
```

## Изменение хранилища

```text
Нужно изменить структуру сохраняемых данных: <описание>. Проверь js/storage/schema.js, records.js, migrations.js, store.js и соответствующие repository-файлы. Если меняется persisted schema, увеличь STORAGE_VERSION, добавь миграцию, обнови DEFAULT_STORE, санитайзеры, импорт/экспорт и тесты в tests/storage.
```

## Добавление упражнений

```text
Добавь новые упражнения в data/exercises.json. Соблюдай текущую nested-модель: names, classification, mechanics, muscles, technique, dosage, safety, progression, media. После изменения обнови js/features/exercises-data.js через node scripts/generate-exercises-data.js и проверь tests/features/exercise-data-tags.test.js.
```

## Улучшение рекомендаций

```text
Улучши алгоритм рекомендаций для <цель>. Сначала изучи js/features/recommendations.js, exercise-compatibility.js, contraindications.js, body-focus.js и tests/features/recommendations.test.js. Сохрани двухэтапную модель: жесткая фильтрация перед скорингом. Добавь тесты на новые сигналы, penalty и edge cases.
```

## Генерация тренировки

```text
Измени генератор тренировки: <описание>. Учитывай createSingleWorkoutRecommendation, selectSingleWorkoutType, buildSingleWorkoutTemplate, selectExercisesForSlots, prescribeWorkoutItem и fitWorkoutToDuration в js/features/workout-generation.js. Проверь, что длительность остается в допустимом диапазоне и нет дублей упражнений в слотах.
```

## Работа с движком сессии

```text
Измени поведение активной тренировочной сессии: <описание>. Изучи js/session/model.js, steps.js, core.js, snapshot.js и tests/session. Не смешивай таймер с DOM. Обнови восстановление snapshot, если меняется форма шагов или статусов.
```

## PWA и precache

```text
Проверь PWA-часть после изменения статических модулей. Изучи sw.js, js/core/pwa.js, scripts/generate-precache.js, scripts/precache-utils.js и tests/pwa/service-worker.test.js. Если изменился app shell, запусти npm run generate:precache и обнови тесты при необходимости.
```

## Code review

```text
Проведи code review изменений. Ищи регрессии, ошибки в данных, поломки localStorage-миграций, проблемы офлайн-кеша, XSS-риски, нарушения границ features/pages/ui/storage/session и недостающие тесты. Вывод дай списком findings по серьезности с файлами и строками.
```

## Тестовый план

```text
Составь тестовый план для изменения: <описание>. Раздели проверки на Jest, Playwright, ручную проверку и PWA/offline. Укажи существующие тестовые файлы, которые нужно обновить, и новые edge cases.
```

## Документация

```text
Обнови русскоязычную документацию в docs после изменения: <описание>. Проверь README.md, architecture.md, storage.md, pwa-offline.md, workout-session-engine.md, recommendations.md, data-model.md и testing-and-quality.md. Не описывай поведение, которого нет в коде.
```
