import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
  },
  reducers: {
    registerItem: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeItem: (state, action) => {
      state.basket = state.basket.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
});

export const { registerItem, removeItem } = basketSlice.actions;

export default basketSlice.reducer;
