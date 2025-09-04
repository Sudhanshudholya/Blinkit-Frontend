import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import userReducer from "./store/userSlice";
import productReducer from "./store/productSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    [apiSlice.reducerPath] : apiSlice.reducer // ✅ Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), //✅ Add RTK Query middleware
});
