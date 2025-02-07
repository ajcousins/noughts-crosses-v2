export const getInitialBoard = (coords) =>
  coords.map((coord) => ({ coord, val: null }));

export const borderStyle = (sq) => {
  const BORDER_STYLE = '2px solid white';
  let style = {};
  if (sq.coord[0] === '0' || sq.coord[0] === '1') {
    style.borderBottom = BORDER_STYLE;
  }
  if (sq.coord[0] === '1' || sq.coord[0] === '2') {
    style.borderTop = BORDER_STYLE;
  }
  if (sq.coord[1] === '0' || sq.coord[1] === '1') {
    style.borderRight = BORDER_STYLE;
  }
  if (sq.coord[1] === '1' || sq.coord[1] === '2') {
    style.borderLeft = BORDER_STYLE;
  }
  return style;
};

const boardsOverlap = (winningBoard, gameBoard) => {
  let count = 0;
  for (let i = 0; i < winningBoard.length; i++) {
    if (winningBoard[i] === 1 && winningBoard[i] === gameBoard[i]) count++;
    if (count === 3) return true;
  }
  return false;
};

export const getWinningBoard = (board, mark) => {
  const winningBoards = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
  ];
  const reduced = board.map((sq) => (sq.val === mark ? 1 : 0));
  const winnerIndex = winningBoards.findIndex((b) => boardsOverlap(b, reduced));

  if (winnerIndex === -1) return null;
  return winningBoards[winnerIndex];
};
