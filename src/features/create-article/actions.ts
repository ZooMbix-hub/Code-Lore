'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db/client';
import { articles, categories, sections } from '@/db/schema';
import { ROUTES } from '@/config/routes';
import { slugify } from '@/lib/slugify';
import type { CreateArticleFormState } from './types';

const UNIQUE_VIOLATION = '23505';

function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const { code, cause } = error as { code?: unknown; cause?: unknown };
  return code === UNIQUE_VIOLATION || isUniqueViolation(cause);
}

export async function createArticleAction(
  _prev: CreateArticleFormState,
  formData: FormData,
): Promise<CreateArticleFormState> {
  const sectionName = String(formData.get('section') ?? '');
  const categoryId = Number(formData.get('categoryId'));
  const title = String(formData.get('title') ?? '').trim();
  const rawSlug = String(formData.get('slug') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();

  const errors: CreateArticleFormState['errors'] = {};

  if (!title) {
    errors.title = 'Укажите заголовок';
  }

  if (!content) {
    errors.content = 'Напишите текст статьи';
  }

  const [place] = await db
    .select({ categoryId: categories.id })
    .from(categories)
    .innerJoin(sections, eq(categories.sectionId, sections.id))
    .where(and(eq(categories.id, categoryId), eq(sections.name, sectionName)));

  if (!place) {
    errors.categoryId = 'Выберите категорию';
  }

  const slug = slugify(rawSlug || title);
  if (!slug) {
    errors.slug = 'Не удалось сгенерировать slug — впишите его латиницей';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const [max] = await db
    .select({ value: sql<number>`coalesce(max(${articles.position}), -1)` })
    .from(articles)
    .where(eq(articles.categoryId, place.categoryId));

  let created;
  try {
    [created] = await db
      .insert(articles)
      .values({ categoryId: place.categoryId, slug, title, content, position: Number(max?.value ?? -1) + 1 })
      .returning({ slug: articles.slug });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { errors: { slug: 'Статья с таким slug уже есть в этой категории' } };
    }
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect(ROUTES.article(sectionName, created.slug));
}
