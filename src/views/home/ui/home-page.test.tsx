import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePage } from '@/views/home';

test('renders the home page', () => {
  render(<HomePage />);
  expect(screen.getByRole('main')).toBeDefined();
});
