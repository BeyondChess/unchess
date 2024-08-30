import { signIn } from '@/auth';
import React from 'react';

const SignIn = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button type="submit">Signin</button>
    </form>
  );
};

export default SignIn;
