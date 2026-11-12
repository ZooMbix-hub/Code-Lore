'use client';

import { Menu } from '@base-ui/react/menu';

interface UserMenuProps {
  userName: string;
  userRole: string;
}

export function UserMenu({ userName, userRole }: UserMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger openOnHover={true}>
        <div className="flex cursor-pointer items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-zinc-900 font-mono text-xs text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            {'N'}
          </span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{userName}</span>
        </div>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={17} className="z-50">
          <Menu.Popup className="min-w-44 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{userName}</p>
              <p className="font-mono text-[11px] text-zinc-500 uppercase">{userRole}</p>
            </div>
            <Menu.Separator className="my-1 border-t border-zinc-200 dark:border-zinc-800" />
            <Menu.Item className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Настройки
            </Menu.Item>
            <Menu.Item
              onClick={() => null}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:text-red-400 dark:hover:bg-zinc-800"
            >
              Выйти
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
