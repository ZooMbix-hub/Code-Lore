import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { redis } from '@/redis/client';

const SESSION_COOKIE = 'session';
const SESSION_TTL_SEC = 30 * 24 * 60 * 60;

function sessionKey(token: string): string {
  return `session:${createHash('sha256').update(token).digest('hex')}`;
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('base64url');
  await redis.set(sessionKey(token), JSON.stringify({ userId }), 'EX', SESSION_TTL_SEC);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SEC,
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const key = sessionKey(token);

  try {
    const raw = await redis.get(key);

    if (!raw) return null;

    return (JSON.parse(raw) as { userId: string }).userId;
  } catch {
    await redis.del(key);
    return null;
  }
}
