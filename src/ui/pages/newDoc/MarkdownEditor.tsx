'use client';

import { useEffect, useRef } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

type MarkdownEditorProps = {
  onChange: (value: string) => void;
};

export function MarkdownEditor({ onChange }: MarkdownEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const crepe = new Crepe({
      root,
      defaultValue: '',
      features: { [Crepe.Feature.TopBar]: true },
      featureConfigs: {
        [Crepe.Feature.Placeholder]: { text: 'Начните писать текст', mode: 'block' },
      },
    });

    crepe.on((api) => api.markdownUpdated((_ctx, markdown) => onChange(markdown)));

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
  }, [onChange]);

  return <div ref={rootRef} />;
}
