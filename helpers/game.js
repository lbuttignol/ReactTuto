import { v4 as uuidv4 } from 'uuid';
import Database from '../db/database';
import { buildRepresentation, 
         whoPlayNext,
         calculateWinner } from './board';

export async function createGame() {
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
};

export async function markGame(gameId, square) {
  const db = new Database();
  const game = await db.get('SELECT * FROM Game WHERE id=?', gameId);
  if (!game) {
    
    return null;
  }

  const board = await db.get('SELECT * FROM Board WHERE id = ?', game.current);
  const count = await db.all('SELECT count(*) as stepNumber FROM Board WHERE gameId = ?', [gameId]);
  const stepNumber = count[0].stepNumber;
  const squares = buildRepresentation(board);
  const winner = calculateWinner(squares);
  // Second value check if the cell is already marked
  if (winner || squares[square]) {
    
    return {
      winner: winner,
      stepNumber: stepNumber,
      xIsNext: whoPlayNext(stepNumber),
      newBoard: squares 
    };
  }

  // New board 
  squares[square] = whoPlayNext(stepNumber);
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

  return {
    winner: calculateWinner(squares),
    stepNumber: stepNumber + 1,
    xIsNext: whoPlayNext(stepNumber + 1),
    newBoard: squares
  };
};

export async function undoMove(gameId) {
  const db = new Database();
  const game = await db.get('SELECT * FROM Game WHERE id = ?', gameId);
  
  if(!game) {
    
    return null;
  }
  const boards = await db.all('SELECT * FROM Board WHERE gameId = ?', [gameId]);
  
  if (boards.length < 1) {
    
    return null;
  }
  const boardToDelete = game.current;
  const newBoard      = boards[boards.length - 2];
  const stepNumber    = boards.length - 1;
  const xIsNext       = !game.xIsNext;
  const winner        = null;
  const brd = buildRepresentation(newBoard);
  await db.run('UPDATE Game SET current = ? WHERE id = ?', [newBoard.id, gameId]);
  await db.run('DELETE FROM Board WHERE id = ?', [boardToDelete]); 
  await db.close();
  
  return {
    stepNumber: stepNumber,
    xIsNext: xIsNext,
    winner : winner ,
    newBoard: brd,
  };
}