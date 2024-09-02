import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import UserSignedIn from './UserSignedIn';
import SignIn from './SignIn';

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="navbar text-lg flex justify-between items-center py-4 px-10">
      <Link href="/" className="logo font-thin hover:font-extrabold">
        UnChess
      </Link>
      <div className="flex items-center space-x-4">
        {session?.user ? <UserSignedIn user={session.user} /> : <SignIn />}
      </div>
    </nav>
  );
};

export default NavBar;
