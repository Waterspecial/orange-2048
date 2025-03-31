export const shiftLeft = (board: number[][]): number[][] => {
    return board.map(row => {
      let newRow = row.filter(val => val !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow[i + 1] = 0;
        }
      }
      return newRow.filter(val => val !== 0).concat(Array(4).fill(0)).slice(0, 4);
    });
  };
  
  export const shiftRight = (board: number[][]): number[][] => {
    return board.map(row => {
      const reversedRow = row.slice().reverse(); // Reverse the row
      const shiftedReversedRow = shiftLeft([reversedRow])[0]; // Apply shiftLeft, extract first row
      return shiftedReversedRow.reverse(); // Reverse it back
    });
  };
  
  export const shiftUp = (board: number[][]): number[][] => {
    let transposed = board[0].map((_, col) => board.map(row => row[col]));
    transposed = shiftLeft(transposed);
    return transposed[0].map((_, col) => transposed.map(row => row[col]));
  };
  
  export const shiftDown = (board: number[][]): number[][] => {
    let transposed = board[0].map((_, col) => board.map(row => row[col]));
    transposed = shiftRight(transposed);
    return transposed[0].map((_, col) => transposed.map(row => row[col]));
  };
  
  export const addNewTile = (board: number[][]): number[][] => {
    let emptyCells: [number, number][] = [];
    board.forEach((row, r) => row.forEach((cell, c) => cell === 0 && emptyCells.push([r, c])));
  
    if (emptyCells.length === 0) return board;
  
    let [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
    return board;
  };
  

  export const checkWin = (board: number[][]): boolean => {
    return board.some(row => row.includes(2048));
  };
  
  // ✅ Check if the game is over (no moves left)
  export const checkLoss = (board: number[][]): boolean => {
    // If there are empty cells, game is not over
    if (board.some(row => row.includes(0))) return false;
  
    // Check if any adjacent tiles are mergeable
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          (c < 3 && board[r][c] === board[r][c + 1]) || // Check right
          (r < 3 && board[r][c] === board[r + 1][c])    // Check down
        ) {
          return false;
        }
      }
    }
  
    return true; 
  };

  export const calculateScore = (oldBoard: number[][], newBoard: number[][]): number => {
    let score = 0;
  
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (newBoard[r][c] !== 0 && newBoard[r][c] !== oldBoard[r][c]) {
          score += newBoard[r][c]; // Add merged tile values to score
        }
      }
    }
  
    return score;
  };