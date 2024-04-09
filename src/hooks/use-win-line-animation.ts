import { MutableRefObject, useEffect } from 'react';
import { WinnerInfo } from '../types/types';
import { BASE_TRANSITION_DURATION, SIZE } from '../constants/constants';
import { useMotionSetting } from './use-motion-setting';

export type UseWinLineAnimationArgs = {
  ref: MutableRefObject<HTMLDivElement | null>;
  squareSize: number | null;
  boardSize: number | null;
  winnerInfo: WinnerInfo | null;
};

export function useWinLineAnimation({
  ref,
  squareSize,
  boardSize,
  winnerInfo,
}: UseWinLineAnimationArgs) {
  const { motionDisabled } = useMotionSetting();

  useEffect(() => {
    const line = ref.current;
    if (!line || !squareSize || !boardSize) {
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

    const lineMarginX = squareSize * 0.15;
    const lineOffsetY = line.clientHeight / 2;

    // Animation (duration is increased for longer diagonal)
    const duration = winnerInfo.line.type.includes('diag')
      ? BASE_TRANSITION_DURATION * 1.42
      : BASE_TRANSITION_DURATION;
    line.style.width = `calc(100% - ${lineMarginX * 2}px`;
    line.style.transition = !motionDisabled
      ? `width ${duration}ms ease-in-out`
      : '';

    // Position for row
    if (winnerInfo.line.type === 'row') {
      const verticalOffset = (boardSize / SIZE) * (0.5 + winnerInfo.line.index);
      line.style.top = `${verticalOffset - lineOffsetY}px`;
      line.style.left = `${lineMarginX}px`;
    }

    // Position for column
    if (winnerInfo.line.type === 'col') {
      line.style.transform = 'rotate(90deg)';
      const horizontalOffset =
        (boardSize / SIZE) * (0.5 + winnerInfo.line.index);
      line.style.left = `${horizontalOffset + lineOffsetY}px`;
      line.style.top = `${lineMarginX}px`;
    }

    // Position for positive diagonal
    if (winnerInfo.line.type === 'diag-pos') {
      line.style.transform = 'rotate(45deg)';
      line.style.transform += 'scaleX(1.414)';
      line.style.left = `${lineOffsetY + lineMarginX}px`;
      line.style.top = `${lineMarginX}px`;
    }

    // Position for negative diagonal
    if (winnerInfo.line.type === 'diag-neg') {
      line.style.transform = 'rotate(135deg)';
      line.style.transform += 'scaleX(1.414)';
      line.style.left = `${boardSize + lineOffsetY - lineMarginX}px`;
      line.style.top = `${lineMarginX}px`;
    }
  }, [boardSize, motionDisabled, ref, squareSize, winnerInfo]);
}
