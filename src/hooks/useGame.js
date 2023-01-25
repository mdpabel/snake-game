import { useCallback, useState } from 'react';
import useSound from 'use-sound';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BOARD_SIZE } from '../utils/getBoards';
import { randomNumber } from '../utils/rendomNumber';
import { useSetState } from './useSetState';
import snakeFoodSound from '../assets/snakeSoundEating.mp3';
import { DoublyLinkedList } from '../utils/DoublyLinkedList';

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
  const [score, setScore] = useState(initialScore);
  const [food, setFood] = useState(initialFoodPosition);
  const [isGameOver, setIsGameOver] = useState(false);
  const [snake, setSnake] = useState(snakeLL);
  const [direction, setDirection] = useState('');

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

  console.log(snakeBody.values());

  const gameOver = useCallback(() => {
    setSnake(
      new DoublyLinkedList({
        row: 4,
        col: 4,
        cell: 45,
      })
    );

    setFood(initialFoodPosition);
    setScore(initialScore);
    setIsGameOver(false);
    setDirection('');
    snakeBody.clear();
    snakeBody.add(45);
  }, [snakeBody, direction, isGameOver, score, food, snake]);

  const moveSnake = useCallback(
    ({ newCell, newCol, newRow }) => {
      if (isGameOver) {
        // confirmAlert({
        //   title: 'Confirm to submit',
        //   message: 'Are you sure to do this.',
        //   buttons: [
        //     {
        //       label: 'Yes',
        //       onClick: () => alert('Click Yes'),
        //     },
        //     {
        //       label: 'No',
        //       onClick: () => alert('Click No'),
        //     },
        //   ],
        // });

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
    [isGameOver, food, snakeBody, consumeFood, score]
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
