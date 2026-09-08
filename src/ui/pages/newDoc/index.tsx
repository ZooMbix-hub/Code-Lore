import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import type { Doc } from '@/features/docs';
import { type CreateArticleSectionOption } from '@/features/create-article';
import { CreateDocForm } from './CreateDocForm';

export function NewDocPage({ docs }: { docs: Doc[] }) {
  const sections: CreateArticleSectionOption[] = docs.map(({ name, title, categories }) => ({
    name,
    title,
    categories: categories.map(({ id, title: categoryTitle }) => ({ id, title: categoryTitle })),
  }));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 p-8">
      <div className="flex min-w-0 flex-col gap-8">
        <nav aria-label="Хлебные крошки" className="font-mono text-xs">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                href={ROUTES.docs}
                className="hover:text-foreground text-zinc-500 transition-colors dark:text-zinc-500"
              >
                ~/docs
              </Link>
            </li>
            <li aria-hidden className="text-zinc-500 dark:text-zinc-500">
              /
            </li>
            <li className="text-foreground font-semibold">new</li>
          </ol>
        </nav>

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
