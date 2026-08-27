import Link from 'next/link';
import { ROUTES } from '@/shared/config';
import { getSectionStyles } from '../model';
import type { Doc } from '../model';

export const DocCard = ({ doc }: { doc: Doc }) => {
  const { name, title, glyph, description } = doc;
  const styles = getSectionStyles(name);

  return (
    <Link
      href={ROUTES.section(name)}
      className={`group flex min-h-44 flex-col gap-3 rounded-2xl border border-zinc-300 bg-zinc-50/50 p-6 backdrop-blur transition-all hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900/50 ${styles.border}`}
    >
      <div className="flex items-center gap-3">
        <span className={`rounded-md border px-2 py-0.5 font-mono text-sm font-semibold ${styles.glyph}`}>
          {glyph}
        </span>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      <span
        className={`mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-zinc-500 transition-colors dark:text-zinc-500 ${styles.link}`}
      >
        Читать{' '}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
};
