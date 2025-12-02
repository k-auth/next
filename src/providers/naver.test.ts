import { describe, it, expect } from 'vitest';
import { Naver } from './naver';

describe('Naver Provider', () => {
  const baseOptions = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  it('기본 설정으로 Provider를 생성한다', () => {
    const provider = Naver(baseOptions);

    expect(provider.id).toBe('naver');
    expect(provider.name).toBe('네이버');
    expect(provider.type).toBe('oauth');
  });

  it('올바른 OAuth URL을 설정한다', () => {
    const provider = Naver(baseOptions);

    expect(provider.token).toBe('https://nid.naver.com/oauth2.0/token');
    expect(provider.userinfo).toBe('https://openapi.naver.com/v1/nid/me');
  });

  it('clientId와 clientSecret을 설정한다', () => {
    const provider = Naver(baseOptions);

    expect(provider.clientId).toBe('test-client-id');
    expect(provider.clientSecret).toBe('test-client-secret');
  });
});
