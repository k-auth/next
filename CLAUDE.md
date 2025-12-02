# K-Auth 프로젝트 가이드

## 프로젝트 개요

K-Auth는 한국형 소셜 로그인 라이브러리입니다. 카카오, 네이버 등 한국 서비스의 OAuth 로그인을 Next.js에서 쉽게 구현할 수 있게 해줍니다.

## 기술 스택

- **언어**: TypeScript
- **빌드**: tsup
- **테스트**: Vitest
- **스타일**: Tailwind CSS (clsx + tailwind-merge)
- **의존성**: next-auth v5

## 프로젝트 구조

```
src/
├── core/           # KAuth 메인 래퍼 함수
├── providers/      # OAuth Provider (Kakao, Naver)
├── ui/             # 버튼 컴포넌트
│   └── buttons/    # Button.Kakao, Naver, Google, Apple
├── errors/         # 한글 에러 메시지 시스템
├── types/          # 공통 타입 정의
└── utils/          # 유틸리티 (cn 함수)
```

## 주요 명령어

```bash
npm run build      # 빌드
npm run dev        # 개발 모드 (watch)
npm test           # 테스트 실행
npm run typecheck  # 타입 체크
```

## 코드 컨벤션

### 네이밍
- Provider 함수: `Kakao()`, `Naver()` (PascalCase)
- 버튼 컴포넌트: `Button.Kakao`, `Button.Naver` (네임스페이스)
- 파일명: PascalCase (컴포넌트), camelCase (유틸리티)

### 스타일링
- `cn()` 유틸리티 사용 (clsx + tailwind-merge)
- 사용자가 className으로 스타일 덮어쓰기 가능하게

### 에러 처리
- `KAuthError` 클래스 사용
- 에러 코드는 `src/errors/codes.ts`에 정의
- 모든 에러 메시지는 한국어로

### 테스트
- 테스트 파일: `*.test.ts` 또는 `*.test.tsx`
- 테스트 설명은 한국어로 작성
- 예: `it('기본 설정으로 Provider를 생성한다', ...)`

## 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
test: 테스트 추가/수정
refactor: 리팩토링
chore: 빌드/설정 변경
```

- 커밋 메시지는 한국어로 작성
- 예: `feat: 카카오 Provider 구현`

## 주의사항

1. **next-auth v5 기준**: v4와 API가 다름
2. **절대 경로 사용**: `@/` 경로 별칭 사용
3. **'use client' 지시어**: UI 컴포넌트에 필수
4. **SVG 아이콘 내장**: 외부 이미지 의존성 없음
