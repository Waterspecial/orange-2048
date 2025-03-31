import React from 'react';
import Tile from './Tile';

type BoardProps = {
  board: number[][];
};

const Board = ({board}: BoardProps) => {
    return (
        <div className="grid grid-cols-4 gap-2 p-4 bg-gray-800 rounded-md">
          {board.map((row, rowIndex) =>
            row.map((num, colIndex) => (
              <Tile key={`${rowIndex}-${colIndex}`} value={num} />
            ))
          )}
        </div>
      );
    }

    export default Board;