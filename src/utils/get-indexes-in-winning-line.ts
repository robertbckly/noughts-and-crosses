import { Line } from '../types/types';

export type GetIndexesInWinningLineArgs = {
  lineType: Line;
  lineIndex: number;
  boardSize: number;
};

export function getIndexesInWinningLine({
  lineType,
  lineIndex,
  boardSize,
}: GetIndexesInWinningLineArgs): number[] {
  if (lineType === 'row') {
    const startIndex = lineIndex * boardSize;
    return [...Array(boardSize)].map(
      (_, arrayIndex) => startIndex + arrayIndex,
    );
  }

  if (lineType === 'col') {
    const indexes = [lineIndex];
    for (let i = 0; i < boardSize - 1; i += 1) {
      indexes.push(indexes[i]! + boardSize);
    }
    return indexes;
  }

  if (lineType === 'diag-pos') {
    const indexes = [0];
    for (let i = 0; i < boardSize - 1; i += 1) {
      indexes.push(indexes[i]! + boardSize + 1);
    }
    return indexes;
  }

  if (lineType === 'diag-neg') {
    const indexes = [boardSize - 1];
    for (let i = 0; i < boardSize - 1; i += 1) {
      indexes.push(indexes[i]! + boardSize - 1);
    }
    return indexes;
  }

  return [];
}
