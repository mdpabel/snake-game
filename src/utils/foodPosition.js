export function foodPosition(min, max, snakeBody) {
  console.log(snakeBody);

  let randomPosition = Math.floor(Math.random() * (max - min + 1) + min);

  while (snakeBody.has(randomPosition)) {
    randomPosition = Math.floor(Math.random() * (max - min + 1) + min);
  }

  return randomPosition;
}
