'use client';

import { type ReactNode } from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';

export interface CollapsibleProps {
  children: ReactNode;
  title: string;
  summary?: string;
  defaultOpen?: boolean;
}

export function Collapsible({ children, title, summary, defaultOpen }: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      className="rounded-lg border border-zinc-300 dark:border-zinc-700"
    >
      <BaseCollapsible.Trigger className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-zinc-100/70 focus-visible:outline-none dark:hover:bg-zinc-800/40">
        <ChevronIcon className="shrink-0 text-zinc-400 transition-transform duration-200 group-data-panel-open:rotate-90 dark:text-zinc-500" />
        <span className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-500">
          {title}
        </span>
        {summary ? (
          <span className="ml-auto min-w-0 truncate font-mono text-xs text-zinc-400 transition-opacity duration-150 group-data-panel-open:opacity-0 dark:text-zinc-600">
            {summary}
          </span>
        ) : null}
      </BaseCollapsible.Trigger>

      <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}

function ChevronIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      {...props}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
