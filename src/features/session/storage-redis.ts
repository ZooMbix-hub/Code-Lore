import { redis } from '@/redis/client';
import { SESSION_TTL_SEC, type SessionStore } from './storage';

const key = (tokenHash: string) => `session:${tokenHash}`;

export const sessionStoreRedis: SessionStore = {
  async set(tokenHash, userId) {
    await redis.set(key(tokenHash), JSON.stringify({ userId }), 'EX', SESSION_TTL_SEC);
  },

  async get(tokenHash) {
    const raw = await redis.get(key(tokenHash));
    if (!raw) return null;

    try {
      return (JSON.parse(raw) as { userId?: string }).userId ?? null;
    } catch {
      await redis.del(key(tokenHash));
      return null;
    }
  },

  async del(tokenHash) {
    await redis.del(key(tokenHash));
  },
};
