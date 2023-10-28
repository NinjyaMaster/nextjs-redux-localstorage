"use client";

// components/YourComponent.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveInput } from "@/redux/features/inputSlice";
import useLocalStorageV1 from "@/hooks/useLocalStorageV1";
import { useDebounce } from "@/hooks/useDebounce"; // make sure path is correct

const InputComponentV1: React.FC = () => {
  const [input, setInput] = useState("");
  // Get the value from local storage if it exists
  //const [input, setInput] = useLocalStorage("myInputKey", "");
  const [storedInput, setStoredInput] = useLocalStorageV1("myInputKey_v1", "");
  const debouncedInput = useDebounce(input, 500); // Debounce input for 500ms
  const dispatch = useDispatch();

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
    <div className="mb-2">
      <h2 className="font-bold">Version 1</h2>
      <p>
        Demonstrate a simple method for saving and loading a value in local
        storage. If it fails to load or save, throw a console.error.
      </p>
      <input type="text" value={input} onChange={handleInputChange} />
    </div>
  );
};

export default InputComponentV1;
