import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleEdit } from '@/ui/pages/article-edit';
import { getArticle, getDocs } from '@/features/docs';

export async function generateMetadata({ params }: PageProps<Path>): Promise<Metadata> {
  const { section, article } = await params;
  const view = await getArticle(section, article);

  return { title: view ? `Редактирование: ${view.article.title}` : 'Статья не найдена' };
}

export default async function Page({ params }: PageProps<Path>) {
  const { section, article } = await params;
  const [view, docs] = await Promise.all([getArticle(section, article), getDocs()]);

  if (!view) notFound();

  return <ArticleEdit section={section} article={view.article} docs={docs} />;
}

type Path = '/docs/[section]/[article]/edit';
