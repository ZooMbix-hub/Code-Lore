import { expect, test } from 'vitest';
import { renderMarkdown } from './markdown';

test('возвращает пустой html и null для пустой строки', async () => {
  const result = await renderMarkdown('');

  expect(result.html).toBe('');
  expect(result.headings).toBeNull();
});

test('возвращает пустой html и null для строки из пробелов', async () => {
  const result = await renderMarkdown('   \n\t  ');

  expect(result.html).toBe('');
  expect(result.headings).toBeNull();
});

test('превращает заголовок первого уровня во второй и собирает его в оглавление', async () => {
  const { html, headings } = await renderMarkdown('# Заголовок');

  expect(html).toContain('<h2 id="zagolovok">Заголовок</h2>');
  expect(headings?.get('Заголовок')).toEqual({
    id: 'zagolovok',
    depth: 2,
    text: 'Заголовок',
  });
});

test('не меняет уровень заголовков ниже первого', async () => {
  const { html, headings } = await renderMarkdown('### Подзаголовок');

  expect(html).toContain('<h3 id="podzagolovok">Подзаголовок</h3>');
  expect(headings?.get('Подзаголовок')?.depth).toBe(3);
});

test('транслитерирует кириллицу в id заголовка', async () => {
  const { headings } = await renderMarkdown('## Установка');

  expect(headings?.get('Установка')?.id).toBe('ustanovka');
});

test('схлопывает одинаковые заголовки в один пункт оглавления', async () => {
  const { headings } = await renderMarkdown('## Установка\n\nтекст\n\n## Установка');

  expect(headings?.size).toBe(1);
});

test('рендерит блок кода через shiki без обёртки marked', async () => {
  const { html } = await renderMarkdown('```js\nconst a = 1;\n```');

  expect(html).toContain('<pre class="shiki');
  expect(html).not.toContain('<pre><code');
});

test('подсвечивает код css-переменными обеих тем', async () => {
  const { html } = await renderMarkdown('```js\nconst a = 1;\n```');

  expect(html).toContain('--shiki-light');
  expect(html).toContain('--shiki-dark');
});

test('разрешает алиас языка с метаданными после него', async () => {
  const { html } = await renderMarkdown('```js copy\nconst a = 1;\n```');

  expect(html).toContain('--shiki-light');
});

test('экранирует html внутри блока кода', async () => {
  const { html } = await renderMarkdown('```html\n<div class="x"></div>\n```');

  expect(html).toContain('&#x3C;');
  expect(html).not.toContain('<div');
});

test('рендерит блок без языка как обычный текст', async () => {
  const { html } = await renderMarkdown('```\nпросто текст\n```');

  expect(html).toContain('<pre class="shiki');
});

test('не падает на неизвестном языке и откатывается на текст', async () => {
  const { html } = await renderMarkdown('```someunknownlang\nтекст\n```');

  expect(html).toContain('<pre class="shiki');
});

test('не прогоняет инлайн-код через shiki', async () => {
  const { html } = await renderMarkdown('текст с `кодом` внутри');

  expect(html).toContain('<code>кодом</code>');
  expect(html).not.toContain('shiki');
});

test('рендерит прочую разметку marked как обычно', async () => {
  const { html } = await renderMarkdown('**жирный** и [ссылка](https://example.com)');

  expect(html).toContain('<strong>жирный</strong>');
  expect(html).toContain('<a href="https://example.com">ссылка</a>');
});
