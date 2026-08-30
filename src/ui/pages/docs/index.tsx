import { DocCard } from '../../components/DocCard';
import type { Doc } from '@/features/docs';

export function DocsPage({ docs }: { docs: Doc[] }) {
  return (
    <div className="relative flex flex-1 flex-col">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-zinc-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-zinc-200)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[56px_56px] dark:bg-[linear-gradient(to_right,var(--color-zinc-800)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-zinc-800)_1px,transparent_1px)]" />
        <div className="absolute -top-32 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-linear-to-r from-orange-500/15 via-sky-500/15 to-yellow-400/15 blur-3xl" />
      </div>
      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-8 py-16">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">Документации</h1>
              <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
                Все разделы справочника Code Lore — от разметки до логики.
              </p>
            </div>
            <span className="shrink-0 pb-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-500">
              {docs.length} / раздела
            </span>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <DocCard key={doc.name} doc={doc} />
          ))}
        </section>
      </main>
    </div>
  );
}
