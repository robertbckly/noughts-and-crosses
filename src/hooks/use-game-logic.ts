import { useState } from 'react';
import { Board, Player, WinnerInfo } from '../types/types';
import {
  FIRST_PLAYER,
  INIT_SCORING,
  PLAYERS,
  SIZE,
} from '../constants/constants';
import { createInitialBoard, getCoordsFromIndex } from '../utils/utils';

export function useGameLogic() {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [player, setPlayer] = useState<Player>(FIRST_PLAYER);
  const [turn, setTurn] = useState(0);
  const [scoring, setScoring] = useState(structuredClone(INIT_SCORING));
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);

  const isNewGame = turn === 0;
  const isGameOver = turn === SIZE * SIZE;

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
    const [col, row] = getCoordsFromIndex(index);
    const playerValue = player === PLAYERS[0] ? -1 : 1;

    // ... cols and rows
    newScoring.cols[col] += playerValue;
    newScoring.rows[row] += playerValue;

    // ... positive diagonal
    if (col === row) {
      newScoring.posDiagonal += playerValue;
    }

    // ... negative diagonal
    if (SIZE - col - 1 === row) {
      newScoring.negDiagonal += playerValue;
    }

    setScoring(newScoring);

    // Check for winner and calculate info...

    const rowWin = Math.abs(newScoring.rows[row] || 0) === SIZE;
    const colWin = Math.abs(newScoring.cols[col] || 0) === SIZE;
    const posDiagWin = Math.abs(newScoring.posDiagonal) === SIZE;
    const negDiagWin = Math.abs(newScoring.negDiagonal) === SIZE;

    const winLineType =
      (rowWin && 'row') ||
      (colWin && 'col') ||
      (posDiagWin && 'diag') ||
      (negDiagWin && 'diag');

    // eslint-disable-next-line no-nested-ternary
    const winLineIndex = rowWin ? row : colWin ? col : posDiagWin ? 0 : 1;

    // Winner
    if (winLineType && typeof winLineIndex === 'number') {
      setWinnerInfo({
        player,
        line: {
          type: winLineType,
          index: winLineIndex,
        },
      });
      return;
    }

    // If no winner, check if game over
    if (thisTurn === SIZE * SIZE) {
      return;
    }

    // Otherwise, continue
    setPlayer(player === PLAYERS[0] ? PLAYERS[1] : PLAYERS[0]);
  }

  function handleReset() {
    setBoard(createInitialBoard());
    setPlayer(FIRST_PLAYER);
    setTurn(0);
    setScoring(structuredClone(INIT_SCORING));
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
