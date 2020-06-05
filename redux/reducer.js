// Actions
const MARK = 'MARK';
const START = 'START';
const JUMP = 'JUMP';
const LOADING = 'LOADING';

// Initial State
const initialState = {
  id: null,
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
  case START:
    return {
      ...state,
      id: action.payload
    };
  case LOADING:
    return {
      ...state,
      loading: action.payload
    };
  case MARK:
    // See how to update here!
    console.log("action.payload");
    console.log(action.payload);
    const history = state.history;
    return {
      ...state,
      history: history.concat([{
        squares: action.payload.newBoard,
      }]),
      stepNumber: history.length,
      xIsNext: action.payload.xIsNext,
      winner: action.payload.winner
    };
  case JUMP:
    return {
      ...state,
      stepNumber: action.payload,
      xIsNext: (action.payload % 2) === 0,
      winner: null
    };

  default: 
    return state;
  }
}

// Action Creators
export function generateGame() {
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    const res = await fetch('http://localhost:3000/api/game');
    const json = await res.json();
    dispatch({type: START, payload: json.gameId});
    dispatch({type: LOADING, payload: false});
  };
}

export function doPlay(sqr){
  return async (dispatch,getState) => {
    dispatch({type: LOADING, payload: true});
    const rq = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ state: getState() })
    }
    const res = await fetch('http://localhost:3000/api/mark/'+sqr,rq);
    const json = await res.json();

    dispatch({type: MARK, payload: json });
    dispatch({type: LOADING, payload: false});
  };
}

export function markSquare(sqr) {
  return { type: MARK, payload: sqr };
}

export function jumpTo(val) {
  return { type: JUMP, payload: val };
}

export function loading(val) {
  return { type: LOADING, payload: val };
}