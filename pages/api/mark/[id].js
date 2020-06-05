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
  const game = await db.all('select * from Game');

  res.json(game);
}