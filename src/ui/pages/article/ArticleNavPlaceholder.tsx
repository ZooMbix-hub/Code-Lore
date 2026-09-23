import Link from 'next/link';
import { cn } from 'cn';
import { ROUTES } from '@/config/routes';
import { getSectionStyles, type ArticleView } from '@/features/docs';

interface ArticleNavPlaceholderProps {
  direction: 'prev' | 'next';
  doc: ArticleView['doc'];
}

export const ArticleNavPlaceholder = ({ direction, doc }: ArticleNavPlaceholderProps) => {
  const isNext = direction === 'next';
  const styles = getSectionStyles(doc.name);

  return (
    <Link
      href={ROUTES.section(doc.name)}
      className={cn(
        'flex flex-col gap-2 rounded-xl border border-zinc-300 p-4 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700',
        isNext && 'items-end text-right',
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
        {isNext ? 'Конец раздела' : 'Начало раздела'}
      </span>
      <span className={cn('text-base font-semibold tracking-tight', styles.text)}>{doc.title}</span>
    </Link>
  );
};
