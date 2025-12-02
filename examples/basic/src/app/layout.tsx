import './globals.css';

export const metadata = { title: 'K-Auth' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50">{children}</body>
    </html>
  );
}
