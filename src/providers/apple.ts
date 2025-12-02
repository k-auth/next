import type { OAuthConfig } from 'next-auth/providers';

/**
 * Apple 사용자 프로필 타입
 */
export interface AppleProfile {
  sub: string;
  email?: string;
  email_verified?: boolean | string;
  /** Apple은 최초 로그인 시에만 이름을 제공 */
  user?: {
    name?: {
      firstName?: string;
      lastName?: string;
    };
    email?: string;
  };
}

/**
 * Apple Provider 옵션
 */
export interface AppleOptions {
  clientId: string;
  clientSecret: string;
  /** 이름 수집 여부 (기본값: true) */
  collectName?: boolean;
  /** 이메일 수집 여부 (기본값: true) */
  collectEmail?: boolean;
}

/**
 * Apple 로그인 Provider
 *
 * @example
 * ```ts
 * import { Apple } from '@relkimm/k-auth/providers';
 *
 * Apple({
 *   clientId: process.env.APPLE_ID!,
 *   clientSecret: process.env.APPLE_SECRET!,
 * })
 * ```
 *
 * @remarks
 * Apple은 최초 로그인 시에만 사용자 이름을 제공합니다.
 * 이후 로그인에서는 이름이 전달되지 않으므로 DB에 저장이 필요합니다.
 */
export function Apple(options: AppleOptions): OAuthConfig<AppleProfile> {
  const { clientId, clientSecret, collectName = true, collectEmail = true } = options;

  const scopes: string[] = [];

  if (collectName) {
    scopes.push('name');
  }

  if (collectEmail) {
    scopes.push('email');
  }

  return {
    id: 'apple',
    name: 'Apple',
    type: 'oauth',
    clientId,
    clientSecret,
    authorization: {
      url: 'https://appleid.apple.com/auth/authorize',
      params: {
        scope: scopes.join(' '),
        response_type: 'code',
        response_mode: 'form_post',
      },
    },
    token: 'https://appleid.apple.com/auth/token',
    profile(profile) {
      // Apple은 최초 로그인 시에만 user 정보를 제공
      const firstName = profile.user?.name?.firstName;
      const lastName = profile.user?.name?.lastName;
      const name = [firstName, lastName].filter(Boolean).join(' ') || undefined;

      return {
        id: profile.sub,
        name,
        email: profile.email ?? profile.user?.email,
        image: null,
      };
    },
  };
}
