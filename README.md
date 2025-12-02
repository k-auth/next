# K-Auth

[![npm version](https://img.shields.io/npm/v/@relkimm/k-auth.svg)](https://www.npmjs.com/package/@relkimm/k-auth)
[![npm downloads](https://img.shields.io/npm/dm/@relkimm/k-auth.svg)](https://www.npmjs.com/package/@relkimm/k-auth)
[![license](https://img.shields.io/npm/l/@relkimm/k-auth.svg)](https://github.com/relkimm/k-auth/blob/main/LICENSE)

Next.js에서 카카오, 네이버 로그인을 가장 쉽게 구현하는 방법.

next-auth 기반이지만 한국 서비스에 맞게 최적화했습니다.
- 카카오/네이버 provider 내장
- 공식 가이드라인 준수 버튼 컴포넌트
- 한국어 에러 메시지

## 설치

```bash
npm install @relkimm/k-auth
```

## 사용법

**1. 설정 (auth.ts)**

```typescript
import { KAuth } from '@relkimm/k-auth';

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

**2. API 라우트 (app/api/auth/[...nextauth]/route.ts)**

```typescript
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

**3. 로그인 버튼**

```tsx
import { Button } from '@relkimm/k-auth/ui';
import { signIn } from '@/auth';

<Button.Group>
  <Button.Kakao onClick={() => signIn('kakao')} />
  <Button.Naver onClick={() => signIn('naver')} />
</Button.Group>
```

끝.

## 버튼

```tsx
// 개별 사용
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

// 커스텀
<Button.Kakao className="w-full rounded-xl" />
```

## 추가 정보 수집

전화번호, 생년월일 등이 필요하면 옵션만 추가하세요. scope는 알아서 설정됩니다.

```typescript
KAuth({
  kakao: {
    clientId: '...',
    clientSecret: '...',
    collectPhone: true,
    collectBirth: true,
    collectGender: true,
  },
});
```

## 구글/애플 추가

next-auth provider 그대로 사용할 수 있습니다.

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

## 환경 변수

```env
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
AUTH_SECRET=  # openssl rand -base64 32
```

## 콘솔 설정

<details>
<summary>카카오</summary>

1. [Kakao Developers](https://developers.kakao.com) → 애플리케이션 추가
2. 앱 키 → REST API 키 복사
3. 보안 → Client Secret 생성
4. 카카오 로그인 활성화
5. Redirect URI: `http://localhost:3000/api/auth/callback/kakao`

</details>

<details>
<summary>네이버</summary>

1. [NAVER Developers](https://developers.naver.com) → 애플리케이션 등록
2. Client ID, Secret 복사
3. 서비스 URL: `http://localhost:3000`
4. Callback URL: `http://localhost:3000/api/auth/callback/naver`

</details>

## 요구사항

- Next.js 14+
- React 18+

## License

MIT
