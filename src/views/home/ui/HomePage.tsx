import Link from 'next/link';
import { ROUTES } from '@/shared/config';

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full flex-1 flex-col justify-between bg-white dark:bg-black">
        <div className="grid grid-cols-3">
          <Link href={ROUTES.section('/html')}>HTML</Link>
          <Link href={ROUTES.section('/css')}>CSS</Link>
          <Link href={ROUTES.section('/js')}>JS</Link>
        </div>
      </main>
    </div>
  );
}
