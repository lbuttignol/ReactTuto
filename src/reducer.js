// Actions
const MARK = 'MARK';

// Initial State
const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
}

// Reducer
export default function reducer(state = initialState, action) {
  console.log("Inside reducer");
  console.log(state);
  console.log('action');
  console.log(action);
  switch (action.type) {
  case MARK:
  	console.log("inside MARK");
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[action.value]) {
      return {
      	history: state.history,
      	stepNumber: state.stepNumber,
      	xIsNext: state.xIsNext,
      	winner: calculateWinner(squares),
      };
    }
    
    squares[action.value] = state.xIsNext ? 'X' : 'O';
    
    return {
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      winner: calculateWinner(squares),
    };
  default: 
  	return state;
  }
}

// Action Creators
export function markSquare(sqr) {
  return { type: MARK, value: sqr };
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