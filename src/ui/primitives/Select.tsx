'use client';

import { Select as BaseSelect } from '@base-ui/react/select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  variant?: 'action';
}

export interface SelectProps {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ name, label, value, onChange, options, placeholder }: SelectProps) {
  return (
    <BaseSelect.Root
      name={name}
      items={options}
      value={value || null}
      onValueChange={(next) => onChange(next ?? '')}
    >
      <BaseSelect.Trigger
        aria-label={label}
        className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm transition-colors focus:border-zinc-500 focus:outline-none data-popup-open:border-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-400 dark:data-popup-open:border-zinc-400"
      >
        <BaseSelect.Value
          placeholder={placeholder}
          className="truncate text-zinc-900 data-placeholder:text-zinc-400 dark:text-zinc-100 dark:data-placeholder:text-zinc-500"
        />
        <BaseSelect.Icon className="shrink-0 text-zinc-400 transition-transform duration-200 group-data-popup-open:rotate-180">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-50 min-w-(--anchor-width) outline-none">
          <BaseSelect.Popup className="max-h-64 overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:border-zinc-700 dark:bg-zinc-900">
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-sm outline-none select-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-100 ${
                  option.variant === 'action'
                    ? 'mt-1 border-t border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <BaseSelect.ItemText className="truncate">{option.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  <CheckIcon />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: 'block', ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
