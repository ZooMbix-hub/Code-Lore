import { ROUTES } from '@/config/routes';
import type { Doc, DocArticle } from '@/features/docs';
import { type CreateArticleSectionOption } from '@/features/create-article';
import { Breadcrumbs } from '@/ui/components/Breadcrumbs';
import { ArticleEditForm } from './ArticleEditForm';

interface ArticleEditProps {
  section: string;
  article: DocArticle;
  docs: Doc[];
}

export function ArticleEdit({ section, article, docs }: ArticleEditProps) {
  const sections: CreateArticleSectionOption[] = docs.map(({ id, name, title, categories }) => ({
    id,
    name,
    title,
    categories: categories.map(({ id: categoryId, title: categoryTitle }) => ({
      id: categoryId,
      title: categoryTitle,
    })),
  }));

  const currentCategory = docs
    .find(({ name }) => name === section)
    ?.categories.find(({ articles }) => articles.some(({ slug }) => slug === article.slug));

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

        <ArticleEditForm
          content={article.content}
          slug={article.slug}
          id={article.id}
          title={article.title}
          sectionName={section}
          categoryId={currentCategory ? String(currentCategory.id) : ''}
          sections={sections}
        />
      </div>
    </main>
  );
}
