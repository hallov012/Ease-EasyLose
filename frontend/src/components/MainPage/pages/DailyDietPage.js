import TopNavDate from "../../../components/TopNav/TopNavDate"
import NutrientSummary from "../NutrientSummary/NutrientSummary"
import SumProgressBar from "../SumProgressBar/SumProgressBar"
import MealCardList from "../MealCardList/MealCardList"

import { useState, useEffect } from "react"

function DailyDietPage(props) {
  const [date, setDate] = useState(undefined)
  useEffect(() => {
    props.setValue(date)
  }, [date])

  return (
    <div>
      <div id="top_nav_area">
        <TopNavDate
          setValue={(value) => {
            setDate(value)
          }}
        />
      </div>
      <div style={{ margin: "0 20px" }}>
        <NutrientSummary />
        <SumProgressBar />
        <MealCardList />
      </div>
    </div>
  )
}
export default DailyDietPage
