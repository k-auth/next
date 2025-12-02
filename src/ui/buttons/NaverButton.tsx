'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface NaverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 크기 */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/** 네이버 N 아이콘 */
function NaverIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1864 9.48532L5.54297 0H0V18H5.81356V8.51468L12.457 18H18V0H12.1864V9.48532Z"
        fill="white"
      />
    </svg>
  );
}

const sizeStyles = {
  default: 'h-11 px-6 text-sm',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-8 text-base',
  icon: 'h-11 w-11',
};

/**
 * 네이버 로그인 버튼
 * 네이버 공식 디자인 가이드 준수
 */
export function NaverButton({
  className,
  size = 'default',
  children,
  ...props
}: NaverButtonProps) {
  const isIconOnly = size === 'icon';

  return (
    <button
      type="button"
      className={cn(
        // 기본 스타일
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
        // 네이버 공식 색상
        'bg-[#03C75A] text-white',
        // 호버/포커스 상태
        'hover:bg-[#02B350] focus:outline-none focus:ring-2 focus:ring-[#03C75A] focus:ring-offset-2',
        // 비활성화 상태
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // 사이즈
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <NaverIcon />
      {!isIconOnly && (children ?? '네이버 로그인')}
    </button>
  );
}
