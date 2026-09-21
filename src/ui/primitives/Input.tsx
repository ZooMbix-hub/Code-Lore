'use client';

import { Input as BaseInput, type InputProps as BaseInputProps } from '@base-ui/react/input';

export type InputProps = BaseInputProps;

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={`w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:focus:border-zinc-400 dark:aria-invalid:border-red-400 ${className ?? ''}`}
      {...props}
    />
  );
}
