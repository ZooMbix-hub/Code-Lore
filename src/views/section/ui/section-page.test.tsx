import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Doc } from '@/entities/doc';
import { SectionPage } from '@/views/section';

const doc = {
  id: 1,
  name: 'html',
  title: 'HTML',
  glyph: '</>',
  description: 'Структура и семантика: как браузер читает вашу разметку.',
  position: 0,
  categories: [
    {
      id: 1,
      title: 'Документ',
      position: 0,
      articles: [{ id: 1, slug: 'structure', title: 'Структура документа', position: 0 }],
    },
  ],
} satisfies Doc;

test('renders the section page', () => {
  render(<SectionPage doc={doc} />);
  expect(screen.getByRole('main')).toBeDefined();
  expect(screen.getByRole('heading', { name: 'HTML', level: 1 })).toBeDefined();
  expect(screen.getByRole('link', { name: 'Структура документа' })).toBeDefined();
});
