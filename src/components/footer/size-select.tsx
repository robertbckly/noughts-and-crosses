import { SIZES } from '../../constants/constants';

export type SizeSelectProps = {
  isNewGame: boolean;
  onChange: (newSize: number) => void;
};

export function SizeSelect({ isNewGame, onChange }: SizeSelectProps) {
  return (
    <label
      htmlFor="grid-size-select"
      className="flex items-center gap-2"
      style={{ opacity: isNewGame ? 1 : 0.5 }}
    >
      Grid size
      <select
        id="grid-size-select"
        disabled={!isNewGame}
        className="cursor-pointer appearance-none rounded border-none bg-black px-2 py-1 font-normal leading-none text-white disabled:cursor-default dark:bg-white dark:text-black"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {SIZES.map((size) => (
          <option key={size} value={size}>{`${size}x${size}`}</option>
        ))}
      </select>
    </label>
  );
}
