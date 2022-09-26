import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./basketSlice";
import dailySlice from "./dailySlice";
import statusSlice from "./statusSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    daily: dailySlice,
    basket: basketSlice,
    status: statusSlice,
  },
});
