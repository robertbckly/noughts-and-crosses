import { useEffect, useState } from 'react';
import { useMatchMedia } from './use-match-media';

const STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

const isTheme = (string: string): string is Theme =>
  (THEMES as readonly string[]).includes(string);

export function useTheme() {
  const [preference, setPreference] = useState<Theme | null>();
  const systemTheme: Theme = useMatchMedia('(prefers-color-scheme: light)')
    ? 'light'
    : 'dark';
  const theme = preference || systemTheme;

  // Retrieve stored preference
  useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (storedValue && isTheme(storedValue)) {
      setPreference(storedValue);
    }
  }, []);

  // Apply `theme` as class
  useEffect(() => {
    document.documentElement.classList.remove(...Object.values(THEMES));
    document.documentElement.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, newTheme);
    setPreference(newTheme);
  };

  return [theme, setTheme] as const;
}
