import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle } from '@/features/docs';
import { renderMarkdown } from '@/lib/markdown';
import { ArticlePage } from '@/ui/pages/article';

export async function generateMetadata({ params }: PageProps<Path>): Promise<Metadata> {
  const { section, article } = await params;
  const view = await getArticle(section, article);

  return { title: view ? `${view.article.title} — ${view.doc.title}` : 'Статья не найдена' };
}

export default async function Page({ params }: PageProps<Path>) {
  const { section, article } = await params;
  const view = await getArticle(section, article);

  if (!view) notFound();

  const content = await renderMarkdown(view.article.content);

  return <ArticlePage view={view} content={content} />;
}

type Path = '/docs/[section]/[article]';
