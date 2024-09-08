'use client';
import { socket } from '@/socket';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Play = () => {
  const [gameRooms, setGameRooms] = useState<string[]>([]);

  useEffect(() => {
    const handleGameRoomsList = (rooms: string[]) => {
      setGameRooms(rooms);
    };

    const handleError = ({ message }: { message: string }) => {
      toast.error(message, {
        duration: 3000,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    };
    // socket elements
    socket.emit('getAllGameRooms');
    socket.on('gameRoomsList', handleGameRoomsList);

    socket.on('error', handleError);
  }, []);
  return (
    <div>
      <h2 className="mt-4">Available Game Rooms:</h2>
      <ul className="list-disc pl-5">
        {gameRooms.length > 0 ? (
          gameRooms.map((room, index) => (
            <li key={index}>
              <button
                onClick={() => console.log('clikced')}
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
    </div>
  );
};

export default Play;
