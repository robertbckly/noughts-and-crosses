import { SIZE } from '../constants/constants';
import { useGameLogic } from '../hooks/use-game-logic';
import { getCoordsFromIndex } from '../utils/utils';

/**
 * TODO:
 * Adapt winner info logic to provide x3 indexes to simplify rendering
 * the winning squares, i.e. line.
 */

export function Game() {
  const {
    board,
    player,
    winnerInfo,
    isNewGame,
    isGameOver,
    handleMove,
    handleReset,
  } = useGameLogic();

  return (
    <div className="m-auto max-w-lg p-4">
      <main className="flex flex-wrap border border-white">
        {board.map((square, index) => (
          <button
            // Board squares will never change position in array.
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            onClick={() => handleMove(Number(index))}
            disabled={Boolean(square || winnerInfo)}
            aria-label={`Square 
              ${getCoordsFromIndex(Number(index))}:
              ${square || 'empty'}`}
            className="aspect-square flex-shrink-0 overflow-hidden border border-white text-4xl font-bold"
            style={{
              width: `${(1 / SIZE) * 100}%`,
              backgroundColor: index % 2 === 0 ? 'cyan' : undefined,
            }}
          >
            {square}
          </button>
        ))}
      </main>
      <aside className="mt-4 flex items-center">
        <p className="text-lg font-bold">
          {!winnerInfo && !isGameOver && `It's ${player}'s go`}
          {!winnerInfo && isGameOver && 'Game over :-('}
          {!!winnerInfo && (
            <span className="animate-pulse">{`Winner: ${winnerInfo.player}`}</span>
          )}
        </p>

        <button
          type="button"
          onClick={handleReset}
          disabled={isNewGame}
          className="ml-auto rounded-md bg-white px-4 py-2 text-black disabled:opacity-50"
        >
          Reset
        </button>
      </aside>
    </div>
  );
}
