import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import Game from './Game';

// import * as reducers from './reducer';
import ticTacToe from './reducer';

import '../styles/index.css';

const store = createStore(ticTacToe, applyMiddleware(thunk));

console.log("store obj");
console.log(store.getState());

// ========================================

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
