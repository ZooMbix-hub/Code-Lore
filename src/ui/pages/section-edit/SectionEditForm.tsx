'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { changeSectionActions } from '@/features/change-section';
import { Button, Field, Input } from '@/ui/primitives';

interface SectionEditFormProps {
  section: string;
  glyph?: string;
  title?: string;
  docId: number;
  description?: string;
}

export function SectionEditForm({ section, glyph, title, docId, description }: SectionEditFormProps) {
  const changeSectionWithId = changeSectionActions.bind(null, docId);
  const [{ errors }, formAction, isPending] = useActionState(changeSectionWithId, {});
  const [formState, setFormState] = useState({
    sectionName: title ?? '',
    glyph: glyph ?? '',
    description: description ?? '',
  });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50/50 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="grid grid-cols-3 gap-3">
        <Field label="Название" error={errors?.sectionName}>
          {(control) => (
            <Input
              {...control}
              type="text"
              name="title"
              placeholder="Введите название"
              className="font-mono"
              value={formState.sectionName}
              onChange={(event) => setFormState({ ...formState, sectionName: event.target.value })}
            />
          )}
        </Field>
        <Field label="Глиф">
          {(control) => (
            <Input
              {...control}
              type="text"
              name="glyph"
              placeholder="Введите глиф"
              className="font-mono"
              value={formState.glyph}
              onChange={(event) => setFormState({ ...formState, glyph: event.target.value })}
            />
          )}
        </Field>
        <Field label="Описание" error={errors?.description}>
          {(control) => (
            <Input
              {...control}
              type="text"
              name="description"
              placeholder="Введите описание"
              className="font-mono"
              value={formState.description}
              onChange={(event) => setFormState({ ...formState, description: event.target.value })}
            />
          )}
        </Field>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <Button variant="outline" nativeButton={false} render={<Link href={ROUTES.section(section)} />}>
          {'Отменить'}
        </Button>
        <Button type="submit" loading={isPending}>
          {'Сохранить'}
        </Button>
      </div>

      <input type="hidden" name="sectionName" value={formState.sectionName} />
      <input type="hidden" name="glyph" value={formState.glyph} />
      <input type="hidden" name="description" value={formState.description} />
    </form>
  );
}
