import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'K-Auth - 한국형 소셜 로그인',
    template: '%s - K-Auth',
  },
  description: 'Next.js에서 카카오, 네이버, 구글, 애플 소셜 로그인을 쉽게 구현하는 라이브러리',
  openGraph: {
    title: 'K-Auth - 한국형 소셜 로그인',
    description: 'Next.js에서 카카오, 네이버, 구글, 애플 소셜 로그인을 쉽게 구현하는 라이브러리',
    siteName: 'K-Auth',
    type: 'website',
    locale: 'ko_KR',
  },
};

const navbar = (
  <Navbar
    logo={<strong>K-Auth</strong>}
    projectLink="https://github.com/k-auth/next"
  />
);

const footer = <Footer>MIT {new Date().getFullYear()} &copy; K-Auth</Footer>;

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/k-auth/next/tree/main/docs"
          footer={footer}
          editLink="이 페이지 수정하기"
          feedback={{ content: '피드백 보내기', labels: 'feedback' }}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
