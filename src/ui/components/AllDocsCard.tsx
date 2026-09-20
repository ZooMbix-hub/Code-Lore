import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export const AllDocsCard = () => (
  <Link
    href={ROUTES.docs}
    className="group flex min-h-44 flex-col gap-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
  >
    <h3 className="text-lg font-semibold tracking-tight">Все документации</h3>
    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      Остальные разделы справочника — весь список в одном месте.
    </p>
    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-800 dark:text-zinc-500 dark:group-hover:text-zinc-200">
      Смотреть все{' '}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </span>
  </Link>
);
