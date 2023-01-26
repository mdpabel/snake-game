import { useCallback, useState } from 'react';
import useSound from 'use-sound';

import { BOARD_SIZE } from '../utils/getBoards';
import { foodPosition } from '../utils/foodPosition';
import { useSetState } from './useSetState';
import snakeFoodSound from '../assets/snakeSoundEating.mp3';
import gameOverSound from '../assets/gameOver.mp3';
import { DoublyLinkedList } from '../utils/DoublyLinkedList';
import { useTopScore } from './useTopScore';

const crossBoundary = [-1, BOARD_SIZE];

const initialFoodPosition = 22;
const initialScore = 0;

const snakeLL = new DoublyLinkedList({
  row: 4,
  col: 4,
  cell: 45,
});

export const useGame = () => {
  const [snakeFoodConsumedSound] = useSound(snakeFoodSound);
  const [snakeGameOverSound] = useSound(gameOverSound);
  const [score, setScore] = useState(initialScore);
  const [food, setFood] = useState(initialFoodPosition);
  const [isGameOver, setIsGameOver] = useState(false);
  const [snake, setSnake] = useState(snakeLL);
  const [direction, setDirection] = useState('');
  const { setLocalStorageScore } = useTopScore();

  const snakeBody = useSetState([snake.head.val.cell]);

  const consumeFood = useCallback(
    ({ newRow, newCell, newCol }) => {
      snake.addToHead({
        row: newRow,
        col: newCol,
        cell: newCell,
      });
      setFood(() => foodPosition(1, 100, snakeBody));

      snakeBody.add(newCell);
    },
    [snakeBody, setFood]
  );

  const gameOver = useCallback(() => {
    setSnake(
      new DoublyLinkedList({
        row: 4,
        col: 4,
        cell: 45,
      })
    );

    setLocalStorageScore(score);

    setFood(initialFoodPosition);
    setScore(initialScore);
    setIsGameOver(false);
    setDirection('');
    snakeBody.clear();
    snakeBody.add(45);
  }, [snakeBody, setDirection, setIsGameOver, setScore, setFood]);

  const moveSnake = useCallback(
    ({ newCell, newCol, newRow }) => {
      if (isGameOver) {
        snakeGameOverSound();
        if (window.confirm('Game over')) {
          gameOver();
        }
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
    [setIsGameOver, snakeBody, consumeFood, setScore]
  );

  return {
    moveSnake,
    food,
    setFood,
    isGameOver,
    setIsGameOver,
    snakeBody,
    setDirection,
    direction,
    score,
    snake,
  };
};
