import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function Page() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-center text-xl font-semibold">K-Auth</h1>

        {session?.user ? (
          <>
            <div className="space-y-3 text-center">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt=""
                  className="mx-auto h-16 w-16 rounded-full"
                />
              )}
              <p className="font-medium">{session.user.name}</p>
              <p className="text-sm text-neutral-500">{session.user.email}</p>
            </div>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm text-white">
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <Link
            href="/login"
            className="block w-full rounded-lg bg-neutral-900 py-2.5 text-center text-sm text-white"
          >
            로그인
          </Link>
        )}
      </div>
    </main>
  );
}
