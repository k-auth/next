import type { OIDCConfig } from 'next-auth/providers';

/**
 * Apple 사용자 프로필 타입
 * @see https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple
 */
export interface AppleProfile {
  /** Apple 고유 사용자 ID */
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
 * import { Apple } from '@k-auth/next/providers';
 *
 * Apple({
 *   clientId: process.env.APPLE_ID!,
 *   clientSecret: process.env.APPLE_SECRET!,
 * })
 * ```
 *
 * @remarks
 * - Apple은 최초 로그인 시에만 사용자 이름을 제공합니다.
 * - 이후 로그인에서는 이름이 전달되지 않으므로 DB에 저장이 필요합니다.
 * - clientSecret은 Apple Developer Console에서 생성한 JWT입니다.
 *
 * @see https://authjs.dev/getting-started/providers/apple
 */
export function Apple(options: AppleOptions): OIDCConfig<AppleProfile> {
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
    type: 'oidc',
    clientId,
    clientSecret,
    issuer: 'https://appleid.apple.com',
    authorization: {
      params: {
        scope: scopes.join(' '),
        // Apple은 form_post 방식으로 응답
        response_mode: 'form_post',
      },
    },
    // Apple은 client_secret을 POST body에 포함해야 함
    client: {
      token_endpoint_auth_method: 'client_secret_post',
    },
    profile(profile) {
      // Apple은 최초 로그인 시에만 user 정보를 제공
      // user 정보는 id_token이 아닌 authorization response에 포함됨
      const firstName = profile.user?.name?.firstName;
      const lastName = profile.user?.name?.lastName;
      const name = [firstName, lastName].filter(Boolean).join(' ') || profile.email || undefined;

      return {
        id: profile.sub,
        name,
        email: profile.email ?? profile.user?.email,
        image: null,
      };
    },
  };
}
