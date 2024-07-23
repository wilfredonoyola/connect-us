import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

interface User {
  id: string;
  nickname: string;
  avatar: string;
  status: 'available' | 'busy';
}

const users: Record<string, User> = {};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse & { socket: any }) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const httpServer: HTTPServer = res.socket.server;
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('login', (user) => {
        users[socket.id] = { ...user, status: 'available' };
        io.emit('users', Object.values(users));
      });

      socket.on('setStatus', (status) => {
        if (users[socket.id]) {
          users[socket.id].status = status;
          io.emit('users', Object.values(users));
        }
      });

      socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('users', Object.values(users));
        console.log(`User disconnected: ${socket.id}`);
      });

      socket.on('logout', () => {
        if (users[socket.id]) {
          users[socket.id].status = 'busy';
          io.emit('users', Object.values(users));
        }
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default handler;
