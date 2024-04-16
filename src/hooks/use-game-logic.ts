import { useState } from 'react';
import { Board, Line, Player, WinnerInfo } from '../types/types';
import { FIRST_PLAYER, PLAYERS } from '../constants/constants';
import {
  createInitialBoard,
  createInitialScoring,
  getCoordsFromIndex,
  getIndexesInWinningLine,
} from '../utils/utils';

export type UseGameLogicArgs = {
  boardSize: number;
};

export function useGameLogic({ boardSize }: UseGameLogicArgs) {
  const [board, setBoard] = useState<Board>(createInitialBoard(boardSize));
  const [player, setPlayer] = useState<Player>(FIRST_PLAYER);
  const [turn, setTurn] = useState(0);
  const [scoring, setScoring] = useState(createInitialScoring(boardSize));
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);

  const isNewGame = turn === 0;
  const isGameOver = turn === boardSize * boardSize;

  function handleMove(index: number) {
    // Fail-safe
    if (board[index] || winnerInfo) {
      return;
    }

    // Increment turn
    const thisTurn = turn + 1;
    setTurn(thisTurn);

    // Add move to board
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    // Calculate scoring
    const newScoring = structuredClone(scoring);
    const [col, row] = getCoordsFromIndex({ index, boardSize });
    const playerValue = player === PLAYERS[0] ? -1 : 1;

    // ... cols and rows
    newScoring.cols[col] += playerValue;
    newScoring.rows[row] += playerValue;

    // ... positive diagonal
    if (col === row) {
      newScoring.posDiagonal += playerValue;
    }

    // ... negative diagonal
    if (boardSize - col - 1 === row) {
      newScoring.negDiagonal += playerValue;
    }

    setScoring(newScoring);

    // Check for winner and calculate info...

    const rowWin = Math.abs(newScoring.rows[row] || 0) === boardSize;
    const colWin = Math.abs(newScoring.cols[col] || 0) === boardSize;
    const posDiagWin = Math.abs(newScoring.posDiagonal) === boardSize;
    const negDiagWin = Math.abs(newScoring.negDiagonal) === boardSize;

    const winLineType: Line | null =
      (rowWin && 'row') ||
      (colWin && 'col') ||
      (posDiagWin && 'diag-pos') ||
      (negDiagWin && 'diag-neg') ||
      null;

    // eslint-disable-next-line no-nested-ternary
    const winLineIndex = rowWin ? row : colWin ? col : posDiagWin ? 0 : 1;

    // Winner
    if (winLineType && typeof winLineIndex === 'number') {
      setWinnerInfo({
        player,
        line: {
          type: winLineType,
          index: winLineIndex,
          squareIndexes: getIndexesInWinningLine({
            lineType: winLineType,
            lineIndex: winLineIndex,
            boardSize,
          }),
        },
      });
      return;
    }

    // If no winner, check if game over
    if (thisTurn === boardSize * boardSize) {
      return;
    }

    // Otherwise, continue
    setPlayer(player === PLAYERS[0] ? PLAYERS[1] : PLAYERS[0]);
  }

  function handleReset(args?: { newBoardSize: number }) {
    setBoard(createInitialBoard(args?.newBoardSize || boardSize));
    setPlayer(FIRST_PLAYER);
    setTurn(0);
    setScoring(createInitialScoring(boardSize));
    setWinnerInfo(null);
  }

  return {
    board,
    winnerInfo,
    player,
    isNewGame,
    isGameOver,
    handleMove,
    handleReset,
  };
}
