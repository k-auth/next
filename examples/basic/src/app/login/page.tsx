'use client';

import { Button } from '@relkimm/k-auth/ui';
import { signIn } from 'next-auth/react';

export default function Login() {
  const login = (provider: string) => signIn(provider, { callbackUrl: '/' });

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-center text-xl font-semibold">로그인</h1>

        <Button.Group>
          <Button.Kakao onClick={() => login('kakao')} />
          <Button.Naver onClick={() => login('naver')} />
          <Button.Google onClick={() => login('google')} />
          <Button.Apple onClick={() => login('apple')} />
        </Button.Group>
      </div>
    </main>
  );
}
