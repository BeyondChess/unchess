import { ChessMove } from '@/app/types/chess.types';
import { toast } from 'sonner';

export const chessErrorToast = (move: ChessMove) => {
  toast.error(`Invalid move from ${move.from} to ${move.to}.`, {
    duration: 3000,
    style: {
      backgroundColor: '#f56565',
      color: '#fff',
      fontWeight: 'bold',
    },
  });
};
