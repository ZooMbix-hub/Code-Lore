export default async function Page({ params }: PageProps<'/docs/[section]/[article]'>) {
  const { section, article } = await params;

  return (
    <div>
      Page {section} {article}
    </div>
  );
}
