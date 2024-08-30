import React from 'react';
import SignIn from './SignIn';
import Link from 'next/link';
import { auth } from '@/auth';
import UserSignedIn from './UserSignedIn';

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="#" className="text-lg font-bold">
        UnChess
      </Link>
      <div>
        {session?.user ? (
          <UserSignedIn user={session.user} />
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
