import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "UserInfo",
  initialState: {
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    register: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.accessToken = action.payload[0];
      state.refreshToken = action.payload[1];
    },
    deregister: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { register, deregister } = userInfoSlice.actions;

export default userInfoSlice.reducer;
