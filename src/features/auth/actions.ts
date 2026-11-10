'use server';

import { redirect } from 'next/navigation';
import { verify } from '@node-rs/argon2';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db/client';
import { users } from '@/db/schema';
import { createSession } from '../session/session';
import type { LoginFormState } from './types';

export async function loginAction(_prev: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const login = String(formData.get('login') ?? '');
  const password = String(formData.get('password') ?? '');

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.login, login), isNull(users.deletedAt)));

  if (!user) {
    return { errors: { login: 'Неверный логин' }, values: { login } };
  }

  const isValidPassword = await verify(user.password, password);

  if (!isValidPassword) {
    return { errors: { password: 'Неверный пароль' }, values: { password } };
  }

  await createSession(user.id);

  redirect('/docs');
}
