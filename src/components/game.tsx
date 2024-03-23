import { useState } from 'react';

type Player = '0' | 'X';
type Board = (Player | null)[];

const SIZE = 3;
const FIRST_PLAYER: Player = '0';
const INIT_SCORING = {
  rows: Array<number>(SIZE).fill(0),
  cols: Array<number>(SIZE).fill(0),
  posDiagonal: 0,
  negDiagonal: 0,
};

function createInitialBoard(): Board {
  return Array<Board[number]>(SIZE * SIZE).fill(null);
}

function getCoordsFromIndex(index: number): [number, number] {
  // [row, col]
  return [index % SIZE, Math.floor(index / SIZE)];
}

function checkGameOver(board: Board): boolean {
  return board.every(Boolean);
}

export function Game() {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [player, setPlayer] = useState<Player>(FIRST_PLAYER);
  const [winner, setWinner] = useState<Player | null>(null);
  const [scoring, setScoring] = useState(structuredClone(INIT_SCORING));

  // It's a new game if there are no squares with a truthy value
  const isNewGame = !board.find(Boolean);
  const isGameOver = checkGameOver(board);

  function handleMove(index: number) {
    // Fail-safe
    if (board[index] || winner) {
      return;
    }

    // Add move to board
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    // Calculate scoring
    const newScoring = structuredClone(scoring);
    const [col, row] = getCoordsFromIndex(index);
    const playerValue = player === '0' ? -1 : 1;

    // ... cols and rows
    newScoring.cols[col] += playerValue;
    newScoring.rows[row] += playerValue;

    // ... positive diagonal
    if (col === row) {
      newScoring.posDiagonal += playerValue;
    }

    // ... negative diagonal
    if (SIZE - col - 1 === row) {
      newScoring.negDiagonal += playerValue;
    }

    setScoring(newScoring);

    // Check for winner
    if (
      Math.abs(newScoring.cols[col] || 0) === SIZE ||
      Math.abs(newScoring.rows[row] || 0) === SIZE ||
      Math.abs(newScoring.posDiagonal) === SIZE ||
      Math.abs(newScoring.negDiagonal) === SIZE
    ) {
      setWinner(player);
      return;
    }

    // If no winner, check if game over
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
    setScoring(structuredClone(INIT_SCORING));
  }

  return (
    <div className="m-4">
      <main className="flex flex-wrap border border-black bg-black">
        {board.map((square, key) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            type="button"
            onClick={() => handleMove(Number(key))}
            disabled={Boolean(square || winner)}
            aria-label={`Square 
              ${getCoordsFromIndex(Number(key))}:
              ${square || 'empty'}`}
            className="aspect-square flex-shrink-0 border border-black bg-white text-4xl font-bold"
            style={{ width: `${(1 / SIZE) * 100}%` }}
          >
            {square}
          </button>
        ))}
      </main>
      <aside className="mt-4 flex items-center">
        {!winner && !isGameOver && `It's ${player}'s go`}
        {!winner && isGameOver && 'Game over :-('}
        {!!winner && `Winner: ${winner}`}

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
