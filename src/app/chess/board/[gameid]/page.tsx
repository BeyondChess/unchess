'use state';
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
  const [chessHistory, setChessHistory] = useState<ChessMove[]>([]);
  const { gameId } = params;

  // Handle Socket connection
  useEffect(() => {
    const onOpponentMove = (move: ChessMove) => {
      setGame((currentGame) => {
        try {
          // Validate the opponent's move against the current game state
          const result = moveValidation(move, currentGame.fen());

          if (result.newGame) {
            // Update the game state with the new game after the valid move
            setChessHistory((history) => [...chessHistory, move]);

            return result.newGame;
          } else {
            // If validation fails, log the error but do not trigger a toast
            console.warn('Invalid move received from opponent:', move);
            return currentGame;
          }
        } catch (error) {
          console.error('Error handling opponent move:', error);
          return currentGame;
        }
      });
    };

    // Listen for the opponent's move
    socket.on('opponentMove', onOpponentMove);

    // Cleanup listener when component unmounts or gameId changes
    return () => {
      socket.off('opponentMove', onOpponentMove);
    };
  }, []);

  // Handle local move and emit to server
  const handleMove = (move: ChessMove): boolean => {
    let moveValid = false;

    setGame((currentGame) => {
      try {
        const result = moveValidation(move, currentGame.fen());
        if (result.newGame) {
          socket.emit('move', move, gameId); // Emit move to server
          moveValid = true;
          setChessHistory((history) => [...chessHistory, move]);
          return result.newGame;
        } else {
          chessErrorToast(move);
          return currentGame;
        }
      } catch (error) {
        console.log('🚀 ~ handleMove ~ error:', error);
        return currentGame;
      }
    });

    return moveValid;
  };

  console.log(chessHistory);
  return (
    <div className="w-full">
      <p>Game ID: {gameId}</p>
      <div className="flex flex-row ">
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
        <div className="flex-1 border-2 w-72 pr-10">
          <h2 className="w-full">Move History</h2>
          <ul className="">
            {chessHistory.map((move, index) => (
              <li key={index} className="">
                <span className="font-medium">
                  {index + 1}. {move.from} {'->'} {move.to}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
