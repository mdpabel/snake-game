import { useCallback, useState } from 'react';
import { BOARD_SIZE } from '../utils/getBoards';
import { randomNumber } from '../utils/rendomNumber';
import { useSetState } from './useSetState';

const crossBoundary = [-1, BOARD_SIZE];

export const useGame = (snake) => {
  const [score, setScore] = useState(0);
  const [food, setFood] = useState(22);
  const [isGameOver, isSetGameOver] = useState(false);

  const snakeBody = useSetState([snake.head.val.cell]);

  const consumeFood = useCallback(
    ({ newRow, newCell, newCol }) => {
      snake.addToHead({
        row: newRow,
        col: newCol,
        cell: newCell,
      });
      setFood((prevFood) => randomNumber(1, 100));

      snakeBody.add(newCell);
    },
    [snakeBody, food]
  );

  const moveSnake = useCallback(
    ({ newCell, newCol, newRow }) => {
      if (isGameOver) {
        return;
      }

      if (crossBoundary.includes(newRow) || crossBoundary.includes(newCol)) {
        isSetGameOver(true);
        console.log('Game over');
        return;
      }

      if (newCell === food) {
        consumeFood({ newRow, newCell, newCol });
        setScore((prev) => prev + 1);
      } else {
        snakeBody.delete(snake.tail.val.cell);
        snakeBody.add(newCell);

        snake.removeTail();
        snake.addToHead({
          row: newRow,
          col: newCol,
          cell: newCell,
        });
      }
    },
    [isGameOver, food, snakeBody, consumeFood, score]
  );

  return {
    moveSnake,
    food,
    setFood,
    isGameOver,
    isSetGameOver,
    snakeBody,
    score,
  };
};
