import { useRef } from 'react';
import { useWinLineAnimation } from '../../hooks/use-win-line-animation';
import { WinnerInfo } from '../../types/types';

export type WinLineProps = {
  boardPixelSize: number | null;
  squarePixelSize: number | null;
  boardSize: number | null;
  winnerInfo: WinnerInfo | null;
};

/**
 * Animated win line.
 * Note: this expects to be inside a positioning context (i.e. a positioned element).
 */
export function WinLine({
  boardPixelSize,
  squarePixelSize,
  boardSize,
  winnerInfo,
}: WinLineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useWinLineAnimation({
    ref,
    boardPixelSize,
    squarePixelSize,
    boardSize,
    winnerInfo,
  });

  return (
    <div
      ref={ref}
      aria-hidden
      // Starts with no width; animates when displayed
      className="origin-center-left pointer-events-none absolute h-2 w-0 rounded-sm bg-black opacity-80 shadow-md dark:bg-white"
      style={{
        visibility: winnerInfo ? 'visible' : 'hidden',
      }}
    />
  );
}
