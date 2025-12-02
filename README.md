# K-Auth

**한국형 소셜 로그인, 설정 10초 & 디자인 0초**

카카오, 네이버 로그인을 Next.js에서 가장 쉽게 구현하는 방법.

## 특징

- **10초 설정** - 복잡한 OAuth 설정 대신 `clientId`와 `clientSecret`만 입력
- **디자인 0초** - 공식 가이드 준수 버튼 컴포넌트 제공
- **타입 안전** - TypeScript 완벽 지원, IDE 자동완성
- **한글 에러** - 친절한 한국어 에러 메시지

## 설치

```bash
npm install k-auth next-auth@beta
```

## 빠른 시작

### 1. 인증 설정 (auth.ts)

```typescript
import { KAuth } from 'k-auth';

export const { handlers, auth, signIn, signOut } = KAuth({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    collectPhone: true,  // 전화번호 수집
    collectBirth: true,  // 생년월일 수집
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

끝! 이게 전부입니다.

## API

### KAuth(config)

메인 설정 함수입니다.

```typescript
KAuth({
  kakao: KakaoOptions,
  naver: NaverOptions,
  nextAuthConfig?: NextAuthConfig,  // 고급 설정
})
```

### KakaoOptions

| 옵션 | 타입 | 설명 |
|------|------|------|
| `clientId` | `string` | 카카오 REST API 키 |
| `clientSecret` | `string` | 카카오 Client Secret |
| `collectPhone` | `boolean` | 전화번호 수집 |
| `collectBirth` | `boolean` | 생년월일 수집 |
| `collectGender` | `boolean` | 성별 수집 |
| `collectAgeRange` | `boolean` | 연령대 수집 |

### NaverOptions

| 옵션 | 타입 | 설명 |
|------|------|------|
| `clientId` | `string` | 네이버 Client ID |
| `clientSecret` | `string` | 네이버 Client Secret |
| `collectPhone` | `boolean` | 전화번호 수집 |
| `collectBirth` | `boolean` | 생년월일 수집 |
| `collectGender` | `boolean` | 성별 수집 |
| `collectName` | `boolean` | 실명 수집 |

## UI 컴포넌트

### Button.Kakao / Button.Naver

```tsx
import { Button } from 'k-auth/ui';

// 기본
<Button.Kakao onClick={() => signIn('kakao')} />

// 크기 조절
<Button.Kakao size="sm" />  // 작게
<Button.Kakao size="lg" />  // 크게
<Button.Kakao size="icon" />  // 아이콘만

// 커스텀 스타일
<Button.Kakao className="w-full shadow-lg" />
```

### Button.Group

```tsx
// 세로 배치 (기본)
<Button.Group>
  <Button.Kakao />
  <Button.Naver />
</Button.Group>

// 가로 배치
<Button.Group direction="row">
  <Button.Kakao size="icon" />
  <Button.Naver size="icon" />
</Button.Group>

// 간격 조절
<Button.Group gap="sm" />  // 좁게
<Button.Group gap="lg" />  // 넓게
```

## 환경 변수

```env
# 카카오
KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret

# 네이버
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# NextAuth
AUTH_SECRET=your_random_secret_key
```

## 카카오/네이버 앱 설정

### 카카오

1. [Kakao Developers](https://developers.kakao.com)에서 앱 생성
2. 앱 키 > REST API 키 복사 → `KAKAO_CLIENT_ID`
3. 보안 > Client Secret 생성 → `KAKAO_CLIENT_SECRET`
4. 카카오 로그인 활성화
5. Redirect URI 등록: `http://localhost:3000/api/auth/callback/kakao`

### 네이버

1. [NAVER Developers](https://developers.naver.com)에서 앱 등록
2. Client ID 복사 → `NAVER_CLIENT_ID`
3. Client Secret 복사 → `NAVER_CLIENT_SECRET`
4. 서비스 URL: `http://localhost:3000`
5. Callback URL: `http://localhost:3000/api/auth/callback/naver`

## 요구사항

- Next.js 14+
- React 18+
- next-auth 5 (beta)

## 라이센스

MIT
