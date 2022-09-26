import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    refreshToken: null,
    userInfo: null,
  },
  reducers: {
    registerAccessToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.accessToken = action.payload[0];
      state.refreshToken = action.payload[1];
    },
    deregisterAccessToken: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
    registerUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerAccessToken, deregisterAccessToken, registerUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
