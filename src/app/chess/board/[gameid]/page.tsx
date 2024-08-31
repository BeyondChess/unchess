import { chessErrorToast } from '@/app/components/toast';
import { ChessMove } from '@/app/types/chess.types';
import { Chess } from 'chess.js';
import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { moveValidation } from '../../gameHandler';
import { socket } from '@/socket';

const GameBoard = ({
  params,
}: {
  params: {
    gameId: string;
  };
}) => {
  const [game, setGame] = useState(new Chess());
  const { gameId } = params;
  // Handle Socket connection
  useEffect(() => {
    // Handle opponent moves
    const onOpponentMove = (move: ChessMove) => {
      try {
        const result = moveValidation(move, game.fen());
        if (result.newGame) {
          setGame(result.newGame);
        } else {
          chessErrorToast(move);
        }
      } catch (error) {
        console.error('Error handling opponent move:', error);
      }
    };

    socket.on('opponentMove', onOpponentMove);
    return () => {
      socket.off('opponentMove', onOpponentMove);
    };
  }, [game]);
  // Handle local move and emit to server
  const handleMove = (move: ChessMove) => {
    try {
      const result = moveValidation(move, game.fen());
      if (result.newGame) {
        setGame(result.newGame);
        socket.emit('move', move);
        return true;
      } else {
        chessErrorToast(move);
      }
    } catch (error) {
      console.log('🚀 ~ handleMove ~ error:', error);
    }

    return false;
  };
  return (
    <>
      <p>Game ID: {gameId}</p>
      <Chessboard
        position={game.fen()}
        onPieceDrop={(sourceSquare, targetSquare) =>
          handleMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
          })
        }
      />
    </>
  );
};

export default GameBoard;
