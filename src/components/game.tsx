import { useState } from 'react';

type Player = '0' | 'X';
type Board = {
  [Key: number]: {
    value: Player | null;
  };
};

const SIZE = 3;
const FIRST_PLAYER: Player = '0';

function createInitialBoard(): Board {
  const board: Partial<Board> = {};

  for (let i = 0; i < SIZE * SIZE; i += 1) {
    board[i] = { value: null };
  }

  // TODO: don't like this type assertion
  return board as Board;
}

function checkGameOver(board: Board): boolean {
  return Object.entries(board).every(([, square]) => square.value);
}

export function Game() {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [player, setPlayer] = useState<Player>(FIRST_PLAYER);
  const [winner, setWinner] = useState<Player | null>(null);

  const [scoring, setScoring] = useState({
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    posDiagonal: 0,
    negDiagonal: 0,
  });

  // It's a new game if there are no squares with a truthy value
  const isNewGame = !Object.entries(board).find(([, square]) => square.value);

  function handleSquareClick(index: keyof Board) {
    // Fail-safe
    if (board[index]?.value || winner) {
      return;
    }

    const newBoard = {
      ...board,
      [index]: { ...board[index], value: player },
    };

    setBoard(newBoard);

    const col = index % SIZE;
    const row = Math.floor(index / SIZE);
    const playerValue = player === '0' ? -1 : 1;

    const newScoring = { ...scoring };

    // TODO: scoring doesn't work

    // Cols and rows
    newScoring.cols[col] += playerValue;
    newScoring.rows[row] += playerValue;

    // Positive diagonal
    if (col === row) {
      newScoring.posDiagonal += playerValue;
    }

    // Negative diagonal
    if (SIZE - col - 1 === row) {
      newScoring.negDiagonal += playerValue;
    }

    setScoring(newScoring);

    if (
      Math.abs(newScoring.cols[col] || 0) === SIZE ||
      Math.abs(newScoring.rows[row] || 0) === SIZE ||
      Math.abs(newScoring.posDiagonal) === SIZE ||
      Math.abs(newScoring.negDiagonal) === SIZE
    ) {
      setWinner(player);
    }

    // TODO: is there a 'cheaper' way of calculating the following...
    // given the logic above?
    // ...
    // If game-over, end game
    if (checkGameOver(newBoard)) {
      return;
    }

    // Otherwise, continue
    setPlayer(player === '0' ? 'X' : '0');
  }

  function handleReset() {
    setBoard(createInitialBoard());
    setPlayer(FIRST_PLAYER);
    setWinner(null);
  }

  return (
    <div className="m-4">
      <main className="flex flex-wrap border border-black bg-black">
        {Object.entries(board).map(([key, square]) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSquareClick(Number(key))}
            disabled={Boolean(square.value)}
            // TODO: use coordinate in a11y label
            aria-label={`Square ${key}: ${square.value}`}
            // TODO: support dynamic width based on `SIZE`
            className="aspect-square w-1/3 flex-shrink-0 border border-black bg-white text-4xl font-bold"
          >
            {square.value}
          </button>
        ))}
      </main>
      <aside className="mt-4 flex items-center">
        <p>{winner ? `Winner: ${winner}` : `It's ${player}'s go`}</p>
        <button
          type="button"
          onClick={handleReset}
          disabled={isNewGame}
          className="ml-auto rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Reset
        </button>
      </aside>
    </div>
  );
}
