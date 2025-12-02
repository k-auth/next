import { describe, it, expect } from 'vitest';
import { Kakao } from './kakao';

describe('Kakao Provider', () => {
  const baseOptions = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  it('기본 설정으로 Provider를 생성한다', () => {
    const provider = Kakao(baseOptions);

    expect(provider.id).toBe('kakao');
    expect(provider.name).toBe('카카오');
    expect(provider.type).toBe('oauth');
  });

  it('기본 scope를 포함한다', () => {
    const provider = Kakao(baseOptions);
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('profile_nickname');
    expect(authParams.params.scope).toContain('profile_image');
    expect(authParams.params.scope).toContain('account_email');
  });

  it('collectPhone이 true면 phone_number scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collectPhone: true });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('phone_number');
  });

  it('collectBirth가 true면 birthday, birthyear scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collectBirth: true });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('birthday');
    expect(authParams.params.scope).toContain('birthyear');
  });

  it('collectGender가 true면 gender scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collectGender: true });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('gender');
  });

  it('여러 옵션을 동시에 처리한다', () => {
    const provider = Kakao({
      ...baseOptions,
      collectPhone: true,
      collectBirth: true,
      collectGender: true,
    });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('phone_number');
    expect(authParams.params.scope).toContain('birthday');
    expect(authParams.params.scope).toContain('gender');
  });
});
