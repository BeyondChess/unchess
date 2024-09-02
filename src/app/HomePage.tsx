import React from 'react';
import { Button } from './components/ui/Button';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Button className="bg-blue-500 hover:bg-blue-300">
        <Link href={'/chess'}> Play against a Human</Link>
      </Button>

      <Button className="bg-green-500 hover:bg-green-300">
        Play against a Bot
      </Button>
    </div>
  );
};

export default HomePage;
