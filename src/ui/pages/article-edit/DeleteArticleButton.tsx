'use client';

import { useActionState, useState } from 'react';
import { deleteArticleAction } from '@/features/delete-article';
import { Button, Dialog } from '@/ui/primitives';

interface DeleteArticleButtonProps {
  articleId: number;
  articleName: string;
  sectionName: string;
}

export const DeleteArticleButton = ({ articleId, articleName, sectionName }: DeleteArticleButtonProps) => {
  const deleteArticleWithPlace = deleteArticleAction.bind(null, articleId, sectionName);
  const [state, formAction, isPending] = useActionState(deleteArticleWithPlace, { errors: {} });
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Удалить
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={'Удаление статьи'}>
        <form action={formAction} className="flex flex-col gap-y-4">
          <span className="tracking-tight text-zinc-400 dark:text-zinc-500">{`Статья "${articleName}" будет удалена вместе с содержимым без возможности восстановления`}</span>
          {state.errors.form && (
            <span className="text-sm text-red-600 dark:text-red-400">{state.errors.form}</span>
          )}
          <div className="flex justify-end gap-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button
              type="submit"
              loading={isPending}
              className="border-red-600 bg-red-600 text-zinc-50 hover:border-red-700 hover:bg-red-700 dark:border-red-500 dark:bg-red-500 dark:hover:border-red-600 dark:hover:bg-red-600"
            >
              Удалить
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
