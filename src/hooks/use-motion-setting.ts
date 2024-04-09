import { useEffect, useState } from 'react';

export function useMotionSetting() {
  const [motionDisabled, setMotionDisabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion)');
    const handleChange = (e: MediaQueryListEvent) =>
      setMotionDisabled(e.matches);

    setMotionDisabled(query.matches);
    query.addEventListener('change', handleChange);

    return () => query.removeEventListener('change', handleChange);
  }, []);

  return { motionDisabled };
}
