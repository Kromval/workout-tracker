# Развертывание

## Модель развертывания

Workout Planner - статическое приложение. Для production не нужен Node.js-сервер, база данных или backend API. Достаточно отдать файлы репозитория через любой статический хостинг.

Подходящие варианты:

- GitHub Pages;
- Netlify;
- Vercel static output;
- Cloudflare Pages;
- любой HTTPS-сервер для статических файлов.

## Что публиковать

Публикуется корень проекта со статическими файлами:

- `index.html`;
- `manifest.webmanifest`;
- `sw.js`;
- `assets/`;
- `js/`;
- `styles/`.

Для работы приложения не нужны:

- `node_modules/`;
- `coverage/`;
- `test-results/`;
- `tests/`;
- `scripts/`, если хостинг не использует их в build step;
- локальные заметки и временные файлы.

## Подготовка

Перед публикацией выполните:

```bash
npm ci
npm run lint
npm run format:check
npm test
npm run e2e
npm run generate:precache
npm test -- tests/pwa/service-worker.test.js
npm run coverage
```

Если `npm run generate:precache` изменил `sw.js`, эти изменения нужно включить в релиз.

## HTTPS

Для установки PWA и работы service worker в production нужен HTTPS. Исключение - локальная разработка на `localhost` или `127.0.0.1`.

## Base path

Manifest использует относительные пути:

```json
{
  "start_url": "./",
  "scope": "./"
}
```

Service worker и app shell также используют относительные пути. Это позволяет размещать приложение как в корне домена, так и в подпапке, если статический хостинг корректно отдает файлы.

## Настройка fallback

Приложение использует hash routing, поэтому серверный rewrite для маршрутов обычно не нужен. Все маршруты выглядят как `/#home` или `/#workout-view/id`, а сервер видит только запрос `index.html`.

## Cache-control

Рекомендуемый подход:

- для `index.html`, `sw.js` и `manifest.webmanifest` - короткий кеш или revalidation;
- для иконок, JS и CSS можно использовать более длинный кеш, но service worker уже управляет app shell;
- после обновления `sw.js` браузер получит новый cache name и удалит старый кеш на `activate`.

## Проверка после публикации

1. Откройте production URL.
2. Проверьте основные маршруты.
3. В DevTools проверьте, что service worker активен.
4. Перезагрузите страницу.
5. Проверьте offline-режим.
6. Создайте тестовую тренировку и экспортируйте JSON.
7. Очистите тестовые данные или используйте отдельный профиль браузера.

## Данные пользователя

Пользовательские данные привязаны к origin. При смене домена, протокола или пути браузер может считать приложение другим origin или scope. Перед миграцией production-адреса предупредите пользователей сделать экспорт JSON.
