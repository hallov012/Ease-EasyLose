import { createSlice } from "@reduxjs/toolkit"

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    searchList: [],
    recentList: [],
    pickedList: [],
  },
  reducers: {
    registerSearchList: (state, action) => {
      state.searchList = action.payload
      state.pickedList.map((pickedItem) => {
        state.searchList = state.searchList.filter(
          (searchedItem) => searchedItem.id !== pickedItem.id
        )
      })
    },
    registerRecentList: (state, action) => {
      state.recentList = action.payload
      state.pickedList.map((pickedItem) => {
        state.recentList = state.recentList.filter(
          (recentItem) => recentItem.id !== pickedItem.id
        )
      })
    },
    registerItemFromSearchList: (state, action) => {
      state.pickedList = [...state.pickedList, action.payload]
      state.searchList = state.searchList.filter(
        (item) => item.id !== action.payload.id
      )
    },
    registerItemFromRecentList: (state, action) => {
      state.pickedList = [...state.pickedList, action.payload]
      state.recentList = state.recentList.filter(
        (item) => item.id !== action.payload.id
      )
    },
    removeItem: (state, action) => {
      state.pickedList = state.pickedList.filter(
        (item) => item.id !== action.payload.id
      )
    },
  },
})

export const {
  registerSearchList,
  registerRecentList,
  registerItemFromSearchList,
  registerItemFromRecentList,
  removeItem,
} = basketSlice.actions

export default basketSlice.reducer
