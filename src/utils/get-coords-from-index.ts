export type GetCoordsFromIndexArgs = {
  index: number;
  boardSize: number;
};

export function getCoordsFromIndex({
  index,
  boardSize,
}: GetCoordsFromIndexArgs): [number, number] {
  // [col, row]
  return [index % boardSize, Math.floor(index / boardSize)];
}
