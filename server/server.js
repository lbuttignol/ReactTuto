import express from 'express';
import http from 'http';
import socketServer from 'socket.io';
import next from 'next';
import { createGame, 
         markGame,
         undoMove } from '../helpers/game';

const app = express();

const server = http.createServer(app);
const io = socketServer(server);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connect', socket => {
  
  socket.on('/api/game', (socket) => {
    createGame()
    .then(gameId => {
      io.emit('gameCreated', gameId);
    });
  });

  socket.on('/api/mark', (appData) => {
    markGame(appData.gameId, appData.square)
    .then(newState => {
      if (newState) {
        io.emit('boxMarked', newState);
      }
    });
  });

  socket.on('/api/undo', (appData) => {
    undoMove(appData.gameId)
    .then(newState => {
      if (newState) {
        io.emit('updateState', newState);
      }
    });
  });
});

nextApp.prepare()
.then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req,res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});