import { useEffect, useState } from "react";

/**
 * Generic localStorage hook.
 * - Reads initial value once on mount (lazy)
 * - Keeps state and localStorage in sync
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Swallow storage errors to avoid breaking UI in private mode
    }
  }, [key, value]);

  return [value, setValue] as const;
}

