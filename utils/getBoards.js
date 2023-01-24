export const getBoards = (size) => {
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
