import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return <div> not logged in</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session.user.name}
    </main>
  );
}
