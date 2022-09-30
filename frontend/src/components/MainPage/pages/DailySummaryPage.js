import TopNav from "../../TopNav/TopNav"
import MealSelectBtnList from "../MealSelectBtnList/MealSelectBtnList"
import NutrientChart from "../NutrientChart/NutrientChart"
import NutrientProgressGraph from "../NutrientProgressGraph/NutrientProgressGraph"
import NutrientProgressBox from "../NutrientProgressBox/NutrientProgressBox"
import UserInfoBox from "../UserInfoBox/UserInfoBox"
import { useSelector } from "react-redux"
import dateFormat, { masks } from "dateformat"

import { useState, useEffect } from "react"

function DailySummaryPage() {
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
  // if (date && !dateTitle) {
  // const month = {
  //   Jan: "01",
  //   Feb: "02",
  //   Mar: "03",
  //   Apr: "04",
  //   May: "05",
  //   Jun: "06",
  //   Jul: "07",
  //   Aug: "08",
  //   Sep: "09",
  //   Oct: "10",
  //   Nov: "11",
  //   Dec: "12",
  // }
  // const dateList = date.split(" ")
  // const monthString = dateList[1]
  // // const monthNum = month[monthString]
  // const dateString = `${dateList[0]}. ${dateList[1]}. ${dateList[2]} (${dateList[3]})`
  // setDateTitle(dateString)
  // }
  return (
    <div>
      <div id="top_nav_area">
        <TopNav text={dateTitle} arrow={["/main", 0]} />
      </div>
      <div
        style={{
          margin: "10vh 5vw 15vh",
        }}
      >
        {/* <MealSelectBtnList /> */}
        <NutrientChart dietSum={dietSum} />
        <NutrientProgressGraph userInfo={userInfo} dietSum={dietSum} />
        <NutrientProgressBox userInfo={userInfo} dietSum={dietSum} />
        <UserInfoBox userInfo={userInfo} />
      </div>
    </div>
  )
}
export default DailySummaryPage
