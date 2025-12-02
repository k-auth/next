import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-Auth Demo',
  description: '한국형 소셜 로그인 라이브러리',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
