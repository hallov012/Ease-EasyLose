import { Route, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"

import DailyDietPage from "../components/MainPage/pages/DailyDietPage"
import DailySummaryPage from "../components/MainPage/pages/DailySummaryPage"
import MealSummaryPage from "../components/MainPage/pages/MealSummaryPage"

import { useDispatch, useSelector } from "react-redux"
import { registerDailyDiet } from "../store/dailySlice"
import { instance } from "../api/index"

import dateFormat, { masks } from "dateformat"

import { registerTargetDate } from "../store/statusSlice"

function MainPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)

  const temp = JSON.parse(localStorage.getItem("target_date"))
  if (temp) {
    if (typeof temp !== "number")
      dispatch(registerTargetDate(JSON.stringify(temp)))
    else {
      localStorage.setItem("target_date", JSON.stringify(new Date()))
      dispatch(registerTargetDate(JSON.stringify(new Date())))
    }
  } else {
    localStorage.setItem("target_date", JSON.stringify(new Date()))
    dispatch(registerTargetDate(JSON.stringify(new Date())))
  }

  const target_date = JSON.parse(
    useSelector((state) => state.status.targetDate)
  )

  useEffect(() => {
    if (target_date.includes("-")) {
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
