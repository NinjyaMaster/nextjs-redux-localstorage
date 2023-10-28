import { useState, useEffect } from "react";

function useLocalStorageV3<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, Error | null, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize the state with 'true' as it will start with loading

  // This effect should only run once when the component using the hook is mounted, hence the empty dependency array.
  useEffect(() => {
    try {
      // Asynchronous I/O operation
      const item = window.localStorage.getItem(key);

      // Note: because this is run asynchronously, the `storedValue` might not reflect in the UI immediately.
      if (item) {
        // If successful, update the state with the stored value (or keep the initial value)
        setStoredValue(JSON.parse(item));
      } else {
        setStoredValue(initialValue);
      }
    } catch (error) {
      // If an error occurs, save this for potential debugging and user notification
      setError(error as Error);
    } finally {
      // Indicate that the loading process has completed
      setIsLoading(false);
    }
  }, [key, initialValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      // If an error occurs, log it, and set an error state
      console.error(error);
      setError(error as Error);
    }
  };

  // The hook returns the stored value, a function to save a new value, a loading state, and potentially an error state
  return [storedValue, setValue, error, isLoading];
}

export default useLocalStorageV3;
