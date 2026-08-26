import { notFound } from 'next/navigation';
import { DOCS, getDoc } from '@/entities/doc';
import { SectionPage } from '@/views/section';

export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS.map(({ name }) => ({ section: name }));
}

export default async function Page({ params }: PageProps<'/docs/[section]'>) {
  const { section } = await params;
  const doc = getDoc(section);

  if (!doc) notFound();

  return <SectionPage doc={doc} />;
}
