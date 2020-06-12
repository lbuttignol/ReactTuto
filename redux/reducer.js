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
};

// Action Creators
export function createGame(socket) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true });
    socket.emit('gameCreated', {});
  };
};

export function gameCreated(gameId) {
  return async (dispatch, getState) => {
    dispatch({ type: START, payload: gameId });
    dispatch({ type: LOADING, payload: false });
  };
};

export function doPlay(socket, sqr) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true });
    socket.emit('checkSquare', { 
      gameId: getState().id,
      square: sqr,
    });
  };
};

export function receivePlay(newState) {
  return async (dispatch, getState) => {
    dispatch({ type: MARK, payload: newState });
    dispatch({ type: LOADING, payload: false });
  };
};

export function undoMove(socket) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true });
    socket.emit('undo', { gameId: getState().id });
  };
};

export function updateState(newState) { 
  return async (dispatch, getState) => {
    dispatch({ type: UNDO, payload: newState });
    dispatch({ type: LOADING, payload: false });
  };
};

export function markSquare(sqr) {
  return { type: MARK, payload: sqr };
}

export function undo(val) {
  return { type: UNDO, payload: val };
}

export function loading(val) {
  return { type: LOADING, payload: val };
}