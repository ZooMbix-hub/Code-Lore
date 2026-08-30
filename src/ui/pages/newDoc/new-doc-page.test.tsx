import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Doc } from '@/features/docs';
import { NewDocPage } from './index';

vi.mock('@/ui/components/CreateDocForm/CreateDocForm', () => ({
  CreateDocForm: () => <div data-testid="create-doc-form" />,
}));

const docs: Doc[] = [
  {
    id: 1,
    name: 'html',
    title: 'HTML',
    glyph: '</>',
    description: 'Структура и семантика.',
    position: 0,
    categories: [{ id: 11, title: 'Документ', position: 0, articles: [] }],
  },
];

test('renders the new doc page', () => {
  render(<NewDocPage docs={docs} />);

  expect(screen.getByRole('heading', { name: 'Новая статья' })).toBeDefined();
  expect(screen.getByTestId('create-doc-form')).toBeDefined();
});
