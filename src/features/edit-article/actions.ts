'use server';

import { db } from '@/db/client';
import { articles } from '@/db/schema';
import type { CreateArticleFormState } from './types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function editArticleAction(
  articleId: number,
  _prev: CreateArticleFormState | undefined,
  formData: FormData,
): Promise<CreateArticleFormState | undefined> {
  const categoryId = formData.get('categoryId');
  const slug = formData.get('slug');
  const content = formData.get('content');

  let updated: { slug: string } | undefined;

  try {
    [updated] = await db
      .update(articles)
      .set({
        categoryId: Number(categoryId),
        slug: String(slug),
        content: String(content),
      })
      .where(eq(articles.id, articleId))
      .returning({ slug: articles.slug });
  } catch {
    return { error: 'Не удалось сохранить статью' };
  }

  if (!updated) {
    return { error: 'Статья не найдена' };
  }

  revalidatePath('/', 'layout');

  return { success: true };
}
