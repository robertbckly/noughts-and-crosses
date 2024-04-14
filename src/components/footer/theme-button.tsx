import { Theme } from '../../types/types';

export type ThemeButtonProps = {
  theme: Theme;
  onChange: (newTheme: Theme) => void;
};

export function ThemeButton({ theme, onChange }: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
      aria-label={theme === 'light' ? 'Use dark theme' : 'Use light theme'}
      className="flex items-center gap-2 p-2 pr-0 text-sm leading-none opacity-70"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
      <span className="h-4 w-4 rounded-full border-[0.2rem] border-black dark:border-white dark:bg-white" />
    </button>
  );
}
