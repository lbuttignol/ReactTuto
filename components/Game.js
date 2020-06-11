import { useSelector, useDispatch } from 'react-redux';
import { undoMove, generateGame, doPlay } from '../redux/reducer';
import Board from './Board';

function Game() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.id); 
  const current = useSelector(state => state.current);
  const winner = useSelector(state =>state.winner);
  const xIsNext = useSelector(state => state.xIsNext);

  let status;
  status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  if(winner) {
    status = 'Winner: ' + winner;
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={ current }
          onClick={ (i) => dispatch(doPlay(i)) }
        />
      </div>
      <div className='game-info'>
        <div>{ id }</div>
        <div>{ status }</div>

        <div>
          <button onClick={ () => dispatch(generateGame()) }>GENERATE GAME ID</button>
        </div>
        
        <div>
          <button onClick={ () => dispatch(undoMove()) }>Undo Move</button>
        </div>
   
      </div>
    </div>
  );
};

export default Game;
