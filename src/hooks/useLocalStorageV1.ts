// https://dev.to/collegewap/how-to-use-local-storage-in-nextjs-2l2j
//https://github.com/collegewap/next-local-storage
//

import { useState } from "react";

// Define the shape of our hook functions.
function useLocalStorageV1<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Use a function within 'useState' for lazy initialization
  const [state, setState] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);

      // Parse stored json or, if undefined, return initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new state to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(state) : value;

      // Save state
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      // Save state to local state
      setState(valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  return [state, setValue];
}

export default useLocalStorageV1;
