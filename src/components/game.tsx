import { useRef } from 'react';
import { SIZE, BASE_TRANSITION_DURATION } from '../constants/constants';
import { getSquareLabel } from '../utils/utils';
import { WinLine } from './win-line';
import { useTheme, useElementSizes, useGameLogic } from '../hooks/hooks';

/**
 * TODO:
 *  - Add dynamic board size control (just for fun)
 *  - Test in other browsers / OSs
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

  const [theme, setTheme] = useTheme();

  return (
    <div className="m-auto flex min-h-full max-w-lg flex-col gap-4 p-4">
      <aside className="flex items-center justify-between gap-2">
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
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
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
            className="aspect-square overflow-hidden border-2 border-black font-bold leading-none transition-colors ease-linear motion-reduce:transition-none dark:border-white dark:text-white"
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
      <aside className="mt-auto">
        <button
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label={theme === 'light' ? 'Use dark theme' : 'Use light theme'}
          className="ml-auto flex items-center gap-2 p-2 text-sm leading-none opacity-70"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
          <span className="h-4 w-4 rounded-full border-[0.2rem] border-black dark:border-white dark:bg-white" />
        </button>
      </aside>
    </div>
  );
}
