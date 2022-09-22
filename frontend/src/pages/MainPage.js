import { Route } from "react-router-dom"
import { useState } from "react"

import DailyDietPage from "../components/MainPage/pages/DailyDietPage"
import DailySummaryPage from "../components/MainPage/pages/DailySummaryPage"
import MealSummaryPage from "../components/MainPage/pages/MealSummaryPage"

function MainPage() {
  const [targetDate, setTartgetDate] = useState(undefined)
  return (
    <div>
      <Route path="/main" exact>
        <DailyDietPage setValue={(value) => setTartgetDate(value)} />
      </Route>
      <Route path="/main/summary">
        <DailySummaryPage date={targetDate} />
      </Route>
      <Route path="main/:mealtime">
        <MealSummaryPage />
      </Route>
    </div>
  )
}

export default MainPage
