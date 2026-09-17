'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { categories } from '@/db/schema';
import type { CreateCategoryFormState } from './types';

export async function createCategoryActions(
  sectionId: number,
  _prev: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> {
  const categoryName = String(formData.get('categoryName') ?? '').trim();

  if (!categoryName) {
    return { error: 'Введите название категории' };
  }

  const [existing] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(eq(categories.sectionId, sectionId), eq(categories.title, categoryName)));

  if (existing) {
    return { error: 'Такая категория уже есть в этой секции' };
  }

  const [max] = await db
    .select({ value: sql<number>`coalesce(max(${categories.position}), -1)` })
    .from(categories)
    .where(eq(categories.sectionId, sectionId));

  await db.insert(categories).values({
    sectionId,
    title: categoryName,
    position: Number(max?.value ?? -1) + 1,
  });

  revalidatePath('/', 'layout');
  return { success: true };
}
