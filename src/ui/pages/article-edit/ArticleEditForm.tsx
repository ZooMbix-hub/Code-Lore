'use client';

import { FormWindow } from '@/ui/components/FormWindow';
import { MarkdownEditor } from '@/ui/components/MarkdownEditor';
import { Button } from '@/ui/primitives';

interface ArticleEditFormProps {
  content: string;
}

export function ArticleEditForm({ content }: ArticleEditFormProps) {
  return (
    <FormWindow title={'title'}>
      <form action="" className="flex flex-col gap-6 p-6">
        <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto rounded-lg border border-zinc-300 dark:border-zinc-700">
          <MarkdownEditor defaultValue={content} onChange={() => null} />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <Button variant="outline">{'Удалить'}</Button>
          <div className="flex gap-x-2">
            <Button variant="outline">{'Отменить'}</Button>
            <Button type="submit">{'Сохранить'}</Button>
          </div>
        </div>
      </form>
    </FormWindow>
  );
}
