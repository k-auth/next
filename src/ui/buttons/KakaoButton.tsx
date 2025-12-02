'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface KakaoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 크기 */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/** 카카오 말풍선 아이콘 */
function KakaoIcon({ className }: { className?: string }) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0.5C4.02944 0.5 0 3.69052 0 7.61538C0 10.0044 1.55836 12.1135 3.93132 13.3698L2.93416 17.0078C2.84379 17.3456 3.23254 17.6129 3.52795 17.4166L7.87886 14.5918C8.24517 14.6358 8.61883 14.6585 9 14.6585C13.9706 14.6585 18 11.468 18 7.54315C18 3.61831 13.9706 0.5 9 0.5Z"
        fill="#181600"
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
 * 카카오 로그인 버튼
 * 카카오 공식 디자인 가이드 준수
 */
export function KakaoButton({
  className,
  size = 'default',
  children,
  ...props
}: KakaoButtonProps) {
  const isIconOnly = size === 'icon';

  return (
    <button
      type="button"
      className={cn(
        // 기본 스타일
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
        // 카카오 공식 색상
        'bg-[#FEE500] text-[#181600]',
        // 호버/포커스 상태
        'hover:bg-[#FDD800] focus:outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-offset-2',
        // 비활성화 상태
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // 사이즈
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <KakaoIcon />
      {!isIconOnly && (children ?? '카카오 로그인')}
    </button>
  );
}
