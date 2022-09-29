import { createSlice } from "@reduxjs/toolkit"

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    lastEntered: null,
    targetDate: null,
  },
  reducers: {
    registerLastEntered: (state, action) => {
      state.lastEntered = action.payload
    },
    registerTargetDate: (state, action) => {
      state.targetDate = action.payload
    },
  },
})

export const { registerLastEntered, registerTargetDate } = statusSlice.actions

export default statusSlice.reducer
