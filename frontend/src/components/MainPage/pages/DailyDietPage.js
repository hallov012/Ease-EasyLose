import TopNavDate from "../../../components/TopNav/TopNavDate"
import NutrientSummary from "../NutrientSummary/NutrientSummary"
import SumProgressBar from "../SumProgressBar/SumProgressBar"
import MealCardList from "../MealCardList/MealCardList"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function DailyDietPage(props) {
  const [date, setDate] = useState(undefined)
  const [progressBarPercent, setProgressBarPercent] = useState([33, 33, 33])
  const [progressBarAmount, setProgressBarAmount] = useState([50, 50, 50])
  useEffect(() => {
    props.setValue(date)
  }, [date])

  const userInfo = useSelector((state) => state.user.userInfo)
  useEffect(() => {
    if (userInfo) {
      setProgressBarPercent([
        Math.round(((userInfo.dailyCarb * 4) / userInfo.dailyCalorie) * 100),
        Math.round(((userInfo.dailyProtein * 4) / userInfo.dailyCalorie) * 100),
        Math.round(((userInfo.dailyFat * 8) / userInfo.dailyCalorie) * 100),
      ])
      setProgressBarAmount([
        Math.round(userInfo.dailyCarb),
        Math.round(userInfo.dailyProtein),
        Math.round(userInfo.dailyFat),
      ])
    }
  }, [userInfo])

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
        <NutrientSummary />
        <SumProgressBar
          percent={progressBarPercent}
          amount={progressBarAmount}
        />
        <MealCardList />
      </div>
    </div>
  )
}
export default DailyDietPage
