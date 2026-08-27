import { HomePage } from '@/views/home';
import { getDocs } from '@/entities/doc';

export default async function Page() {
  const docs = await getDocs();

  return <HomePage docs={docs} />;
}
