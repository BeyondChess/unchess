import { prisma } from '@/app/lib/prisma';
import React from 'react';

const ProfilePage = async ({
  params,
}: {
  params: {
    userid: string;
  };
}) => {
  if (!params.userid) {
    console.error('User ID parameter is missing.');
    return <div>Error: User ID parameter is missing.</div>;
  }
  // server side rendering 
  const user = await prisma.user.findUnique({
    where: { id: params.userid },
  });

  if (!user) {
    console.error('User not found.');
    return <div>Error: User not found.</div>;
  }

  console.log('🚀 ~ user:', user);
  return <div>Profile Page</div>;
};

export default ProfilePage;
