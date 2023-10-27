// store/inputSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputState {
  value: string;
}

const initialState: InputState = {
  value: "",
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    saveInput: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { saveInput } = inputSlice.actions;
export default inputSlice.reducer;
