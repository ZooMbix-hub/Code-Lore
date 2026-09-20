import { integer, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  title: text('title').notNull(),
  glyph: text('glyph').notNull(),
  description: text('description').notNull(),
  position: integer('position').notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => sections.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  position: integer('position').notNull(),
});

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
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex('articles_category_slug_key').on(table.categoryId, table.slug)],
);

export type SectionRow = typeof sections.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type ArticleRow = typeof articles.$inferSelect;
