import { PLAYERS } from '../constants/constants';

export type Player = (typeof PLAYERS)[number];
export type Board = (Player | null)[];
