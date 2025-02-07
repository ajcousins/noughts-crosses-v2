import { useState } from 'react';
import { getInitialBoard, borderStyle, getWinningBoard } from './helpers/board';
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
  const [winningHighlight, setWinningHighlight] = useState(null);
  const [board, setBoard] = useState(getInitialBoard(BOARD_COORDS));
  const [turn, setTurn] = useState(X);

  const handleClick = (clickedSq) => {
    if (winningHighlight) return;
    const newBoard = board.map((sq) =>
      sq.coord === clickedSq.coord ? { ...sq, val: turn } : sq
    );
    const winner = getWinningBoard(newBoard, turn);
    if (winner) {
      setWinningHighlight(winner);
    }
    setBoard(newBoard);
    setTurn(turn === X ? O : X);
  };

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
