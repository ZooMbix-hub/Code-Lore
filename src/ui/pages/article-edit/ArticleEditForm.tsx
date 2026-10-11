'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import type { CreateArticleSectionOption } from '@/features/create-article';
import { editArticleAction } from '@/features/edit-article';
import { FormWindow } from '@/ui/components/FormWindow';
import { MarkdownEditor } from '@/ui/components/MarkdownEditor';
import { Button, Collapsible, Field, Input, Select, type SelectOption } from '@/ui/primitives';
import { DeleteArticleButton } from './DeleteArticleButton';

interface ArticleEditFormProps {
  content: string;
  slug: string;
  id: number;
  title: string;
  sectionName: string;
  categoryId: string;
  sections: CreateArticleSectionOption[];
}

export function ArticleEditForm({
  content: initialContent,
  slug: initialSlug,
  id,
  title,
  sectionName,
  categoryId: initialCategoryId,
  sections,
}: ArticleEditFormProps) {
  const editArticleWithId = editArticleAction.bind(null, id);
  const [response, formAction, isPending] = useActionState(editArticleWithId, {});
  const [content, setContent] = useState(initialContent);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [slug, setSlug] = useState(initialSlug);

  const currentSection = sections.find(({ name }) => name === sectionName);
  const categoriesOptions: SelectOption[] = (currentSection?.categories ?? []).map((category) => ({
    value: String(category.id),
    label: category.title,
  }));
  const currentCategory = currentSection?.categories.find((category) => String(category.id) === categoryId);
  const summary = [sectionName, currentCategory?.title, slug].filter(Boolean).join(' / ');

  return (
    <FormWindow title={`${initialSlug}.md`}>
      <form action={formAction} className="flex flex-col gap-6 p-6">
        <Collapsible title="Настройки статьи" summary={summary}>
          <div className="grid gap-6 sm:grid-cols-3">
            <Field label="Категория">
              <Select
                label="Категория"
                placeholder="Выберите категорию"
                value={categoryId}
                onChange={setCategoryId}
                options={categoriesOptions}
              />
            </Field>

            <Field label="Slug">
              {(control) => (
                <Input
                  {...control}
                  type="text"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="font-mono"
                />
              )}
            </Field>
          </div>
        </Collapsible>

        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="content" value={content} />
        <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto rounded-lg border border-zinc-300 dark:border-zinc-700">
          <MarkdownEditor defaultValue={initialContent} onChange={setContent} />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <DeleteArticleButton articleId={id} articleName={title} sectionName={sectionName} />
          <div className="flex items-center gap-x-2">
            {response?.error && (
              <span className="text-sm text-red-600 dark:text-red-400">{response.error}</span>
            )}
            {response?.success && (
              <span aria-live="polite" className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                ✓ сохранено
              </span>
            )}
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={ROUTES.article(sectionName, slug)} />}
            >
              {'Отменить'}
            </Button>
            <Button type="submit" loading={isPending}>
              {'Сохранить'}
            </Button>
          </div>
        </div>
      </form>
    </FormWindow>
  );
}
