import { DOCS } from '@/entities/doc';

export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS.map(({ name }) => ({ section: name }));
}

export default async function Page({ params }: PageProps<'/docs/[section]'>) {
  const { section } = await params;

  return <div>Page {section}</div>;
}
