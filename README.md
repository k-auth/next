# K-Auth

[![npm version](https://img.shields.io/npm/v/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)
[![npm downloads](https://img.shields.io/npm/dm/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)
[![license](https://img.shields.io/npm/l/@k-auth/next.svg)](https://www.npmjs.com/package/@k-auth/next)

**설정 한 줄, 버튼 한 줄, 에러는 한국어로.**

Next.js에서 카카오, 네이버, 구글, 애플 로그인을 가장 쉽게 구현하세요.

## 왜 K-Auth인가요?

next-auth에 카카오/네이버 Provider가 있긴 해요. 그런데 직접 써보면:

- **네이버가 갑자기 안 돼요** - `expires_in` 타입 에러 (네이버가 OAuth 스펙을 안 지켜서 생기는 문제)
- **scope가 뭔지 모르겠어요** - 전화번호는 `phone_number`? `account/phone`?
- **버튼을 또 만들어야 해요** - 카카오 노란색이 `#FEE500`인가 `#FFEB00`인가...
- **에러가 영어예요** - `Invalid redirect_uri`가 뭔데...

K-Auth는 이런 삽질을 대신 해뒀어요.

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
    collect: { email: true, profile: true },  // scope 자동 설정
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
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <a href="/login">로그인</a>;
  }

  return <p>안녕하세요, {session.user?.name}님!</p>;
}
```

## 4대 Provider 지원

```typescript
KAuth({
  kakao: {
    clientId: '...',
    clientSecret: '...',
    collect: { email: true, phone: true, birthday: true },
  },
  naver: {
    clientId: '...',
    clientSecret: '...',
  },
  google: {
    clientId: '...',
    clientSecret: '...',
    collect: { email: true, profile: true },
  },
  apple: {
    clientId: '...',
    clientSecret: '...',
    collect: { email: true, name: true },
  },
});
```

> 네이버는 OAuth scope을 지원하지 않아요. [네이버 개발자센터](https://developers.naver.com/apps)에서 직접 설정하세요.

> 애플은 최초 로그인 시에만 이름을 제공해요.

## 버튼

```tsx
import { Button } from '@k-auth/next/ui';

// 기본
<Button.Kakao />
<Button.Naver />
<Button.Google />
<Button.Apple />

// 크기
<Button.Kakao size="sm" />
<Button.Kakao size="lg" />
<Button.Kakao size="icon" />

// 그룹
<Button.Group direction="row">
  <Button.Kakao size="icon" />
  <Button.Naver size="icon" />
</Button.Group>
```

## 한국어 에러 메시지

```
[K-Auth 오류] KAKAO_INVALID_REDIRECT_URI

메시지: Redirect URI가 등록되지 않았습니다.
힌트: 카카오 개발자센터 > 카카오 로그인 > Redirect URI에
      http://localhost:3000/api/auth/callback/kakao 를 추가하세요.
```

## next-auth 호환

K-Auth는 next-auth를 래핑했을 뿐이에요. GitHub, Discord 같은 다른 Provider도 함께 쓸 수 있어요.

```typescript
import GitHub from 'next-auth/providers/github';

KAuth({
  kakao: { ... },
  nextAuthConfig: {
    providers: [GitHub({ ... })],
    callbacks: { ... },
    adapter: PrismaAdapter(prisma),
  },
});
```

## 환경 변수

```env
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
APPLE_CLIENT_ID=
APPLE_CLIENT_SECRET=

AUTH_SECRET=         # openssl rand -base64 32
AUTH_TRUST_HOST=true # 배포 환경 필수
```

## 요구사항

- Next.js 14+
- React 18+

## License

MIT
