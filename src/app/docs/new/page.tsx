import { getDocs } from '@/features/docs';
import { NewDocPage } from '@/ui/pages/newDoc';

export const metadata = {
  title: 'Новая статья — Code Lore',
};

export default async function Page() {
  const docs = await getDocs();

  return <NewDocPage docs={docs} />;
}
