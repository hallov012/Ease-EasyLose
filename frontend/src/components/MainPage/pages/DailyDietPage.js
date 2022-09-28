import TopNavDate from "../../../components/TopNav/TopNavDate"
import NutrientSummary from "../NutrientSummary/NutrientSummary"
import SumProgressBar from "../SumProgressBar/SumProgressBar"
import MealCardList from "../MealCardList/MealCardList"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function DailyDietPage(props) {
  const userInfo = useSelector((state) => state.user.userInfo)
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)

  const [date, setDate] = useState(undefined)
  const [progressBarPercent, setProgressBarPercent] = useState([33, 33, 33])
  const [progressBarAmount, setProgressBarAmount] = useState([50, 50, 50])
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
      <div style={{ margin: "10vh 5vw" }}>
        <NutrientSummary userInfo={userInfo} userDailyDiet={userDailyDiet} />
        <SumProgressBar userDailyDiet={userDailyDiet} />
        <MealCardList userInfo={userInfo} userDailyDiet={userDailyDiet} />
      </div>
    </div>
  )
}
export default DailyDietPage
