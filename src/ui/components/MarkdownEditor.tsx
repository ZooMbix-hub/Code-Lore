'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { cn } from 'cn';
import { Crepe } from '@milkdown/crepe';
import { renderMarkdownPreviewAction } from '@/lib/markdown/actions';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

type EditorTab = 'editor' | 'preview';

const TABS: { value: EditorTab; label: string }[] = [
  { value: 'editor', label: 'Редактор' },
  { value: 'preview', label: 'Предпросмотр' },
];

type MarkdownEditorProps = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export function MarkdownEditor({ defaultValue = '', onChange }: MarkdownEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const latestValueRef = useRef(defaultValue);
  const [tab, setTab] = useState<EditorTab>('editor');
  const [html, setHtml] = useState('');
  const [isRendering, startRendering] = useTransition();

  const switchTab = (nextTab: EditorTab) => {
    if (nextTab === 'preview') {
      startRendering(async () => {
        setHtml(await renderMarkdownPreviewAction(latestValueRef.current));
      });
    }
    setTab(nextTab);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const crepe = new Crepe({
      root,
      defaultValue,
      features: { [Crepe.Feature.TopBar]: true },
      featureConfigs: {
        [Crepe.Feature.Placeholder]: { text: 'Начните писать текст', mode: 'block' },
      },
    });

    crepe.on((api) =>
      api.markdownUpdated((_ctx, markdown) => {
        latestValueRef.current = markdown;
        onChange(markdown);
      }),
    );

    let disposed = false;
    crepe.create().catch((error: unknown) => {
      if (!disposed) {
        throw error;
      }
    });

    return () => {
      disposed = true;
      crepe.destroy().catch(() => {});
    };
  }, [defaultValue, onChange, rootRef, latestValueRef]);

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        aria-label="Режим просмотра"
        className="sticky top-0 z-10 flex gap-1 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
      >
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => switchTab(value)}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
              tab === value
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={rootRef} className={cn(tab !== 'editor' && 'hidden')} />

      {tab === 'preview' && (
        <div className="min-h-72 p-6">
          {isRendering ? (
            <div className="h-64 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
          ) : html ? (
            <article className="article-prose" dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {'Текст пустой — вернитесь в редактор и напишите статью.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
