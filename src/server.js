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

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('createGameRoom', (gameId) => {
      if (!(gameId in games)) {
        games[gameId] = {
          player1: [socket.id],
          player2: null,
        };
        console.log('🚀 ~ socket.on ~ games:', games);

        socket.join(gameId);
        socket.emit('gameRoomCreated', { gameId });
        console.log(`Game room ${gameId} created by player ${socket.id}`);
      } else {
        socket.emit('error', { message: 'Game room already exists!' });
      }
    });

    socket.on('joinGameRoom', (gameId) => {
      if (gameId in games) {
        const game = games[gameId];
        if (game.player2 === null) {
          game.player2 = socket.id;

          socket.join(gameId);
          socket.emit('gameRoomJoined', { gameId });
          console.log(`Player ${socket.id} joined game room ${gameId}`);

          io.to(gameId).emit('startGame', { gameId });
        } else {
          socket.emit('error', { message: 'Game room is full!' });
        }
      } else {
        socket.emit('error', { message: 'Game room does not exist!' });
      }
    });

    socket.on('getAllGameRooms', () => {
      const gameRooms = Object.keys(games);
      console.log('🚀 ~ socket.on ~ gameRooms:', gameRooms);
      socket.emit('gameRoomsList', gameRooms);
    });

    disconnectingsocket.on('move', (move) => {
      socket.broadcast.emit('opponentMove', move);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
