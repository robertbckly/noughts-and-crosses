import { SIZE } from '../constants/constants';
import { Board } from '../types/types';

export function createInitialBoard(): Board {
  return Array<Board[number]>(SIZE * SIZE).fill(null);
}

export function getCoordsFromIndex(index: number): [number, number] {
  // [row, col]
  return [index % SIZE, Math.floor(index / SIZE)];
}
