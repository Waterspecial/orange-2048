import { useEffect, useState } from "react";
import {
  shiftLeft,
  shiftRight,
  shiftUp,
  shiftDown,
  addNewTile,
  checkWin,
  checkLoss,
  calculateScore,
} from "@/utils/gameHelpers";

const useGameLogic = () => {
  const initializeBoard = (): number[][] => {
    let newBoard = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0)); // Create empty board
    newBoard = addNewTile(newBoard); // Add first tile
    newBoard = addNewTile(newBoard); // Add second tile
    return newBoard;
  };
  const [board, setBoard] = useState<number[][]>(initializeBoard());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Fetch high score only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHighScore = Number(localStorage.getItem("highScore")) || 0;
      setHighScore(storedHighScore);
    }
  }, []);


  const move = (direction: string) => {
    let newBoard: number[][] = [];

    if (direction === "ArrowLeft") newBoard = shiftLeft(board);
    if (direction === "ArrowRight") newBoard = shiftRight(board);
    if (direction === "ArrowUp") newBoard = shiftUp(board);
    if (direction === "ArrowDown") newBoard = shiftDown(board);

     // Calculate new score (sum of merged tiles)
     const scoreGained = calculateScore(board, newBoard); // Calculate new score
     setScore(prevScore => {
      const updatedScore = prevScore + scoreGained;
  
      if (updatedScore > highScore) {
        localStorage.setItem("highScore", String(updatedScore));
        setHighScore(updatedScore);
      }
  
      return updatedScore;
    });
  

    newBoard = addNewTile(newBoard);

    setBoard(newBoard);
    setGameWon(checkWin(newBoard));
    setGameOver(checkLoss(newBoard));
  };

  const restartGame = () => {
    setBoard(initializeBoard());  // Reset board
    setScore(0);                  // Reset score
    setGameWon(false);             // Reset win state
    setGameOver(false);            // Reset loss state
  };

  return { board, score, gameOver, gameWon, move, restartGame, highScore };
};

export default useGameLogic;
