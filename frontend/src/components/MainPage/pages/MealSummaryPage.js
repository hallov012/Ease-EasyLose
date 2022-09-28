import TopNav from "../../TopNav/TopNav"
import MealNutrientInfo from "../MealNutrientInfo/MealNutrientInfo"
import UserFoodList from "../UserFoodList/UserFoodList"
import NutrientChart from "../NutrientChart/NutrientChart"
import NutrientProgressBox from "../NutrientProgressBox/NutrientProgressBox"

import { useParams } from "react-router-dom"

import { registerLastEntered } from "../../../store/statusSlice"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"

function MealSummaryPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)
  const [dietSum, setDeitSum] = useState(undefined)

  const params = useParams()
  const meal = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
    SNACK: "간식",
  }
  const mealtime = params.mealtime
  const dispatch = useDispatch()
  dispatch(registerLastEntered(mealtime))

  useEffect(() => {
    if (userDailyDiet) {
      setDeitSum(userDailyDiet[0].sums[mealtime])
    }
  })

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
        <UserFoodList />
        <NutrientChart dietSum={dietSum} />
        <NutrientProgressBox />
      </div>
    </div>
  )
}
export default MealSummaryPage
