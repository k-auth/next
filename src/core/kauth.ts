import NextAuth from 'next-auth';
import type { NextAuthConfig, NextAuthResult } from 'next-auth';
import { Kakao, type KakaoOptions } from '@/providers/kakao';
import { Naver, type NaverOptions } from '@/providers/naver';
import { Google, type GoogleOptions } from '@/providers/google';
import { Apple, type AppleOptions } from '@/providers/apple';
import { KAuthError } from '@/errors';

/**
 * KAuth 설정 옵션
 */
export interface KAuthConfig {
  /** 카카오 로그인 설정 */
  kakao?: KakaoOptions;
  /** 네이버 로그인 설정 */
  naver?: NaverOptions;
  /** Google 로그인 설정 */
  google?: GoogleOptions;
  /** Apple 로그인 설정 */
  apple?: AppleOptions;
  /** NextAuth 추가 설정 (고급) */
  nextAuthConfig?: Partial<Omit<NextAuthConfig, 'providers'>>;
}

/**
 * KAuth 결과 타입
 */
export type KAuthResult = NextAuthResult;

/** Provider 이름 타입 */
type ProviderName = 'kakao' | 'naver' | 'google' | 'apple';

/**
 * 개별 Provider 유효성 검사
 */
function validateProvider(
  config: { clientId?: string; clientSecret?: string },
  provider: ProviderName
): void {
  if (!config.clientId) {
    const error = new KAuthError({ code: 'MISSING_CLIENT_ID', details: { provider } });
    error.log();
    throw error;
  }
  if (!config.clientSecret) {
    const error = new KAuthError({ code: 'MISSING_CLIENT_SECRET', details: { provider } });
    error.log();
    throw error;
  }
}

/**
 * 설정 유효성 검사
 */
function validateConfig(config: KAuthConfig): void {
  const providers: ProviderName[] = ['kakao', 'naver', 'google', 'apple'];

  // 각 Provider 검증
  for (const provider of providers) {
    if (config[provider]) {
      validateProvider(config[provider]!, provider);
    }
  }

  // 최소 1개 Provider 필요
  const hasAnyProvider = providers.some((p) => config[p]);
  if (!hasAnyProvider) {
    const error = new KAuthError({ code: 'NO_PROVIDERS' });
    error.log();
    throw error;
  }
}

/**
 * K-Auth 메인 함수
 * 한국형 소셜 로그인을 10초 만에 설정
 *
 * @example
 * ```ts
 * // auth.ts
 * import { KAuth } from '@k-auth/next';
 *
 * export const { handlers, auth, signIn, signOut } = KAuth({
 *   kakao: {
 *     clientId: process.env.KAKAO_ID!,
 *     clientSecret: process.env.KAKAO_SECRET!,
 *     collectPhone: true,
 *   },
 *   naver: {
 *     clientId: process.env.NAVER_ID!,
 *     clientSecret: process.env.NAVER_SECRET!,
 *   },
 *   google: {
 *     clientId: process.env.GOOGLE_ID!,
 *     clientSecret: process.env.GOOGLE_SECRET!,
 *   },
 *   apple: {
 *     clientId: process.env.APPLE_ID!,
 *     clientSecret: process.env.APPLE_SECRET!,
 *   },
 * });
 * ```
 */
export function KAuth(config: KAuthConfig): KAuthResult {
  // 설정 유효성 검사
  validateConfig(config);

  const providers = [];

  if (config.kakao) {
    providers.push(Kakao(config.kakao));
  }

  if (config.naver) {
    providers.push(Naver(config.naver));
  }

  if (config.google) {
    providers.push(Google(config.google));
  }

  if (config.apple) {
    providers.push(Apple(config.apple));
  }

  return NextAuth({
    providers,
    ...config.nextAuthConfig,
  });
}
