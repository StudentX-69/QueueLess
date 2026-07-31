import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { registerSocketHandlers } from './sockets/socket.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  app.set('io', io);
  registerSocketHandlers(io);

  server.listen(PORT, () => {
    console.log(`QueueLess API running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start QueueLess:', error);
  process.exit(1);
});
