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

  it('collect 없이 생성하면 scope가 비어있다', () => {
    const provider = Apple(baseOptions);
    const authParams = provider.authorization as { params: { scope: string } };

    expect(authParams.params.scope).toBe('');
  });

  it('collect.name이 true면 name scope를 추가한다', () => {
    const provider = Apple({ ...baseOptions, collect: { name: true } });
    const authParams = provider.authorization as { params: { scope: string } };

    expect(authParams.params.scope).toContain('name');
  });

  it('collect.email이 true면 email scope를 추가한다', () => {
    const provider = Apple({ ...baseOptions, collect: { email: true } });
    const authParams = provider.authorization as { params: { scope: string } };

    expect(authParams.params.scope).toContain('email');
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
