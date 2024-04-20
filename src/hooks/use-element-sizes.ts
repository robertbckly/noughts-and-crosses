import { MutableRefObject, useEffect, useState } from 'react';

export type UseElementSizesArgs = {
  boardRef: MutableRefObject<HTMLElement | null>;
  squareElement: HTMLElement | null;
};

export function useElementSizes({
  boardRef,
  squareElement,
}: UseElementSizesArgs) {
  const [boardSize, setBoardSize] = useState(0);
  const [squareSize, setSquareSize] = useState(0);

  useEffect(() => {
    const handleResizes: ResizeObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const size = entry.contentBoxSize[0]?.blockSize || 0;
        if (entry.target === boardRef.current) {
          setBoardSize(size);
        }
        if (entry.target === squareElement) {
          setSquareSize(size);
        }
      });
    };

    const resizeObserver = new ResizeObserver(handleResizes);

    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    }
    if (squareElement) {
      resizeObserver.observe(squareElement);
    }
    return () => resizeObserver.disconnect();
  }, [boardRef, squareElement]);

  return { boardSize, squareSize };
}
