export type ResetButtonProps = {
  isNewGame: boolean;
  onClick: () => void;
};

export function ResetButton({ isNewGame, onClick }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isNewGame}
      className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
    >
      Reset
    </button>
  );
}
