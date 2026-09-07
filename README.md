# Code Lore

Приложение для документации на Next.js 16 + Tailwind CSS v4.

## Архитектура

Проект построен по feature-based подходу, адаптированному под Next.js App Router: главные оси — вертикальные домены (`features/`) и граница server ↔ client. Правила импортов и шпаргалка «что класть куда» — в [ARCHITECTURE.md](./ARCHITECTURE.md).

## Getting Started

```bash
pnpm install
pnpm db:up       # поднять PostgreSQL в Docker
pnpm db:migrate  # применить миграции
pnpm db:seed     # наполнить каталог стартовыми данными
pnpm dev
```

## Работа с базой данных

PostgreSQL 18 крутится локально в Docker, ORM — Drizzle, миграции — drizzle-kit.

| Команда            | Действие                                        |
| ------------------ | ----------------------------------------------- |
| `pnpm db:up`       | поднять БД (ждёт healthcheck)                   |
| `pnpm db:down`     | остановить БД                                   |
| `pnpm db:generate` | создать SQL-миграцию из изменений в `schema.ts` |
| `pnpm db:migrate`  | применить миграции                              |
| `pnpm db:push`     | быстрый синк схемы в деве, без файлов миграций  |
| `pnpm db:seed`     | наполнить каталог стартовыми данными            |
| `pnpm db:studio`   | открыть Drizzle Studio (GUI)                    |

Структура: `src/db/schema.ts` — таблицы, `src/db/client.ts` — клиент (ленивое подключение), `src/features/docs/queries.ts` — запросы, `drizzle/` — файлы миграций (коммитятся).

Подключение задаётся `DATABASE_URL` в `.env.local` (шаблон — `.env.example`). Сборка (`pnpm build`) требует запущенную БД: `generateStaticParams` страниц секций ходит в Postgres.

### Продакшен (Vercel)

Локальный Docker на проде не нужен — создайте облачную базу (например, [Neon](https://neon.tech), free tier) и добавьте `DATABASE_URL` в env переменные проекта на Vercel. Для Neon используйте pooled-строку подключения (суффикс `-pooler`). При первом деплое выполните на проде `db:migrate` и, при необходимости, `db:seed`.
