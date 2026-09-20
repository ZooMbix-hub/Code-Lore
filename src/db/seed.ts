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
        articles: [
          {
            slug: 'text',
            title: 'Текст и списки',
            content: [
              'Текст статьи пишется на Markdown, а парсер превращает его в HTML. Эта статья — песочница разметки: в ней собраны все поддерживаемые конструкции.',
              '',
              '## Заголовки',
              '',
              'Шесть уровней, от самого крупного к самому мелкому:',
              '',
              '# Заголовок первого уровня',
              '',
              '## Заголовок второго уровня',
              '',
              '### Заголовок третьего уровня',
              '',
              '#### Заголовок четвёртого уровня',
              '',
              '##### Заголовок пятого уровня',
              '',
              '###### Заголовок шестого уровня',
              '',
              '## Строчное выделение',
              '',
              'В одном абзаце сочетаются **жирный текст**, *курсив*, ***жирный курсив***, ~~зачёркнутый~~, `встроенный код` и [обычная ссылка](https://developer.mozilla.org). Ссылка бывает с подсказкой — [спецификация HTML](https://html.spec.whatwg.org "читать в оригинале"), автоматическая — <https://example.com> — или оформленная сноской — [MDN][mdn].',
              '',
              'Разметку можно показать буквально: \\*звёздочки\\* и \\_подчёркивания\\_ останутся просто символами.',
              '',
              'Строчный HTML проходит насквозь: <mark>подсветка маркером</mark>, формула воды H<sub>2</sub>O и степень 2<sup>10</sup>.',
              '',
              '## Переносы строк',
              '',
              'Строка с жёстким переносом:\\',
              'вторая строка начинается сразу под первой.',
              '',
              'А здесь перенос мягкий —',
              'обе строки сольются в один абзац.',
              '',
              '## Цитаты',
              '',
              '> HTML описывает смысл текста, а не его внешний вид.',
              '',
              '> Цитаты вкладываются друг в друга,',
              '> а внутри них живут абзацы и списки:',
              '>',
              '> > Вложенная цитата второго уровня.',
              '>',
              '> - семантика;',
              '> - доступность;',
              '> - поисковая оптимизация.',
              '',
              '## Списки',
              '',
              'Маркированный список с вложенностью:',
              '',
              '- блочные элементы: абзацы, заголовки, списки;',
              '  - строчные: выделение, ссылки, код;',
              '- упорядоченные вкладываются так же:',
              '  1. тег `ol` — контейнер;',
              '  2. тег `li` — пункт.',
              '',
              'Нумерация может начинаться не с единицы:',
              '',
              '3. третий пункт;',
              '4. четвёртый пункт.',
              '',
              'Чек-лист:',
              '',
              '- [x] выучить теги;',
              '- [ ] сверстать страницу;',
              '- [ ] рассказать друзьям.',
              '',
              '## Таблицы',
              '',
              '| Тег | Назначение | Парный | Стандарт |',
              '| ---- | ---------- | :----: | -------: |',
              '| `p` | Абзац текста | да | 2.0 |',
              '| `br` | Перенос строки | нет | 2.0 |',
              '| `strong` | Важный текст | да | 4.01 |',
              '',
              '## Блоки кода',
              '',
              'Разметка:',
              '',
              '```html',
              '<p>Абзац с <strong>жирным</strong> словом.</p>',
              '<ul>',
              '  <li>первый пункт;</li>',
              '  <li>второй пункт;</li>',
              '</ul>',
              '```',
              '',
              'Стили:',
              '',
              '```css',
              'p {',
              '  max-width: 65ch;',
              '  line-height: 1.65;',
              '}',
              '```',
              '',
              'Скрипты:',
              '',
              '```js',
              'const items = document.querySelectorAll("li");',
              'console.log(`пунктов: ${items.length}`);',
              '```',
              '',
              'Типы:',
              '',
              '```ts',
              'type Article = {',
              '  slug: string;',
              '  content: string;',
              '};',
              '```',
              '',
              'Данные:',
              '',
              '```json',
              '{',
              '  "slug": "text",',
              '  "tags": ["html", "markdown"],',
              '  "published": true',
              '}',
              '```',
              '',
              'Правки:',
              '',
              '```diff',
              '- <b>жирный</b>',
              '+ <strong>жирный</strong>',
              '```',
              '',
              '## Изображения и разделители',
              '',
              'Изображение с подписью:',
              '',
              '![Плейсхолдер](https://placehold.co/512x288 "Рисунок 1")',
              '',
              '---',
              '',
              'Последний абзац статьи — уже после горизонтальной линии.',
              '',
              '[mdn]: https://developer.mozilla.org "MDN Web Docs"',
            ].join('\n'),
          },
        ],
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
          category.articles.map((article) => ({
            categoryId: insertedCategory.id,
            slug: article.slug,
            title: article.title,
            content: article.content ?? '',
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
