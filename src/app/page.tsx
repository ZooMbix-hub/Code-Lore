import { getDocs } from '@/features/docs';
import { HomePage } from '@/ui/pages/home';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const docs = await getDocs();

  return <HomePage docs={docs} />;
}
