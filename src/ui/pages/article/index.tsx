import type { ArticleView } from '@/features/docs/types';

interface ArticlePageProps {
  view: ArticleView;
}

export function ArticlePage({ view }: ArticlePageProps) {
  console.log(view);

  return (
    <div className="flex">
      <main className="mx-auto w-full max-w-5xl flex-1 p-8">ArticlePage</main>
    </div>
  );
}
