import type { Player } from "../../types/chess.types";

export class GameRoom {
  player1: Player;
  player2: Player;

  constructor(player1: Player) {
    this.player1 = player1;
    this.player2 = {
      playerId: null, // Representing an empty player slot
    };
  }

  // Method to add the second player
  addPlayer(player: Player): boolean {
    if (this.player2.playerId) {
      // Check if player2 is already occupied
      return false;
    }
    this.player2 = player;
    return true;
  }

  // Method to remove a player
  removePlayer(playerId: string): boolean {
    if (this.player1.playerId === playerId) {
      this.player1 = { playerId: null }; // Reset player1
    } else if (this.player2.playerId === playerId) {
      this.player2 = { playerId: null }; // Reset player2
    }
    return !this.player1.playerId && !this.player2.playerId; // Return true if both players are removed
  }
}

// The games collection, which stores GameRoom instances
const games: { [key: string]: GameRoom } = {};

// Function to create a new game room
export function createGameRoom(gameId: string, player: Player): boolean {
  if (games[gameId]) {
    return false; // Game room already exists
  } else {
    games[gameId] = new GameRoom(player); // Create a new game room
    return true;
  }
}

// Function to get all game rooms
export function getGameRooms(): GameRoom[] {
  return Object.values(games);
}

// Function to get a game room by ID
export function getGameRoom(gameId: string): GameRoom | null {
  return games[gameId] || null;
}

// Function to join a game room as player2
export function joinGameRoom(gameId: string, player2: Player): boolean {
  const game = games[gameId];
  if (game && game.addPlayer(player2)) {
    return true;
  }
  return false;
}

// Function to remove a player from any game room
export function removePlayerFromGame(playerId: string): boolean {
  for (const gameId in games) {
    const game = games[gameId];
    if (
      game.player1.playerId === playerId ||
      game.player2.playerId === playerId
    ) {
      const isEmpty = game.removePlayer(playerId);
      if (isEmpty) {
        delete games[gameId]; // Remove the game room if both players are gone
      }
      return true; // Player was found and removed
    }
  }
  return false; // Player not found
}
