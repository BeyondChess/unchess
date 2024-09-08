import { signOut } from '@/auth';
import React from 'react';

const Signout = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
};

export default Signout;
