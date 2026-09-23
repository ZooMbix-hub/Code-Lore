import Link from 'next/link';
import type { Route } from 'next';
import { cn } from 'cn';

interface ArticleNavButtonProps<H extends string> {
  direction: 'prev' | 'next';
  label: string;
  title: string;
  subtitle?: string;
  href: Route<H>;
  className?: string;
}

export const ArticleNavButton = <H extends string>({
  direction,
  label,
  title,
  subtitle,
  href,
}: ArticleNavButtonProps<H>) => {
  const isNext = direction === 'next';

  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-2 rounded-xl border border-zinc-300 bg-transparent p-4 text-left transition-colors outline-none hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700',
        isNext && 'items-end text-right',
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
        {!isNext && (
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
        )}
        {label}
        {isNext && (
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        )}
      </span>
      <span className="text-base font-semibold tracking-tight">{title}</span>
      {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
    </Link>
  );
};
