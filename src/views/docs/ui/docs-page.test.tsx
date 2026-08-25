import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DocsPage } from '@/views/docs';

test('renders the docs page', () => {
  render(<DocsPage />);
  expect(screen.getByRole('main')).toBeDefined();
  expect(screen.getByRole('heading', { name: 'Документации' })).toBeDefined();
});
