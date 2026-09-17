import { Button, Field, Input } from '@/ui/primitives';

interface CreateSectionFormProps {
  onCloseModal: () => void;
}

export function CreateSectionForm({ onCloseModal }: CreateSectionFormProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <Field label="Название">
        {(control) => (
          <Input
            {...control}
            type="text"
            name="name"
            value={''}
            onChange={(event) => console.log(event.target.value)}
            placeholder="Введите секцию"
            className="font-mono"
          />
        )}
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button>Создать</Button>
      </div>
    </div>
  );
}
