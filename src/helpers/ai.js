const playerToMove = (board) => {
  let countX = 0;
  let countO = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] == 'X') {
      countX++;
    }
    if (board[i] == 'O') {
      countO++;
    }
  }
  if (countX > countO) {
    return 'O';
  } else {
    return 'X';
  }
};

// Returns array indices of possble moves.
const actionsList = (board) => {
  let set = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] == '') {
      set.push(i);
    }
  }
  return set;
};

// Takes a board and action as input and returns a new board state.
const result = (board, action) => {
  let index = action;
  let mark;
  let newBoard = [];
  for (let i = 0; i < 9; i++) {
    newBoard.push(board[i]);
  }

  if (playerToMove(board) === 'X') {
    mark = 'X';
  } else {
    mark = 'O';
  }
  if (board[index] != '') {
    return;
  } else {
    newBoard.splice(index, 1, mark);
  }

  return newBoard;
};

// Takes a board and returns the winner of the board if there is one.
const winner = (board) => {
  let winner = null;
  const winningBoard = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
  ];

  for (let h = 0; h < 2; h++) {
    let mark;
    h === 0 ? (mark = 'X') : (mark = 'O');
    for (let i = 0; i < 8; i++) {
      let count = 0;
      for (let j = 0; j < 9; j++) {
        if (board[j] == mark && winningBoard[i][j] === 1) {
          count++;
        }
      }
      if (count === 3) {
        winner = mark;
      }
    }
  }
  return winner;
};

// Returns boolean whether the game is over or not.
const terminal = (board) => {
  if (winner(board)) {
    return true;
  }
  if (!board.includes('')) {
    return true;
  }
  return false;
};

const utility = (board) => {
  if (winner(board) === 'X') {
    return 1;
  } else if (winner(board) === 'O') {
    return -1;
  } else if (terminal(board) === true) {
    return 0;
  }
};

// Minimax: takes board as input and outputs optimal move.
export const getBestMove = (board) => {
  // Checks whose move. Sets varable to X or O.
  const currentPlayer = playerToMove(board);
  let bestMove;

  if (currentPlayer == 'X') {
    bestMove = maxValue(board);
  } else {
    bestMove = minValue(board);
  }

  function maxValue(state) {
    if (terminal(state)) {
      return { value: utility(state) };
    }
    let legalMoves = actionsList(state);
    let v = -Infinity;
    let move;
    // For each legal move...
    for (let i = 0; i < legalMoves.length; i++) {
      let check = minValue(result(state, legalMoves[i])).value;
      if (check > v) {
        v = check;
        move = legalMoves[i];
      }
    }
    return { value: v, move: move };
  }

  function minValue(state) {
    if (terminal(state)) {
      return { value: utility(state) };
    }
    let legalMoves = actionsList(state);
    let v = Infinity;
    let move;
    // For each legal move...
    for (let i = 0; i < legalMoves.length; i++) {
      let check = maxValue(result(state, legalMoves[i])).value;
      if (check < v) {
        v = check;
        move = legalMoves[i];
      }
    }
    return { value: v, move: move };
  }
  return { bestMove };
};
