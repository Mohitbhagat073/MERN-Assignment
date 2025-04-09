import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/AuthSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
