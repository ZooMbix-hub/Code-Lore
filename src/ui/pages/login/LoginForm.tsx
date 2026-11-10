'use client';

import { useActionState } from 'react';
import { loginAction } from '@/features/auth/actions';
import { Button, Field, Input } from '@/ui/primitives';

export function LoginForm() {
  const [{ errors, values }, formAction, isPending] = useActionState(loginAction, {
    errors: {},
    values: { login: '', password: '' },
  });

  return (
    <form action={formAction} className="mt-8 flex w-full max-w-xs flex-col gap-5">
      <Field label="Логин" error={errors.login}>
        {(p) => (
          <Input
            {...p}
            name="login"
            autoComplete="username"
            placeholder="Введите логин"
            defaultValue={values.login}
          />
        )}
      </Field>
      <Field label="Пароль" error={errors.password}>
        {(p) => (
          <Input
            {...p}
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Введите пароль"
            defaultValue={values.password}
          />
        )}
      </Field>
      <Button type="submit" className="w-full" loading={isPending}>
        Войти
      </Button>
    </form>
  );
}
