export default function buildRepresentation(boardObj) {
  const brd = [];
  // build board representation to frontend
  for (let i = 0; i < 9; i++) {
    const cell = 'cell' + i;
    brd[i] = boardObj[cell];
  }
  return brd;
}