import { Chess } from 'chess.js';
import { ChessMove } from '../types/chess.types';

export const moveValidation = (
  move: ChessMove,
  currentGameFen: string
): {
  move: ChessMove;
  newGame: Chess | null;
} => {
  try {
    const gameCopy = new Chess(currentGameFen);
    const result = gameCopy.move(move);
    return {
      move: move,
      newGame: gameCopy,
    };
  } catch (error) {
    return {
      move: move,
      newGame: null,
    };
  }
};
