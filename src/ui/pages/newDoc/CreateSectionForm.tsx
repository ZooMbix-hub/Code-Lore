import { Button, Field, Input, Textarea } from '@/ui/primitives';

interface CreateSectionFormProps {
  onCloseModal: () => void;
}

export function CreateSectionForm({ onCloseModal }: CreateSectionFormProps) {
  return (
    <form className="flex flex-col gap-y-4">
      <Field label="Название">
        {(control) => (
          <Input
            {...control}
            type="text"
            name="sectionName"
            value={''}
            onChange={(event) => console.log(event.target.value)}
            placeholder="Введите секцию"
            className="font-mono"
          />
        )}
      </Field>

      <Field label="Глиф · необязательно">
        {(control) => (
          <Input
            {...control}
            type="text"
            name="glyph"
            value={''}
            onChange={(event) => console.log(event.target.value)}
            placeholder="Введите глиф"
            className="font-mono"
          />
        )}
      </Field>

      <Field label="Описание">
        {(control) => <Textarea {...control} name="description" rows={4} placeholder="Введите описание" />}
      </Field>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button>Создать</Button>
      </div>
    </form>
  );
}
