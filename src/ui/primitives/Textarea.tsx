'use client';

import type { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full resize-none rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:focus:border-zinc-400 dark:aria-invalid:border-red-400 ${className ?? ''}`}
      {...props}
    />
  );
}
