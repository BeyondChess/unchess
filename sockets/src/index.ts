import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get('/', (req, res) => {
  res.send('Socket.IO with Bun and TypeScript');
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (message: string) => {
    console.log('Message received:', message);
    io.emit('message', message); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

