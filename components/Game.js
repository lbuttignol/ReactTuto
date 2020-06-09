import { useSelector, useDispatch } from 'react-redux'
import { undoMove, generateGame, doPlay } from '../redux/reducer';
import Board from './Board';

function Game () {

  const dispatch = useDispatch();
  const id = useSelector(state => state.id);
  const stepNumber = useSelector(state => state.stepNumber); 
  const current = useSelector(state => state.current);
  const winner = useSelector(state =>state.winner);
  const xIsNext = useSelector(state => state.xIsNext);

  const moves = () =>{
    if (stepNumber >= 1){
      return (
        <li key={stepNumber - 1}>
          <button onClick={() => dispatch(undoMove()) }>Undo Move</button>
        </li>
      );
    }else{
      return null;
    }
  }


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
          squares={current}
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
