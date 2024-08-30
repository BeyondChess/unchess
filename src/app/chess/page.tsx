'use client';
import { socket } from '@/socket';
import { Chess, Square } from 'chess.js';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { toast } from 'sonner';

interface ChessMove {
  from: Square;
  to: Square;
  promotion: string;
}

export default function ChessBB() {
  const [game, setGame] = useState(new Chess());
  const [connected, IsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  // Handle socket
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    function onConnect() {
      IsConnected(true);
      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      IsConnected(false);
      setTransport('N/A');
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  // Handle local move and emit to server
  const handleMove = (move: ChessMove) => {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);

      if (result) {
        setGame(gameCopy);
        return true;
      } else {
        toast.error(`Move from ${move.from} to ${move.to} is invalid.`, {
          duration: 3000,
          style: {
            backgroundColor: '#f56565',
            color: '#fff',
            fontWeight: 'bold',
          },
        });
      }
    } catch (error) {
      console.error('Error making move:', error);
      toast.error('Error making your move.', {
        duration: 3000,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }

    return false;
  };

  return (
    <div className="w-3/4 h-1/2">
      <div>
        <p>Status: {connected ? 'connected' : 'disconnected'}</p>
        <p>Transport: {transport}</p>
      </div>
      <Chessboard
        position={game.fen()}
        onPieceDrop={(sourceSquare, targetSquare) =>
          handleMove({ from: sourceSquare, to: targetSquare, promotion: 'q' })
        }
      />
    </div>
  );
}
