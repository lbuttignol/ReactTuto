import { useSelector, useDispatch } from 'react-redux'
import { markSquare, jumpTo } from '../../../redux/reducer'
import sqlite from 'sqlite';

export default async (req, res) => {
  const {
    query: { id },
  } = req
  // search into database the game id
  // mark square
  // Return game

  const db = await sqlite.open('./mydb.sqlite');
  const people = await db.all('select * from person');

  res.json(people);
}