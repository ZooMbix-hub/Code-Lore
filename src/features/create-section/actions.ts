'use server';

import { eq, or, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { sections } from '@/db/schema';
import type { CreateSectionFormState } from './types';

export async function createSectionActions(
  _prev: CreateSectionFormState,
  formData: FormData,
): Promise<CreateSectionFormState> {
  const sectionName = String(formData.get('sectionName') ?? '').trim();
  const glyph = String(formData.get('glyph') ?? '');
  const description = String(formData.get('description') ?? '');

  const errors: CreateSectionFormState['errors'] = {};

  if (!sectionName) {
    errors.sectionName = 'Введите название секции';
  }

  if (!description) {
    errors.description = 'Введите описание секции';
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  const [existing] = await db
    .select({ id: sections.id })
    .from(sections)
    .where(or(eq(sections.title, sectionName), eq(sections.name, sectionName.toLocaleLowerCase())));

  if (existing) {
    return { errors: { sectionName: 'Такая секция уже есть' } };
  }

  const [max] = await db
    .select({ value: sql<number>`coalesce(max(${sections.position}), -1)` })
    .from(sections);

  await db.insert(sections).values({
    name: sectionName.toLocaleLowerCase(),
    title: sectionName,
    glyph: glyph,
    description: description,
    position: Number(max?.value ?? -1) + 1,
  });

  revalidatePath('/', 'layout');
  return { success: true };
}
