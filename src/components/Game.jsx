import React from 'react';
import { useGame } from '../hooks/useGame';
import { DoublyLinkedList } from '../utils/DoublyLinkedList';
import Board from './Board';

const snake = new DoublyLinkedList({
  row: 4,
  col: 4,
  cell: 45,
});

const Game = () => {
  const { moveSnake, food, snakeBody, score } = useGame(snake);

  return (
    <div>
      <div>score : {score} </div>
      <Board
        snake={snake}
        moveSnake={moveSnake}
        food={food}
        snakeBody={snakeBody}
      />
    </div>
  );
};

export default Game;
