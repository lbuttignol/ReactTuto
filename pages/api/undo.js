import { useSelector, useDispatch } from 'react-redux';
import { markSquare, jumpTo } from '../../redux/reducer';
import sqlite from 'sqlite';

export default async (req, res) => {

  const gameId = req.body.gameId;
  // search into database the game id
  const db = await sqlite.open('./mydb.sqlite');
  const game = await db.all('SELECT * FROM Game WHERE id=?',gameId);

  const boards = await db.all('SELECT * FROM Board WHERE gameId = ?',[gameId]);

  if (boards.length < 1){
    // See error code 
    return res.status(200).json({});
  }
  

  const boardToDelete = game[0].current;
  const newBoard      = boards[boards.length - 2];
  const stepNumber    = boards.length - 1;
  const xIsNext       = !game[0].xIsNext;
  const winner        = null;


  const brd =[
    newBoard.cell0,
    newBoard.cell1,
    newBoard.cell2,
    newBoard.cell3,
    newBoard.cell4,
    newBoard.cell5,
    newBoard.cell6,
    newBoard.cell7,
    newBoard.cell8
  ];

  await db.run('UPDATE Game SET current = ? WHERE id = ?',[newBoard.id,gameId]);
  await db.run('DELETE FROM Board WHERE id = ?',[boardToDelete]); 

  
  res.status(200).json({
    stepNumber: stepNumber,
    xIsNext: xIsNext,
    winner : winner ,
    newBoard: brd
  })
}