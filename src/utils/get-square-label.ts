import { getCoordsFromIndex } from './get-coords-from-index';

export type GetSquareLabelArgs = {
  index: number;
  boardSize: number;
  value: string | null;
};

export function getSquareLabel({
  index,
  boardSize,
  value,
}: GetSquareLabelArgs): string {
  const [col, row] = getCoordsFromIndex({ index, boardSize });
  return `Column ${col + 1}, Row ${row + 1}: ${value || 'empty'}`;
}
