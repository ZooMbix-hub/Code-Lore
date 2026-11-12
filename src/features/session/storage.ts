import { sessionStorePostgres } from './storage-postgres';
import { sessionStoreRedis } from './storage-redis';

export interface SessionStore {
  set(tokenHash: string, userId: string): Promise<void>;
  get(tokenHash: string): Promise<string | null>;
  del(tokenHash: string): Promise<void>;
}

export const SESSION_TTL_SEC = 30 * 24 * 60 * 60;

const storageType =
  process.env.SESSION_STORAGE ?? (process.env.NODE_ENV === 'production' ? 'postgres' : 'redis');

export const sessionStore: SessionStore =
  storageType === 'postgres' ? sessionStorePostgres : sessionStoreRedis;
