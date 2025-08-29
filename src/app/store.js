import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import userReducer from "./store/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath] : apiSlice.reducer // ✅ Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), //✅ Add RTK Query middleware
});
