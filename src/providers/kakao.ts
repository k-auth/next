import type { OAuthConfig } from 'next-auth/providers';

/**
 * 카카오 사용자 프로필 타입
 */
export interface KakaoProfile {
  id: number;
  connected_at: string;
  kakao_account?: {
    profile?: {
      nickname?: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image?: boolean;
    };
    email?: string;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    age_range?: string;
    birthday?: string;
    birthyear?: string;
    gender?: 'male' | 'female';
    phone_number?: string;
    ci?: string;
  };
}

/**
 * 카카오 Provider 옵션
 */
export interface KakaoOptions {
  clientId: string;
  clientSecret: string;
  /** 전화번호 수집 여부 */
  collectPhone?: boolean;
  /** 생년월일 수집 여부 */
  collectBirth?: boolean;
  /** 성별 수집 여부 */
  collectGender?: boolean;
  /** 연령대 수집 여부 */
  collectAgeRange?: boolean;
  /** CI(연계정보) 수집 여부 - 카카오싱크 비즈니스 전용 */
  collectCI?: boolean;
}

// 카카오 scope 매핑
const SCOPE_MAP = {
  collectPhone: 'phone_number',
  collectBirth: 'birthday,birthyear',
  collectGender: 'gender',
  collectAgeRange: 'age_range',
  collectCI: 'account_ci',
} as const;

/**
 * 카카오 로그인 Provider
 *
 * @example
 * ```ts
 * import { Kakao } from 'k-auth/providers';
 *
 * Kakao({
 *   clientId: process.env.KAKAO_ID!,
 *   clientSecret: process.env.KAKAO_SECRET!,
 *   collectPhone: true,
 *   collectBirth: true,
 * })
 * ```
 */
export function Kakao(options: KakaoOptions): OAuthConfig<KakaoProfile> {
  const { clientId, clientSecret, collectPhone, collectBirth, collectGender, collectAgeRange, collectCI } = options;

  // 옵션에 따라 scope 자동 구성
  const scopes: string[] = ['profile_nickname', 'profile_image', 'account_email'];

  // 추가 수집 항목 처리
  const collectOptions = { collectPhone, collectBirth, collectGender, collectAgeRange, collectCI };
  (Object.keys(SCOPE_MAP) as Array<keyof typeof SCOPE_MAP>).forEach((key) => {
    if (collectOptions[key]) {
      scopes.push(...SCOPE_MAP[key].split(','));
    }
  });

  return {
    id: 'kakao',
    name: '카카오',
    type: 'oauth',
    clientId,
    clientSecret,
    authorization: {
      url: 'https://kauth.kakao.com/oauth/authorize',
      params: { scope: scopes.join(' ') },
    },
    token: 'https://kauth.kakao.com/oauth/token',
    userinfo: 'https://kapi.kakao.com/v2/user/me',
    profile(profile) {
      return {
        id: String(profile.id),
        name: profile.kakao_account?.profile?.nickname,
        email: profile.kakao_account?.email,
        image: profile.kakao_account?.profile?.profile_image_url,
      };
    },
  };
}
