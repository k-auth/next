import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn 유틸리티', () => {
  it('클래스명을 병합해야 함', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('조건부 클래스를 처리해야 함', () => {
    const result = cn('base', true && 'active', false && 'hidden');
    expect(result).toBe('base active');
  });

  it('Tailwind 클래스 충돌을 해결해야 함', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('배열 입력을 처리해야 함', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toBe('class1 class2');
  });

  it('undefined와 null을 무시해야 함', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });
});
