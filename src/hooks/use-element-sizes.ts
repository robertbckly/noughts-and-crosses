import { MutableRefObject, useEffect, useState } from 'react';

export type UseElementSizesArgs = {
  boardRef: MutableRefObject<HTMLElement | null>;
  squareRef: MutableRefObject<HTMLElement | null>;
};

export function useElementSizes({ boardRef, squareRef }: UseElementSizesArgs) {
  const [boardSize, setBoardSize] = useState(0);
  const [squareSize, setSquareSize] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === boardRef.current) {
          setBoardSize(entry.contentBoxSize[0]?.blockSize || 0);
        }
        if (entry.target === squareRef.current) {
          setSquareSize(entry.contentBoxSize[0]?.blockSize || 0);
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
  }, [boardRef, squareRef]);

  return { boardSize, squareSize };
}
