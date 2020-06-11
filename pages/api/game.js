import { v4 as uuidv4 } from 'uuid';
import Database from '../../db/database';

export default async (req, res) => {
  const gameId = await createGame();

  res.status(200).json({ gameId: gameId });
}

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
  
  return gameId;
}