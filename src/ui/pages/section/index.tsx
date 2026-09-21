import Link from 'next/link';
import { getSectionStyles, type Doc } from '@/features/docs';
import { ROUTES } from '@/config/routes';
import { Breadcrumbs } from '@/ui/components/Breadcrumbs';

export function SectionPage({ doc }: { doc: Doc }) {
  const { name, title, description, categories } = doc;
  const styles = getSectionStyles(name);

  return (
    <div className="flex">
      <main className="mx-auto w-full max-w-5xl flex-1 p-8">
        <div className="flex min-w-0 flex-col gap-8">
          <Breadcrumbs items={[{ label: '~/docs', href: ROUTES.docs }, { label: name }]} />

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <h1
                className={`bg-linear-to-r bg-clip-text text-5xl font-bold tracking-tight text-balance text-transparent sm:text-6xl ${styles.title}`}
              >
                {title}
              </h1>
            </div>
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, categoryIndex) => (
              <section key={category.title} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                  <h2 className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-500">
                    {category.title}
                  </h2>
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                    {String(categoryIndex + 1).padStart(2, '0')}
                  </span>
                </div>
                <ul className="flex flex-col">
                  {category.articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={ROUTES.article(name, article.slug)}
                        className="group -mx-2.5 flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                      >
                        <span className={`text-sm font-medium transition-colors ${styles.link}`}>
                          {article.title}
                        </span>
                        <span
                          aria-hidden
                          className={`translate-x-1 text-sm opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 ${styles.text}`}
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
