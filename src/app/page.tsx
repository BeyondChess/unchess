import { auth } from '@/auth';
import ChessBB from './chess/page';
import HomePage from './HomePage';

export default async function Home() {
  const session = await auth();

  return <main className="">{session?.user ? <ChessBB /> : <HomePage />}</main>;
}
