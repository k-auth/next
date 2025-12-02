# K-Auth

**한국형 소셜 로그인, 설정 10초 & 디자인 0초**

카카오, 네이버, 구글, 애플 로그인을 Next.js에서 가장 쉽게 구현하는 방법.

## 특징

- **10초 설정** - 복잡한 OAuth 설정 없이 바로 시작
- **디자인 0초** - 공식 가이드 준수 버튼 컴포넌트 제공
- **타입 안전** - TypeScript 완벽 지원
- **한글 에러** - 친절한 한국어 에러 메시지

## 설치

```bash
npm install k-auth
```

## 빠른 시작

### 1. 인증 설정 (auth.ts)

```typescript
import { KAuth } from 'k-auth';

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

### 2. API 라우트 (app/api/auth/[...nextauth]/route.ts)

```typescript
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
```

### 3. 로그인 페이지

```tsx
import { Button } from 'k-auth/ui';
import { signIn } from '@/auth';

export default function LoginPage() {
  return (
    <Button.Group>
      <Button.Kakao onClick={() => signIn('kakao')} />
      <Button.Naver onClick={() => signIn('naver')} />
    </Button.Group>
  );
}
```

끝!

## 구글/애플 추가하기

```typescript
import { KAuth } from 'k-auth';
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';

export const { handlers, auth, signIn, signOut } = KAuth({
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

```tsx
<Button.Group>
  <Button.Kakao onClick={() => signIn('kakao')} />
  <Button.Naver onClick={() => signIn('naver')} />
  <Button.Google onClick={() => signIn('google')} />
  <Button.Apple onClick={() => signIn('apple')} />
</Button.Group>
```

## 버튼 컴포넌트

### 지원 버튼

```tsx
<Button.Kakao />   // 카카오 (노란색)
<Button.Naver />   // 네이버 (초록색)
<Button.Google />  // 구글 (흰색)
<Button.Apple />   // 애플 (검은색)
```

### 크기

```tsx
<Button.Kakao size="sm" />      // 작게
<Button.Kakao size="default" /> // 기본
<Button.Kakao size="lg" />      // 크게
<Button.Kakao size="icon" />    // 아이콘만
```

### 그룹

```tsx
<Button.Group direction="column" gap="md">
  <Button.Kakao />
  <Button.Naver />
</Button.Group>
```

## 추가 데이터 수집

```typescript
KAuth({
  kakao: {
    clientId: '...',
    clientSecret: '...',
    collectPhone: true,    // 전화번호
    collectBirth: true,    // 생년월일
    collectGender: true,   // 성별
  },
});
```

## 요구사항

- Next.js 14+
- React 18+

## 라이센스

MIT
