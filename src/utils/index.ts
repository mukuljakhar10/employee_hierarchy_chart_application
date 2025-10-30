
export const debounce = <A extends unknown[], R>(
  func: (...args: A) => R,
  delay: number
): ((...args: A) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: A) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error setting ${key} in localStorage:`);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error(`Error removing ${key} from localStorage:`);
    }
  },
};
