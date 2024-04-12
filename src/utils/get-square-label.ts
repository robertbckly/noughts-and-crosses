import { getCoordsFromIndex } from './get-coords-from-index';

export function getSquareLabel(index: number, value: string | null): string {
  const [col, row] = getCoordsFromIndex(index);
  return `Column ${col + 1}, Row ${row + 1}: ${value || 'empty'}`;
}
