"use client";

// components/YourComponent.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveInput } from "@/redux/features/inputSlice";
import useLocalStorageV1 from "@/hooks/useLocalStorageV1";

const InputComponentV1: React.FC = () => {
  const [input, setInput] = useState("");
  // Get the value from local storage if it exists
  const [storedInput, setStoredInput] = useLocalStorageV1("myInputKey_v1", "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (storedInput) {
      dispatch(saveInput(storedInput)); // This sets the Redux store's state when the component mounts
      setInput(storedInput);
    }
  }, []); // The empty array means this useEffect will only be invoked once when the component mounts.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    dispatch(saveInput(e.target.value));
    setStoredInput(e.target.value);
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
