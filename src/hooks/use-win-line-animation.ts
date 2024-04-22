import { MutableRefObject, useEffect } from 'react';
import { WinnerInfo } from '../types/types';
import { useMatchMedia } from './use-match-media';
import { BASE_TRANSITION_DURATION } from '../constants/constants';

// Approx. ratio of square-diagonal to square-side length
const DIAG_SCALE = 1.4142;

export type UseWinLineAnimationArgs = {
  ref: MutableRefObject<HTMLDivElement | null>;
  winnerInfo: WinnerInfo | null;
  boardSize: number | null;
  boardPixelSize: number | null;
  squarePixelSize: number | null;
};

export function useWinLineAnimation({
  ref,
  boardPixelSize,
  squarePixelSize,
  boardSize,
  winnerInfo,
}: UseWinLineAnimationArgs) {
  const motionDisabled = useMatchMedia('(prefers-reduced-motion)');

  useEffect(() => {
    const line = ref.current;
    if (!line || !boardPixelSize || !squarePixelSize || !boardSize) {
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

    const lineMarginX = squarePixelSize * 0.15;
    const lineOffsetY = line.clientHeight / 2;

    // Animation (duration is increased for longer diagonal)
    const duration = winnerInfo.line.type.includes('diag')
      ? BASE_TRANSITION_DURATION * DIAG_SCALE
      : BASE_TRANSITION_DURATION;
    line.style.width = `calc(100% - ${lineMarginX * 2}px`;
    line.style.transition = !motionDisabled
      ? `width ${duration}ms ease-in-out`
      : '';

    // Position for row
    if (winnerInfo.line.type === 'row') {
      const verticalOffset =
        (boardPixelSize / boardSize) * (0.5 + winnerInfo.line.index);
      line.style.top = `${verticalOffset - lineOffsetY}px`;
      line.style.left = `${lineMarginX}px`;
    }

    // Position for column
    if (winnerInfo.line.type === 'col') {
      line.style.transform = 'rotate(90deg)';
      const horizontalOffset =
        (boardPixelSize / boardSize) * (0.5 + winnerInfo.line.index);
      line.style.left = `${horizontalOffset}px`;
      line.style.top = `${lineMarginX - lineOffsetY}px`;
    }

    // Position for positive diagonal
    if (winnerInfo.line.type === 'diag-pos') {
      line.style.width = `${(boardPixelSize - lineMarginX * 2) * DIAG_SCALE}px`;
      line.style.transform = 'rotate(45deg)';
      line.style.left = `${lineMarginX}px`;
      line.style.top = `${-lineOffsetY + lineMarginX}px`;
    }

    // Position for negative diagonal
    if (winnerInfo.line.type === 'diag-neg') {
      line.style.width = `${(boardPixelSize - lineMarginX * 2) * DIAG_SCALE}px`;
      // Purposefully not `-45deg` in order to animate correctly
      line.style.transform = 'rotate(135deg)';
      line.style.left = `${boardPixelSize - lineMarginX}px`;
      line.style.top = `${-lineOffsetY + lineMarginX}px`;
    }
  }, [
    boardPixelSize,
    boardSize,
    motionDisabled,
    ref,
    squarePixelSize,
    winnerInfo,
  ]);
}
