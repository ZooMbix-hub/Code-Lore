import { Marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import { slugify } from '../slugify';
import { ALIASES, LANGUAGES, THEMES } from './consts';

let highlighterPromise: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: Object.values(THEMES),
    langs: [...LANGUAGES],
  });
  return highlighterPromise;
}

function resolveLanguage(lang: string | undefined): string {
  const name = (lang ?? '').trim().split(/\s+/)[0]?.toLowerCase() ?? '';
  const resolved = ALIASES[name] ?? name;
  return LANGUAGES.includes(resolved) ? resolved : 'text';
}

export async function renderMarkdown(markdown: string): Promise<RenderedMarkdown> {
  if (!markdown.trim()) {
    return {
      html: '',
      headings: null,
    };
  }

  const highlighter = await getHighlighter();
  const headings = new Map<string, MarkdownHeading>();

  const marked = new Marked({
    async: true,
    walkTokens: (token) => {
      if (token.type === 'heading' && token.text) {
        if (token.depth === 1) {
          token.depth = token.depth + 1;
        }

        headings.set(token.text, {
          id: slugify(token.text),
          depth: token.depth,
          text: token.text,
        });
      }

      if (token.type === 'code') {
        token.text = highlighter.codeToHtml(token.text, {
          lang: resolveLanguage(token.lang),
          themes: THEMES,
          defaultColor: false,
        });
        token.escaped = true;
      }
    },
    renderer: {
      heading(token) {
        const currentId = headings.get(token.text)?.id;
        return `<h${token.depth}${currentId ? ` id="${currentId}"` : ''}>${token.text}</h${token.depth}>\n`;
      },
      code(token) {
        return token.escaped ? token.text : false;
      },
    },
  });

  const html = await marked.parse(markdown);

  return {
    html,
    headings,
  };
}

interface MarkdownHeading {
  id: string;
  depth: number;
  text: string;
}

export interface RenderedMarkdown {
  html: string;
  headings: Map<string, MarkdownHeading> | null;
}
