export const dynamicParams = false;

export function generateStaticParams() {
  return [{ section: 'html' }, { section: 'css' }, { section: 'js' }];
}

export default async function Page({ params }: PageProps<'/docs/[section]'>) {
  const { section } = await params;

  return <div>Page {section}</div>;
}
