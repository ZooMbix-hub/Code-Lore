import { ROUTES } from '@/config/routes';
import type { Doc } from '@/features/docs';
import { type CreateArticleSectionOption } from '@/features/create-article';
import { Breadcrumbs } from '@/ui/components/Breadcrumbs';
import { CreateDocForm } from './CreateDocForm';

export function NewDocPage({ docs }: { docs: Doc[] }) {
  const sections: CreateArticleSectionOption[] = docs.map(({ id, name, title, categories }) => ({
    id,
    name,
    title,
    categories: categories.map(({ id, title: categoryTitle }) => ({ id, title: categoryTitle })),
  }));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 p-8">
      <div className="flex min-w-0 flex-col gap-8">
        <Breadcrumbs items={[{ label: '~/docs', href: ROUTES.docs }, { label: 'new' }]} />

        <div className="flex flex-col gap-3">
          <h1 className="text-foreground bg-linear-to-rbg-clip-text text-4xl font-bold tracking-tight">
            Новая статья
          </h1>
          <p className="text-foreground text-lg">
            Заполните карточку файла — текст сохранится в Markdown и появится в каталоге.
          </p>
        </div>

        <CreateDocForm sections={sections} />
      </div>
    </main>
  );
}
