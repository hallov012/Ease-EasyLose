import { createSlice } from "@reduxjs/toolkit"

export const planSlice = createSlice({
  name: "plan",
  initialState: {
    oneMealList: [],
    dailyMealList: [],
  },
  reducers: {
    registerOneMealList: (state, action) => {
      state.oneMealList = action.payload
    },
    registerDailyMealList: (state, action) => {
      state.dailyMealList = action.payload
    },
    removeOneMealItem: (state, action) => {
      state.oneMealList = state.oneMealList.filter((item) => {
        return action.payload.id !== item.id
      })
    },
    removeDailyMealItem: (state, action) => {
      state.dailyMealList = state.dailyMealList.filter((item) => {
        return action.payload.id !== item.id
      })
    },
  },
})

export const {
  registerOneMealList,
  registerDailyMealList,
  removeOneMealItem,
  removeDailyMealItem,
} = planSlice.actions

export default planSlice.reducer
