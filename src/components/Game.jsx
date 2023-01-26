import React from 'react';
import { useGame } from '../hooks/useGame';
import Board from './Board';
import Score from './Score';

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
      <Score score={score} />
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
