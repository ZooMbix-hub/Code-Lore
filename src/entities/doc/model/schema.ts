import { integer, pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';

/** Секции документации: html, css, js */
export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  title: text('title').notNull(),
  glyph: text('glyph').notNull(),
  description: text('description').notNull(),
  position: integer('position').notNull(),
});

/** Категории внутри секции: «Документ», «Основы», «Layout»... */
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => sections.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  position: integer('position').notNull(),
});

/** Статьи внутри категории: /docs/[section]/[article] */
export const articles = pgTable(
  'articles',
  {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull().default(''),
    position: integer('position').notNull(),
  },
  (table) => [uniqueIndex('articles_category_slug_key').on(table.categoryId, table.slug)],
);

export type SectionRow = typeof sections.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type ArticleRow = typeof articles.$inferSelect;
