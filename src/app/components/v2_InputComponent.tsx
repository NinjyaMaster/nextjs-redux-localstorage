"use client";

// InputComponent.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveInput } from "@/redux/features/inputSlice";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce"; // make sure the path is correct

const InputComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [storedInput, setStoredInput, localStorageError] = useLocalStorage(
    "myInputKey",
    ""
  );
  const debouncedInput = useDebounce(input, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorageError) {
      alert(
        "Data cannot be saved to localStorage. Your progress may not be saved."
      ); // <- Handle the error here
    }
  }, [localStorageError]); // <- This will trigger anytime there's a new error

  useEffect(() => {
    if (storedInput) {
      dispatch(saveInput(storedInput)); // This sets the Redux store's state when the component mounts
      setInput(storedInput);
    }
  }, []); // The empty array means this useEffect will only be invoked once when the component mounts.

  // Effect for API call
  useEffect(
    () => {
      if (debouncedInput) {
        // Only save data if debouncedInput is not empty
        dispatch(saveInput(debouncedInput));
        setStoredInput(input); // Save to local storage
      }
    },
    [debouncedInput, input, dispatch, setStoredInput] // Only call effect if debounced search term changes
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      {/* Optionally, you can display the error message directly in your component */}
      {localStorageError && (
        <p>Error saving data: {localStorageError.message}</p>
      )}
    </div>
  );
};

export default InputComponent;
