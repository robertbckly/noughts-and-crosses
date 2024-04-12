import { SIZE } from '../constants/constants';

export function getCoordsFromIndex(index: number): [number, number] {
  // [col, row]
  return [index % SIZE, Math.floor(index / SIZE)];
}
