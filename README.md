# Workout Tracker

Workout Tracker - open-source PWA-приложение для планирования тренировок, подбора упражнений, запуска пошаговых сессий и ведения истории прогресса. Проект работает как статический сайт без backend API, хранит данные локально в браузере и поддерживает офлайн-запуск.

## Badges

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-1f6feb)](.github/workflows/ci.yml)
[![PWA](https://img.shields.io/badge/PWA-offline%20ready-0f766e)](manifest.webmanifest)
[![Coverage](https://img.shields.io/badge/coverage-%E2%89%A570%25-15803d)](package.json)
[![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20ESM-334155)](#технологии)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Возможности

- Каталог встроенных и пользовательских упражнений с поиском, фильтрами, избранным и учетом оборудования.
- Профиль пользователя: уровень подготовки, цели, фокус тела, ограничения, восстановление и предпочтения.
- Рекомендации упражнений с жесткой фильтрацией и взвешенным скорингом.
- Конструктор тренировок с подходами, повторами, длительностью, отдыхом, темпом и заметками.
- Генератор одной тренировки под длительность, тип, цели, оборудование и противопоказания.
- Пошаговый runner тренировки с таймером, отдыхом, паузой, пропуском, изменением времени и звуками.
- Восстановление активной сессии после закрытия вкладки.
- История тренировок, оценки, заметки, расчет калорий, статистика и календарь активности.
- Импорт и экспорт локальных данных в JSON.
- PWA-режим с manifest, service worker и offline app shell.

## Демо / запуск

Демо: https://kromval.github.io/workout-tracker/

Локальный запуск:

```bash
npm ci
npx serve .
```

Откройте URL из терминала. Для PWA и service worker используйте `localhost`, `127.0.0.1` или HTTPS. Запуск через `file://` не поддерживается.

Альтернатива без npm-сервера:

```bash
python -m http.server 8000
```

## Технологии

- HTML, CSS, JavaScript ES Modules.
- Hash routing без внешнего роутера.
- `localStorage` для local-first хранения данных.
- Service Worker и Web App Manifest для PWA.
- Web Audio API для сигналов тренировочной сессии.
- Jest, Playwright, ESLint, Prettier.
- GitHub Actions для CI.

## Архитектура кратко

Приложение разделено на независимые слои:

- `core` - bootstrap, router, state, PWA-регистрация и общие утилиты;
- `features` - доменная логика упражнений, рекомендаций, тренировок, истории и аудио;
- `storage` - схема, миграции, репозитории, импорт и экспорт;
- `session` - движок активной тренировки, шаги, таймер и snapshot-восстановление;
- `pages` и `ui` - рендеринг экранов, shell, actions и event bindings.

Подробнее: [docs/architecture.md](docs/architecture.md).

## Структура проекта

```text
.
├── index.html
├── manifest.webmanifest
├── sw.js
├── data/
├── docs/
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

## Команды

| Команда                                   | Назначение                                                          |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `npm test`                                | Запуск Jest-тестов.                                                 |
| `npm run test:watch`                      | Jest в watch-режиме.                                                |
| `npm run coverage`                        | Проверка покрытия с порогом 70%.                                    |
| `npm run e2e`                             | Playwright smoke-тесты.                                             |
| `npm run e2e:headed`                      | E2E-тесты с видимым браузером.                                      |
| `npm run lint`                            | ESLint.                                                             |
| `npm run format:check`                    | Проверка форматирования Prettier.                                   |
| `npm run format`                          | Автоформатирование.                                                 |
| `npm run generate:precache`               | Обновление precache-списка в `sw.js`.                               |
| `node scripts/generate-exercises-data.js` | Генерация `js/features/exercises-data.js` из `data/exercises.json`. |

## PWA/offline

Service worker кеширует app shell, стили, иконки и статические ES-модули, необходимые для старта приложения. После первого успешного открытия приложение может запускаться без сети, а пользовательские данные остаются в `localStorage`.

После изменения статических импортов, CSS, manifest, иконок или generated data выполните:

```bash
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
```

Подробнее: [docs/pwa-offline.md](docs/pwa-offline.md).

## Тестирование и качество

В проекте есть проверки для:

- хранилища, миграций, импорта и репозиториев;
- рекомендаций, совместимости упражнений и генерации тренировок;
- движка тренировочной сессии, snapshot-восстановления и UI-форматирования;
- service worker precache;
- e2e smoke-сценариев через Playwright;
- XSS-регрессий.

CI запускает lint, форматирование, Jest, Playwright, PWA-проверки и coverage. Подробности: [docs/testing-and-quality.md](docs/testing-and-quality.md).

## Документация

- [Обзор документации](docs/README.md)
- [Руководство пользователя](docs/user-guide.md)
- [Руководство разработчика](docs/developer-guide.md)
- [Архитектура](docs/architecture.md)
- [Хранилище](docs/storage.md)
- [PWA и offline](docs/pwa-offline.md)
- [Движок тренировочной сессии](docs/workout-session-engine.md)
- [Рекомендации и генерация](docs/recommendations.md)
- [Модель данных](docs/data-model.md)
- [Развертывание](docs/deployment.md)
- [FAQ](docs/faq.md)

## Roadmap

- Добавить публичное демо и реальные скриншоты.
- Улучшить мобильный UX активной тренировки.
- Расширить каталог упражнений и покрытие тегов.
- Добавить более подробные объяснения рекомендаций в UI.
- Подготовить сценарии резервного копирования и восстановления данных.
- Рассмотреть опциональную синхронизацию без нарушения local-first модели.
- 

## Лицензия

MIT. См. [LICENSE](LICENSE).
