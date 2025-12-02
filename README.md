# K-Auth

[![npm version](https://img.shields.io/npm/v/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)
[![npm downloads](https://img.shields.io/npm/dm/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)
[![license](https://img.shields.io/npm/l/@k-auth/next.svg)](https://github.com/k-auth/next/blob/main/LICENSE)

Next.js에서 카카오, 네이버 로그인을 가장 쉽게 구현하는 방법.

## 특징

- **카카오/네이버 provider 내장** - 복잡한 OAuth 설정 없이 바로 사용
- **공식 디자인 버튼** - 각 서비스 가이드라인 준수
- **한국어 에러 메시지** - 문제 원인과 해결 방법을 바로 확인
- **next-auth 호환** - 구글, 애플, GitHub 등 함께 사용 가능

## 설치

```bash
npm install @k-auth/next
```

## 빠른 시작

### 1. 설정

```typescript
// auth.ts
import { KAuth } from '@k-auth/next';

export const { handlers, auth, signIn, signOut } = KAuth({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
  },
});
```

### 2. API 라우트

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

### 3. 로그인 버튼

```tsx
import { Button } from '@k-auth/next/ui';
import { signIn } from '@/auth';

<Button.Group>
  <Button.Kakao onClick={() => signIn('kakao')} />
  <Button.Naver onClick={() => signIn('naver')} />
</Button.Group>
```

### 4. 세션 확인

```tsx
// app/page.tsx
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <a href="/login">로그인</a>;
  }

  return <p>안녕하세요, {session.user?.name}님!</p>;
}
```

## 버튼

```tsx
// 지원 버튼
<Button.Kakao />
<Button.Naver />
<Button.Google />
<Button.Apple />

// 크기
<Button.Kakao size="sm" />
<Button.Kakao size="lg" />
<Button.Kakao size="icon" />

// 그룹
<Button.Group direction="row" gap="md">
  <Button.Kakao size="icon" />
  <Button.Naver size="icon" />
</Button.Group>
```

## 추가 정보 수집

```typescript
KAuth({
  kakao: {
    clientId: '...',
    clientSecret: '...',
    collectPhone: true,  // 전화번호
    collectBirth: true,  // 생년월일
    collectGender: true, // 성별
  },
});
```

## 구글/애플 추가

```typescript
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';

KAuth({
  kakao: { ... },
  naver: { ... },
  nextAuthConfig: {
    providers: [
      Google({ clientId: '...', clientSecret: '...' }),
      Apple({ clientId: '...', clientSecret: '...' }),
    ],
  },
});
```

## 페이지 보호

```typescript
// middleware.ts
import { auth } from '@/auth';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## 환경 변수

```env
# Provider 설정
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

# NextAuth 필수
AUTH_SECRET=         # openssl rand -base64 32 로 생성
AUTH_TRUST_HOST=true # 배포 환경(Vercel 등)에서 필수
```

## 문서

자세한 사용법은 [문서 사이트](https://github.com/k-auth/next)를 참고하세요.

- [빠른 시작](https://github.com/k-auth/next#빠른-시작)
- [버튼 컴포넌트](https://github.com/k-auth/next#버튼)
- [Provider 설정](https://github.com/k-auth/next#구글애플-추가)
- [세션 관리](https://github.com/k-auth/next#세션-확인)
- [미들웨어](https://github.com/k-auth/next#페이지-보호)

## 요구사항

- Next.js 14+
- React 18+

## License

MIT
