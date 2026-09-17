import { useEffect, useActionState, useState } from 'react';
import { createCategoryActions } from '@/features/create-category';
import { Button, Field, Input } from '@/ui/primitives';

interface CreateCategoryFormProps {
  sectionId: number;
  onCloseModal: () => void;
}

export function CreateCategoryForm({ sectionId, onCloseModal }: CreateCategoryFormProps) {
  const createCategoryWithSection = createCategoryActions.bind(null, sectionId);
  const [{ error, success }, formAction, isPending] = useActionState(createCategoryWithSection, {});
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (success) {
      onCloseModal();
    }
  }, [success, onCloseModal]);

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <Field label="Название" error={error}>
        {(control) => (
          <Input
            {...control}
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Введите категорию"
            className="font-mono"
          />
        )}
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button type="submit">{isPending ? 'Создание...' : 'Создать'}</Button>
      </div>
    </form>
  );
}
