import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createArticleAction, type CreateArticleSectionOption } from '@/features/create-article';
import { CreateDocForm } from './CreateDocForm';

vi.mock('./MarkdownEditor', () => ({
  MarkdownEditor: () => <div data-testid="markdown-editor" />,
}));

vi.mock('@/features/create-article', () => ({
  createArticleAction: vi.fn(),
}));

const sections: CreateArticleSectionOption[] = [
  {
    name: 'html',
    title: 'HTML',
    categories: [
      { id: 1, title: 'Документ' },
      { id: 2, title: 'Контент' },
    ],
  },
];

test('renders form fields with live file name', () => {
  render(<CreateDocForm sections={sections} />);

  expect(screen.getByText('new-article.md')).toBeDefined();
  expect(screen.getByRole('combobox', { name: 'Секция' })).toBeDefined();
  expect(screen.getByRole('combobox', { name: 'Категория' })).toBeDefined();
  expect(screen.getByRole('textbox', { name: 'Заголовок' })).toBeDefined();
  expect(screen.getByRole('textbox', { name: 'Slug · необязательно' })).toBeDefined();
  expect(screen.getByRole('button', { name: 'Опубликовать' })).toBeDefined();
});

test('renames the file as the title is typed', () => {
  render(<CreateDocForm sections={sections} />);

  fireEvent.change(screen.getByRole('textbox', { name: 'Заголовок' }), {
    target: { value: 'Блочная модель' },
  });

  expect(screen.getByText('blochnaya-model.md')).toBeDefined();
});

test('shows validation errors returned by the action', async () => {
  vi.mocked(createArticleAction).mockResolvedValue({
    errors: { title: 'Укажите заголовок', slug: 'Такой slug уже занят' },
  });

  render(<CreateDocForm sections={sections} />);
  fireEvent.click(screen.getByRole('button', { name: 'Опубликовать' }));

  await waitFor(() => expect(screen.getByText('Укажите заголовок')).toBeDefined());
  expect(screen.getByText('Такой slug уже занят')).toBeDefined();
});
