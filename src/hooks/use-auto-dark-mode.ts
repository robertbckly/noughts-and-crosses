import { useEffect } from 'react';
import { useMatchMedia } from './use-match-media';

const CLASSES = ['dark', 'light'] as const;

export function useAutoDarkMode() {
  const darkModeEnabled = useMatchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    document.documentElement.classList.remove(...CLASSES);
    document.documentElement.classList.add(
      darkModeEnabled ? CLASSES[0] : CLASSES[1],
    );
  }, [darkModeEnabled]);

  return darkModeEnabled;
}
