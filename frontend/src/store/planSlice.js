import { createSlice } from "@reduxjs/toolkit"

export const planSlice = createSlice({
  name: "plan",
  initialState: {
    dailyMealList: [],
    planId: -1,
    testList: [],
  },
  reducers: {
    registerTestItem: (state, action) => {
      state.testList = [...state.testList, action.payload]
    },
    removeTestItem: (state, action) => {
      state.testList = state.testList.filter((item) => {
        return action.payload.id !== item.id
      })
    },
    initializeTestList: (state) => {
      state.testList = []
    },
    registerDailyMealList: (state, action) => {
      state.dailyMealList = action.payload
    },
    registerPlanId: (state, action) => {
      state.planId = action.payload
    },
    removeDailyMealItem: (state, action) => {
      state.dailyMealList = state.dailyMealList.filter((item) => {
        return action.payload.id !== item.id
      })
    },
  },
})

export const {
  registerDailyMealList,
  registerPlanId,
  removeDailyMealItem,
  registerTestItem,
  removeTestItem,
  initializeTestList,
} = planSlice.actions

export default planSlice.reducer
