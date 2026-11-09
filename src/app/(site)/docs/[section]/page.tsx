import { notFound } from 'next/navigation';
import { getDoc } from '@/features/docs';
import { SectionPage } from '@/ui/pages/section';

export default async function Page({ params }: PageProps<'/docs/[section]'>) {
  const { section } = await params;
  const doc = await getDoc(section);

  if (!doc) notFound();

  return <SectionPage doc={doc} />;
}
