import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import type { ArticleView } from '@/features/docs';
import { ArticleSidebar } from './ArticleSidebar';
import { ArticleToc } from './ArticleToc';

interface ArticlePageProps {
  view: ArticleView;
}

const WORDS_PER_MINUTE = 180;

function getReadingTime(markdown: string): number {
  const words = markdown.split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function ArticlePage({ view }: ArticlePageProps) {
  const { doc, article } = view;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-8">
      <ArticleSidebar doc={doc} currentArticle={article.slug} />

      <main className="min-w-0 flex-1 py-10">
        <div className="mx-auto flex max-w-3xl min-w-0 flex-col gap-6">
          <nav aria-label="Хлебные крошки" className="font-mono text-xs">
            <ol className="flex flex-wrap items-center gap-1.5">
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
              <li>
                <Link
                  href={ROUTES.section(doc.name)}
                  className="hover:text-foreground text-zinc-500 transition-colors dark:text-zinc-500"
                >
                  {doc.name}
                </Link>
              </li>
              <li aria-hidden className="text-zinc-500 dark:text-zinc-500">
                /
              </li>
              <li className="text-foreground font-semibold">{article.slug}</li>
            </ol>
          </nav>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{article.title}</h1>
            <div className="flex justify-end border-t border-zinc-200 pt-4 font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
              <span>~{getReadingTime(article.content)} мин чтения</span>
            </div>
          </div>

          <article className="article-prose" /* dangerouslySetInnerHTML={{ __html: html }} */ />
        </div>
      </main>

      <ArticleToc />
    </div>
  );
}
