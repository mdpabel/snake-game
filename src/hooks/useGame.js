import { useCallback, useState } from 'react';
import useSound from 'use-sound';

import { BOARD_SIZE } from '../utils/getBoards';
import { randomNumber } from '../utils/rendomNumber';
import { useSetState } from './useSetState';
import snakeFoodSound from '../assets/snakeSoundEating.mp3';

const crossBoundary = [-1, BOARD_SIZE];

export const useGame = (snake) => {
  const [snakeFoodConsumedSound, { stop }] = useSound(snakeFoodSound);
  const [score, setScore] = useState(0);
  const [food, setFood] = useState(22);
  const [isGameOver, setIsGameOver] = useState(false);

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
        setIsGameOver(true);
        console.log('Game over');
        return;
      }

      if (newCell === food) {
        snakeFoodConsumedSound();
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
    setIsGameOver,
    snakeBody,
    score,
  };
};
