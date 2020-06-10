export function buildRepresentation(boardObj) {
  const brd = [];
  // build board representation to frontend
  for (let i = 0; i < 9; i++) {
    const cell = 'cell' + i;
    brd[i] = boardObj[cell];
  }
  return brd;
}

export function calculateWinner(squares) {
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

export function whoPlayNext(step) {
  return step % 2 ? 'X' : 'O';
}