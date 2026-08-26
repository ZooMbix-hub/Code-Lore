import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DOCS } from '@/entities/doc';
import { SectionPage } from '@/views/section';

test('renders the section page', () => {
  render(<SectionPage doc={DOCS[0]} />);
  expect(screen.getByRole('main')).toBeDefined();
  expect(screen.getByRole('heading', { name: 'HTML', level: 1 })).toBeDefined();
  expect(screen.getByRole('link', { name: 'Структура документа' })).toBeDefined();
});
