import { useSelector, useDispatch } from 'react-redux';
import { undoMove, 
         createGame,
         gameCreated,
         doPlay } from '../redux/reducer';
import { useEffect } from 'react';
import io from 'socket.io-client';
import Board from './Board';

function Game() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.id); 
  const current = useSelector(state => state.current);
  const winner = useSelector(state =>state.winner);
  const xIsNext = useSelector(state => state.xIsNext);
  const aux = [];
  const socket = io();
  
  useEffect(() => {
    socket.on('now', data => {
      console.log('Get the message');
      aux[0] = data.message;
      console.log(aux);
    });

    socket.on('gameCreated', (newData) => {
      console.log("Component get a gameCreated: ",newData);
      dispatch(gameCreated(newData));
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
          onClick={ (i) => dispatch(doPlay(i)) }
        />
      </div>
      <div className='game-info'>
        <div>{ id }</div>
        <div>{ status }</div>
        <div>{ aux[0] }</div>

        <div>
          <button onClick={ () => dispatch(createGame(socket)) }>GENERATE GAME ID</button>
        </div>
        
        <div>
          <button onClick={ () => dispatch(undoMove()) }>Undo Move</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
