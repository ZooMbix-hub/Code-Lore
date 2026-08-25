import Link from 'next/link';
import { DOCS } from '@/entities/doc';
import { ROUTES } from '@/shared/config';

export function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-zinc-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-zinc-200)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[56px_56px] dark:bg-[linear-gradient(to_right,var(--color-zinc-800)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-zinc-800)_1px,transparent_1px)]" />
        <div className="absolute -top-32 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-linear-to-r from-orange-500/25 via-sky-500/25 to-yellow-400/25 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-20 px-8 py-20">
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Пойми, как
            <span className="bg-linear-to-r from-orange-600 via-sky-500 to-yellow-500 bg-clip-text text-transparent dark:from-orange-400 dark:via-sky-400 dark:to-yellow-300">
              работает веб
            </span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Code Lore — справочник по HTML, CSS и JavaScript: от первых тегов до глубоких механик языка. С
            примерами и без воды.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={ROUTES.docs}
              className="bg-foreground text-background rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
            >
              Открыть документацию
            </Link>
            <Link
              href={ROUTES.section('html')}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/60"
            >
              Начать с HTML <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section className="flex w-full flex-col gap-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Документации</h2>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
              {DOCS.length} / раздела
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOCS.map(({ name, title, glyph, description, classes }) => (
              <Link
                key={name}
                href={ROUTES.section(name)}
                className={`group flex min-h-44 flex-col gap-3 rounded-2xl border border-zinc-300 bg-zinc-50/50 p-6 backdrop-blur transition-all hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900/50 ${classes.border}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-md border px-2 py-0.5 font-mono text-sm font-semibold ${classes.glyph}`}
                  >
                    {glyph}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                <span
                  className={`mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-zinc-500 transition-colors dark:text-zinc-500 ${classes.link}`}
                >
                  Читать{' '}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
