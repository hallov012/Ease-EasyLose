import { Route } from "react-router-dom"
import { useEffect, useState } from "react"

import DailyDietPage from "../components/MainPage/pages/DailyDietPage"
import DailySummaryPage from "../components/MainPage/pages/DailySummaryPage"
import MealSummaryPage from "../components/MainPage/pages/MealSummaryPage"

import { useDispatch, useSelector } from "react-redux"
import { registerTargetDate, registerDailyDiet } from "../store/dailySlice"
import axios from "axios"

function MainPage() {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.user.accessToken)
  const userInfo = useSelector((state) => state.user.userInfo)
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)
  const mealSumData = []

  if (userDailyDiet) {
    const mealData = userDailyDiet[0].details
    console.log(mealData.LUNCH)
  }

  // const MealSumData = {}

  const [targetDate, setTartgetDate] = useState(undefined)
  useEffect(() => {
    if (targetDate) {
      dispatch(registerTargetDate(targetDate.format("YYYY-MM-DD")))
      axios({
        method: "get",
        params: { date: targetDate.format("YYYY-MM-DD") },
        url: "https://j7a704.p.ssafy.io/api/v1/dailymeal",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          dispatch(registerDailyDiet(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [targetDate])

  return (
    <div>
      <Route path="/main" exact>
        <DailyDietPage setValue={(value) => setTartgetDate(value)} />
      </Route>
      <Route path="/main/summary" exact>
        <DailySummaryPage date={targetDate} />
      </Route>
      <Route path="/main/meal/:mealtime">
        <MealSummaryPage />
      </Route>
    </div>
  )
}

export default MainPage
