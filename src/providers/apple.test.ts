import { describe, it, expect } from 'vitest';
import { Apple } from './apple';

describe('Apple Provider', () => {
  const baseOptions = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  it('기본 설정으로 Provider를 생성한다', () => {
    const provider = Apple(baseOptions);

    expect(provider.id).toBe('apple');
    expect(provider.name).toBe('Apple');
    expect(provider.type).toBe('oidc');
  });

  it('기본 scope를 포함한다', () => {
    const provider = Apple(baseOptions);
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).toContain('name');
    expect(authParams.params.scope).toContain('email');
  });

  it('collectName이 false면 name scope를 제외한다', () => {
    const provider = Apple({ ...baseOptions, collectName: false });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).not.toContain('name');
    expect(authParams.params.scope).toContain('email');
  });

  it('collectEmail이 false면 email scope를 제외한다', () => {
    const provider = Apple({ ...baseOptions, collectEmail: false });
    const authParams = provider.authorization as { url: string; params: { scope: string } };

    expect(authParams.params.scope).not.toContain('email');
    expect(authParams.params.scope).toContain('name');
  });

  it('최초 로그인 시 user 정보로 프로필을 생성한다', async () => {
    const provider = Apple(baseOptions);
    const mockProfile = {
      sub: 'apple-user-id',
      email: 'test@example.com',
      user: {
        name: {
          firstName: '길동',
          lastName: '홍',
        },
        email: 'test@example.com',
      },
    };

    const result = await provider.profile!(mockProfile, {} as never);

    expect(result.id).toBe('apple-user-id');
    expect(result.name).toBe('길동 홍');
    expect(result.email).toBe('test@example.com');
  });

  it('이후 로그인 시 sub와 email만으로 프로필을 생성한다 (name은 email로 fallback)', async () => {
    const provider = Apple(baseOptions);
    const mockProfile = {
      sub: 'apple-user-id',
      email: 'test@example.com',
    };

    const result = await provider.profile!(mockProfile, {} as never);

    expect(result.id).toBe('apple-user-id');
    // user.name이 없으면 email을 name으로 사용
    expect(result.name).toBe('test@example.com');
    expect(result.email).toBe('test@example.com');
  });
});
