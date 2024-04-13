import { Player, WinnerInfo } from '../types/types';

export type StatusMessageProps = {
  isGameOver: boolean;
  player: Player;
  winnerInfo: WinnerInfo | null;
};

export function StatusMessage({
  isGameOver,
  player,
  winnerInfo,
}: StatusMessageProps) {
  return (
    <p role="alert" className="break-keep text-2xl font-bold">
      {!winnerInfo && !isGameOver && `It's ${player}'s go`}
      {!winnerInfo && isGameOver && 'Game over :-('}
      {!!winnerInfo && (
        <span className="animate-pulse motion-reduce:animate-none">{`Winner: ${winnerInfo.player}`}</span>
      )}
    </p>
  );
}
