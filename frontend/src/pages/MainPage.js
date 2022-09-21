import { Route } from "react-router-dom"

import DailyDietPage from "../components/MainPage/pages/DailyDietPage"
import DailySummaryPage from "../components/MainPage/pages/DailySummaryPage"
import MealSummaryPage from "../components/MainPage/pages/MealSummaryPage"

function MainPage() {
  return (
    <div>
      <Route path="/main" exact>
        <DailyDietPage />
      </Route>
      <Route path="/main/summary">
        <DailySummaryPage />
      </Route>
      <Route path="main/:mealtime">
        <MealSummaryPage />
      </Route>
    </div>
  )
}

export default MainPage
