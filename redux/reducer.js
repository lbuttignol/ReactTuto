// Actions
const MARK = 'MARK';
const START = 'START';
const UNDO = 'UNDO';
const LOADING = 'LOADING';

// Initial State
const initialState = {
  id: null,
  current: Array(9).fill(null),
  stepNumber: 0,
  xIsNext: true,
  winner: null,
  loading: false,
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
  case START:
    const res = initialState;
    res.id = action.payload;
    return res;
  case LOADING:
    return {
      ...state,
      loading: action.payload
    };
  case MARK:
    // See how to update here!
    return {
      ...state,
      current: action.payload.newBoard,
      stepNumber: action.payload.stepNumber,
      xIsNext: action.payload.xIsNext,
      winner: action.payload.winner
    };
  case UNDO:
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
    const req = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ gameId: getState().id })
    }
    const res = await fetch('http://localhost:3000/api/mark/'+sqr,req);
    const json = await res.json();

    dispatch({type: MARK, payload: json });
    dispatch({type: LOADING, payload: false});
  };
}

export function undoMove(){
  return async (dispatch,getState) => {
    dispatch({type: LOADING, payload: true});
    const req = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ gameId: getState().id })
    }
    const res = await fetch('http://localhost:3000/api/undo',req);
    const json = await res.json();

    dispatch({type: UNDO, payload: json });
    dispatch({type: LOADING, payload: false});
  }
}

// add function load game

export function markSquare(sqr) {
  return { type: MARK, payload: sqr };
}

export function undo(val) {
  return { type: UNDO, payload: val };
}

export function loading(val) {
  return { type: LOADING, payload: val };
}