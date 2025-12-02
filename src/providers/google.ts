import type { OAuthConfig } from 'next-auth/providers';

/**
 * Google 사용자 프로필 타입
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
}

/**
 * Google 로그인 Provider
 *
 * @example
 * ```ts
 * import { Google } from '@relkimm/k-auth/providers';
 *
 * Google({
 *   clientId: process.env.GOOGLE_ID!,
 *   clientSecret: process.env.GOOGLE_SECRET!,
 * })
 * ```
 */
export function Google(options: GoogleOptions): OAuthConfig<GoogleProfile> {
  const { clientId, clientSecret, collectProfile = true, collectEmail = true } = options;

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
    type: 'oauth',
    clientId,
    clientSecret,
    authorization: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        scope: scopes.join(' '),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      },
    },
    token: 'https://oauth2.googleapis.com/token',
    userinfo: 'https://openidconnect.googleapis.com/v1/userinfo',
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
