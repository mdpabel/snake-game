import React from 'react';
import { useGame } from '../hooks/useGame';
import Board from './Board';

const Game = () => {
  const {
    moveSnake,
    snake,
    setIsGameOver,
    isGameOver,
    food,
    snakeBody,
    setDirection,
    direction,
    score,
  } = useGame();

  return (
    <div>
      <div className='py-4 text-2xl text-center'>Score : {score} </div>
      <Board
        snake={snake}
        moveSnake={moveSnake}
        food={food}
        setDirection={setDirection}
        direction={direction}
        snakeBody={snakeBody}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      />
    </div>
  );
};

export default Game;
