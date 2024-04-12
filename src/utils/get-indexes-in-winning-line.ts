import { SIZE } from '../constants/constants';
import { Line } from '../types/types';

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
