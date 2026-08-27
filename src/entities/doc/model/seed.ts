// oxlint-disable no-console — это CLI-скрипт, вывод в консоль здесь основной интерфейс
import { db } from '@/shared/config';
import { articles, categories, sections } from './schema';

/**
 * Стартовый каталог документации.
 */
const SEED = [
  {
    name: 'html',
    title: 'HTML',
    glyph: '</>',
    description: 'Структура и семантика: как браузер читает вашу разметку.',
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
            position: articlePosition,
          })),
        );
        articleCount += category.articles.length;
      }
    }

    console.log(`Сид завершён: ${SEED.length} секций, ${articleCount} статей.`);
  });
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Сид не удался:', error);
    process.exit(1);
  });
