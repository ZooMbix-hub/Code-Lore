export const DOCS = [
  {
    name: 'html',
    title: 'HTML',
    glyph: '</>',
    description: 'Структура и семантика: как браузер читает вашу разметку.',
    classes: {
      glyph:
        'border-orange-600/25 bg-orange-500/10 text-orange-700 dark:border-orange-400/25 dark:bg-orange-400/10 dark:text-orange-300',
      border: 'hover:border-orange-600/40 dark:hover:border-orange-400/40',
      link: 'group-hover:text-orange-700 dark:group-hover:text-orange-300',
    },
  },
  {
    name: 'css',
    title: 'CSS',
    glyph: '{ }',
    description: 'Стили, layout и анимации: от селекторов до grid и переменных.',
    classes: {
      glyph:
        'border-sky-600/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-300',
      border: 'hover:border-sky-600/40 dark:hover:border-sky-400/40',
      link: 'group-hover:text-sky-700 dark:group-hover:text-sky-300',
    },
  },
  {
    name: 'js',
    title: 'JS',
    glyph: '=>',
    description: 'Логика и динамика: язык, который оживляет интерфейсы.',
    classes: {
      glyph:
        'border-yellow-600/25 bg-yellow-500/10 text-yellow-700 dark:border-yellow-400/25 dark:bg-yellow-400/10 dark:text-yellow-300',
      border: 'hover:border-yellow-600/40 dark:hover:border-yellow-400/40',
      link: 'group-hover:text-yellow-700 dark:group-hover:text-yellow-300',
    },
  },
] as const;

export type Doc = (typeof DOCS)[number];
