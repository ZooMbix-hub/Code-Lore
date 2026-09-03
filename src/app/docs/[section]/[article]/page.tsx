import type { Metadata } from 'next';
import { getDocs } from '@/features/docs';
import { ArticlePage } from '@/ui/pages/article';
import { getArticle } from '@/features/docs/queries';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  const docs = await getDocs();
  return docs.flatMap(({ name, categories }) =>
    categories.flatMap(({ articles }) => articles.map(({ slug }) => ({ section: name, article: slug }))),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/docs/[section]/[article]'>): Promise<Metadata> {
  const { section, article } = await params;
  const view = await getArticle(section, article);

  return { title: view ? `${view.article.title} — ${view.doc.title}` : 'Статья не найдена' };
}

export default async function Page({ params }: PageProps<'/docs/[section]/[article]'>) {
  const { section, article } = await params;
  const view = await getArticle(section, article);

  if (!view) notFound();

  return <ArticlePage view={view} />;
}
