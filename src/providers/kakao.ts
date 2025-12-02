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
 * 카카오 수집 옵션
 * @remarks 모든 옵션의 기본값은 false입니다.
 */
export interface KakaoCollectOptions {
  /** 이메일 수집 @default false */
  email?: boolean;
  /** 프로필 정보 수집 (닉네임, 프로필 이미지) @default false */
  profile?: boolean;
  /** 전화번호 수집 @default false */
  phone?: boolean;
  /** 생년월일 수집 @default false */
  birthday?: boolean;
  /** 성별 수집 @default false */
  gender?: boolean;
  /** 연령대 수집 @default false */
  ageRange?: boolean;
  /** CI(연계정보) 수집 - 카카오싱크 비즈니스 전용 @default false */
  ci?: boolean;
}

/**
 * 카카오 Provider 옵션
 */
export interface KakaoOptions {
  clientId: string;
  clientSecret: string;
  /** 수집 옵션 (기본값: 모두 false) */
  collect?: KakaoCollectOptions;
}

/**
 * 카카오 로그인 Provider
 *
 * @example
 * ```ts
 * import { Kakao } from '@k-auth/next/providers';
 *
 * Kakao({
 *   clientId: process.env.KAKAO_ID!,
 *   clientSecret: process.env.KAKAO_SECRET!,
 *   collect: {
 *     email: true,
 *     profile: true,
 *     phone: true,
 *   },
 * })
 * ```
 */
export function Kakao(options: KakaoOptions): OAuthConfig<KakaoProfile> {
  const { clientId, clientSecret, collect = {} } = options;
  const { email, profile, phone, birthday, gender, ageRange, ci } = collect;

  const scopes: string[] = [];

  // 프로필 정보
  if (profile) {
    scopes.push('profile_nickname', 'profile_image');
  }

  // 이메일
  if (email) {
    scopes.push('account_email');
  }

  // 전화번호
  if (phone) {
    scopes.push('phone_number');
  }

  // 생년월일
  if (birthday) {
    scopes.push('birthday', 'birthyear');
  }

  // 성별
  if (gender) {
    scopes.push('gender');
  }

  // 연령대
  if (ageRange) {
    scopes.push('age_range');
  }

  // CI (카카오싱크 비즈니스 전용)
  if (ci) {
    scopes.push('account_ci');
  }

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
