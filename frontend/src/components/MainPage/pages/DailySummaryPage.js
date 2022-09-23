import MealSelectBtnList from "../MealSelectBtnList/MealSelectBtnList"
import NutrientChart from "../NutrientChart/NutrientChart"
import NutrientProgressGraph from "../NutrientProgressGraph/NutrientProgressGraph"
import NutrientProgressBox from "../NutrientProgressBox/NutrientProgressBox"
import UserInfo from "../UserInfo/UserInfo"
import TopNav from "../../TopNav/TopNav"

import { useState } from "react"

function DailySummaryPage(props) {
  const date = props.date
  const [dateTitle, setDateTitle] = useState("")
  if (date && !dateTitle) {
    const month = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    }
    const dateWord = String(date.$d)
    const dateList = dateWord.split(" ")
    const monthString = dateList[1]
    const monthNum = month[monthString]
    const dateString = `${dateList[3]}. ${monthNum}. ${dateList[2]} (${dateList[0]})`
    setDateTitle(dateString)
  }
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
        <MealSelectBtnList />
        <NutrientChart />
        <NutrientProgressGraph />
        <NutrientProgressBox />
        <UserInfo />
      </div>
    </div>
  )
}
export default DailySummaryPage
