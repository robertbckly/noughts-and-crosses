import { Board } from '../types/types';

export function createInitialBoard(boardSize: number): Board {
  return Array<Board[number]>(boardSize * boardSize).fill(null);
}
