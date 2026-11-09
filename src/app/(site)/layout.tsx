import { Header } from '@/ui/components/Header';

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
