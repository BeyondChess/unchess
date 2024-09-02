import { auth } from '@/auth';
import ChessBB from './chess/page';
import HomePage from './HomePage';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex dark:container  container-white min-h-screen flex-col items-center justify-between p-24">
      {session?.user ? <ChessBB /> : <HomePage />}
    </main>
  );
}
