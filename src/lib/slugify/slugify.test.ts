import { expect, test } from 'vitest';
import { slugify } from './slugify';

test('транслитерирует кириллицу', () => {
  expect(slugify('Блочная модель')).toBe('blochnaya-model');
});

test('производит латинский slug из смешанного заголовка', () => {
  expect(slugify('Grid Layout: основы')).toBe('grid-layout-osnovy');
});

test('склеивает повторы и обрезает крайние дефисы', () => {
  expect(slugify('  -- Flexbox --  ')).toBe('flexbox');
});

test('возвращает пустую строку для текста без букв и цифр', () => {
  expect(slugify('!!! ???')).toBe('');
});
