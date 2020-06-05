import { v4 as uuidv4 } from 'uuid';
import sqlite from 'sqlite';

export default async (req, res) => {
  const id =  uuidv4();
  const emptyBoard = " , , , , , , , , ";

  const db = await sqlite.open('./mydb.sqlite');
  const result = await db.run('INSERT INTO Game VALUES (?,?)',[id,emptyBoard]);
  await db.close();

  res.status(200).json({gameId: id});
}