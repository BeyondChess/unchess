import { GameRoom } from '@/app/types/chess.types';
import { socket } from '@/socket';

export class GameRoomSocketConnection {
  player: string;
  constructor(player: string) {
    this.player = player;
  }

  static getRooms(): Promise<GameRoom[] | Boolean> {
    return new Promise((resolve, reject) => {
      socket.emit('getAllGameRooms'),
        (rooms: GameRoom[]) => {
          if (rooms && rooms.length > 0) {
            resolve(rooms);
          }
          reject(false);
        };
    });
  }

  
  // check if the user is already present in a game room
  static checkIfUserISInaGameRoom(player: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      socket.emit('getAllGameRooms'),
        (rooms: string[]) => {
          const inRooms = rooms.includes(player);
          if (inRooms) {
            resolve(true);
          }
          reject(false);
        };
    });
  }
  //create game room
  // join a game room
}
