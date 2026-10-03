'use client';

import { useActionState, useState } from 'react';
import dynamic from 'next/dynamic';
import { createArticleAction, type CreateArticleSectionOption } from '@/features/create-article';
import { slugify } from '@/lib/slugify';
import { FormWindow } from '@/ui/components/FormWindow';
import { Button, Dialog, Field, Input, Select, type SelectOption } from '@/ui/primitives';
import { CreateSectionForm } from './CreateSectionForm';
import { CreateCategoryForm } from './CreateCategoryForm';

const MarkdownEditor = dynamic(
  () => import('@/ui/components/MarkdownEditor').then((mod) => mod.MarkdownEditor),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse bg-zinc-100 dark:bg-zinc-900" />,
  },
);

export function CreateDocForm({ sections }: { sections: CreateArticleSectionOption[] }) {
  const [{ errors }, formAction, isPending] = useActionState(createArticleAction, {
    errors: {},
  });

  const [sectionName, setSectionName] = useState(sections[0].name);
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [modalView, setModalView] = useState<'section' | 'category'>('section');
  const [modalOpen, setModalOpen] = useState(false);

  const sectionsOptions: SelectOption[] = [
    ...sections.map((section) => ({ value: section.name, label: section.title })),
    { value: 'CREATE_NEW', label: '+ Новая секция', variant: 'action' },
  ];
  const currentSection = sections.find(({ name }) => name === sectionName)!;
  const categories = currentSection.categories;
  const categoriesOptions: SelectOption[] = [
    ...categories.map((category) => ({ value: String(category.id), label: category.title })),
    { value: 'CREATE_NEW', label: '+ Новая категория', variant: 'action' },
  ];
  const fileName = `${slugify(slug || title) || 'new-article'}.md`;
  const closeModal = () => setModalOpen(false);
  const openModal = (view: 'section' | 'category') => {
    setModalView(view);
    setModalOpen(true);
  };

  return (
    <FormWindow title={fileName}>
      <Dialog
        open={modalOpen}
        onOpenChange={closeModal}
        title={modalView === 'category' ? 'Добавление категории' : 'Добавление секции'}
      >
        {modalView === 'category' ? (
          <CreateCategoryForm onCloseModal={closeModal} sectionId={currentSection.id} />
        ) : (
          <CreateSectionForm onCloseModal={closeModal} />
        )}
      </Dialog>

      <form action={formAction} className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-2 gap-6">
          <Field label="Секция" error={errors.section}>
            <Select
              name="section"
              label="Секция"
              value={sectionName}
              onChange={(next) => {
                if (next === 'CREATE_NEW') {
                  openModal('section');
                } else {
                  setSectionName(next);
                  setCategoryId('');
                }
              }}
              options={sectionsOptions}
            />
          </Field>

          <Field label="Категория" error={errors.categoryId}>
            <Select
              name="categoryId"
              label="Категория"
              placeholder="Выберите категорию"
              value={categoryId}
              onChange={(next) => {
                if (next === 'CREATE_NEW') {
                  openModal('category');
                } else {
                  setCategoryId(next);
                }
              }}
              options={categoriesOptions}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Заголовок" error={errors.title}>
            {(control) => (
              <Input
                {...control}
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Например: Как работает flexbox"
              />
            )}
          </Field>

          <Field label="Slug" error={errors.slug}>
            {(control) => (
              <Input
                {...control}
                type="text"
                name="slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="kak-rabotaet-flexbox"
                className="font-mono"
              />
            )}
          </Field>
        </div>

        <Field label="Текст · Markdown" error={errors.content}>
          <input type="hidden" name="content" value={content} />
          <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto rounded-lg border border-zinc-300 dark:border-zinc-700">
            <MarkdownEditor onChange={setContent} />
          </div>
        </Field>

        <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          {errors.form && <p className={'text-sm text-red-600 dark:text-red-400'}>{errors.form}</p>}
          <Button type="submit" loading={isPending} className={'ml-auto'}>
            {'Опубликовать'}
          </Button>
        </div>
      </form>
    </FormWindow>
  );
}
