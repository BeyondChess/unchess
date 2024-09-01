'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import GameBoard from './board/[gameid]/page';
import { socket } from '@/socket';

export default function ChessBB() {
  const [gameId, setGameId] = useState('');
  const [inGameRoom, setInGameRoom] = useState(false);
  const [gameRooms, setGameRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Handle incoming game room list
    const handleGameRoomsList = (rooms: string[]) => {
      setGameRooms(rooms);
      console.log('🚀 ~ handleGameRoomsList ~ rooms:', rooms);
    };

    socket.emit('getAllGameRooms')

    // Handle room creation
    const handleGameRoomCreated = ({ gameId }: { gameId: string }) => {
      setGameId(gameId);
      setInGameRoom(true);
      toast.success(`Game room created with ID: ${gameId}`, { duration: 3000 });
      setLoading(false);
    };

    // Handle room joining
    const handleGameRoomJoined = ({ gameId }: { gameId: string }) => {
      setGameId(gameId);
      setInGameRoom(true);
      toast.success(`Joined game room with ID: ${gameId}`, { duration: 3000 });
      setLoading(false);
    };

    // Handle errors
    const handleError = ({ message }: { message: string }) => {
      toast.error(message, {
        duration: 3000,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      setLoading(false);
    };

    socket.on('gameRoomsList', handleGameRoomsList);
    socket.on('gameRoomCreated', handleGameRoomCreated);
    socket.on('gameRoomJoined', handleGameRoomJoined);
    socket.on('error', handleError);

    // Cleanup
    return () => {
      socket.off('gameRoomsList', handleGameRoomsList);
      socket.off('gameRoomCreated', handleGameRoomCreated);
      socket.off('gameRoomJoined', handleGameRoomJoined);
      socket.off('error', handleError);
    };
  }, []);

  const createGameRoom = () => {
    setLoading(true);
    const newGameId = Math.random().toString(36).substring(2, 9);
    socket.emit('createGameRoom', newGameId);
  };

  const joinGameRoom = (id?: string) => {
    const roomId = id || gameId.trim();
    if (roomId !== '') {
      setLoading(true);
      socket.emit('joinGameRoom', roomId);
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
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Game Room'}
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
              onClick={() => joinGameRoom()}
              className={`bg-green-500 text-white px-4 py-2 ml-2 rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Joining...' : 'Join Game Room'}
            </button>

            <h2 className="mt-4">Available Game Rooms:</h2>
            <ul className="list-disc pl-5">
              {gameRooms.length > 0 ? (
                gameRooms.map((room, index) => (
                  <li key={index}>
                    <button
                      onClick={() => joinGameRoom(room)}
                      className="text-blue-500 underline"
                    >
                      {room}
                    </button>
                  </li>
                ))
              ) : (
                <li>No game rooms available.</li>
              )}
            </ul>
          </>
        ) : (
          <div>
            <GameBoard
              params={{
                gameId: gameId,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
