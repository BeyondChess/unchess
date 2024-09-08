import React from 'react';
import { User } from '@auth/core/types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './Navigation';
import Link from 'next/link';
import Signout from './Signout';
import UnstyledLink from './ui/Link/UnstyledLink';

interface UserSignedInProps {
  user: User;
}

const UserSignedIn: React.FC<UserSignedInProps> = ({ user }) => {
  const NavigationMenuLinkStyle = ` ${UnstyledLink} text-2xl`;
  const userPfpImage = `rounded-full w-10 h-10`;
  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* Wrap the Avatar and Name inside NavigationMenuTrigger */}
            <NavigationMenuTrigger className="text-3xl flex flex-row space-x-3 ">
              <img
                src={user.image || '/default-avatar.png'}
                alt={user.name || 'User Avatar'}
                className={`${userPfpImage} `}
              />
              <span className='drop-shadow-lg hover:z-10 hover:underline '>{user.name?.split(' ')[0]}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col">
              <NavigationMenuLink asChild>
                <Link href="/play" legacyBehavior passHref>
                  <NavigationMenuLink className={NavigationMenuLinkStyle}>
                    Play
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href={`/profile/${user.id}`} legacyBehavior passHref>
                  <NavigationMenuLink className={NavigationMenuLinkStyle}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href={`/leaderboard`} legacyBehavior passHref>
                  <NavigationMenuLink className={NavigationMenuLinkStyle}>
                    Leaderboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Signout />
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserSignedIn;
