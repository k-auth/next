import { auth, signOut } from '@/auth';
import { LoginButtons } from './LoginButtons';

export default async function Page() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">K-Auth</h1>
          <p className="mt-2 text-sm text-neutral-500">
            한국형 소셜 로그인 라이브러리
          </p>
        </div>

        {session?.user ? (
          <>
            {/* Profile */}
            <div className="text-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt=""
                  className="mx-auto h-20 w-20 rounded-full"
                />
              ) : (
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
                  <span className="text-2xl font-medium text-neutral-400">
                    {session.user.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
              <p className="mt-4 text-lg font-medium text-neutral-900">
                {session.user.name || '사용자'}
              </p>
              {session.user.email && (
                <p className="mt-1 text-sm text-neutral-500">{session.user.email}</p>
              )}
            </div>

            {/* Logout */}
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <LoginButtons />
        )}

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400">
          <a
            href="https://github.com/relkimm/k-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-600"
          >
            @relkimm/k-auth
          </a>
        </p>
      </div>
    </main>
  );
}
