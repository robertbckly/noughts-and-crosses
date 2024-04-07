import { useEffect, useRef, useState } from 'react';
import { SIZE } from '../constants/constants';
import { useGameLogic } from '../hooks/use-game-logic';
import { getCoordsFromIndex } from '../utils/utils';

/**
 * TODO:
 * Refactor positive/negative diagonal code such that it's the type, and
 * I'm not relying on index being 0 or 1 to denote positive or negative.
 *
 * Refactor `getIndexesInWinningLine()`
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

  const [squareSize, setSquareSize] = useState(0);
  const lastSquareRef = useRef<HTMLButtonElement | null>(null);

  // Track square size in order to adjust font size
  useEffect(() => {
    let resizeObserver: ResizeObserver;
    const squareToMeasure = lastSquareRef?.current;
    if (squareToMeasure) {
      resizeObserver = new ResizeObserver((entries) => {
        setSquareSize(entries[0]?.contentBoxSize[0]?.blockSize || 0);
      });
      resizeObserver.observe(squareToMeasure);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="m-auto h-full max-w-lg p-4">
      <aside className="mb-8 mt-4 flex items-start">
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
      <main className="flex flex-wrap border-2 border-white">
        {board.map((square, index) => (
          <button
            // Add ref to last square
            ref={index === board.length - 1 ? lastSquareRef : undefined}
            // Board squares will never change position in array.
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            onClick={() => handleMove(Number(index))}
            disabled={Boolean(square || winnerInfo)}
            aria-label={`Square 
              ${getCoordsFromIndex(Number(index))}:
              ${square || 'empty'}`}
            className="aspect-square flex-shrink-0 overflow-hidden border-2 border-white font-bold leading-none"
            style={{
              width: `${(1 / SIZE) * 100}%`,
              fontSize: `${squareSize * 0.8}px`,
              backgroundColor: winnerInfo?.line.squareIndexes.includes(index)
                ? 'rgb(100, 125, 255)'
                : undefined,
            }}
          >
            {square}
          </button>
        ))}
      </main>
    </div>
  );
}
