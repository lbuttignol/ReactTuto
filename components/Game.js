import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import Board from './Board';
import { undoMove, 
         updateState,
         createGame,
         gameCreated,
         doPlay,
         receivePlay } from '../redux/reducer';

function Game() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.id); 
  const current = useSelector(state => state.current);
  const winner = useSelector(state =>state.winner);
  const xIsNext = useSelector(state => state.xIsNext);
  const socket = io();
  
  useEffect(() => {
    socket.on('gameCreated', (newData) => {
      dispatch(gameCreated(newData));
    });
  
    socket.on('boxMarked', (newData) => {
      dispatch(receivePlay(newData));
    });

    socket.on('updateState', (newData) => {
      dispatch(updateState(newData));
    });
  });

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
          onClick={ (i) => dispatch(doPlay(socket, i)) }
        />
      </div>
      <div className='game-info'>
        <div>{ id }</div>
        <div>{ status }</div>

        <div>
          <button onClick={ () => dispatch(createGame(socket)) }>GENERATE GAME ID</button>
        </div>
        
        <div>
          <button onClick={ () => dispatch(undoMove(socket)) }>Undo Move</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
