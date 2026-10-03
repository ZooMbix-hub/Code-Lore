import Link from 'next/link';
import type { Route } from 'next';
import { cn } from 'cn';

export interface BreadcrumbsItem<T extends string = string> {
  label: string;
  href?: Route<T>;
}

export interface BreadcrumbsProps<T extends string = string> {
  items: BreadcrumbsItem<T>[];
  className?: string;
}

export const Breadcrumbs = <T extends string = string>({ items, className }: BreadcrumbsProps<T>) => {
  return (
    <nav aria-label="Хлебные крошки" className={cn('font-mono text-xs', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden className="text-zinc-500 dark:text-zinc-500">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground text-zinc-500 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
