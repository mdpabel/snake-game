import { useCallback, useEffect, useState } from 'react';
import { useSetState } from '../hooks/useSetState';
import { DoublyLinkedList } from '../utils/DoublyLinkedList';
import { getBoards } from '../utils/getBoards';
import { getCell } from '../utils/getCell';
import { randomNumber } from '../utils/rendomNumber';
import Cell from './Cell';

const directions = {
  ArrowRight: [0, 1],
  ArrowDown: [1, 0],
  ArrowUp: [-1, 0],
  ArrowLeft: [0, -1],
};

const BOARD_SIZE = 10;

const allowDirections = {
  ArrowLeft: new Set(['ArrowDown', 'ArrowUp', 'ArrowLeft']),
  ArrowRight: new Set(['ArrowDown', 'ArrowUp', 'ArrowRight']),
  ArrowDown: new Set(['ArrowDown', 'ArrowLeft', 'ArrowRight']),
  ArrowUp: new Set(['ArrowUp', 'ArrowLeft', 'ArrowRight']),
};

const snake = new DoublyLinkedList({
  row: 4,
  col: 4,
  cell: 45,
});

const crossBoundary = [-1, BOARD_SIZE];

function Board() {
  const boards = getBoards(BOARD_SIZE);
  const [food, setFood] = useState(22);
  const [direction, setDirection] = useState('ArrowRight');
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
    [isGameOver, food, snakeBody, consumeFood]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const isAllowed = direction && allowDirections[direction].has(e.key);

      console.log(direction);

      if (!isAllowed) {
        return;
      }

      if (!directions[e.key] || snake.length === 0 || e.key === '') {
        return;
      }

      setDirection(e.key);
    },
    [direction]
  );

  useEffect(() => {
    const [row, col] = directions[direction];

    const newRow = snake.head.val.row + row;
    const newCol = snake.head.val.col + col;
    const newCell = getCell(newRow, newCol, BOARD_SIZE);

    const intervalId = setInterval(
      () => moveSnake({ newRow, newCell, newCol }),
      1000
    );

    return () => clearInterval(intervalId);
  }, [direction, snake.head, moveSnake]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex flex-col'>
        {boards.map((board, row) => (
          <div key={row} className='flex justify-center'>
            {board.map((num, col) => (
              <Cell
                key={num}
                num={num}
                board={[row, col]}
                snakeBody={snakeBody.has(num)}
                footCell={food === num}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
