function getBoard(dimension: number) {
  const board = [];
  for (let x = 1; x <= dimension; x++) {
    for (let y = 1; y <= dimension; y++) {
      board.push(`${x}+${y}+playerId`);
    }
  }
  return board.join(';');
}

export default getBoard;
