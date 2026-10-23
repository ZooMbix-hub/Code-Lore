import { ROUTES } from '@/config/routes';
import { Breadcrumbs } from '@/ui/components/Breadcrumbs';
import { SectionEditForm } from './SectionEditForm';

interface SectionEditPageProps {
  section: string;
  glyph?: string;
  title?: string;
  docId?: number;
  description?: string;
}

export function SectionEditPage({ section, glyph, title, docId, description }: SectionEditPageProps) {
  return (
    <div className="flex">
      <main className="mx-auto w-full max-w-5xl flex-1 p-8">
        <div className="flex min-w-0 flex-col gap-8">
          <Breadcrumbs
            items={[
              { label: '~/docs', href: ROUTES.docs },
              { label: section, href: ROUTES.section(section) },
              { label: 'edit' },
            ]}
          />

          <h1 className="text-foreground bg-linear-to-rbg-clip-text text-4xl font-bold tracking-tight">
            Редактирование секции
          </h1>

          {docId && (
            <SectionEditForm
              section={section}
              glyph={glyph}
              title={title}
              docId={docId}
              description={description}
            />
          )}
        </div>
      </main>
    </div>
  );
}
