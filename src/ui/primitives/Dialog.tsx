'use client';

import type { ReactNode } from 'react';
import { Dialog as BaseDialog, type DialogRootProps } from '@base-ui/react/dialog';

export interface DialogProps {
  triggerNode?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  open?: DialogRootProps['open'];
  onOpenChange?: DialogRootProps['onOpenChange'];
}

export function Dialog({ triggerNode, title, children, open, onOpenChange }: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      {triggerNode && <BaseDialog.Trigger className={''}>{triggerNode}</BaseDialog.Trigger>}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-ending-style:duration-200 data-starting-style:opacity-0" />
        <BaseDialog.Viewport className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4">
          <BaseDialog.Popup className="relative w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl transition-[opacity,scale] duration-200 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 dark:border-zinc-800 dark:bg-zinc-900">
            <BaseDialog.Close
              className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label="Закрыть"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </BaseDialog.Close>
            {title && (
              <BaseDialog.Title className="pr-8 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
              </BaseDialog.Title>
            )}
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
