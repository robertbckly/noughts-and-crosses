import { useState } from 'react';
import { Board, Player } from '../types/types';
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
  const [winner, setWinner] = useState<Player | null>(null);

  const isNewGame = turn === 0;
  const isGameOver = turn === SIZE * SIZE;

  function handleMove(index: number) {
    // Fail-safe
    if (board[index] || winner) {
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

    // Check for winner
    if (
      Math.abs(newScoring.cols[col] || 0) === SIZE ||
      Math.abs(newScoring.rows[row] || 0) === SIZE ||
      Math.abs(newScoring.posDiagonal) === SIZE ||
      Math.abs(newScoring.negDiagonal) === SIZE
    ) {
      setWinner(player);
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
    setWinner(null);
  }

  return {
    board,
    winner,
    player,
    isNewGame,
    isGameOver,
    handleMove,
    handleReset,
  };
}
