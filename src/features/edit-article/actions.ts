'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { db } from '@/db/client';
import { articles } from '@/db/schema';
import type { CreateArticleFormState } from './types';

export async function editArticleAction(
  articleId: number,
  _prev: CreateArticleFormState | undefined,
  formData: FormData,
): Promise<CreateArticleFormState | undefined> {
  const categoryId = formData.get('categoryId');
  const section = formData.get('section');
  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');

  let updated: { slug: string } | undefined;

  try {
    [updated] = await db
      .update(articles)
      .set({
        categoryId: Number(categoryId),
        title: String(title),
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

  redirect(ROUTES.article(String(section), updated.slug));
}
