import { useEffect, useState } from 'react';
import {
  getInitialBoard,
  borderStyle,
  getWinningBoard,
  allSquaresAreOcupied,
  updateBoard
} from './helpers/board';
import { getBestMove } from './helpers/ai';
import X_image from './assets/X_02.png';
import O_image from './assets/O_02.png';
import './App.css';

const BOARD_COORDS = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
const X = 'X';
const O = 'O';

const cellImage = (sq) => {
  if (sq.val === X) {
    return <img src={X_image} />;
  }
  if (sq.val === O) {
    return <img src={O_image} />;
  }
  return null;
};

function App() {
  const [gameIsOver, setGameIsOver] = useState(false);
  const [winningHighlight, setWinningHighlight] = useState(null);
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [board, setBoard] = useState(getInitialBoard(BOARD_COORDS));
  const [turn, setTurn] = useState(X);

  const handleClick = (clickedSq) => {
    if (winningHighlight) return;
    const newBoard = updateBoard(board, clickedSq, turn);
    const { winningBoard } = getWinningBoard(newBoard, turn);
    if (winningBoard) {
      setWinningHighlight(winningBoard);
      setGameIsOver(true);
    }
    if (allSquaresAreOcupied(newBoard)) {
      setGameIsOver(true);
    }
    setBoard(newBoard);
    setIsAiTurn(!isAiTurn);
    setTurn(turn === X ? O : X);
  };

  useEffect(() => {
    if (!isAiTurn || gameIsOver) {
      return;
    }
    const { bestMove } = getBestMove(board.map((sq) => (sq.val ? sq.val : '')));
    handleClick(board[bestMove.move]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAiTurn]);

  return (
    <div>
      <div className='board-wrapper'>
        <div className='board'>
          {board.map((sq, i) => {
            let highlight =
              winningHighlight && winningHighlight[i] === 1 ? 'highlight' : '';

            return (
              <span
                className={`cell-container ${highlight}`}
                key={sq.coord}
                style={borderStyle(sq)}
                onClick={() => handleClick(sq)}
              >
                {cellImage(sq)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

/**
 * TODO:
 * Reset button when game is finished.
 * "You go first" button at start of game.
 * Delay for AI move.
 * Dissappearing oldest marks.
 */
