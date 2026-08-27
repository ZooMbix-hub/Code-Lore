import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Doc } from '@/entities/doc';
import { HomePage } from '@/views/home';

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

test('renders the home page', () => {
  render(<HomePage docs={docs} />);
  expect(screen.getByRole('main')).toBeDefined();
});
