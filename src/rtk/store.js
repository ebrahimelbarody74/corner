import { configureStore, createStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import progressSlice from "./slices/progressSlice";

export const store = configureStore({
  reducer: {
    // dark: darkModeSlice,
    auth: authSlice,
    progress: progressSlice,
  },
});
