import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { getSession } from '@/features/session/session';
import { Button } from '../primitives';
import { UserMenu } from './UserMenu';
import { Logo } from './Logo';

export async function Header() {
  const session = await getSession();

  return (
    <header className="bg-background/80 sticky top-0 z-10 border-b border-zinc-200/60 backdrop-blur-sm dark:border-zinc-800/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <Link href={ROUTES.main} className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Logo size={22} />
          Code Lore
        </Link>
        <ul className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <Link href={ROUTES.docs} className="hover:text-foreground transition-colors">
              Документации
            </Link>
          </li>
          <li>Статьи</li>
          <li>Практика</li>
          <li>
            {session ? (
              <UserMenu userName="name" userRole="reader" />
            ) : (
              <Button variant="outline" size="s" nativeButton={false} render={<Link href={ROUTES.login} />}>
                Войти
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
