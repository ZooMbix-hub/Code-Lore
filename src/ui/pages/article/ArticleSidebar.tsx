import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@/config/routes';
import { getSectionStyles, type ArticleView } from '@/features/docs';

interface ArticleSidebarProps {
  doc: ArticleView['doc'];
  currentArticle: ArticleView['article']['slug'];
}

export const ArticleSidebar = ({ doc, currentArticle }: ArticleSidebarProps) => {
  const { name, title, categories, glyph } = doc;
  const styles = getSectionStyles(name);

  return (
    <aside className="sticky top-14.25 hidden h-[calc(100dvh-57px)] w-64 shrink-0 self-start overflow-y-auto border-r border-zinc-200/60 py-8 pr-6 lg:block dark:border-zinc-800/60">
      <div className="flex items-center gap-2.5 pb-6">
        <span className={`rounded-md border px-1.5 py-0.5 font-mono text-xs font-semibold ${styles.glyph}`}>
          {glyph}
        </span>
        <span className={`text-sm font-semibold`}>{title}</span>
      </div>

      <nav aria-label={`Статьи раздела ${title}`} className="flex flex-col gap-6">
        {categories.map((category, idx) => (
          <section key={category.id} className="flex flex-col gap-1">
            <div className="flex justify-between border-t border-zinc-200 pt-3 pb-1 font-mono text-[11px] dark:border-zinc-800">
              <h2 className="tracking-wider text-zinc-500 uppercase dark:text-zinc-500">{category.title}</h2>
              <span className="text-zinc-400 dark:text-zinc-600">{String(idx + 1).padStart(2, '0')}</span>
            </div>

            <ul className="flex flex-col">
              {category.articles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={ROUTES.article(name, article.slug)}
                    className={clsx(
                      'flex py-1.5 pl-3 text-sm',
                      article.slug === currentArticle
                        ? `font-medium ${styles.text}`
                        : 'text-zinc-60 dark:text-zinc-400',
                    )}
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
};
