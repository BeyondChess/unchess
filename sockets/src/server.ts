import { createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

// Create an HTTP server
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server is running");
});

// Initialize Socket.IO with the server
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Adjust based on your CORS requirements
  },
});

// Define socket event handlers
io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  // Handle "createGameRoom" event
  socket.on("createGameRoom", (gameId: string) => {
    console.log(`Game room ${gameId} created by player ${socket.id}`);
    socket.join(gameId);
    socket.emit("gameRoomCreated", { gameId });
  });

  // Handle "joinGameRoom" event
  socket.on("joinGameRoom", (gameId: string) => {
    console.log(`Player ${socket.id} joined game room ${gameId}`);
    socket.join(gameId);
    socket.emit("gameRoomJoined", { gameId });
    io.to(gameId).emit("startGame", { gameId });
  });

  // Handle "move" event
  socket.on("move", (move: any, roomId: string) => {
    socket.to(roomId).emit("opponentMove", move);
  });

  // Handle "disconnect" event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
