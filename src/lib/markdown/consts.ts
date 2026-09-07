import type { BundledLanguage } from 'shiki';

export const ALIASES: Record<string, (typeof LANGUAGES)[number]> = {
  js: 'javascript',
  ts: 'typescript',
};

export const LANGUAGES = [
  'html',
  'css',
  'scss',
  'javascript',
  'jsx',
  'typescript',
  'tsx',
  'json',
  'diff',
] as const satisfies BundledLanguage[];

export const THEMES = { light: 'github-light', dark: 'github-dark' } as const;
