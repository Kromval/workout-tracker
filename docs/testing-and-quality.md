# Тестирование и качество

## Инструменты

Проект использует:

- Jest для модульных и интеграционных тестов;
- Playwright для e2e smoke-тестов;
- ESLint для статической проверки;
- Prettier для форматирования;
- GitHub Actions для CI.

## Jest

Запуск:

```bash
npm test
```

Watch-режим:

```bash
npm run test:watch
```

Jest настроен на `testEnvironment: "node"` и ищет файлы:

```text
tests/**/*.test.js
```

Покрытие собирается для:

- `js/storage/**/*.js`;
- `js/features/**/*.js`;
- `js/session/**/*.js`;

Исключение:

- `js/features/exercises-data.js`, потому что это сгенерированный модуль.

Глобальный порог покрытия:

| Метрика | Порог |
| --- | ---: |
| statements | 70% |
| functions | 70% |
| lines | 70% |

Запуск покрытия:

```bash
npm run coverage
```

## Группы тестов

| Путь | Что проверяет |
| --- | --- |
| `tests/storage/` | Core storage, репозитории, записи, миграции. |
| `tests/features/` | Рекомендации, генерация тренировок, совместимость, история, противопоказания. |
| `tests/session/` | Шаги, таймер, снимки, форматирование UI, утилиты. |
| `tests/pwa/` | Service worker и полнота app shell precache. |
| `tests/security/` | Регрессии XSS. |
| `tests/core/` | Стабильность selectors. |
| `tests/pages/` | Рендереры страниц. |
| `tests/e2e/` | Smoke-сценарии Playwright. |

## Playwright

Установка браузера:

```bash
npm run e2e:install
```

Запуск:

```bash
npm run e2e
```

Запуск с видимым браузером:

```bash
npm run e2e:headed
```

UI-режим:

```bash
npm run e2e:ui
```

Playwright использует `playwright.config.js`, стартует статический Node-сервер через `scripts/e2e-server.js` и изолирует `localStorage` между тестами.

## ESLint и Prettier

ESLint:

```bash
npm run lint
```

Проверка форматирования:

```bash
npm run format:check
```

Автоформатирование:

```bash
npm run format
```

## CI

Workflow находится в `.github/workflows/ci.yml`.

CI выполняет:

1. checkout;
2. setup Node.js 22;
3. `npm ci`;
4. `npm run lint`;
5. `npm run format:check`;
6. `npm test`;
7. `npm run e2e:install`;
8. `npm run e2e`;
9. `npm run generate:precache`;
10. `npm test -- tests/pwa/service-worker.test.js`;
11. `npm run coverage`;
12. upload coverage artifact.

## Проверки при изменении данных упражнений

После изменения `data/exercises.json`:

```bash
node scripts/generate-exercises-data.js
npm test -- tests/features/exercise-data-tags.test.js
```

Если изменился набор модулей или app shell:

```bash
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
```

## Проверки при изменении хранилища

Минимально:

```bash
npm test -- tests/storage
```

Проверьте вручную:

- сохранение настроек;
- экспорт JSON;
- импорт в режиме merge;
- импорт в режиме replace;
- миграцию старого store, если добавлена новая версия.

## Проверки при изменении сессии

Минимально:

```bash
npm test -- tests/session
```

Проверьте вручную:

- запуск тренировки;
- паузу и продолжение;
- пропуск шага;
- добавление и вычитание времени;
- завершение;
- восстановление после перезагрузки страницы.

## Перед релизом

Рекомендуемый полный набор:

```bash
npm run lint
npm run format:check
npm test
npm run e2e
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
npm run coverage
```
