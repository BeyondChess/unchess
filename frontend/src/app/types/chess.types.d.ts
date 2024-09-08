enum Side {
  White = 'white',
  Black = 'black',
}


export interface ChessMove {
  from: Square;
  to: Square;
  promotion: string;
}

export interface Player {
  name: string;
  rank: number;
  side: Side;
}

export interface GameRoom {
  player1: String;
  player2: String;
  chessMove: ChessMove;
  moveHistory: ChessMove[];
}
