import { useRef, useState } from 'react';
import { INIT_SIZE } from '../../constants/constants';
import { useTheme, useElementSizes, useGameLogic } from '../../hooks/hooks';
import { StatusMessage } from '../header/status-message';
import { ResetButton } from '../header/reset-button';
import { SizeSelect } from '../footer/size-select';
import { ThemeButton } from '../footer/theme-button';
import { Square } from './square';
import { WinLine } from './win-line';

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
  const [firstSquare, setFirstSquare] = useState<HTMLButtonElement | null>(
    null,
  );
  const { boardSize: boardPixelSize, squareSize: squarePixelSize } =
    useElementSizes({
      boardRef,
      squareElement: firstSquare,
    });

  const [theme, setTheme] = useTheme();

  return (
    <div className="m-auto flex min-h-full max-w-lg flex-col gap-4 p-4 pb-6">
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
            // Items in `board` array have constant indexes for each
            // `boardSize` value. Can safely ignore lint error.
            // eslint-disable-next-line react/no-array-index-key
            key={`${boardSize}-${index}`}
            // Add ref only to first square (callback-style to make it reactive)
            ref={index === 0 ? setFirstSquare : undefined}
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
        className="mt-auto flex flex-wrap justify-between text-sm font-bold"
      >
        <SizeSelect
          isNewGame={isNewGame}
          onChange={(newBoardSize) => {
            setBoardSize(newBoardSize);
            handleReset({ newBoardSize });
          }}
        />
        <ThemeButton theme={theme} onChange={setTheme} />
      </aside>
    </div>
  );
}
