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
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
  case START:
    return {
      ...initialState,
      id: action.payload
    };
  case LOADING:
    return {
      ...state,
      loading: action.payload
    };
  case MARK:
    return {
      ...state,
      current   : action.payload.newBoard,
      stepNumber: action.payload.stepNumber,
      xIsNext   : action.payload.xIsNext,
      winner    : action.payload.winner
    };
  case UNDO:
    return {
      ...state,
      current   : action.payload.newBoard,
      stepNumber: action.payload.stepNumber,
      xIsNext   : action.payload.xIsNext,
      winner    : action.payload.winner
    };

  default: 
    return state;
  }
}

// Action Creators
export function generateGame() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true });
    
    const newState = await apiFetch('get', 'http://localhost:3000/api/game');
    dispatch({ type: START, payload: newState.gameId });
    dispatch({ type: LOADING, payload: false });
  };
};

export function doPlay(sqr) {
  return async (dispatch,getState) => {
    dispatch({ type: LOADING, payload: true });
    // if gameId == null create game
    const newState = await apiFetch('post', 'http://localhost:3000/api/mark/' + sqr, { gameId: getState().id });

    dispatch({ type: MARK, payload: newState });
    dispatch({ type: LOADING, payload: false });
  };
}

export function undoMove() {
  return async (dispatch,getState) => {
    dispatch({ type: LOADING, payload: true });

    const newState = await apiFetch('post','http://localhost:3000/api/undo', { gameId: getState().id });

    dispatch({ type: UNDO, payload: newState });
    dispatch({ type: LOADING, payload: false });
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

async function apiFetch(method = 'get', url, body = {}) {
  const req = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method
  }
  
  if(method != 'get') {
    req.body = JSON.stringify(body);
  }

  const result = await fetch(url,req);
  return await result.json();
}