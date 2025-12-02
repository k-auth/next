import type { OIDCConfig } from 'next-auth/providers';

/**
 * Google 사용자 프로필 타입
 * @see https://developers.google.com/identity/openid-connect/openid-connect
 */
export interface GoogleProfile {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
}

/**
 * Google Provider 옵션
 */
export interface GoogleOptions {
  clientId: string;
  clientSecret: string;
  /** 프로필 정보 수집 여부 (기본값: true) */
  collectProfile?: boolean;
  /** 이메일 수집 여부 (기본값: true) */
  collectEmail?: boolean;
  /**
   * 매번 동의 화면 표시 여부 (기본값: false)
   * @remarks true로 설정하면 refresh_token을 항상 받을 수 있음
   */
  forceConsent?: boolean;
}

/**
 * Google 로그인 Provider (OIDC 기반)
 *
 * @example
 * ```ts
 * import { Google } from '@k-auth/next/providers';
 *
 * Google({
 *   clientId: process.env.GOOGLE_ID!,
 *   clientSecret: process.env.GOOGLE_SECRET!,
 * })
 * ```
 *
 * @see https://authjs.dev/getting-started/providers/google
 */
export function Google(options: GoogleOptions): OIDCConfig<GoogleProfile> {
  const { clientId, clientSecret, collectProfile = true, collectEmail = true, forceConsent = false } = options;

  const scopes: string[] = ['openid'];

  if (collectProfile) {
    scopes.push('profile');
  }

  if (collectEmail) {
    scopes.push('email');
  }

  return {
    id: 'google',
    name: 'Google',
    type: 'oidc',
    clientId,
    clientSecret,
    // OIDC Discovery로 자동 구성
    issuer: 'https://accounts.google.com',
    authorization: {
      params: {
        scope: scopes.join(' '),
        // forceConsent: true면 매번 동의 화면 표시 + refresh_token 획득
        ...(forceConsent && {
          prompt: 'consent',
          access_type: 'offline',
        }),
      },
    },
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
  };
}
