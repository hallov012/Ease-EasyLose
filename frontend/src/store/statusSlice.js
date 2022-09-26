import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    lastEntered: null,
  },
  reducers: {
    registerLastEntered: (state, action) => {
      state.lastEntered = action.payload;
    },
  },
});

export const { registerLastEntered } = statusSlice.actions;

export default statusSlice.reducer;
