// Actions
const MARK = 'MARK';
const JUMP = 'JUMP';
const LOADING = 'LOADING';

// Initial State
const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
  loading: false,
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOADING:
    return {
      loading: action.payload
    }
  case MARK:
    console.log("inside MARK");
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[action.payload]) {
      return {
        history: state.history,
        stepNumber: state.stepNumber,
        xIsNext: state.xIsNext,
        winner: calculateWinner(squares),
      };
    }
    
    squares[action.payload] = state.xIsNext ? 'X' : 'O';

    return {
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      winner: calculateWinner(squares),
    };
  case JUMP:
    console.log("into jumTo");
    return {
      history: state.history,
      stepNumber: action.payload,
      xIsNext: (action.payload % 2) === 0,
      winner: null,
    };

  default: 
    return state;
  }
}

// Action Creators
export function markSquare(sqr) {
  return { type: MARK, payload: sqr };
}
// export function markSquare(sqr) {
//   return async (dispatch, getState) => {
//      dispatch({type: LOADING, payload: true});
//      // const uiid = getState().game.uiid;
//      const res = await fetch('/api/mark', { body: JSON.stringify({ uiid, sqr }) });
//      dispatch({type: MARK, payload: res.body});
//      dispatch({type: LOADING, payload: false});
//   }
// }

export function jumpTo(val) {
  return { type: JUMP, payload: val };
}

export function loading(val) {
  return { type: LOADING, payload: val };
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