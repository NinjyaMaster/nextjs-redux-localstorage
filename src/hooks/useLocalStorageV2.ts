import { useState } from "react";

function useLocalStorageV2<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, Error | null] {
  // State to store our value and errors
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or, if none, return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue and log the error
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  const [error, setError] = useState<Error | null>(null);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new state to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state to local state
      setStoredValue(valueToStore);

      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      setError(error as Error); // Save any errors
      console.error("Error writing to localStorage", error);
    }
  };

  return [storedValue, setValue, error];
}

export default useLocalStorageV2;
