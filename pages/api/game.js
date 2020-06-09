import { v4 as uuidv4 } from 'uuid';
import sqlite from 'sqlite';

export default async (req, res) => {
  const gameId = uuidv4();
  const boardId = uuidv4();

  const db = await sqlite.open('./mydb.sqlite');
  
  // Set inital state
  const xIsNext = true;
  const winner = null;
  // insert Game
  await db.run('INSERT INTO Game VALUES (?,?,?,?)',[gameId,xIsNext,winner,null]);
  // insert Board
  const result = await db.run('INSERT INTO Board VALUES (?,?,?,?,?,?,?,?,?,?,?)',[boardId,null,null,null,null,null,null,null,null,null,gameId])
  // Insert Relationship
  await db.run('UPDATE Game SET current = ? WHERE id = ?',[boardId,gameId]);
  
  await db.close();

  res.status(200).json({gameId: gameId});
}