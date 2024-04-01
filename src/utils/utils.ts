import { SIZE } from '../constants/constants';
import { Board, Line } from '../types/types';

export function createInitialBoard(): Board {
  return Array<Board[number]>(SIZE * SIZE).fill(null);
}

export function getCoordsFromIndex(index: number): [number, number] {
  // [row, col]
  return [index % SIZE, Math.floor(index / SIZE)];
}

// TODO: refactor
export function getIndexesInWinningLine({
  lineType,
  lineIndex,
}: {
  lineType: Line;
  lineIndex: number;
}): number[] {
  if (lineType === 'row') {
    const startIndex = lineIndex * SIZE;
    return Array.from(Array(SIZE)).map(
      (_, arrayIndex) => startIndex + arrayIndex,
    );
  }

  if (lineType === 'col') {
    const indexes = [lineIndex];
    for (let i = 0; i < SIZE - 1; i += 1) {
      indexes.push(indexes[i]! + SIZE);
    }
    return indexes;
  }

  // Positive diagonal
  if (lineType === 'diag' && lineIndex === 0) {
    const indexes = [0];
    for (let i = 0; i < SIZE - 1; i += 1) {
      indexes.push(indexes[i]! + SIZE + 1);
    }
    return indexes;
  }

  // Negative diagonal
  if (lineType === 'diag' && lineIndex === 1) {
    const indexes = [SIZE - 1];
    for (let i = 0; i < SIZE - 1; i += 1) {
      indexes.push(indexes[i]! + SIZE - 1);
    }
    return indexes;
  }

  return [];
}
