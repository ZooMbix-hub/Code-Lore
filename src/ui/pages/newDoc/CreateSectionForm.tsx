import { useActionState, useEffect } from 'react';
import { createSectionActions } from '@/features/create-section';
import { Button, Field, Input, Textarea } from '@/ui/primitives';

interface CreateSectionFormProps {
  onCloseModal: () => void;
}

export function CreateSectionForm({ onCloseModal }: CreateSectionFormProps) {
  const [{ errors, success }, formAction, isPending] = useActionState(createSectionActions, {});

  useEffect(() => {
    if (success) {
      onCloseModal();
    }
  }, [success, onCloseModal]);

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <Field label="Название" error={errors?.sectionName}>
        {(control) => (
          <Input
            {...control}
            type="text"
            name="sectionName"
            placeholder="Введите секцию"
            className="font-mono"
          />
        )}
      </Field>

      <Field label="Глиф · необязательно">
        {(control) => (
          <Input {...control} type="text" name="glyph" placeholder="Введите глиф" className="font-mono" />
        )}
      </Field>

      <Field label="Описание" error={errors?.description}>
        {(control) => <Textarea {...control} name="description" rows={4} placeholder="Введите описание" />}
      </Field>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button type="submit" loading={isPending}>
          Создать
        </Button>
      </div>
    </form>
  );
}
