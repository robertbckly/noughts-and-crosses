import { MutableRefObject, useEffect } from 'react';

export type UseElementSizeTrackerArgs = {
  boardRef: MutableRefObject<HTMLElement | null>;
  squareRef: MutableRefObject<HTMLElement | null>;
  onBoardSizeChange: (size: number) => void;
  onSquareSizeChange: (size: number) => void;
};

export function useElementSizeTracker({
  boardRef,
  squareRef,
  onBoardSizeChange,
  onSquareSizeChange,
}: UseElementSizeTrackerArgs) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === boardRef.current) {
          onBoardSizeChange(entry.contentBoxSize[0]?.blockSize || 0);
        }
        if (entry.target === squareRef.current) {
          onSquareSizeChange(entry.contentBoxSize[0]?.blockSize || 0);
        }
      });
    });

    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    }
    if (squareRef.current) {
      resizeObserver.observe(squareRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [boardRef, onBoardSizeChange, onSquareSizeChange, squareRef]);
}
