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

interface UserSignedInProps {
  user: User;
}

const UserSignedIn: React.FC<UserSignedInProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* Wrap the Avatar and Name inside NavigationMenuTrigger */}
            <NavigationMenuTrigger className="flex items-center space-x-2 p-2 py-6 underline hover:font-bold ">
              <img
                src={user.image || '/default-avatar.png'}
                alt={user.name || 'User Avatar'}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.name}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-2 rounded-md shadow-lg w-full">
              <NavigationMenuLink asChild>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Match Room
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href={`/profile/${user.id}`} legacyBehavior passHref>
                  <NavigationMenuLink className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href={`/leaderboard`} legacyBehavior passHref>
                  <NavigationMenuLink className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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
