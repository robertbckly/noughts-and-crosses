import { useRef, useState } from 'react';
import { SIZE } from '../constants/constants';
import { useGameLogic } from '../hooks/use-game-logic';
import { getCoordsFromIndex } from '../utils/utils';
import { WinLine } from './win-line';
import { useElementSizeTracker } from '../hooks/use-element-size-tracker';

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
  const [boardSize, setBoardSize] = useState(0);
  const [squareSize, setSquareSize] = useState(0);
  const boardRef = useRef<HTMLElement | null>(null);
  const firstSquareRef = useRef<HTMLButtonElement | null>(null);
  useElementSizeTracker({
    boardRef,
    squareRef: firstSquareRef,
    onBoardSizeChange: setBoardSize,
    onSquareSizeChange: setSquareSize,
  });

  return (
    <div className="m-auto h-full max-w-lg p-4">
      <aside className="mb-8 mt-4 flex items-center gap-2">
        <p className="break-keep text-2xl font-bold">
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
      <main
        ref={boardRef}
        className="relative flex flex-wrap overflow-hidden border-2 border-white"
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
            // Board squares will never change position in array (NOTE: unless board size is made dynamic).
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            onClick={() => handleMove(Number(index))}
            disabled={Boolean(square || winnerInfo)}
            aria-label={`Square 
              ${getCoordsFromIndex(Number(index))}:
              ${square || 'empty'}`}
            className="aspect-square flex-shrink-0 overflow-hidden border-2 border-white font-bold leading-none transition-colors duration-200 ease-linear"
            style={{
              width: `${(1 / SIZE) * 100}%`,
              fontSize: `${squareSize * 0.8}px`,
              backgroundColor: winnerInfo?.line.squareIndexes.includes(index)
                ? 'rgb(90, 210, 110)'
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
