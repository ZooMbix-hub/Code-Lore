import { ROUTES } from '@/config/routes';
import type { DocArticle } from '@/features/docs';
import { Breadcrumbs } from '@/ui/components/Breadcrumbs';
import { ArticleEditForm } from './ArticleEditForm';

interface ArticleEditProps {
  section: string;
  article: DocArticle;
}

export function ArticleEdit({ section, article }: ArticleEditProps) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 p-8">
      <div className="flex min-w-0 flex-col gap-8">
        <Breadcrumbs
          items={[
            { label: '~/docs', href: ROUTES.docs },
            { label: section, href: ROUTES.section(section) },
            { label: article.slug, href: ROUTES.article(section, article.slug) },
            { label: 'edit' },
          ]}
        />

        <h1 className="text-foreground bg-linear-to-rbg-clip-text text-4xl font-bold tracking-tight">
          Редактирование статьи
        </h1>

        <ArticleEditForm content={article.content} />
      </div>
    </main>
  );
}
