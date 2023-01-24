import { useCallback, useEffect, useRef, useState } from 'react';
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

function Board() {
  const [boards, setBoards] = useState(getBoards(BOARD_SIZE));
  const [food, setFood] = useState(22);
  const currentDirection = useRef('ArrowRight');

  const snakeBody = useSetState([snake.head.val.cell]);

  const moveSnake = ({ newCell, newCol, newRow }) => {
    snakeBody.delete(snake.tail.val.cell);
    snakeBody.add(newCell);

    snake.removeTail();
    snake.addToHead({
      row: newRow,
      col: newCol,
      cell: newCell,
    });
  };

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

  const handleKeyDown = useCallback(
    (e) => {
      const isAllowed =
        currentDirection.current &&
        allowDirections[currentDirection.current].has(e.key);

      if (!isAllowed) {
        return;
      }

      if (!directions[e.key] || snake.length === 0 || e.key === '') {
        return;
      }
      currentDirection.current = e.key;

      const [row, col] = directions[e.key];

      const newRow = snake.head.val.row + row;
      const newCol = snake.head.val.col + col;
      const newCell = getCell(newRow, newCol, BOARD_SIZE);

      if (newCell === food) {
        consumeFood({ newRow, newCell, newCol });
      } else {
        moveSnake({ newRow, newCell, newCol });
      }
    },
    [food]
  );

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
