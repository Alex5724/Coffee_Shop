import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 300) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const interval = setInterval(() => {
      setDebounce(value);
    }, delay);

    return () => clearInterval(interval);
  }, [delay, value]);

  return debounce;
}
