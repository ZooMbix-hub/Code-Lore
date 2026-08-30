import { DocsPage } from '@/ui/pages/docs';
import { getDocs } from '@/features/docs';

export default async function Page() {
  const docs = await getDocs();

  return <DocsPage docs={docs} />;
}
