'use client';

import { Input as BaseInput, type InputProps } from '@base-ui/react/input';

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={`w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:focus:border-zinc-400 dark:aria-invalid:border-red-400 ${className ?? ''}`}
      {...props}
    />
  );
}
