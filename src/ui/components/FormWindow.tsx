import { type ReactNode } from 'react';

interface FormWindowProps {
  children: ReactNode;
  title: string;
}

export function FormWindow({ children, title }: FormWindowProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div aria-hidden className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="truncate font-mono text-xs text-zinc-600 dark:text-zinc-400">{title}</span>
        <span className="ml-auto shrink-0 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
          черновик
        </span>
      </div>

      {children}
    </div>
  );
}
