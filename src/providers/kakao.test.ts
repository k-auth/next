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

  it('collect 없이 생성하면 scope 파라미터가 없다', () => {
    const provider = Kakao(baseOptions);
    const authParams = provider.authorization as { url: string; params: Record<string, string> };

    expect(authParams.params.scope).toBeUndefined();
  });

  it('collect.profile이 true면 프로필 scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collect: { profile: true } });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('profile_nickname');
    expect(authParams.params.scope).toContain('profile_image');
  });

  it('collect.email이 true면 account_email scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collect: { email: true } });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('account_email');
  });

  it('collect.phone이 true면 phone_number scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collect: { phone: true } });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('phone_number');
  });

  it('collect.birthday가 true면 birthday, birthyear scope를 추가한다', () => {
    const provider = Kakao({ ...baseOptions, collect: { birthday: true } });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('birthday');
    expect(authParams.params.scope).toContain('birthyear');
  });

  it('여러 collect 옵션을 동시에 처리한다', () => {
    const provider = Kakao({
      ...baseOptions,
      collect: { email: true, profile: true, phone: true, birthday: true, gender: true },
    });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('account_email');
    expect(authParams.params.scope).toContain('profile_nickname');
    expect(authParams.params.scope).toContain('phone_number');
    expect(authParams.params.scope).toContain('birthday');
    expect(authParams.params.scope).toContain('gender');
  });
});
