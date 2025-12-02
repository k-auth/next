# K-Auth

[![npm version](https://img.shields.io/npm/v/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)
[![npm downloads](https://img.shields.io/npm/dm/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)
[![license](https://img.shields.io/npm/l/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)

**한국형 소셜 로그인, 설정 10초 & 디자인 0초**

카카오, 네이버, 구글, 애플 로그인을 Next.js에서 가장 쉽게 구현하는 방법.

## 왜 K-Auth인가?

- **4대 Provider 내장** - 카카오, 네이버, 구글, 애플 모두 지원
- **공식 디자인 버튼** - 각 서비스 가이드라인 100% 준수
- **직관적인 수집 옵션** - `collect: { phone: true }` 한 줄로 scope 자동 구성
- **한국어 에러 메시지** - 문제 원인과 해결 방법을 바로 확인
- **next-auth 완벽 호환** - GitHub, Discord 등 다른 Provider도 함께 사용 가능

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
    collect: { email: true, profile: true },
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

## Provider 설정

### 카카오

```typescript
KAuth({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    collect: {
      email: true,      // 이메일
      profile: true,    // 닉네임, 프로필 이미지
      phone: true,      // 전화번호
      birthday: true,   // 생년월일
      gender: true,     // 성별
      ageRange: true,   // 연령대
    },
  },
});
```

### 네이버

```typescript
KAuth({
  naver: {
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
    // ⚠️ 네이버는 개발자센터에서 직접 동의 항목 설정 필요
    collect: { email: true, profile: true }, // 문서화 목적
  },
});
```

> 네이버는 OAuth scope을 지원하지 않습니다. [네이버 개발자센터](https://developers.naver.com/apps)에서 **제공 정보 선택**을 직접 설정하세요.

### 구글

```typescript
KAuth({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    collect: { email: true, profile: true },
  },
});
```

### 애플

```typescript
KAuth({
  apple: {
    clientId: process.env.APPLE_CLIENT_ID!,
    clientSecret: process.env.APPLE_CLIENT_SECRET!,
    collect: { email: true, name: true },
  },
});
```

> 애플은 **최초 로그인 시에만** 사용자 이름을 제공합니다.

## 전체 설정 예시

```typescript
import { KAuth } from '@k-auth/next';

export const { handlers, auth, signIn, signOut } = KAuth({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    collect: { email: true, profile: true, phone: true },
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    collect: { email: true, profile: true },
  },
  apple: {
    clientId: process.env.APPLE_CLIENT_ID!,
    clientSecret: process.env.APPLE_CLIENT_SECRET!,
    collect: { email: true, name: true },
  },
});
```

## 버튼

```tsx
import { Button } from '@k-auth/next/ui';

// 모든 버튼
<Button.Kakao />
<Button.Naver />
<Button.Google />
<Button.Apple />

// 크기
<Button.Kakao size="sm" />      // 작게
<Button.Kakao size="default" /> // 기본
<Button.Kakao size="lg" />      // 크게
<Button.Kakao size="icon" />    // 아이콘만

// 그룹
<Button.Group direction="row" gap="md">
  <Button.Kakao size="icon" />
  <Button.Naver size="icon" />
  <Button.Google size="icon" />
  <Button.Apple size="icon" />
</Button.Group>
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

## next-auth 고급 설정

```typescript
KAuth({
  kakao: { ... },
  nextAuthConfig: {
    // 추가 Provider
    providers: [GitHub({ ... })],
    // 커스텀 콜백
    callbacks: {
      session({ session, token }) {
        session.user.id = token.sub!;
        return session;
      },
    },
    // 데이터베이스 어댑터
    adapter: PrismaAdapter(prisma),
  },
});
```

## 환경 변수

```env
# Provider 설정
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
APPLE_CLIENT_ID=
APPLE_CLIENT_SECRET=

# NextAuth 필수
AUTH_SECRET=         # openssl rand -base64 32 로 생성
AUTH_TRUST_HOST=true # 배포 환경에서 필수
```

## 요구사항

- Next.js 14+
- React 18+

## 문서

- [빠른 시작](#빠른-시작)
- [Provider 설정](#provider-설정)
- [버튼 컴포넌트](#버튼)
- [페이지 보호](#페이지-보호)
- [next-auth 고급 설정](#next-auth-고급-설정)

## License

MIT
