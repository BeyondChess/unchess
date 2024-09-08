import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import {
  createGameRoom,
  joinGameRoom,
  removePlayerFromGame,
  getGamesRooms,
} from "./GameRoom.js";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust based on your CORS requirements
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("createGameRoom", (gameId) => {
      if (createGameRoom(gameId, socket.id)) {
        socket.join(gameId);
        socket.emit("gameRoomCreated", { gameId });
        console.log(`Game room ${gameId} created by player ${socket.id}`);
      } else {
        socket.emit("error", { message: "Game room already exists!" });
      }
    });

    socket.on("joinGameRoom", (gameId) => {
      if (joinGameRoom(gameId, socket.id)) {
        socket.join(gameId);
        socket.emit("gameRoomJoined", { gameId });
        console.log(`Player ${socket.id} joined game room ${gameId}`);
        io.to(gameId).emit("startGame", { gameId });
      } else {
        socket.emit("error", {
          message: "Game room is full or does not exist!",
        });
      }
    });

    socket.on("getAllGameRooms", () => {
      const gameRooms = getGamesRooms();
      console.log("🚀 ~ socket.on ~ gameRooms:", gameRooms);
      socket.emit("gameRoomsList", gameRooms);
    });

    socket.on("move", (move, roomId) => {
      socket.to(roomId).emit("opponentMove", move);
    });

    socket.on("disconnect", () => {
      const gameId = removePlayerFromGame(socket.id);
      if (gameId) {
        io.to(gameId).emit("gameEnded", {
          message: "A player disconnected, game over!",
        });
        console.log(`Game room ${gameId} ended due to player disconnect`);
      }
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(4000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:4000");
  });
});
