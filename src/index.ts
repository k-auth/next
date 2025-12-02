/**
 * K-Auth
 * 한국형 소셜 로그인, 설정 10초 & 디자인 0초
 *
 * @example
 * ```tsx
 * // auth.ts
 * import { KAuth } from '@k-auth/next';
 *
 * export const { handlers, auth, signIn, signOut } = KAuth({
 *   kakao: {
 *     clientId: process.env.KAKAO_ID!,
 *     clientSecret: process.env.KAKAO_SECRET!,
 *     collect: { email: true, profile: true, phone: true },
 *   },
 *   naver: {
 *     clientId: process.env.NAVER_ID!,
 *     clientSecret: process.env.NAVER_SECRET!,
 *   },
 * });
 *
 * // 로그인 페이지
 * import { Button } from '@k-auth/next/ui';
 *
 * <Button.Group>
 *   <Button.Kakao onClick={() => signIn('kakao')} />
 *   <Button.Naver onClick={() => signIn('naver')} />
 * </Button.Group>
 * ```
 */

// Core
export { KAuth } from '@/core';
export type { KAuthConfig, KAuthResult } from '@/core';

// Providers (개별 사용 시)
export { Kakao, Naver, Google, Apple } from '@/providers';
export type {
  KakaoOptions,
  KakaoProfile,
  KakaoCollectOptions,
  NaverOptions,
  NaverProfile,
  NaverCollectOptions,
  GoogleOptions,
  GoogleProfile,
  GoogleCollectOptions,
  AppleOptions,
  AppleProfile,
  AppleCollectOptions,
} from '@/providers';

// UI Components
export { Button, KakaoButton, NaverButton, GoogleButton, AppleButton, ButtonGroup } from '@/ui';
export type { KakaoButtonProps, NaverButtonProps, GoogleButtonProps, AppleButtonProps, ButtonGroupProps } from '@/ui';

// Types
export type { KAuthUser, KAuthProvider } from '@/types';

// Errors
export { KAuthError, createError, ERROR_CODES } from '@/errors';
export type { KAuthErrorOptions, ErrorCode } from '@/errors';

// Utils
export { cn } from '@/utils/cn';
