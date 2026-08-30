'use client';

import { useId, type ReactNode } from 'react';
import { Field as BaseField } from '@base-ui/react/field';

export type FieldControlProps = {
  id: string;
  'aria-invalid': true | undefined;
  'aria-describedby': string | undefined;
};

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode | ((controlProps: FieldControlProps) => ReactNode);
};

export function Field({ label, error, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <BaseField.Root invalid={Boolean(error)} className="flex min-w-0 flex-col gap-2">
      <BaseField.Label
        htmlFor={id}
        className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-500"
      >
        {label}
      </BaseField.Label>

      {typeof children === 'function'
        ? children({
            id,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? errorId : undefined,
          })
        : children}

      {error ? (
        <BaseField.Error match id={errorId} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
