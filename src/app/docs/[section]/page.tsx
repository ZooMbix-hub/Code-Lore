import { notFound } from 'next/navigation';
import { getDoc, getDocs } from '@/features/docs';
import { SectionPage } from '@/ui/pages/section';

export const dynamicParams = false;

export async function generateStaticParams() {
  const docs = await getDocs();
  return docs.map(({ name }) => ({ section: name }));
}

export default async function Page({ params }: PageProps<'/docs/[section]'>) {
  const { section } = await params;
  const doc = await getDoc(section);

  if (!doc) notFound();

  return <SectionPage doc={doc} />;
}
