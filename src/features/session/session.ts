import { createHash, randomBytes } from 'node:crypto';
import { and, eq, isNull } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '@/db/client';
import { users, type userRoleEnum } from '@/db/schema';
import { SESSION_TTL_SEC, sessionStore } from './storage';

interface SessionUser {
  id: string;
  name: string;
  role: (typeof userRoleEnum.enumValues)[number];
}

const SESSION_COOKIE = 'session';

function tokenHash(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('base64url');
  await sessionStore.set(tokenHash(token), userId);

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

  const hash = tokenHash(token);

  const userId = await sessionStore.get(hash);
  if (!userId) return null;

  const [user] = await db
    .select({ id: users.id, name: users.name, role: users.role })
    .from(users)
    .where(and(eq(users.id, userId), isNull(users.deletedAt)));

  if (!user) {
    await sessionStore.del(hash);
    return null;
  }

  return user;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await sessionStore.del(tokenHash(token));
  }

  cookieStore.delete(SESSION_COOKIE);
}
