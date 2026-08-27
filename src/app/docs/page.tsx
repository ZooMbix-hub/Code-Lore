import { DocsPage } from '@/views/docs';
import { getDocs } from '@/entities/doc';

export default async function Page() {
  const docs = await getDocs();

  return <DocsPage docs={docs} />;
}
