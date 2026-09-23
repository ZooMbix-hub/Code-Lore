import { ROUTES } from '@/config/routes';
import type { ArticleView } from '@/features/docs';
import { formatDate } from '@/lib/date';
import type { RenderedMarkdown } from '@/lib/markdown';
import { Breadcrumbs } from '@/ui/components/Breadcrumbs';
import { ArticleNavButton } from './ArticleNavButton';
import { ArticleSidebar } from './ArticleSidebar';
import { ArticleToc } from './ArticleToc';

interface ArticlePageProps {
  view: ArticleView;
  content: RenderedMarkdown;
}

const WORDS_PER_MINUTE = 180;

function getReadingTime(markdown: string): number {
  const words = markdown.split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function ArticlePage({ view, content }: ArticlePageProps) {
  const { doc, article, next, prev } = view;
  const { html, headings } = content;

  return (
    <div className="flex w-full flex-1 justify-center gap-8 px-20">
      <ArticleSidebar doc={doc} currentArticle={article.slug} />

      <main className="min-w-0 flex-1 py-10">
        <div className="mx-auto flex max-w-3xl min-w-0 flex-col gap-6">
          <Breadcrumbs
            items={[
              { label: '~/docs', href: ROUTES.docs },
              { label: doc.name, href: ROUTES.section(doc.name) },
              { label: article.slug },
            ]}
          />

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{article.title}</h1>
            <div className="flex justify-end gap-x-4 border-t border-zinc-200 pt-4 font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
              <span>~{getReadingTime(article.content)} мин чтения</span>
              <div>
                <time dateTime={article.updatedAt.toISOString()}>{formatDate(article.updatedAt)}</time>
              </div>
            </div>
          </div>

          <article className="article-prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="grid gap-5 sm:grid-cols-2">
            {prev && (
              <ArticleNavButton
                direction="prev"
                label="Назад"
                title={prev.title}
                subtitle={prev.category}
                href={ROUTES.article(doc.name, prev.slug)}
              />
            )}
            {next && (
              <ArticleNavButton
                direction="next"
                label="Дальше"
                title={next.title}
                subtitle={next.category}
                href={ROUTES.article(doc.name, next.slug)}
              />
            )}
          </div>
        </div>
      </main>

      <ArticleToc headings={headings} />
    </div>
  );
}
