import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['super-admin', 'admin', 'writer', 'reader']);

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

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  login: text('login').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull().default('reader'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const sessions = pgTable('sessions', {
  tokenHash: text('token_hash').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export type SectionRow = typeof sections.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type ArticleRow = typeof articles.$inferSelect;
export type UserRow = typeof users.$inferSelect;
export type SessionRow = typeof sessions.$inferSelect;
