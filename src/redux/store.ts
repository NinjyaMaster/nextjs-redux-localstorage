// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import inputReducer from "./features/inputSlice";
import inputSlice from "./features/inputSlice";

export const store = configureStore({
  reducer: {
    input: inputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
