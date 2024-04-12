import { SIZE } from '../constants/constants';
import { Board, Line } from '../types/types';

export function createInitialBoard(): Board {
  return Array<Board[number]>(SIZE * SIZE).fill(null);
}

export function getCoordsFromIndex(index: number): [number, number] {
  // [col, row]
  return [index % SIZE, Math.floor(index / SIZE)];
}

export function getSquareLabel(index: number, value: string | null): string {
  const [col, row] = getCoordsFromIndex(index);
  return `Column ${col + 1}, Row ${row + 1}: ${value || 'empty'}`;
}

export function getIndexesInWinningLine({
  lineType,
  lineIndex,
}: {
  lineType: Line;
  lineIndex: number;
}): number[] {
  if (lineType === 'row') {
    const startIndex = lineIndex * SIZE;
    return [...Array(SIZE)].map((_, arrayIndex) => startIndex + arrayIndex);
  }

  if (lineType === 'col') {
    const indexes = [lineIndex];
    for (let i = 0; i < SIZE - 1; i += 1) {
      indexes.push(indexes[i]! + SIZE);
    }
    return indexes;
  }

  if (lineType === 'diag-pos') {
    const indexes = [0];
    for (let i = 0; i < SIZE - 1; i += 1) {
      indexes.push(indexes[i]! + SIZE + 1);
    }
    return indexes;
  }

  if (lineType === 'diag-neg') {
    const indexes = [SIZE - 1];
    for (let i = 0; i < SIZE - 1; i += 1) {
      indexes.push(indexes[i]! + SIZE - 1);
    }
    return indexes;
  }

  return [];
}
