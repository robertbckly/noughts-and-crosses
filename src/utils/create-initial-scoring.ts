export type CreateInitialScoringArgs = {
  boardSize: number;
};

export function createInitialScoring({ boardSize }: CreateInitialScoringArgs) {
  return {
    rows: Array<number>(boardSize).fill(0),
    cols: Array<number>(boardSize).fill(0),
    posDiagonal: 0,
    negDiagonal: 0,
  };
}
