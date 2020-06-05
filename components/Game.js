import { useSelector, useDispatch } from 'react-redux'
import { markSquare, jumpTo, generateGame, doPlay } from '../redux/reducer';
import Board from './Board';

function Game () {

  const dispatch = useDispatch();
  const id = useSelector(state => state.id);
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
          onClick={(i) => dispatch(doPlay(i))}
        />
      </div>
      <div className="game-info">
        <div>{ id }</div>
        <div>{ status }</div>
        <ol>{ moves }</ol>        

        <div>
          <button onClick={() => dispatch(generateGame()) }>GENERATE GAME ID</button>
        </div>
   
      </div>
    </div>
  );
}

export default Game;
