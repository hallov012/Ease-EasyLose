import TopNav from "../../TopNav/TopNav"
import MealNutrientInfo from "../MealNutrientInfo/MealNutrientInfo"

import { useParams } from "react-router-dom"

function MealSummaryPage() {
  const params = useParams()
  const meal = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
    SNACK: "간식",
  }
  const mealtime = params.mealtime
  console.log(meal[mealtime])
  return (
    <div>
      <div id="top_nav_area">
        <TopNav text={meal[mealtime]} arrow={["/main", 0]} />
      </div>
      <div
        style={{
          margin: "10vh 5vw 15vh",
        }}
      >
        <MealNutrientInfo />
      </div>
    </div>
  )
}
export default MealSummaryPage
