import { createSlice } from "@reduxjs/toolkit";

export const planSlice = createSlice({
  name: "plan",
  initialState: {
    dailyMealList: [],
    planId: -1,
    testList: {},
    detailClicked: false,
    detailData: null,
  },
  reducers: {
    setDetailClicked: (state) => {
      state.detailClicked = !state.detailClicked;
    },
    setDetailData: (state, action) => {
      state.detailData = action.payload;
    },
    registerTestItem: (state, action) => {
      state.testList = action.payload;
    },
    unCheckTestItem: (state, action) => {
      delete state.testList[action.payload];
    },
    checkTestItem: (state, action) => {
      state.testList = { ...state.testList, ...action.payload };
    },
    initializeTestList: (state) => {
      state.testList = {};
    },
    registerDailyMealList: (state, action) => {
      state.dailyMealList = action.payload;
    },
    registerPlanId: (state, action) => {
      state.planId = action.payload;
    },
    removeDailyMealItem: (state, action) => {
      state.dailyMealList = state.dailyMealList.filter((item) => {
        return action.payload.id !== item.id;
      });
    },
  },
});

export const {
  registerDailyMealList,
  registerPlanId,
  removeDailyMealItem,
  registerTestItem,
  initializeTestList,
  setDetailClicked,
  setDetailData,
  unCheckTestItem,
  checkTestItem,
} = planSlice.actions;

export default planSlice.reducer;
