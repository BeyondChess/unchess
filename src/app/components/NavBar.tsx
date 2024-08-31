import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import UserSignedIn from './UserSignedIn';
import SignIn from './SignIn';
import { ModeToggle } from './Theme/toggle';

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="navbar flex justify-between items-center p-4">
      <Link
        href="/"
        className="logo text-lg font-semibold"
      >
        UnChess
      </Link>
      <div className="flex items-center space-x-4">
        {session?.user ? <UserSignedIn user={session.user} /> : <SignIn />}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
