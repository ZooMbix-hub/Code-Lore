export type SectionStyles = {
  glyph: string;
  border: string;
  link: string;
  text: string;
  title: string;
};

const DEFAULT_STYLES: SectionStyles = {
  glyph:
    'border-zinc-600/25 bg-zinc-500/10 text-zinc-700 dark:border-zinc-400/25 dark:bg-zinc-400/10 dark:text-zinc-300',
  border: 'hover:border-zinc-600/40 dark:hover:border-zinc-400/40',
  link: 'group-hover:text-zinc-700 dark:group-hover:text-zinc-300',
  text: 'text-zinc-700 dark:text-zinc-300',
  title: 'from-zinc-600 to-zinc-400 dark:from-zinc-400 dark:to-zinc-300',
};

const SECTION_STYLES: Record<string, SectionStyles> = {
  html: {
    glyph:
      'border-orange-600/25 bg-orange-500/10 text-orange-700 dark:border-orange-400/25 dark:bg-orange-400/10 dark:text-orange-300',
    border: 'hover:border-orange-600/40 dark:hover:border-orange-400/40',
    link: 'group-hover:text-orange-700 dark:group-hover:text-orange-300',
    text: 'text-orange-700 dark:text-orange-300',
    title: 'from-orange-600 to-amber-400 dark:from-orange-400 dark:to-amber-300',
  },
  css: {
    glyph:
      'border-sky-600/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-300',
    border: 'hover:border-sky-600/40 dark:hover:border-sky-400/40',
    link: 'group-hover:text-sky-700 dark:group-hover:text-sky-300',
    text: 'text-sky-700 dark:text-sky-300',
    title: 'from-sky-600 to-cyan-400 dark:from-sky-400 dark:to-cyan-300',
  },
  js: {
    glyph:
      'border-yellow-600/25 bg-yellow-500/10 text-yellow-700 dark:border-yellow-400/25 dark:bg-yellow-400/10 dark:text-yellow-300',
    border: 'hover:border-yellow-600/40 dark:hover:border-yellow-400/40',
    link: 'group-hover:text-yellow-700 dark:group-hover:text-yellow-300',
    text: 'text-yellow-700 dark:text-yellow-300',
    title: 'from-yellow-600 to-amber-300 dark:from-yellow-400 dark:to-amber-300',
  },
};

export const getSectionStyles = (name: string): SectionStyles => SECTION_STYLES[name] ?? DEFAULT_STYLES;
