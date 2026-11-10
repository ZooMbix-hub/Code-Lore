'use client';

import { Logo } from '@/ui/components/Logo';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4">
      <Logo size={40} />
      <h1 className="mt-5 text-xl font-semibold tracking-tight">Code Lore</h1>
      <LoginForm />
    </main>
  );
}
