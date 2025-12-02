'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.94 9.88c-.02-2.05 1.67-3.03 1.75-3.08-.95-1.39-2.43-1.58-2.96-1.6-1.26-.13-2.46.74-3.1.74-.64 0-1.62-.72-2.66-.7-1.37.02-2.63.8-3.34 2.02-1.42 2.47-.36 6.13 1.02 8.13.68.98 1.48 2.08 2.54 2.04 1.02-.04 1.4-.66 2.63-.66 1.23 0 1.58.66 2.65.64 1.1-.02 1.79-.99 2.46-1.98.77-1.13 1.09-2.23 1.11-2.29-.02-.01-2.13-.82-2.15-3.24l.05-.02zM12.58 3.32c.56-.68.94-1.63.84-2.57-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.56-.86 2.48.91.07 1.83-.46 2.39-1.13z" fill="white"/>
    </svg>
  );
}

const sizeStyles = {
  default: 'h-11 px-6 text-sm',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-8 text-base',
  icon: 'h-11 w-11',
};

export function AppleButton({
  className,
  size = 'default',
  children,
  ...props
}: AppleButtonProps) {
  const isIconOnly = size === 'icon';

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
        'bg-black text-white',
        'hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <AppleIcon />
      {!isIconOnly && (children ?? 'Apple 로그인')}
    </button>
  );
}
