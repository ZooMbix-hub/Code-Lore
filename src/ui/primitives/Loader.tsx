'use client';

import { Progress } from '@base-ui/react/progress';
import { cn } from 'cn';

export interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <Progress.Root value={null} className={cn('relative size-4', className)}>
      <Progress.Track className="absolute inset-0 rounded-full border-2 border-current opacity-25" />
      <Progress.Indicator className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-current" />
    </Progress.Root>
  );
}
