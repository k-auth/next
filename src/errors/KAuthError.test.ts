import { describe, it, expect } from 'vitest';
import { KAuthError, createError } from './KAuthError';
import { ERROR_CODES } from './codes';

describe('KAuthError', () => {
  it('에러 코드로 올바른 메시지를 생성해야 함', () => {
    const error = new KAuthError({ code: 'MISSING_CLIENT_ID' });

    expect(error.message).toBe(ERROR_CODES.MISSING_CLIENT_ID.message);
    expect(error.code).toBe('MISSING_CLIENT_ID');
    expect(error.hint).toBe(ERROR_CODES.MISSING_CLIENT_ID.hint);
  });

  it('details를 포함할 수 있어야 함', () => {
    const error = new KAuthError({
      code: 'MISSING_CLIENT_ID',
      details: { provider: 'kakao' },
    });

    expect(error.details).toEqual({ provider: 'kakao' });
  });

  it('docs 링크가 있으면 포함해야 함', () => {
    const error = new KAuthError({ code: 'KAKAO_CONSENT_REQUIRED' });

    expect(error.docs).toBe(ERROR_CODES.KAKAO_CONSENT_REQUIRED.docs);
  });

  it('toString()이 포맷된 메시지를 반환해야 함', () => {
    const error = new KAuthError({ code: 'NO_PROVIDERS' });
    const str = error.toString();

    expect(str).toContain('[K-Auth]');
    expect(str).toContain(ERROR_CODES.NO_PROVIDERS.message);
    expect(str).toContain('힌트:');
  });

  it('KAuthError 인스턴스여야 함', () => {
    const error = new KAuthError({ code: 'UNKNOWN_ERROR' });

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(KAuthError);
    expect(error.name).toBe('KAuthError');
  });
});

describe('createError', () => {
  it('헬퍼 함수로 에러를 생성할 수 있어야 함', () => {
    const error = createError('MISSING_CLIENT_SECRET', { provider: 'naver' });

    expect(error).toBeInstanceOf(KAuthError);
    expect(error.code).toBe('MISSING_CLIENT_SECRET');
    expect(error.details).toEqual({ provider: 'naver' });
  });
});
