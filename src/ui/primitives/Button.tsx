'use client';

import type { ReactNode } from 'react';
import { cn } from 'cn';
import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { Loader } from './Loader';

export interface ButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'outline';
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const variantClasses = {
  primary:
    'bg-zinc-900 text-zinc-50 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300',
  outline:
    'border border-zinc-300 bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
} as const;

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  startIcon,
  endIcon,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <BaseButton
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {loading && <Loader />}
      {startIcon && (
        <span aria-hidden className="inline-flex shrink-0">
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span aria-hidden className="inline-flex shrink-0">
          {endIcon}
        </span>
      )}
    </BaseButton>
  );
}
