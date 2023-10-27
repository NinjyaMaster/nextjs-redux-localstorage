"use client";

// components/YourComponent.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveInput } from "@/redux/features/inputSlice";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce"; // make sure path is correct

const InputComponent: React.FC = () => {
  const [input, setInput] = useState("");
  // Get the value from local storage if it exists
  //const [input, setInput] = useLocalStorage("myInputKey", "");
  const [storedInput, setStoredInput] = useLocalStorage("myInputKey", "");
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
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
    </div>
  );
};

export default InputComponent;
