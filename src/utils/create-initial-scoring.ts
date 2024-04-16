export function createInitialScoring(boardSize: number) {
  return {
    rows: Array<number>(boardSize).fill(0),
    cols: Array<number>(boardSize).fill(0),
    posDiagonal: 0,
    negDiagonal: 0,
  };
}
