import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    searchList: [],
    recentList: [],
    pickedList: [],
  },
  reducers: {
    registerSearchList: (state, action) => {
      state.searchList = action.payload;
      state.pickedList.map((pickedItem) => {
        state.searchList = state.searchList.filter(
          (searchedItem) => searchedItem.id !== pickedItem.id
        );
      });
    },
    registerRecentList: (state, action) => {
      state.recentList = action.payload;
      state.pickedList.map((pickedItem) => {
        state.recentList = state.recentList.filter(
          (recentItem) => recentItem.id !== pickedItem.id
        );
      });
    },
    registerItem: (state, action) => {
      state.pickedList = [...state.pickedList, action.payload];
      state.recentList = state.recentList.filter(
        (item) => item.id !== action.payload.id
      );
      state.searchList = state.searchList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    removeItem: (state, action) => {
      state.pickedList = state.pickedList.filter(
        (item) => item.id !== action.payload.id
      );
      if (action.payload.listType === 0) {
        state.searchList = [...state.searchList, action.payload];
      } else {
        state.recentList = [...state.recentList, action.payload];
      }
    },
    initializeBasket: (state) => {
      state.pickedList = [];
      state.searchList = [];
      state.recentList = [];
    },
    initializeItem: (state) => {
      state.pickedList.map((pickedItem) => {
        if (pickedItem.listType === 0)
          state.searchList = [...state.searchList, pickedItem];
        else state.recentList = [...state.recentList, pickedItem];
      });
      state.pickedList = [];
    },
  },
});

export const {
  registerSearchList,
  registerRecentList,
  registerItem,
  removeItem,
  initializeBasket,
  initializeItem,
} = basketSlice.actions;

export default basketSlice.reducer;
