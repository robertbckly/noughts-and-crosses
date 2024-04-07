export const SIZE = 3;
export const PLAYERS = ['0', 'X'] as const;
export const FIRST_PLAYER = PLAYERS[0];
export const INIT_SCORING = {
  rows: Array<number>(SIZE).fill(0),
  cols: Array<number>(SIZE).fill(0),
  posDiagonal: 0,
  negDiagonal: 0,
};
export const WIN_LINE_TRANSITION_DURATION = 0.4; // seconds
