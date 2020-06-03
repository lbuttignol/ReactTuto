import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { markSquare, jumpTo } from '../redux/reducer';
import Board from './Board';

function Game () {
  
  const dispatch = useDispatch();
  // const state = useSelector(state => state);
  const history = useSelector(state => state.history);
  const stepNumber = useSelector(state => state.stepNumber); 
  const current = history[stepNumber];
  const winner = useSelector(state =>state.winner);
  const xIsNext = useSelector(state => state.xIsNext);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      // adding move id
      <li key={move}>
        <button onClick={() => dispatch(jumpTo(move)) }>{desc}</button>
      </li>
    );
  });

  let status;

  if(winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => dispatch(markSquare(i))}
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

export default Game;
