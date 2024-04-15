import { useRef, useState } from 'react';
import { WinLine } from './win-line';
import { useTheme, useElementSizes, useGameLogic } from '../../hooks/hooks';
import { ThemeButton } from '../footer/theme-button';
import { Square } from './square';
import { StatusMessage } from '../header/status-message';
import { ResetButton } from '../header/reset-button';
import { INIT_SIZE, SIZES } from '../../constants/constants';

/**
 * TODO:
 *  - Add dynamic board size control (just for fun)
 *  - Test in other browsers / OSs
 */

export function Game() {
  const [boardSize, setBoardSize] = useState<number>(INIT_SIZE);
  const {
    board,
    player,
    winnerInfo,
    isNewGame,
    isGameOver,
    handleMove,
    handleReset,
  } = useGameLogic({ boardSize });

  // Track board & square sizes in order to adjust font size
  const boardRef = useRef<HTMLElement | null>(null);
  const firstSquareRef = useRef<HTMLButtonElement | null>(null);
  const { boardSize: boardPixelSize, squareSize: squarePixelSize } =
    useElementSizes({
      boardRef,
      squareRef: firstSquareRef,
    });

  const [theme, setTheme] = useTheme();

  return (
    <div className="m-auto flex min-h-full max-w-lg flex-col gap-4 p-4">
      <aside
        aria-label="Info and reset"
        className="my-2 flex items-center justify-between gap-2"
      >
        <StatusMessage
          isGameOver={isGameOver}
          player={player}
          winnerInfo={winnerInfo}
        />
        <ResetButton isNewGame={isNewGame} onClick={handleReset} />
      </aside>

      <main
        ref={boardRef}
        aria-label="Game board"
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
            boardSize={boardSize}
            pixelSize={squarePixelSize}
            winnerInfo={winnerInfo}
            onClick={() => handleMove(index)}
          />
        ))}
        <WinLine
          winnerInfo={winnerInfo}
          boardSize={boardSize}
          boardPixelSize={boardPixelSize}
          squarePixelSize={squarePixelSize}
        />
      </main>

      <aside
        aria-label="Settings"
        className="mt-auto flex flex-wrap justify-between text-sm font-bold opacity-80"
      >
        <label
          htmlFor="grid-size-select"
          className="flex items-center gap-2"
          style={{ opacity: isNewGame ? 1 : 0.5 }}
        >
          Grid size
          <select
            id="grid-size-select"
            disabled={!isNewGame}
            className="cursor-pointer appearance-none rounded border-none bg-black px-2 py-1 font-normal leading-none text-white disabled:cursor-default dark:bg-white dark:text-black"
            onChange={(e) => {
              const newBoardSize = Number(e.target.value);
              setBoardSize(newBoardSize);
              handleReset({ newBoardSize });
            }}
          >
            {SIZES.map((size) => (
              <option key={size} value={size}>{`${size}x${size}`}</option>
            ))}
          </select>
        </label>

        <ThemeButton theme={theme} onChange={setTheme} />
      </aside>
    </div>
  );
}
