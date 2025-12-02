'use client';

import { Button } from '@relkimm/k-auth/ui';
import { signIn } from 'next-auth/react';

export function LoginButtons() {
  const handleLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <Button.Group>
      <Button.Kakao onClick={() => handleLogin('kakao')} />
      <Button.Naver onClick={() => handleLogin('naver')} />
      <Button.Google onClick={() => handleLogin('google')} />
      <Button.Apple onClick={() => handleLogin('apple')} />
    </Button.Group>
  );
}
