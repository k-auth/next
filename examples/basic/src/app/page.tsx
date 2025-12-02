import { Button } from '@relkimm/k-auth/ui';

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-lg px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl font-semibold tracking-tight">K-Auth</h1>
          <p className="mt-2 text-neutral-500">한국형 소셜 로그인 버튼</p>
        </div>

        {/* Buttons */}
        <section className="mb-16">
          <Button.Group>
            <Button.Kakao />
            <Button.Naver />
            <Button.Google />
            <Button.Apple />
          </Button.Group>
        </section>

        {/* Code */}
        <section>
          <h2 className="mb-4 text-sm font-medium text-neutral-400">Usage</h2>
          <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-5 text-sm leading-relaxed text-neutral-300">
{`import { Button } from '@relkimm/k-auth/ui';
import { signIn } from 'next-auth/react';

<Button.Kakao onClick={() => signIn('kakao')} />
<Button.Naver onClick={() => signIn('naver')} />`}
          </pre>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-sm text-neutral-400">
          <a
            href="https://github.com/relkimm/k-auth"
            className="hover:text-neutral-600"
          >
            GitHub →
          </a>
        </footer>
      </div>
    </main>
  );
}
