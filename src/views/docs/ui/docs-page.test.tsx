import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Doc } from '@/entities/doc';
import { DocsPage } from '@/views/docs';

const docs: Doc[] = [
  {
    id: 1,
    name: 'html',
    title: 'HTML',
    glyph: '</>',
    description: 'Структура и семантика.',
    position: 0,
    categories: [],
  },
];

test('renders the docs page', () => {
  render(<DocsPage docs={docs} />);
  expect(screen.getByRole('main')).toBeDefined();
  expect(screen.getByRole('heading', { name: 'Документации' })).toBeDefined();
});
