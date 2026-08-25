import { DOCS } from '@/entities/doc';

export default function Page() {
  return (
    <div>
      <span>Список документаций</span>
      <ul>
        {DOCS.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
