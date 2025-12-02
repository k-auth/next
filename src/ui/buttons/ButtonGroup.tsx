'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** 버튼 배치 방향 */
  direction?: 'row' | 'column';
  /** 버튼 간격 */
  gap?: 'sm' | 'md' | 'lg';
  /** 자식 요소들 */
  children: ReactNode;
}

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

/**
 * 로그인 버튼들을 묶어주는 컨테이너
 */
export function ButtonGroup({
  direction = 'column',
  gap = 'md',
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        gapStyles[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
