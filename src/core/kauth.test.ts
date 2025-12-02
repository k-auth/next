import { describe, it, expect, vi, beforeEach } from 'vitest';
import { KAuth } from './kauth';
import { KAuthError } from '@/errors';

// NextAuth mock
vi.mock('next-auth', () => ({
  default: vi.fn((config) => ({
    handlers: {},
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    _config: config,
  })),
}));

describe('KAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const kakaoOptions = {
    clientId: 'kakao-client-id',
    clientSecret: 'kakao-client-secret',
  };

  const naverOptions = {
    clientId: 'naver-client-id',
    clientSecret: 'naver-client-secret',
  };

  const googleOptions = {
    clientId: 'google-client-id',
    clientSecret: 'google-client-secret',
  };

  const appleOptions = {
    clientId: 'apple-client-id',
    clientSecret: 'apple-client-secret',
  };

  describe('Provider 설정', () => {
    it('카카오만 설정하면 카카오 Provider만 추가된다', () => {
      const result = KAuth({ kakao: kakaoOptions }) as unknown as { _config: { providers: Array<{ id: string }> } };

      expect(result._config.providers).toHaveLength(1);
      expect(result._config.providers[0].id).toBe('kakao');
    });

    it('네이버만 설정하면 네이버 Provider만 추가된다', () => {
      const result = KAuth({ naver: naverOptions }) as unknown as { _config: { providers: Array<{ id: string }> } };

      expect(result._config.providers).toHaveLength(1);
      expect(result._config.providers[0].id).toBe('naver');
    });

    it('Google만 설정하면 Google Provider만 추가된다', () => {
      const result = KAuth({ google: googleOptions }) as unknown as { _config: { providers: Array<{ id: string }> } };

      expect(result._config.providers).toHaveLength(1);
      expect(result._config.providers[0].id).toBe('google');
    });

    it('Apple만 설정하면 Apple Provider만 추가된다', () => {
      const result = KAuth({ apple: appleOptions }) as unknown as { _config: { providers: Array<{ id: string }> } };

      expect(result._config.providers).toHaveLength(1);
      expect(result._config.providers[0].id).toBe('apple');
    });

    it('모든 Provider를 설정하면 4개 모두 추가된다', () => {
      const result = KAuth({
        kakao: kakaoOptions,
        naver: naverOptions,
        google: googleOptions,
        apple: appleOptions,
      }) as unknown as { _config: { providers: Array<{ id: string }> } };

      expect(result._config.providers).toHaveLength(4);

      const providerIds = result._config.providers.map((p) => p.id);
      expect(providerIds).toContain('kakao');
      expect(providerIds).toContain('naver');
      expect(providerIds).toContain('google');
      expect(providerIds).toContain('apple');
    });
  });

  describe('유효성 검사', () => {
    it('Provider가 하나도 없으면 에러가 발생한다', () => {
      expect(() => KAuth({})).toThrow(KAuthError);
    });

    it('카카오 clientId가 없으면 에러가 발생한다', () => {
      expect(() =>
        KAuth({
          kakao: { clientId: '', clientSecret: 'secret' },
        })
      ).toThrow(KAuthError);
    });

    it('카카오 clientSecret이 없으면 에러가 발생한다', () => {
      expect(() =>
        KAuth({
          kakao: { clientId: 'id', clientSecret: '' },
        })
      ).toThrow(KAuthError);
    });

    it('네이버 clientId가 없으면 에러가 발생한다', () => {
      expect(() =>
        KAuth({
          naver: { clientId: '', clientSecret: 'secret' },
        })
      ).toThrow(KAuthError);
    });

    it('Google clientId가 없으면 에러가 발생한다', () => {
      expect(() =>
        KAuth({
          google: { clientId: '', clientSecret: 'secret' },
        })
      ).toThrow(KAuthError);
    });

    it('Apple clientSecret이 없으면 에러가 발생한다', () => {
      expect(() =>
        KAuth({
          apple: { clientId: 'id', clientSecret: '' },
        })
      ).toThrow(KAuthError);
    });
  });

  describe('NextAuth 설정 확장', () => {
    it('nextAuthConfig로 추가 설정을 전달할 수 있다', () => {
      const result = KAuth({
        kakao: kakaoOptions,
        nextAuthConfig: {
          debug: true,
          secret: 'test-secret',
        },
      }) as unknown as { _config: { debug: boolean; secret: string } };

      expect(result._config.debug).toBe(true);
      expect(result._config.secret).toBe('test-secret');
    });
  });
});
