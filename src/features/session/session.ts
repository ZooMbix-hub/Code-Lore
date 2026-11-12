import { createHash, randomBytes } from 'node:crypto';
import { and, eq, isNull } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '@/db/client';
import { users, type userRoleEnum } from '@/db/schema';
import { redis } from '@/redis/client';

interface SessionUser {
  id: string;
  name: string;
  role: (typeof userRoleEnum.enumValues)[number];
}

const SESSION_COOKIE = 'session';
const SESSION_TTL_SEC = 30 * 24 * 60 * 60;

function sessionKey(token: string): string {
  return `session:${createHash('sha256').update(token).digest('hex')}`;
}

async function dropSession(key: string): Promise<null> {
  await redis.del(key);
  return null;
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

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const key = sessionKey(token);

  let userId: string | undefined;

  try {
    const raw = await redis.get(key);

    if (!raw) return null;

    userId = (JSON.parse(raw) as { userId?: string }).userId;
  } catch {
    return dropSession(key);
  }

  if (!userId) {
    return dropSession(key);
  }

  const [user] = await db
    .select({ id: users.id, name: users.name, role: users.role })
    .from(users)
    .where(and(eq(users.id, userId), isNull(users.deletedAt)));

  if (!user) {
    return dropSession(key);
  }

  return user;
}
