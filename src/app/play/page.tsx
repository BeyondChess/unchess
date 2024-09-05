import React from 'react';
import GameRegion from './GameRegion/page';
import ChessSidebar from './ChessSideBar/page';
import MessageSideBar from './MessageSideBar/page';

const Play = () => {
  return (
    <>
      <MessageSideBar />
      <GameRegion />
      <ChessSidebar />
    </>
  );
};

export default Play;
