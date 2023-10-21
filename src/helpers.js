export const isSafe = (board, row, col, n) => {
    for (let i=0;i<col;i++){
        if (board[row][i] === 1) return false;
  }

  // Check upper diagonal on left side
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) return false;
  }

  // Check lower diagonal on left side
  for (let i = row, j = col; i < n && j >= 0; i++, j--) {
    if (board[i][j] === 1) return false;
  }

  return true;
};

export const isSolution = (board, n) => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) return false;
    }
  }
  return true;
};       
    