import clsx from 'clsx';

const Cell = ({ num, board, snakeBody, footCell }) => {
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

export default Cell;
