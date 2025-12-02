import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <strong>K-Auth</strong>,
  project: {
    link: 'https://github.com/relkimm/k-auth',
  },
  docsRepositoryBase: 'https://github.com/relkimm/k-auth/tree/main/docs',
  footer: {
    text: 'K-Auth - 한국형 소셜 로그인',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – K-Auth',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="K-Auth - Next.js 카카오/네이버 소셜 로그인" />
      <meta name="og:title" content="K-Auth Documentation" />
    </>
  ),
  primaryHue: {
    dark: 204,  // 청록색 (다크모드)
    light: 212, // 파란색 (라이트모드)
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: '피드백 보내기 →',
    labels: 'feedback',
  },
  editLink: {
    text: '이 페이지 수정하기 →',
  },
};

export default config;
