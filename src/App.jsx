import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetState } from './../hooks/useSetState';

const BOARD_SIZE = 10;

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(head) {
    this.head = null;
    this.tail = null;

    this.addToHead(head);
  }

  addToTail(val) {
    let newNode = new Node(val);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;

    return this.tail;
  }

  addToHead(val) {
    let newNode = new Node(val);
    if (this.head) {
      this.head.prev = newNode;
      newNode.next = this.head;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;

    return this.head;
  }

  removeTail() {
    if (!this.tail) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;

    return this.tail;
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getCell = (row, col) => {
  return row * BOARD_SIZE + col + 1;
};

const getBoards = (size) => {
  const boards = [];
  let count = 1;

  for (let i = 1; i <= size; i++) {
    const board = [];
    for (let j = 1; j <= size; j++) {
      board.push(count);
      count += 1;
    }
    boards.push(board);
  }
  return boards;
};

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

const Board = ({ num, board, snakeBody, footCell }) => {
  return (
    <div
      className={clsx({
        'flex items-center justify-center w-[50px] h-[50px]': true,
        'bg-lime-300': (num + board[0]) % 2 == 0,
        'bg-lime-400': (num + board[0]) % 2 == 1,
        'bg-red-700': snakeBody,
        'bg-orange-500': footCell,
      })}
    >
      {JSON.stringify(board)}
    </div>
  );
};

const snake = new DoublyLinkedList({
  row: 4,
  col: 4,
  cell: 45,
});

function App() {
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
      const newCell = getCell(newRow, newCol);

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
              <Board
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

export default App;
