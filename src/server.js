const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust based on your CORS requirements
    },
  });

  const games = {};
  // Socket.IO connection handler
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('createGameRoom', (gameId) => {
      console.log("🚀 ~ socket.on ~ gameId:", gameId)
      if (!(gameId in games)) {
        // Create a new game room
        games[gameId] = {
          player1: [socket.id], // Add the player who created the room
          player2: null,
          // Additional game setup here
        };

        socket.join(gameId); // Join the player to the room
        socket.emit('gameRoomCreated', { gameId });
        console.log(`Game room ${gameId} created by player ${socket.id}`);
      } else {
        socket.emit('error', { message: 'Game room already exists!' });
      }
    });
    socket.on('move', (move) => {
      // Broadcast the move to all other connected clients
      socket.broadcast.emit('opponentMove', move);
    });

    // Join an existing game room
    socket.on('joinGameRoom', (gameId) => {
      if (gameId in games) {
        const game = games[gameId];
        if (game.player2 === null) {
          game.player2 = socket.id; // Add the second player to the room

          socket.join(gameId); // Join the player to the room
          socket.emit('gameRoomJoined', { gameId });
          console.log(`Player ${socket.id} joined game room ${gameId}`);

          // Notify both players that the game can start
          io.to(gameId).emit('startGame', { gameId });
        } else {
          socket.emit('error', { message: 'Game room is full!' });
        }
      } else {
        socket.emit('error', { message: 'Game room does not exist!' });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Start the server on port 3000 (or use a different port if needed)
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
