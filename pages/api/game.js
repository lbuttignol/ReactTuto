import { v4 as uuidv4 } from 'uuid';
import sqlite from 'sqlite';

export default async (req, res) => {

  const gId = await createGame();
  console.log(gId);
  res.status(200).json({gameId: gId});
}

async function createGame(){
  const gameId = uuidv4();
  console.log(gameId);
  const boardId = uuidv4();

  const db = await sqlite.open('./mydb.sqlite');
  
  // insert Game
  await db.run(`INSERT INTO Game ( id ) VALUES ( ? )`,[gameId]);
  // insert Board
  await db.run(`INSERT INTO Board ( id, gameId ) VALUES ( ?, ? )`,[boardId,gameId])
  // Insert Relationship
  await db.run(`UPDATE Game SET current = ? WHERE id = ?`,[boardId,gameId]);
  
  await db.close();
  return gameId;
}