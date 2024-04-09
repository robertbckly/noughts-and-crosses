import { useRef } from 'react';
import { useWinLineAnimation } from '../hooks/use-win-line-animation';
import { WinnerInfo } from '../types/types';

export type WinLineProps = {
  squareSize: number | null;
  boardSize: number | null;
  winnerInfo: WinnerInfo | null;
};

/**
 * Animated win line.
 * Note: this expects to be inside a positioning context (i.e. a positioned element).
 */
export function WinLine({ squareSize, boardSize, winnerInfo }: WinLineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useWinLineAnimation({ ref, squareSize, boardSize, winnerInfo });

  return (
    <div
      ref={ref}
      aria-hidden
      // Starts with no width; animates when displayed
      className="pointer-events-none absolute h-2 w-0 origin-top-left rounded-sm bg-black opacity-80 shadow-md dark:bg-white"
      style={{
        visibility: winnerInfo ? 'visible' : 'hidden',
      }}
    />
  );
}
