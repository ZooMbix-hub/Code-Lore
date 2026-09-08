'use client';

import { useMemo, useState, useEffect } from 'react';
import { cn } from 'cn';
import type { RenderedMarkdown } from '@/lib/markdown';

interface ArticleTocProps {
  headings: RenderedMarkdown['headings'];
}

export const ArticleToc = ({ headings }: ArticleTocProps) => {
  const _headings = useMemo(() => (headings ? [...headings.values()] : []), [headings]);
  const [activeId, setActiveId] = useState(_headings.length ? _headings[0].id : '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        const current = _headings.find(({ id }) => visible.has(id));
        if (current) {
          setActiveId(current.id);
        }
      },
      { rootMargin: '-73px 0px -66% 0px' },
    );

    _headings.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [_headings]);

  return (
    <nav className="sticky top-14.25 h-[calc(100dvh-57px)] w-64 py-8">
      <ul className="flex flex-col">
        {_headings.map(({ id, text, depth }) => (
          <li
            key={id}
            className={cn(
              'flex border-l border-zinc-200 dark:border-zinc-800',
              id === activeId && 'border-zinc-200 dark:border-zinc-200',
            )}
          >
            <a
              href={`#${id}`}
              className={cn(
                'text-zinc-60 py-1.5 text-sm dark:text-zinc-400',
                id === activeId && 'font-semibold dark:text-zinc-100',
              )}
              style={{ paddingLeft: depth * 12 }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
