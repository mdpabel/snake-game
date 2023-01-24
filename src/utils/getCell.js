export const getCell = (row, col, BOARD_SIZE) => {
  return row * BOARD_SIZE + col + 1;
};
