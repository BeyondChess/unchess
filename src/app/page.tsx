import { auth } from '@/auth';
import ChessBB from './chess/page';
export default async function Home() {
  const session = await auth();

  return (
    <main className="flex container min-h-screen flex-col items-center justify-between p-24">
      {session?.user ? <ChessBB /> : <h1>Login first</h1>}
    </main>
  );
}
