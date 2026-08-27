import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

type Db = ReturnType<typeof createDb>;

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL не задан. Скопируйте .env.example в .env.local и поднимите базу: pnpm db:up',
    );
  }
  const client = postgres(url, { max: 10 });
  return drizzle({ client });
}

const globalForDb = globalThis as unknown as { db?: Db };

export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    globalForDb.db ??= createDb();
    const instance = globalForDb.db as object;
    const value = Reflect.get(instance, prop, instance);
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});
