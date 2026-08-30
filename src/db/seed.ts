import { db } from './client';
import { articles, categories, sections } from './schema';

type SeedArticle = { slug: string; title: string; content?: string };
type SeedCategory = { title: string; articles: SeedArticle[] };
type SeedSection = {
  name: string;
  title: string;
  glyph: string;
  description: string;
  categories: SeedCategory[];
};

const SEED: SeedSection[] = [
  {
    name: 'html',
    title: 'HTML',
    glyph: '</>',
    description: 'Структура и семантика: как браузер читает вашу разметку.',
    categories: [
      {
        title: 'Документ',
        articles: [
          {
            slug: 'structure',
            title: 'Структура документа',
            content: [
              'Любая HTML-страница начинается с типовой заготовки:',
              '',
              '```html',
              '<!DOCTYPE html>',
              '<html lang="ru">',
              '  <head>',
              '    <meta charset="UTF-8" />',
              '    <title>Заголовок вкладки</title>',
              '  </head>',
              '  <body>',
              '    <!-- содержимое страницы -->',
              '  </body>',
              '</html>',
              '```',
              '',
              '## Из чего состоит документ',
              '',
              '- `<!DOCTYPE html>` — версия разметки;',
              '- `<head>` — служебная информация: кодировка, заголовок, стили;',
              '- `<body>` — видимое содержимое.',
              '',
              '> Атрибут `lang` помогает браузерам и экранным дикторам определить язык страницы.',
            ].join('\n'),
          },
        ],
      },
      {
        title: 'Контент',
        articles: [{ slug: 'text', title: 'Текст и списки' }],
      },
      {
        title: 'Формы и медиа',
        articles: [{ slug: 'forms', title: 'Формы' }],
      },
    ],
  },
  {
    name: 'css',
    title: 'CSS',
    glyph: '{ }',
    description: 'Стили, layout и анимации: от селекторов до grid и переменных.',
    categories: [
      {
        title: 'Основы',
        articles: [{ slug: 'syntax', title: 'Синтаксис и подключение' }],
      },
      {
        title: 'Layout',
        articles: [
          {
            slug: 'box-model',
            title: 'Блочная модель',
            content: [
              'Каждый элемент на странице — прямоугольник из четырёх слоёв:',
              '',
              '1. **content** — содержимое;',
              '2. **padding** — внутренние отступы;',
              '3. **border** — рамка;',
              '4. **margin** — внешние отступы.',
              '',
              '## box-sizing',
              '',
              'Чтобы ширина включала padding и border, используйте:',
              '',
              '```css',
              '* {',
              '  box-sizing: border-box;',
              '}',
              '```',
            ].join('\n'),
          },
        ],
      },
      {
        title: 'Динамика',
        articles: [{ slug: 'variables', title: 'CSS-переменные' }],
      },
    ],
  },
  {
    name: 'js',
    title: 'JS',
    glyph: '=>',
    description: 'Логика и динамика: язык, который оживляет интерфейсы.',
    categories: [
      {
        title: 'Основы',
        articles: [
          {
            slug: 'functions',
            title: 'Функции',
            content: [
              'Три способа объявить функцию:',
              '',
              '```js',
              '// объявление',
              'function sum(a, b) {',
              '  return a + b;',
              '}',
              '',
              '// стрелочная функция',
              'const sum = (a, b) => a + b;',
              '```',
              '',
              'Функции — объекты первого класса: их можно передавать аргументами и возвращать из других функций.',
            ].join('\n'),
          },
        ],
      },
    ],
  },
];

async function seed() {
  await db.transaction(async (tx) => {
    await tx.delete(articles);
    await tx.delete(categories);
    await tx.delete(sections);

    let articleCount = 0;

    for (const [sectionPosition, section] of SEED.entries()) {
      const [insertedSection] = await tx
        .insert(sections)
        .values({
          name: section.name,
          title: section.title,
          glyph: section.glyph,
          description: section.description,
          position: sectionPosition,
        })
        .returning({ id: sections.id });

      for (const [categoryPosition, category] of section.categories.entries()) {
        const [insertedCategory] = await tx
          .insert(categories)
          .values({
            sectionId: insertedSection.id,
            title: category.title,
            position: categoryPosition,
          })
          .returning({ id: categories.id });

        await tx.insert(articles).values(
          category.articles.map((article, articlePosition) => ({
            categoryId: insertedCategory.id,
            slug: article.slug,
            title: article.title,
            content: article.content ?? '',
            position: articlePosition,
          })),
        );
        articleCount += category.articles.length;
      }
    }

    // oxlint-disable-next-line no-console
    console.log(`Сид завершён: ${SEED.length} секций, ${articleCount} статей.`);
  });
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    // oxlint-disable-next-line no-console
    console.error('Сид не удался:', error);
    process.exit(1);
  });
