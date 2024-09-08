import { signIn } from '@/auth';
import Link from 'next/link';
import React from 'react';
import StyledLink from './ui/Link/StyledLink';

const SignIn = () => {
  return (
    <StyledLink
      className="hover:underline hover:font-bold"
      href={'/auth/signin'}
    >
      SignIn
    </StyledLink>
  );
};

export default SignIn;
