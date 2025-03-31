"use client"; // If using App Router

import { useEffect } from "react";
import Board from "@/components/Board";
import useGameLogic from "@/hooks/useGameLogic";
import Image from "next/image";

export default function Home() {
  const { board, score, gameOver, gameWon, move, restartGame,  } = useGameLogic();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
        move(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-white text-3xl font-bold mb-4">2048 Game</h1>
        <Board board={board} />
        <p className="text-white mt-4">Score: {score}</p>
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <p className="text-white text-2xl font-bold mb-4">Game Over!</p>
            <button
              onClick={restartGame}
              className="bg-red-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-red-600"
            >
              Restart Game
            </button>
          </div>
        )}
        {gameWon && <p className="text-green-500">You Win!</p>}
      </div>
    </>
  );
}
