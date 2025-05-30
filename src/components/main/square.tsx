import { forwardRef } from 'react';
import { Player, WinnerInfo } from '../../types/types';
import { getSquareLabel } from '../../utils/utils';
import { BASE_TRANSITION_DURATION } from '../../constants/constants';

export type SquareProps = {
  index: number;
  value: Player | null;
  boardSize: number;
  pixelSize: number;
  winnerInfo: WinnerInfo | null;
  onClick: () => void;
};

export const Square = forwardRef<HTMLButtonElement, SquareProps>(
  ({ index, value, boardSize, pixelSize, winnerInfo, onClick }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={Boolean(value || winnerInfo)}
      aria-label={getSquareLabel({ index, boardSize, value })}
      className="aspect-square overflow-hidden border-2 border-black font-bold leading-none transition-[background] ease-linear motion-reduce:transition-none dark:border-white dark:text-white"
      style={{
        width: `${(1 / boardSize) * 100}%`,
        fontSize: pixelSize ? `${pixelSize * 0.8}px` : '1rem',
        backgroundColor: winnerInfo?.line.squareIndexes.includes(index)
          ? 'rgb(90, 210, 110)'
          : undefined,
        transitionDuration: `${BASE_TRANSITION_DURATION / 3}ms`,
      }}
    >
      {value}
    </button>
  ),
);
