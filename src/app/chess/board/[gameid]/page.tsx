'use state';
import { chessErrorToast } from '@/app/components/toast';
import { ChessMove } from '@/app/types/chess.types';
import { Chess } from 'chess.js';
import React, { useEffect, useState, useCallback } from 'react';
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
  const [isGameOver, setIsGameOver] = useState(false);
  const { gameId } = params;

  const checkGameOver = useCallback((newGame: Chess) => {
    if (newGame.isGameOver()) {
      setIsGameOver(true);
      console.log('Game Over: Checkmate');
    }
  }, []);

  useEffect(() => {
    const onOpponentMove = (move: ChessMove) => {
      setGame((currentGame) => {
        try {
          const result = moveValidation(move, currentGame.fen());

          if (result.newGame) {
            setChessHistory((history) => {
              if (history[history.length - 1] === move) {
                return history;
              }
              return [...history, move];
            });
            checkGameOver(result.newGame);
            return result.newGame;
          } else {
            console.warn('Invalid move received from opponent:', move);
            return currentGame;
          }
        } catch (error) {
          console.error('Error handling opponent move:', error);
          return currentGame;
        }
      });
    };

    socket.on('opponentMove', onOpponentMove);

    return () => {
      socket.off('opponentMove', onOpponentMove);
    };
  }, [checkGameOver]);

  const handleMove = useCallback(
    (move: ChessMove): boolean => {
      if (isGameOver) return false;

      let moveValid = false;

      setGame((currentGame) => {
        try {
          const result = moveValidation(move, currentGame.fen());
          if (result.newGame) {
            socket.emit('move', move, gameId); // Emit move to server
            moveValid = true;
            setChessHistory((history) => {
              if (history[history.length - 1] === move) {
                return history;
              }
              return [...history, move];
            });
            checkGameOver(result.newGame);
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
    },
    [isGameOver, gameId, checkGameOver]
  );

  return (
    <div className="w-full">
      <p>Game ID: {gameId}</p>
      <div className="flex flex-row">
        <Chessboard
          position={game.fen()}
          onPieceDrop={(sourceSquare, targetSquare) =>
            !isGameOver &&
            handleMove({
              from: sourceSquare,
              to: targetSquare,
              promotion: 'q',
            })
          }
          arePiecesDraggable={!isGameOver}
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
      {isGameOver && (
        <div className="text-center text-red-600">
          <h3>Game Over: Checkmate!</h3>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
