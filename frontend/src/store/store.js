import { configureStore } from "@reduxjs/toolkit";
import dailySlice from "./dailySlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    daily: dailySlice,
  },
});
