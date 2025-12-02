import { Button } from '@relkimm/k-auth/ui';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="w-full max-w-xs">
        <Button.Group>
          <Button.Kakao />
          <Button.Naver />
          <Button.Google />
          <Button.Apple />
        </Button.Group>
      </div>
    </main>
  );
}
