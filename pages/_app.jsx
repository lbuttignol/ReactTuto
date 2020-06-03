import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import Game from '../components/Game';
import { createStore } from 'redux';
import ticTacToe from '../redux/reducer';
import '../styles/index.css';

const store = createStore(ticTacToe);

class MyApp extends App {

  render(){
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  };
}

export default MyApp;