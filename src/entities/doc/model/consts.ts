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
      text: 'text-orange-700 dark:text-orange-300',
      title: 'from-orange-600 to-amber-400 dark:from-orange-400 dark:to-amber-300',
    },
    categories: [
      {
        title: 'Документ',
        articles: [
          { slug: 'structure', title: 'Структура документа' },
          { slug: 'semantics', title: 'Семантические теги' },
        ],
      },
      {
        title: 'Контент',
        articles: [
          { slug: 'text', title: 'Текст и списки' },
          { slug: 'links', title: 'Ссылки и изображения' },
          { slug: 'tables', title: 'Таблицы' },
        ],
      },
      {
        title: 'Формы и медиа',
        articles: [
          { slug: 'forms', title: 'Формы' },
          { slug: 'media', title: 'Медиа и встраивание' },
        ],
      },
    ],
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
      text: 'text-sky-700 dark:text-sky-300',
      title: 'from-sky-600 to-cyan-400 dark:from-sky-400 dark:to-cyan-300',
    },
    categories: [
      {
        title: 'Основы',
        articles: [
          { slug: 'syntax', title: 'Синтаксис и подключение' },
          { slug: 'selectors', title: 'Селекторы' },
          { slug: 'cascade', title: 'Каскад и специфичность' },
        ],
      },
      {
        title: 'Layout',
        articles: [
          { slug: 'box-model', title: 'Блочная модель' },
          { slug: 'flexbox', title: 'Flexbox' },
          { slug: 'grid', title: 'Grid Layout' },
        ],
      },
      {
        title: 'Динамика',
        articles: [
          { slug: 'variables', title: 'CSS-переменные' },
          { slug: 'animations', title: 'Переходы и анимации' },
        ],
      },
    ],
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
      text: 'text-yellow-700 dark:text-yellow-300',
      title: 'from-yellow-600 to-amber-300 dark:from-yellow-400 dark:to-amber-300',
    },
    categories: [
      {
        title: 'Основы',
        articles: [
          { slug: 'basics', title: 'Переменные и типы' },
          { slug: 'functions', title: 'Функции' },
          { slug: 'objects', title: 'Объекты и массивы' },
        ],
      },
      {
        title: 'Браузер',
        articles: [
          { slug: 'dom', title: 'DOM и события' },
          { slug: 'async', title: 'Асинхронность' },
        ],
      },
      {
        title: 'Практики',
        articles: [
          { slug: 'errors', title: 'Ошибки и отладка' },
          { slug: 'modules', title: 'Модули' },
        ],
      },
    ],
  },
] as const;

export type Doc = (typeof DOCS)[number];

export const getDoc = (name: string): Doc | undefined => DOCS.find((doc) => doc.name === name);
