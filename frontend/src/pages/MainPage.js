import { Route } from "react-router-dom"
import { useEffect, useState } from "react"

import DailyDietPage from "../components/MainPage/pages/DailyDietPage"
import DailySummaryPage from "../components/MainPage/pages/DailySummaryPage"
import MealSummaryPage from "../components/MainPage/pages/MealSummaryPage"

import { useDispatch, useSelector } from "react-redux"
import { registerTargetDate, registerDailyDiet } from "../store/dailySlice"
import { instance } from "../api/index"

function MainPage() {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.user.accessToken)
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)
  const tempDate = useSelector((state) => state.daily.targetDate)

  if (userDailyDiet) {
    const mealData = userDailyDiet[0]
  }

  const [targetDate, setTartgetDate] = useState(undefined)
  useEffect(() => {
    if (tempDate) {
      instance
        .get("/dailymeal", { params: { date: tempDate } })
        .then((response) => {
          console.log(response)
          dispatch(registerDailyDiet(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
      // dispatch(registerTargetDate(tempDate))
      // axios({
      //   method: "get",
      //   params: { date: tempDate },
      //   url: "https://j7a704.p.ssafy.io/api/v1/dailymeal",
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // })
      //   .then((response) => {
      //     console.log(response)
      //     dispatch(registerDailyDiet(response.data))
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  }, [tempDate])

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
