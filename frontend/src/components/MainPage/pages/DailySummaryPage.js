import TopNav from "../../TopNav/TopNav"
import MealSelectBtnList from "../MealSelectBtnList/MealSelectBtnList"
import NutrientChart from "../NutrientChart/NutrientChart"
import NutrientProgressGraph from "../NutrientProgressGraph/NutrientProgressGraph"
import NutrientProgressBox from "../NutrientProgressBox/NutrientProgressBox"
import UserInfoBox from "../UserInfoBox/UserInfoBox"
import { useSelector } from "react-redux"
import dateFormat, { masks } from "dateformat"

import { useState, useEffect } from "react"

function DailySummaryPage({ colorSet }) {
  const userInfo = useSelector((state) => state.user.userInfo)
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet)
  const target_date = dateFormat(
    JSON.parse(useSelector((state) => state.status.targetDate)),
    "yyyy. mm. dd (ddd)"
  )
  const [dietSum, setDeitSum] = useState(undefined)

  useEffect(() => {
    if (userDailyDiet) {
      setDeitSum(userDailyDiet[0].total)
    }
  }, [userDailyDiet])

  useEffect(() => {
    setDateTitle(target_date)
  }, [target_date])

  const [dateTitle, setDateTitle] = useState("")

  return (
    <div>
      <div id="top_nav_area">
        <TopNav text={dateTitle} arrow={["/main", ""]} />
      </div>
      <div
        style={{
          margin: "10vh 5vw 15vh",
        }}
      >
        <NutrientChart dietSum={dietSum} colorSet={colorSet} />
        <NutrientProgressGraph
          userInfo={userInfo}
          dietSum={dietSum}
          colorSet={colorSet}
        />
        <NutrientProgressBox
          userInfo={userInfo}
          dietSum={dietSum}
          colorSet={colorSet}
        />
        <UserInfoBox userInfo={userInfo} />
      </div>
    </div>
  )
}
export default DailySummaryPage
