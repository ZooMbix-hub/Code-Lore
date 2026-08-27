# Code Lore

Приложение для документации на Next.js 16 (App Router) + Tailwind CSS v4.

## Архитектура

Проект следует методологии Feature-Sliced Design, адаптированной под App Router: слои `app → views → widgets → features → entities → shared`. Правила импортов и шпаргалка «что класть куда» — в [ARCHITECTURE.md](./ARCHITECTURE.md).

## Getting Started

```bash
pnpm install
pnpm db:up       # поднять PostgreSQL в Docker (первый раз скачает образ)
pnpm db:migrate  # применить миграции
pnpm db:seed     # наполнить каталог стартовыми данными
pnpm dev
```

## Работа с базой данных

PostgreSQL 18 крутится локально в Docker (`docker-compose.yml`), ORM — [Drizzle](https://orm.drizzle.team), миграции — drizzle-kit.

| Команда            | Действие                                        |
| ------------------ | ----------------------------------------------- |
| `pnpm db:up`       | поднять БД (ждёт healthcheck)                   |
| `pnpm db:down`     | остановить БД (данные в volume сохраняются)     |
| `pnpm db:generate` | создать SQL-миграцию из изменений в `schema.ts` |
| `pnpm db:migrate`  | применить миграции                              |
| `pnpm db:push`     | быстрый синк схемы в деве, без файлов миграций  |
| `pnpm db:seed`     | наполнить каталог стартовыми данными            |
| `pnpm db:studio`   | открыть Drizzle Studio (GUI для БД)             |

Структура: `src/entities/doc/model/schema.ts` — таблицы, `src/shared/config/db.ts` — клиент (ленивый singleton), `src/entities/doc/api/queries.ts` — запросы, `drizzle/` — файлы миграций (коммитятся).

Подключение задаётся `DATABASE_URL` в `.env.local` (шаблон — `.env.example`). Сборка (`pnpm build`) требует запущенную БД: `generateStaticParams` страниц секций ходит в Postgres.

### Продакшен (Vercel)

Локальный Docker на проде не нужен — создайте облачную базу (например, [Neon](https://neon.tech), free tier) и добавьте `DATABASE_URL` в env переменные проекта на Vercel. Для Neon используйте pooled-строку подключения (суффикс `-pooler`). При первом деплое выполните на проде `db:migrate` и, при необходимости, `db:seed`.
