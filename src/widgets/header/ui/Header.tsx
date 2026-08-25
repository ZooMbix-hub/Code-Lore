import Link from 'next/link';
import { ROUTES } from '@/shared/config';

export const Header = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-10 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <Link href={ROUTES.main} className="flex items-center gap-2 font-semibold tracking-tight">
          <span aria-hidden className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
            ◇
          </span>
          Code Lore
        </Link>
        <ul className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <Link href={ROUTES.docs} className="hover:text-foreground transition-colors">
              Docs
            </Link>
          </li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
};
