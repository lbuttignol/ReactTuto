import { useSelector, useDispatch } from 'react-redux'
import { markSquare, jumpTo } from '../../../redux/reducer'
import sqlite from 'sqlite';

export default async (req, res) => {
  const {
    query: { id },
  } = req
  // search into database the game id
  
  const state = req.body.state;
  const db = await sqlite.open('./mydb.sqlite');
  const game = await db.all('select * from Game where id=?',state.id);

  const history = state.history;
  const board = history[history.length - 1];

  const squares = board.squares.slice();

  if (calculateWinner(squares) ) {
    res.json({
      winner: calculateWinner(squares),
      stepNumber: state.stepNumber,
      xIsNext: state.xIsNext,
      newBoard: squares 
    });
  }

  squares[id] = state.xIsNext ? 'X' : 'O';
  
  // INSERT INTO DATABASE THE NEW BOARD
  const boardRepresentation = squares.map((x) =>{
      if ( x == null){
        return ' ';
      }
      return x;
    }).join(',');


  await db.run("INSERT OR REPLACE INTO Game VALUES (?,?)", [state.id,boardRepresentation] );
  await db.close();

  res.json({
    winner: calculateWinner(squares),
    stepNumber: state.stepNumber + 1,
    xIsNext: !state.xIsNext,
    newBoard: squares
  });

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      
      return squares[a];
    }
  }
  return null;
}