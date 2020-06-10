import { v4 as uuidv4 } from 'uuid';
import Database from '../../../db/database';
import buildRepresentation from '../../../helpers/board';

export default async (req, res) => {
  const {
    query: { id },
  } = req;
  
  const gameId = req.body.gameId;
  const db = new Database();
  const game = await db.get('SELECT * FROM Game WHERE id=?', gameId);

  if(!game){
    return res.status(404).json({ message: 'Game not Found' });
  }

  const board = await db.get('SELECT * FROM Board WHERE id = ?', game.current);
  const count = await db.all('SELECT count(*) as stepNumber FROM Board WHERE gameId = ?', [gameId]);
  const stepNumber = count[0].stepNumber;

  const squares = buildRepresentation(board);

  const winner = calculateWinner(squares);
  // Second value check if the cell is already marked
  if (winner || squares[id]) {
    return res.status(200).json({
      winner: winner,
      stepNumber: stepNumber,
      xIsNext: whoPlayNext(stepNumber),
      newBoard: squares 
    });
  }

  // New board 
  squares[id] = whoPlayNext(stepNumber);
  const boardId = uuidv4();
  await db.run(`INSERT INTO Board 
    (id, cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, gameId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [boardId,
    squares[0],
    squares[1],
    squares[2],
    squares[3],
    squares[4],
    squares[5],
    squares[6],
    squares[7],
    squares[8],
    gameId]);

  // Insert Relationship
  await db.run('UPDATE Game SET current = ? WHERE id = ?', [boardId, gameId]);
  await db.close();

  res.status(200).json({
    winner: calculateWinner(squares),
    stepNumber: stepNumber + 1,
    xIsNext: whoPlayNext(stepNumber + 1),
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

function whoPlayNext(step) {
  return step % 2 ? 'X' : 'O';
}