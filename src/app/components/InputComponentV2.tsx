"use client";

// InputComponent.tsx
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { useDispatch } from "react-redux";
import { saveInput } from "@/redux/features/inputSlice";
import { store } from "@/redux/store";

import useLocalStorageV2 from "@/hooks/useLocalStorageV2";

const InputComponentV2: React.FC = () => {
  const [input, setInput] = useState("");
  const [storedInput, setStoredInput, localStorageError] = useLocalStorageV2(
    "myInputKey_v2",
    ""
  );
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    dispatch(saveInput(e.target.value));
  };

  return (
    <div>
      <h2 className="font-bold">Version 2</h2>
      <p>
        Added debounce functionality to Version 1 to manage rapid input
        effectively. Installed the lodash and @types/lodash libraries to
        facilitate this.Also implemented error display for loading/saving
        issues.
      </p>
      <input type="text" value={input} onChange={handleInputChange} />
      {/* Optionally, you can display the error message directly in your component */}
      {localStorageError && (
        <p>Error saving data: {localStorageError.message}</p>
      )}
    </div>
  );
};

export default InputComponentV2;
