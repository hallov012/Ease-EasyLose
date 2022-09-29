import { createSlice } from "@reduxjs/toolkit"

export const dailySlice = createSlice({
  name: "daily",
  initialState: {
    dailyDiet: null,
  },
  reducers: {
    registerDailyDiet: (state, action) => {
      state.dailyDiet = action.payload
    },
  },
})

export const { registerDailyDiet } = dailySlice.actions

export default dailySlice.reducer
