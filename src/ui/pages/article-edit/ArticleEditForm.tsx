'use client';

import { useState } from 'react';
import type { CreateArticleSectionOption } from '@/features/create-article';
import { FormWindow } from '@/ui/components/FormWindow';
import { MarkdownEditor } from '@/ui/components/MarkdownEditor';
import { Button, Collapsible, Field, Input, Select, type SelectOption } from '@/ui/primitives';

interface ArticleEditFormProps {
  content: string;
  slug: string;
  sectionName: string;
  categoryId: string;
  sections: CreateArticleSectionOption[];
}

export function ArticleEditForm({
  content,
  slug: initialSlug,
  sectionName: initialSectionName,
  categoryId: initialCategoryId,
  sections,
}: ArticleEditFormProps) {
  const [sectionName, setSectionName] = useState(initialSectionName);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [slug, setSlug] = useState(initialSlug);

  const currentSection = sections.find(({ name }) => name === sectionName);
  const sectionsOptions: SelectOption[] = sections.map(({ name, title }) => ({ value: name, label: title }));
  const categoriesOptions: SelectOption[] = (currentSection?.categories ?? []).map(({ id, title }) => ({
    value: String(id),
    label: title,
  }));
  const currentCategory = currentSection?.categories.find(({ id }) => String(id) === categoryId);
  const summary = [sectionName, currentCategory?.title, slug].filter(Boolean).join(' / ');

  return (
    <FormWindow title={'title'}>
      <form action="" className="flex flex-col gap-6 p-6">
        <Collapsible title="Настройки статьи" summary={summary}>
          <div className="grid gap-6 sm:grid-cols-3">
            <Field label="Секция">
              <Select
                name="section"
                label="Секция"
                value={sectionName}
                onChange={(next) => {
                  setSectionName(next);
                  setCategoryId('');
                }}
                options={sectionsOptions}
              />
            </Field>

            <Field label="Категория">
              <Select
                name="categoryId"
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
                  name="slug"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="font-mono"
                />
              )}
            </Field>
          </div>
        </Collapsible>

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
