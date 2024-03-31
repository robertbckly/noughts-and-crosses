import { PLAYERS } from '../constants/constants';

export type Player = (typeof PLAYERS)[number];

export type Board = (Player | null)[];

export type WinnerInfo = {
  player: Player;
  line: {
    type: 'row' | 'col' | 'diag';
    index: number;
  };
};
