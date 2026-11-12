import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/db/client';
import { sessions } from '@/db/schema';
import { SESSION_TTL_SEC, type SessionStore } from './storage';

export const sessionStorePostgres: SessionStore = {
  async set(tokenHash, userId) {
    await db.insert(sessions).values({
      tokenHash,
      userId,
      expiresAt: new Date(Date.now() + SESSION_TTL_SEC * 1000),
    });
  },

  async get(tokenHash) {
    const [row] = await db
      .select({ userId: sessions.userId })
      .from(sessions)
      .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date())));

    return row?.userId ?? null;
  },

  async del(tokenHash) {
    await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
  },
};
