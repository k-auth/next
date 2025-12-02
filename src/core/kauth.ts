import NextAuth from 'next-auth';
import type { NextAuthConfig, NextAuthResult } from 'next-auth';
import { Kakao, type KakaoOptions } from '@/providers/kakao';
import { Naver, type NaverOptions } from '@/providers/naver';

/**
 * KAuth 설정 옵션
 */
export interface KAuthConfig {
  /** 카카오 로그인 설정 */
  kakao?: KakaoOptions;
  /** 네이버 로그인 설정 */
  naver?: NaverOptions;
  /** NextAuth 추가 설정 (고급) */
  nextAuthConfig?: Partial<Omit<NextAuthConfig, 'providers'>>;
}

/**
 * KAuth 결과 타입
 */
export type KAuthResult = NextAuthResult;

/**
 * K-Auth 메인 함수
 * 한국형 소셜 로그인을 10초 만에 설정
 *
 * @example
 * ```ts
 * // auth.ts
 * import { KAuth } from 'k-auth';
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
 * });
 * ```
 */
export function KAuth(config: KAuthConfig): KAuthResult {
  const providers = [];

  // 카카오 Provider 추가
  if (config.kakao) {
    providers.push(Kakao(config.kakao));
  }

  // 네이버 Provider 추가
  if (config.naver) {
    providers.push(Naver(config.naver));
  }

  // Provider가 하나도 없으면 경고
  if (providers.length === 0) {
    console.warn('[K-Auth] 최소 하나의 Provider를 설정해주세요. (kakao 또는 naver)');
  }

  return NextAuth({
    providers,
    ...config.nextAuthConfig,
  });
}
