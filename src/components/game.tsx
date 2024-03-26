import { SIZE } from '../constants/constants';
import { useGameLogic } from '../hooks/use-game-logic';
import { getCoordsFromIndex } from '../utils/utils';

export function Game() {
  const {
    board,
    player,
    winner,
    isNewGame,
    isGameOver,
    handleMove,
    handleReset,
  } = useGameLogic();

  return (
    <div className="m-4">
      <main className="flex flex-wrap border border-black bg-black">
        {board.map((square, index) => (
          <button
            // Board squares will never change position in array.
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            onClick={() => handleMove(Number(index))}
            disabled={Boolean(square || winner)}
            aria-label={`Square 
              ${getCoordsFromIndex(Number(index))}:
              ${square || 'empty'}`}
            className="aspect-square flex-shrink-0 overflow-hidden border border-black bg-white text-4xl font-bold"
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
