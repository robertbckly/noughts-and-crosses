import { useRef } from 'react';
import { WinLine } from './win-line';
import { useTheme, useElementSizes, useGameLogic } from '../hooks/hooks';
import { ThemeButton } from './theme-button';
import { Square } from './square';
import { StatusMessage } from './status-message';
import { ResetButton } from './reset-button';

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
      <aside className="my-2 flex items-center justify-between gap-2">
        <StatusMessage
          isGameOver={isGameOver}
          player={player}
          winnerInfo={winnerInfo}
        />
        <ResetButton isNewGame={isNewGame} onClick={handleReset} />
      </aside>

      <main
        ref={boardRef}
        className="relative flex flex-wrap overflow-hidden rounded-sm border-2 border-black dark:border-white"
      >
        {board.map((value, index) => (
          <Square
            // Board squares will never change position in array
            // (NOTE: unless board size is made dynamic)
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            // Add ref only to first square
            ref={index === 0 ? firstSquareRef : undefined}
            index={index}
            value={value}
            pixelSize={squareSize}
            winnerInfo={winnerInfo}
            onClick={() => handleMove(index)}
          />
        ))}
        <WinLine
          winnerInfo={winnerInfo}
          boardSize={boardSize}
          squareSize={squareSize}
        />
      </main>

      <aside className="mt-auto flex justify-end">
        <ThemeButton theme={theme} onChange={setTheme} />
      </aside>
    </div>
  );
}
