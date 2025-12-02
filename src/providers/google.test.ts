import { describe, it, expect } from 'vitest';
import { Google } from './google';

describe('Google Provider', () => {
  const baseOptions = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  it('기본 설정으로 Provider를 생성한다', () => {
    const provider = Google(baseOptions);

    expect(provider.id).toBe('google');
    expect(provider.name).toBe('Google');
    expect(provider.type).toBe('oidc');
  });

  it('collect 없이 생성하면 openid만 포함한다', () => {
    const provider = Google(baseOptions);
    const authParams = provider.authorization as { params: { scope: string } };

    expect(authParams.params.scope).toBe('openid');
  });

  it('collect.profile이 true면 profile scope를 추가한다', () => {
    const provider = Google({ ...baseOptions, collect: { profile: true } });
    const authParams = provider.authorization as { params: { scope: string } };

    expect(authParams.params.scope).toContain('profile');
    expect(authParams.params.scope).toContain('openid');
  });

  it('collect.email이 true면 email scope를 추가한다', () => {
    const provider = Google({ ...baseOptions, collect: { email: true } });
    const authParams = provider.authorization as { params: { scope: string } };

    expect(authParams.params.scope).toContain('email');
    expect(authParams.params.scope).toContain('openid');
  });

  it('프로필 변환이 올바르게 동작한다', async () => {
    const provider = Google(baseOptions);
    const mockProfile = {
      sub: '12345',
      name: '홍길동',
      email: 'test@example.com',
      picture: 'https://example.com/photo.jpg',
    };

    const result = await provider.profile!(mockProfile, {} as never);

    expect(result.id).toBe('12345');
    expect(result.name).toBe('홍길동');
    expect(result.email).toBe('test@example.com');
    expect(result.image).toBe('https://example.com/photo.jpg');
  });
});
