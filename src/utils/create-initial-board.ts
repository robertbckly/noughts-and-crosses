import { Board } from '../types/types';

export type CreateInitialBoardArgs = {
  boardSize: number;
};

export function createInitialBoard({
  boardSize,
}: CreateInitialBoardArgs): Board {
  return Array<Board[number]>(boardSize * boardSize).fill(null);
}
