import React from 'react';
import ChessSidebar from './ChessSideBar/page';
import MessageSideBar from './MessageSideBar/page';

const Play = () => {

  return (
    <div className="flex flex-row border-2">
      <div className="flex w-2/3 border-2 justify-center">
        {/* <GameBoard /> */}
      </div>
      <div className="flex flex-col w-1/3 border-2 items-center">
        <ChessSidebar />
        <MessageSideBar />
      </div>
    </div>
  );
};

export default Play;
