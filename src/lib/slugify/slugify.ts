import { CYRILLIC } from './consts';

export function slugify(input: string): string {
  const transliterated = input
    .toLowerCase()
    .split('')
    .map((char) => CYRILLIC[char] ?? char)
    .join('');

  return transliterated.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
