import { signIn } from '@/auth';
import Link from 'next/link';
import React from 'react';

const SignIn = () => {
  return (
    <Link
      className="underline hover:underline-offset-2 hover:font-bold"
      href={'/auth/signin'}
    >
      SignIn
    </Link>
  );
};

export default SignIn;
