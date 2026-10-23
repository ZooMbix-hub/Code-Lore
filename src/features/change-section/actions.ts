'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db/client';
import { sections } from '@/db/schema';
import { ROUTES } from '@/config/routes';
import type { ChangeSectionFormState } from './types';

export async function changeSectionActions(
  sectionId: number,
  _prev: ChangeSectionFormState,
  formData: FormData,
): Promise<ChangeSectionFormState> {
  const title = String(formData.get('title') ?? '').trim();
  const glyph = String(formData.get('glyph') ?? '');
  const description = String(formData.get('description') ?? '');

  let updated: { name: string } | undefined;

  try {
    [updated] = await db
      .update(sections)
      .set({
        title: title,
        glyph,
        description,
      })
      .where(eq(sections.id, sectionId))
      .returning({ name: sections.name });
  } catch {}

  if (!updated) {
    return { errors: { form: 'Не удалось сохранить секцию' } };
  }

  revalidatePath('/', 'layout');
  redirect(ROUTES.section(updated.name));
}
