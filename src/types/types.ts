import { PLAYERS } from '../constants/constants';

export type Player = (typeof PLAYERS)[number];

export type Board = (Player | null)[];

export type Line = 'row' | 'col' | 'diag-pos' | 'diag-neg';

export type WinnerInfo = {
  player: Player;
  line: {
    type: Line;
    index: number;
    squareIndexes: number[];
  };
};
