import express from 'express';
import http from 'http';
import socketServer from 'socket.io';
import next from 'next';
import { v4 as uuidv4 } from 'uuid';
import Database from '../db/database';

const app = express();

const server = http.createServer(app);
const io = socketServer(server);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connect', socket => {
  console.log('Connecting....');
  socket.emit('now', {
    message: 'Hello!!!'
  });
  
  socket.on('/api/game', (socket) => {
    console.log('Create new Game by socket');
    createGame()
    .then(gameId => {
      console.log('gameCreated', gameId);
      io.emit('gameCreated', gameId);
    });
  });

});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req,res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

async function createGame() {
  const gameId  = uuidv4();
  const boardId = uuidv4();
  const db = new Database(); 
  // insert Game
  await db.run(`INSERT INTO Game (id) VALUES (?)`, [gameId]);
  // insert Board
  await db.run(`INSERT INTO Board (id, gameId) VALUES (?, ?)`, [boardId, gameId]);
  // Insert Relationship
  await db.run(`UPDATE Game SET current = ? WHERE id = ?`, [boardId, gameId]);
  await db.close();
  console.log("gameId",gameId);
  return gameId;
}