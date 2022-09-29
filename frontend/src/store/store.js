import { configureStore } from "@reduxjs/toolkit"
import basketSlice from "./basketSlice"
import dailySlice from "./dailySlice"
import statusSlice from "./statusSlice"
import userSlice from "./userSlice"
import planSlice from "./planSlice"

export default configureStore({
  reducer: {
    user: userSlice,
    daily: dailySlice,
    basket: basketSlice,
    status: statusSlice,
    plan: planSlice,
  },
})
