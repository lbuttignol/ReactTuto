import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { createStore, combineReducers } from 'redux';
import { createStore } from 'redux';

import Game from './Game';

// import * as reducers from './reducer';
import ticTacToe from './reducer';

import './index.css';

const store = createStore(ticTacToe);

console.log("store obj");
console.log(store.getState());

// ========================================

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
