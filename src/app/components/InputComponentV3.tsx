"use client";

import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { useDispatch } from "react-redux";
import { saveInput } from "@/redux/features/inputSlice";
import { store } from "@/redux/store";

import useLocalStorageV3 from "@/hooks/useLocalStorageV3";

const InputComponentV3: React.FC = () => {
  const [input, setInput] = useState("");
  const [storedInput, setStoredInput, localStorageError, isLoading] =
    useLocalStorageV3("myInputKey_v3", ""); // <- Destructure isLoading
  const dispatch = useDispatch();

  const debouncedSave = (dataToSave: string) => {
    setStoredInput(dataToSave);
  };
  const debounceFn = useCallback(
    debounce((data) => debouncedSave(data), 2000),
    []
  );

  store.subscribe(() => {
    const state = store.getState();
    const dataToSave = state.input.value as string;
    debounceFn(dataToSave);
  });

  // Handle the loading error here
  useEffect(() => {
    if (localStorageError) {
      alert(
        "Data cannot be saved to localStorage. Your progress may not be saved."
      );
    }
  }, [localStorageError]); // <- This will trigger anytime there's a new error

  useEffect(() => {
    if (storedInput) {
      dispatch(saveInput(storedInput)); // This sets the Redux store's state when the component mounts
      setInput(storedInput);
    }
  }, [isLoading, storedInput]); // The empty array means this useEffect will only be invoked once when the component mounts.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    dispatch(saveInput(e.target.value));
  };

  if (isLoading) {
    return <p>Loading...</p>; // <- You can customize this part
  }

  return (
    <div>
      <h2 className="font-bold">Version 3</h2>
      <p>
        Introduced a loading status feature during data retrieval and optimized
        saving to local storage using debounce.
      </p>
      <input type="text" value={input} onChange={handleInputChange} />
      {/* Optionally, you can display the error message directly in your component */}
      {localStorageError && (
        <p>Error saving data: {localStorageError.message}</p>
      )}
    </div>
  );
};

export default InputComponentV3;
