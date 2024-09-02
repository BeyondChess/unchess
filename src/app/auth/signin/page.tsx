import CloudinaryImg from '@/app/components/images/CloudinaryImg';
import { Button } from '@/app/components/ui/Button';
import { signIn } from '@/auth';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SignIn = () => {
  const textFont = `text-zinc-600 dark:text-zinc-200`;
  const formStyle = `shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:border-b-4 dark:bg-zinc-700 dark:text-gray-300`;
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <div className="container flex min-h-screen items-center justify-center p-6  bg-gray-100 dark:bg-zinc-900">
        <div className="flex w-3/4  bg-white shadow-lg rounded-lg overflow-hidden dark:bg-zinc-800 ">
          <div className="w-full md:w-1/2 p-8 border-r border-gray-200 dark:border-zinc-700">
            <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
              UnChess
            </h1>

            <div className="mb-4">
              <label
                className={`block ${textFont} text-sm font-bold mb-2 dark:text-gray-300`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${formStyle}`}
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className={`block ${textFont} text-sm font-bold mb-2 dark:text-gray-300`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${formStyle}`}
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-center">
              <a
                href="#"
                className="underline hover:underline-offset-2 hover:font-bold"
              >
                Sign In
              </a>
            </div>

            {/* Fancy OR Divider */}
            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-zinc-500 font-semibold">or</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                variant="default"
                className="flex items-center justify-center py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <FaGithub className="mr-2" /> Sign in with GitHub
              </Button>
              <Button
                variant="default"
                className="flex items-center justify-center py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <FaGoogle className="mr-2" /> Sign in with Google
              </Button>
            </div>
          </div>
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
            <div>
              <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">
                Chess but with gambling!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
