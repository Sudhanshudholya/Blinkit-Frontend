import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allCategory: [],
  subCategory: [],
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = Array.isArray(action.payload) ? [...action.payload] : [];
    },
  },
});

export const { setAllCategory } = productSlice.actions;

export default productSlice.reducer;
