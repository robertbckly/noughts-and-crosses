import { useRef } from 'react';
import { SIZE, BASE_TRANSITION_DURATION } from '../constants/constants';
import { getSquareLabel } from '../utils/utils';
import { WinLine } from './win-line';
import { useAutoDarkMode, useElementSizes, useGameLogic } from '../hooks/hooks';

/**
 *
 * TODO:
 *  - Add dark-mode override
 *  - Add dynamic board size control (just for fun)
 *  - Investigate random animation lag
 *  - Test in other browsers / OSs
 *
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

  // Track board & square sizes in order to adjust font size
  const boardRef = useRef<HTMLElement | null>(null);
  const firstSquareRef = useRef<HTMLButtonElement | null>(null);
  const { boardSize, squareSize } = useElementSizes({
    boardRef,
    squareRef: firstSquareRef,
  });

  useAutoDarkMode();

  return (
    <div className="m-auto h-full max-w-lg p-4">
      <aside className="mb-8 mt-4 flex items-center gap-2">
        <p role="alert" className="break-keep text-2xl font-bold">
          {!winnerInfo && !isGameOver && `It's ${player}'s go`}
          {!winnerInfo && isGameOver && 'Game over :-('}
          {!!winnerInfo && (
            <span className="animate-pulse motion-reduce:animate-none">{`Winner: ${winnerInfo.player}`}</span>
          )}
        </p>

        <button
          type="button"
          onClick={handleReset}
          disabled={isNewGame}
          className="ml-auto rounded-md bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          Reset
        </button>
      </aside>
      <main
        ref={boardRef}
        className="relative flex flex-wrap overflow-hidden rounded-sm border-2 border-black dark:border-white"
      >
        <WinLine
          winnerInfo={winnerInfo}
          boardSize={boardSize}
          squareSize={squareSize}
        />
        {board.map((square, index) => (
          <button
            // Add ref only to first square
            ref={index === 0 ? firstSquareRef : undefined}
            // Board squares will never change position in array
            // (NOTE: unless board size is made dynamic)
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            onClick={() => handleMove(Number(index))}
            disabled={Boolean(square || winnerInfo)}
            aria-label={getSquareLabel(index, square)}
            className="aspect-square flex-shrink-0 overflow-hidden border-2 border-black font-bold leading-none transition-colors ease-linear motion-reduce:transition-none dark:border-white dark:text-white"
            style={{
              width: `${(1 / SIZE) * 100}%`,
              fontSize: `${squareSize * 0.8}px`,
              backgroundColor: winnerInfo?.line.squareIndexes.includes(index)
                ? 'rgb(90, 210, 110)'
                : undefined,
              transitionDuration: `${BASE_TRANSITION_DURATION / 3}ms`,
            }}
          >
            {square}
          </button>
        ))}
      </main>
    </div>
  );
}
