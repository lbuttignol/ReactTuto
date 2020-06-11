import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
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
export function createGame(socket) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true });
    socket.emit('/api/game', {});
  };
};

export function gameCreated(gameId) {
  return async (dispatch, getState) => {
    console.log("gameId ", gameId);
    dispatch({ type: START, payload: gameId });
    dispatch({ type: LOADING, payload: false });
  };
};

export function doPlay(socket, sqr) {
  return async (dispatch,getState) => {
    dispatch({ type: LOADING, payload: true });
    socket.emit('/api/mark', { 
      gameId: getState().id,
      square: sqr,
    });
  };
}

export function receivePlay(newState) {
  return async (dispatch,getState) => {
    console.log(newState);
    dispatch({ type: MARK, payload: newState });
    dispatch({ type: LOADING, payload: false });
  };
}

export function undoMove() {
  return async (dispatch,getState) => {
    dispatch({ type: LOADING, payload: true });

    const newState = await apiFetch('post','/api/undo', { gameId: getState().id });

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
  const apiHost = publicRuntimeConfig.apiHost;
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
  const result = await fetch(apiHost + url, req);
  
  return await result.json();
}