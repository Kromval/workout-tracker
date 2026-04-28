# Руководство разработчика

## Стек

Проект использует:

- HTML, CSS и нативные ES-модули;
- hash routing без внешнего роутера;
- `localStorage` как локальное хранилище;
- service worker для PWA и офлайн-старта;
- Jest для модульных тестов;
- Playwright для e2e smoke-тестов;
- ESLint и Prettier для качества кода.

## Установка

```bash
npm ci
```

Запуск локального сервера:

```bash
npx serve .
```

или:

```bash
python -m http.server 8000
```

Для проверки service worker используйте `localhost`, `127.0.0.1` или HTTPS.

## Скрипты

| Команда | Назначение |
| --- | --- |
| `npm test` | Все Jest-тесты. |
| `npm run test:watch` | Jest в watch-режиме. |
| `npm run coverage` | Покрытие с глобальным порогом 70%. |
| `npm run e2e` | Playwright smoke-тесты. |
| `npm run e2e:headed` | Playwright с видимым браузером. |
| `npm run e2e:install` | Установка Chromium для Playwright. |
| `npm run lint` | ESLint. |
| `npm run format:check` | Проверка Prettier. |
| `npm run format` | Форматирование проекта. |
| `npm run generate:precache` | Обновление precache-списка в `sw.js`. |
| `node scripts/generate-exercises-data.js` | Генерация `js/features/exercises-data.js` из `data/exercises.json`. |

## Структура проекта

```text
.
├── index.html
├── manifest.webmanifest
├── sw.js
├── data/
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
├── styles/
└── tests/
```

## Поток запуска

1. `index.html` загружает `js/app.js`.
2. `bootstrap()` регистрирует service worker через `js/core/pwa.js`.
3. Инициализируется оболочка интерфейса.
4. Подписка `subscribe(renderApp)` связывает состояние с рендерингом.
5. Загружаются встроенные упражнения.
6. Инициализируется hash-router.

## Разработка функций

Ориентируйтесь на существующие границы:

- доменная логика без DOM - в `js/features/`;
- рендеринг экранов - в `js/pages/`;
- обработчики событий и UI-действия - в `js/ui/`;
- состояние сессии тренировки - в `js/session/`;
- сохранение и нормализация данных - в `js/storage/`.

Новые функции лучше строить через чистые функции в `features` или `session`, а DOM-слой оставлять тонким. Это упрощает тестирование Jest.

## Работа с упражнениями

Исходник встроенного каталога находится в `data/exercises.json`. Браузер напрямую его не загружает. Runtime-данные попадают в приложение через сгенерированный модуль `js/features/exercises-data.js`.

После изменения `data/exercises.json` выполните:

```bash
node scripts/generate-exercises-data.js
npm test -- tests/features/exercise-data-tags.test.js
```

Если изменения влияют на статические импорты или PWA app shell, выполните также:

```bash
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
```

## Работа с хранилищем

Схема находится в `js/storage/schema.js`, нормализация записей - в `js/storage/records.js`, миграции - в `js/storage/migrations.js`. Публичный фасад экспортируется из `js/storage/core.js`.

При изменении структуры данных:

1. увеличьте `STORAGE_VERSION`;
2. добавьте миграцию из предыдущей версии;
3. обновите `DEFAULT_STORE` и санитайзеры;
4. добавьте или обновите тесты в `tests/storage/`;
5. проверьте импорт и экспорт.

## Работа с PWA

`sw.js` содержит имя кеша и массив `APP_SHELL`. Этот массив генерируется скриптом `scripts/generate-precache.js`, который проходит по локальным статическим импортам.

После изменения `index.html`, CSS, manifest, иконок, модулей или generated data запускайте:

```bash
npm run generate:precache
```

## Тестирование перед сдачей

Минимальный набор:

```bash
npm run lint
npm run format:check
npm test
npm run e2e
npm run coverage
```

Если менялся service worker или статические импорты:

```bash
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
```

## Кодстайл

- Используйте ES-модули.
- Не смешивайте DOM-логику с доменными расчетами.
- Для данных используйте санитайзеры и репозитории из `js/storage/`.
- Для новых пользовательских текстов обновляйте `js/i18n/messages-ru.js` и `js/i18n/messages-en.js`.
- Добавляйте тесты пропорционально риску изменения.
