import type { OAuthConfig } from 'next-auth/providers';

/**
 * 네이버 사용자 프로필 타입
 */
export interface NaverProfile {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname?: string;
    name?: string;
    email?: string;
    gender?: 'M' | 'F' | 'U';
    age?: string;
    birthday?: string;
    birthyear?: string;
    profile_image?: string;
    mobile?: string;
    mobile_e164?: string;
  };
}

/**
 * 네이버 Provider 옵션
 */
export interface NaverOptions {
  clientId: string;
  clientSecret: string;
  /** 전화번호 수집 여부 */
  collectPhone?: boolean;
  /** 생년월일 수집 여부 */
  collectBirth?: boolean;
  /** 성별 수집 여부 */
  collectGender?: boolean;
  /** 연령대 수집 여부 */
  collectAge?: boolean;
  /** 실명 수집 여부 */
  collectName?: boolean;
}

/**
 * 네이버 로그인 Provider
 *
 * @example
 * ```ts
 * import { Naver } from 'k-auth/providers';
 *
 * Naver({
 *   clientId: process.env.NAVER_ID!,
 *   clientSecret: process.env.NAVER_SECRET!,
 *   collectPhone: true,
 * })
 * ```
 */
export function Naver(options: NaverOptions): OAuthConfig<NaverProfile> {
  const { clientId, clientSecret } = options;

  return {
    id: 'naver',
    name: '네이버',
    type: 'oauth',
    clientId,
    clientSecret,
    authorization: {
      url: 'https://nid.naver.com/oauth2.0/authorize',
    },
    token: 'https://nid.naver.com/oauth2.0/token',
    userinfo: 'https://openapi.naver.com/v1/nid/me',
    profile(profile) {
      const { response } = profile;
      return {
        id: response.id,
        name: response.name ?? response.nickname,
        email: response.email,
        image: response.profile_image,
      };
    },
  };
}
