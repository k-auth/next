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
 * 네이버 수집 옵션
 *
 * @remarks
 * **⚠️ 중요: 네이버는 OAuth scope을 지원하지 않습니다.**
 *
 * 이 옵션들은 코드에서 실제로 동작하지 않으며,
 * 네이버 개발자센터에서 직접 설정해야 합니다.
 *
 * 설정 위치: https://developers.naver.com/apps > 제공 정보 선택
 *
 * 이 타입은 어떤 정보를 수집할 것인지 문서화 목적으로 제공됩니다.
 */
export interface NaverCollectOptions {
  /**
   * 이메일 수집
   * @remarks 개발자센터 > 제공 정보 선택 > 이메일 활성화 필요
   */
  email?: boolean;
  /**
   * 프로필 정보 수집 (별명, 프로필 사진)
   * @remarks 개발자센터 > 제공 정보 선택 > 별명/프로필 사진 활성화 필요
   */
  profile?: boolean;
  /**
   * 전화번호 수집
   * @remarks 개발자센터 > 제공 정보 선택 > 휴대전화번호 활성화 필요
   */
  phone?: boolean;
  /**
   * 생년월일 수집
   * @remarks 개발자센터 > 제공 정보 선택 > 생일/출생연도 활성화 필요
   */
  birthday?: boolean;
  /**
   * 성별 수집
   * @remarks 개발자센터 > 제공 정보 선택 > 성별 활성화 필요
   */
  gender?: boolean;
  /**
   * 연령대 수집
   * @remarks 개발자센터 > 제공 정보 선택 > 연령대 활성화 필요
   */
  ageRange?: boolean;
  /**
   * 실명 수집
   * @remarks 개발자센터 > 제공 정보 선택 > 이름 활성화 필요
   */
  name?: boolean;
}

/**
 * 네이버 Provider 옵션
 */
export interface NaverOptions {
  clientId: string;
  clientSecret: string;
  /**
   * 수집 옵션 (문서화 목적)
   *
   * @remarks
   * **⚠️ 네이버는 scope을 지원하지 않습니다.**
   * 실제 동의 항목은 네이버 개발자센터에서 설정해야 합니다.
   * @see https://developers.naver.com/apps
   */
  collect?: NaverCollectOptions;
}

/**
 * 네이버 로그인 Provider
 *
 * @example
 * ```ts
 * import { Naver } from '@k-auth/next/providers';
 *
 * // 1. 네이버 개발자센터에서 동의 항목 먼저 설정
 * // 2. collect는 문서화 목적 (실제 동작 X)
 * Naver({
 *   clientId: process.env.NAVER_ID!,
 *   clientSecret: process.env.NAVER_SECRET!,
 *   collect: {
 *     email: true,    // 개발자센터에서 설정 필요
 *     profile: true,  // 개발자센터에서 설정 필요
 *   },
 * })
 * ```
 *
 * @see https://developers.naver.com/apps
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
