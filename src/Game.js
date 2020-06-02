import React from 'react';
import { connect } from 'react-redux'
import { markSquare } from './reducer';
import Board from './Board';

class Game extends React.Component {
  jumpTo(step) {
    // this.setState({
    //   stepNumber: step,
    //   xIsNext: (step % 2) === 0,
    // });
  }
  
  render() {
    const state = this.props.allState;
    const history = state.history;
    const current = history[state.stepNumber];
    const winner = state.winner;
    
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        // adding move id
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.props.markSquare(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// this is to add the state inside the props
const mapStateToProps = (state) =>{
  return {
    allState: state
  }
};

// this is to add the function in the props
const mapDispatchToProps = { markSquare };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
