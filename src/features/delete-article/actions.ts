'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db/client';
import { articles } from '@/db/schema';
import { ROUTES } from '@/config/routes';
import type { DeleteArticleFormState } from './types';

export async function deleteArticleAction(
  articleId: number,
  sectionName: string,
  _prev: DeleteArticleFormState,
  _formData: FormData,
): Promise<DeleteArticleFormState> {
  let deleted: Array<{ id: number }>;

  try {
    deleted = await db.delete(articles).where(eq(articles.id, articleId)).returning({ id: articles.id });
  } catch {
    return { errors: { form: 'Не удалось удалить статью' } };
  }

  if (deleted.length === 0) {
    return { errors: { form: 'Статья не найдена' } };
  }

  revalidatePath('/', 'layout');
  redirect(ROUTES.section(sectionName));
}
