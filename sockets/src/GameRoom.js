export class GameRoom {
  constructor(player1) {
    this.player1 = player1;
    this.player2 = null;
  }

  addPlayer(player) {
    if (this.player2) {
      return false;
    } else {
      this.player2 == player;
      return true;
    }
  }

  removePlayer(player) {
    if (this.player1 === player) {
      this.player1 = null;
    } else if (this.player2 === player) {
      this.player2 = null;
    }
    return !this.player1 && !this.player2;
  }
}

const games = {};

export function createGameRoom(gameId, player1) {
  if (games[gameId]) {
    return false;
  } else {
    games[gameId] = new GameRoom(player1);
    return true;
  }
}
export function getGamesRooms() {
  return Object.keys(games);
}
export function joinGameRoom(gameId, player2) {
  const game = games[gameId];
  if (game && game.addPlayer(player2)) {
    return true;
  }
  return false;
}

export function removePlayerFromGame(player) {
  for (const [gameId, game] of Object.entries(games)) {
    if (game.removePlayer(player)) {
      delete games[gameId];
      return gameId;
    }
  }
  return null;
}
