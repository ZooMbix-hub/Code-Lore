'use client';

import { Logo } from '@/ui/components/Logo';
import { Button, Field, Input } from '@/ui/primitives';

export function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4">
      <Logo size={40} />
      <h1 className="mt-5 text-xl font-semibold tracking-tight">Code Lore</h1>
      <form className="mt-8 flex w-full max-w-xs flex-col gap-5">
        <Field label="Логин">{(p) => <Input {...p} name="login" autoComplete="username" />}</Field>
        <Field label="Пароль">
          {(p) => <Input {...p} name="password" type="password" autoComplete="current-password" />}
        </Field>
        <Button type="button" className="w-full">
          Войти
        </Button>
      </form>
    </main>
  );
}
