import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import UserSignedIn from './UserSignedIn';
import SignIn from './SignIn';
import StyledLink from './ui/Link/StyledLink';

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="flex flex-row items-center justify-between p-4">
      <Link href="/" className="text-4xl md:text-5xl">
        UnChess
      </Link>
      <div className="text-3xl justify-around w-1/2 mx-auto hidden md:flex">
        <StyledLink
          href={'/play'}
          className="w-1/3  flex flex-row justify-center hover:text-green-500"
        >
          Play
        </StyledLink>
        <StyledLink
          href={`/leaderboard`}
          className="w-1/3  flex flex-row justify-center hover:text-red-500"
        >
          LeaderBoard
        </StyledLink>
        <StyledLink
          href={`/about`}
          className="w-1/3  flex flex-row justify-center"
        >
          About
        </StyledLink>
      </div>
      <div className={`text-4xl md:text-5xl`}>
        {session?.user ? <UserSignedIn user={session.user} /> : <SignIn />}
      </div>
    </nav>
  );
};

export default NavBar;
