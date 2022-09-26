import { createSlice } from "@reduxjs/toolkit";

export const dailySlice = createSlice({
  name: "daily",
  initialState: {
    dailyDiet: null,
    targetDate: null,
  },
  reducers: {
    registerDailyDiet: (state, action) => {
      state.dailyDiet = action.payload;
    },
    registerTargetDate: (state, action) => {
      state.targetDate = action.payload;
    },
  },
});

export const { registerDailyDiet, registerTargetDate } = dailySlice.actions;

export default dailySlice.reducer;
