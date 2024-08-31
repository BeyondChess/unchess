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
      <button type="submit" className='underline'>Signin</button>
    </form>
  );
};

export default SignIn;
