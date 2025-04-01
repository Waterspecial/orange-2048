"use client"; // If using App Router

import { useEffect, useState } from "react";
import Board from "@/components/Board";
import useGameLogic from "@/hooks/useGameLogic";
import { motion } from "framer-motion";
import RulesModal from "@/components/RulesModal";

export default function Home() {
  const [rules, setRules] = useState(false);
  const { board, score, gameOver, gameWon, move, restartGame, highScore } =
    useGameLogic();

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
      <div className="w-screen h-screen">
        <div className="flex justify-end p-4">
          <div
            onClick={() => setRules(true)}
            className="bg-white font-semibold leading-5 text-[#282A3A] p-2 rounded-md shadow-lg cursor-pointer"
          >
            How to play
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-10">
          <div className="flex items-end justify-between rounded-lg text-white w-[456px] mb-4 font-semibold text-lg">
            <p className="bg-white font-medium text-[14px] leading-5 text-[#282A3A] p-2 rounded-md shadow-lg">
              BEST:{" "}
              <span className="text-orange-500 text-[16px] leading-6 font-semibold ml-[2px]">
                {highScore}
              </span>
            </p>

            <p className="bg-[#282A3A] font-medium text-[14px] leading-5 p-2 rounded-md text-white">
              SCORE{" "}
              <span className="text-orange-500 text-[16px] leading-6 font-semibold ml-[2px]">
                {score}
              </span>
            </p>
          </div>
          <Board board={board} />
          {gameOver && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 150,
              }}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-white text-[14px] font-bold my-2">
                Game Over!
              </p>
              <button
                onClick={restartGame}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-[12px] font-semibold hover:bg-red-600 cursor-pointer"
              >
                Restart Game
              </button>
            </motion.div>
          )}
          {gameWon && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 150,
              }}
              className="text-green-500 font-bold mt-3 flex flex-col items-center justify-center text-[14px] "
            >
              <p>🎉 Incredible! You Conquered 2048! 🚀</p>
              <button
                onClick={restartGame}
                className="mt-2 bg-green-500 text-white px-3 py-2 text-[14px]  rounded-md text-lg font-semibold hover:bg-green-600 cursor-pointer"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </div>
        <footer className="absolute bottom-4 right-4 text-white">
          <p className="text-sm font-semibold">
            From {""}
            <a className="underline text-orange-500" href="https://x.com/Waterspecial1" target="_blank">
              Water {""}
            </a>
            with ❤️
          </p>
        </footer>
        
      </div>
      {rules && <RulesModal closeModal={() => setRules(false)} />}
    </>
  );
}
