import { useCallback, useEffect, useState, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { BOARD_SIZE, getBoards } from '../utils/getBoards';
import { getCell } from '../utils/getCell';
import Cell from './Cell';

const directions = {
  ArrowRight: [0, 1],
  ArrowDown: [1, 0],
  ArrowUp: [-1, 0],
  ArrowLeft: [0, -1],
};

const allowDirections = {
  ArrowLeft: new Set(['ArrowDown', 'ArrowUp', 'ArrowLeft']),
  ArrowRight: new Set(['ArrowDown', 'ArrowUp', 'ArrowRight']),
  ArrowDown: new Set(['ArrowDown', 'ArrowLeft', 'ArrowRight']),
  ArrowUp: new Set(['ArrowUp', 'ArrowLeft', 'ArrowRight']),
};

function Board({
  snake,
  moveSnake,
  food,
  snakeBody,
  setIsGameOver,
  setDirection,
  direction,
}) {
  const boards = getBoards(BOARD_SIZE);
  const directionRef = useRef(direction);

  const handleKeyDown = useCallback(
    (e) => {
      const isAllowed =
        directionRef.current &&
        allowDirections[directionRef.current] &&
        allowDirections[directionRef.current].has(e.key);

      if (!isAllowed && direction !== '') {
        console.log(isAllowed);
        return;
      }
      directionRef.current = e.key;
      setDirection(e.key);
    },
    [setDirection, directionRef.current]
  );

  useEffect(() => {
    if (direction === '') {
      return;
    }

    console.log(direction);

    if (!directions[direction]) {
      return;
    }

    const [row, col] = directions[direction];

    const newRow = snake.head.val.row + row;
    const newCol = snake.head.val.col + col;
    const newCell = getCell(newRow, newCol, BOARD_SIZE);

    if (snakeBody.has(newCell)) {
      setIsGameOver(true);
      return;
    }

    const intervalId = setInterval(
      () => moveSnake({ newRow, newCell, newCol }),
      200
    );

    return () => clearInterval(intervalId);
  }, [direction, snake.head, moveSnake]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, setIsGameOver]);

  return (
    <div className='flex flex-col'>
      {boards.map((board, row) => (
        <div key={row} className='flex justify-center'>
          {board.map((num, col) => (
            <Cell
              key={num}
              num={num}
              board={[row, col]}
              snakeBody={snakeBody.has(num)}
              foodCell={food === num}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
