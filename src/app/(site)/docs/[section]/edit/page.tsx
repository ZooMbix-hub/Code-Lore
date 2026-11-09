import { type Metadata } from 'next';
import { getDoc } from '@/features/docs';
import { SectionEditPage } from '@/ui/pages/section-edit';

export async function generateMetadata({ params }: PageProps<Path>): Promise<Metadata> {
  const { section } = await params;

  return { title: `Редактирование: ${section}` };
}

export default async function Page({ params }: PageProps<Path>) {
  const { section } = await params;
  const doc = await getDoc(section);

  return (
    <SectionEditPage
      section={section}
      glyph={doc?.glyph}
      title={doc?.title}
      docId={doc?.id}
      description={doc?.description}
    />
  );
}

type Path = '/docs/[section]/edit';
