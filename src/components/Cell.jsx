import clsx from 'clsx';
import food from '../assets/apple.png';

const Cell = ({ num, board, snakeBody, foodCell }) => {
  return (
    <div
      style={{
        backgroundImage: foodCell ? `url(${food})` : '',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
      className={clsx({
        'flex items-center justify-center w-[50px] h-[50px]': true,
        'bg-lime-300': (num + board[0]) % 2 == 0,
        'bg-lime-400': (num + board[0]) % 2 == 1,
        'bg-red-700': snakeBody,
      })}
    ></div>
  );
};

export default Cell;
