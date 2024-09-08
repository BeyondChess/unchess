'use client';

import { GameRoom } from '@/app/types/chess.types';
import React, { useState } from 'react';

const GameBoard = (GameRoom: GameRoom) => {
  const { chessMove, moveHistory, player1, player2 } = GameRoom;

  const [game , setGame] = useState(0) ; 
  
  return <div>GameBoard</div>;
};

export default GameBoard;
