import { v4 as uuidv4 } from 'uuid';
import sqlite from 'sqlite';

export default async (req, res) => {
  const id =  uuidv4();

  const db = await sqlite.open('./mydb.sqlite');
  console.log(await db.all('SELECT * FROM Game'));
  const emptyBoard = " , , , , , , , , ";
  console.log("id: " + id );
  console.log("emptyBoard: " + emptyBoard );
  const result = await db.exec('INSERT INTO Game VALUES (?,?)',[id.toString(),emptyBoard]);
  await db.close();

  res.status(200).json({gameId: id});
}