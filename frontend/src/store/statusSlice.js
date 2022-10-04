import { createSlice } from "@reduxjs/toolkit"

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    lastEntered: null,
    targetDate: null,
    searchOrRecent: 0,
  },
  reducers: {
    registerLastEntered: (state, action) => {
      state.lastEntered = action.payload
    },
    registerTargetDate: (state, action) => {
      state.targetDate = action.payload
    },
    registerSearchOrRecent: (state, action) => {
      state.searchOrRecent = action.payload
    },
  },
})

export const {
  registerLastEntered,
  registerTargetDate,
  registerSearchOrRecent,
} = statusSlice.actions

export default statusSlice.reducer
