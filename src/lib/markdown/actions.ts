'use server';

import { renderMarkdown } from './markdown';

export async function renderMarkdownPreviewAction(markdown: string): Promise<string> {
  const { html } = await renderMarkdown(markdown);
  return html;
}
