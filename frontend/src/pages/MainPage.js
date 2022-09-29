import { Route } from "react-router-dom"
import { useEffect, useState } from "react"

import DailyDietPage from "../components/MainPage/pages/DailyDietPage"
import DailySummaryPage from "../components/MainPage/pages/DailySummaryPage"
import MealSummaryPage from "../components/MainPage/pages/MealSummaryPage"

import { useDispatch, useSelector } from "react-redux"
import { registerDailyDiet } from "../store/dailySlice"
import { instance } from "../api/index"

import dateFormat, { masks } from "dateformat"

function MainPage() {
  const dispatch = useDispatch()
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)
  const target_date = JSON.parse(
    useSelector((state) => state.status.targetDate)
  )

  useEffect(() => {
    if (target_date) {
      instance
        .get("/dailymeal", {
          params: { date: dateFormat(target_date, "yyyy-mm-dd") },
        })
        .then((response) => {
          dispatch(registerDailyDiet(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [target_date, dispatch])

  return (
    <div>
      <Route path="/main" exact>
        <DailyDietPage />
      </Route>
      <Route path="/main/summary" exact>
        <DailySummaryPage />
      </Route>
      <Route path="/main/meal/:mealtime">
        <MealSummaryPage userDailyDiet={userDailyDiet} />
      </Route>
    </div>
  )
}

export default MainPage
