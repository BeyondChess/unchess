'use client';
import { socket } from '@/socket'; // Make sure this is correctly configured
import { Chess, Square } from 'chess.js';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { toast } from 'sonner';
import { moveValidation } from './gameHandler';
import { chessErrorToast } from '../components/toast';
import GameBoard from './board/[gameid]/page';

interface ChessMove {
  from: Square;
  to: Square;
  promotion: string;
}

export default function ChessBB() {
  const [game, setGame] = useState(new Chess());
  const [gameId, setGameId] = useState('');
  const [inGameRoom, setInGameRoom] = useState(false);
  const [connected, setConnected] = useState(false);

  // Handle socket connections
  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
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

  const createGameRoom = () => {
    const newGameId = Math.random().toString(36).substring(2, 9);
    socket.emit('createGameRoom', newGameId);

    socket.on('gameRoomCreated', ({ gameId }) => {
      setGameId(gameId);

      setInGameRoom(true);
      toast.success(`Game room created with ID: ${gameId}`, {
        duration: 3000,
      });
    });

    socket.on('error', ({ message }) => {
      toast.error(message, {
        duration: 3000,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    });
  };

  // Handle joining a game room
  const joinGameRoom = () => {
    if (gameId.trim() !== '') {
      socket.emit('joinGameRoom', gameId);

      socket.on('gameRoomJoined', ({ gameId }) => {
        setInGameRoom(true);
        toast.success(`Joined game room with ID: ${gameId}`, {
          duration: 3000,
        });
      });

      socket.on('error', ({ message }) => {
        toast.error(message, {
          duration: 3000,
          style: {
            backgroundColor: '#f56565',
            color: '#fff',
            fontWeight: 'bold',
          },
        });
      });
    } else {
      toast.error('Please enter a valid Game ID to join', {
        duration: 3000,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <div className="w-3/4 h-1/2">
      <div>
        {!inGameRoom ? (
          <>
            <button
              type="button"
              onClick={createGameRoom}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Game Room
            </button>
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Enter Game ID"
              className="ml-2 px-2 py-1 border rounded"
            />
            <button
              type="button"
              onClick={joinGameRoom}
              className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
            >
              Join Game Room
            </button>
          </>
        ) : (
          <>
            <GameBoard
              params={{
                gameId: gameId,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
