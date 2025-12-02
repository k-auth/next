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
 *
 * @remarks
 * 네이버는 카카오와 달리 OAuth scope을 지원하지 않습니다.
 * 동의 항목은 네이버 개발자센터에서 직접 설정해야 합니다.
 * https://developers.naver.com/apps
 */
export interface NaverOptions {
  clientId: string;
  clientSecret: string;
  /**
   * 전화번호 수집 여부
   * @remarks 네이버 개발자센터 > 제공 정보 선택 > 휴대전화번호 활성화 필요
   */
  collectPhone?: boolean;
  /**
   * 생년월일 수집 여부
   * @remarks 네이버 개발자센터 > 제공 정보 선택 > 생일/출생연도 활성화 필요
   */
  collectBirth?: boolean;
  /**
   * 성별 수집 여부
   * @remarks 네이버 개발자센터 > 제공 정보 선택 > 성별 활성화 필요
   */
  collectGender?: boolean;
  /**
   * 연령대 수집 여부
   * @remarks 네이버 개발자센터 > 제공 정보 선택 > 연령대 활성화 필요
   */
  collectAge?: boolean;
  /**
   * 실명 수집 여부
   * @remarks 네이버 개발자센터 > 제공 정보 선택 > 이름 활성화 필요
   */
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
  const { clientId, clientSecret, collectPhone, collectBirth, collectGender, collectAge, collectName } = options;

  // 네이버는 scope 기반이 아니므로 개발자센터 설정 안내
  const hasCollectOptions = collectPhone || collectBirth || collectGender || collectAge || collectName;
  if (hasCollectOptions && typeof window === 'undefined') {
    console.info(
      '[K-Auth] 네이버는 개발자센터에서 동의 항목을 직접 설정해야 합니다.\n' +
        '설정 위치: https://developers.naver.com/apps > 제공 정보 선택'
    );
  }

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
