import { useEffect, useRef, useState } from 'react';
import { SIZE } from '../constants/constants';
import { useGameLogic } from '../hooks/use-game-logic';
import { getCoordsFromIndex } from '../utils/utils';

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
  const boardRef = useRef<HTMLElement | null>(null);
  const lastSquareRef = useRef<HTMLButtonElement | null>(null);
  const winLineRef = useRef<HTMLDivElement | null>(null);

  // Track square size in order to adjust font size
  useEffect(() => {
    let resizeObserver: ResizeObserver;
    const squareToMeasure = lastSquareRef.current;
    if (squareToMeasure) {
      resizeObserver = new ResizeObserver((entries) => {
        setSquareSize(entries[0]?.contentBoxSize[0]?.blockSize || 0);
      });
      resizeObserver.observe(squareToMeasure);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Position the win line
  useEffect(() => {
    const boardEl = boardRef.current;
    const line = winLineRef.current;
    if (!boardEl || !line) {
      return;
    }

    // Reset
    if (!winnerInfo) {
      line.style.width = '0px';
      line.style.top = '';
      line.style.left = '';
      line.style.transform = '';
      return;
    }

    const lineMarginX = 24;
    const boardSize = boardEl.clientHeight;
    const lineOffset = line.clientHeight / 2;

    // Animation
    line.style.width = `calc(100% - ${lineMarginX * 2}px`;
    line.style.transition = 'width 0.5s ease-in-out';

    // Position for row
    if (winnerInfo.line.type === 'row') {
      const verticalOffset = (boardSize / SIZE) * (0.5 + winnerInfo.line.index);
      line.style.top = `${verticalOffset - lineOffset}px`;
      line.style.left = `${lineMarginX}px`;
    }

    // Position for column
    if (winnerInfo.line.type === 'col') {
      line.style.transform = 'rotate(90deg)';
      const horizontalOffset =
        (boardSize / SIZE) * (0.5 + winnerInfo.line.index);
      line.style.left = `${horizontalOffset + lineOffset}px`;
      line.style.top = `${lineMarginX}px`;
    }

    // Position for positive diagonal
    if (winnerInfo.line.type === 'diag-pos') {
      line.style.transform = 'rotate(45deg)';
      line.style.transform += 'scaleX(1.42)';
      line.style.left = `${lineOffset + lineMarginX}px`;
      line.style.top = `${lineMarginX}px`;
    }

    // Position for negative diagonal
    if (winnerInfo.line.type === 'diag-neg') {
      line.style.transform = 'rotate(135deg)';
      line.style.transform += 'scaleX(1.42)';
      line.style.left = `${boardSize + lineOffset - lineMarginX}px`;
      line.style.top = `${lineMarginX}px`;
    }
  }, [winnerInfo]);

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
        {/* Win line */}
        <div
          ref={winLineRef}
          aria-hidden
          // Starts with no width; animates when displayed
          className="pointer-events-none absolute h-2 w-0 origin-top-left rounded-sm bg-white opacity-80 shadow-md"
          style={{
            visibility: winnerInfo ? 'visible' : 'hidden',
          }}
        />
        {/* Squares */}
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
