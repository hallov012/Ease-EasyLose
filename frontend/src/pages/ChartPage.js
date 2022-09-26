import TopNavDate from "../components/TopNav/TopNavDate"
import SelectBtn from "../components/ChartPage/SelectBtn/SelectBtn"
import WeightGraph from "../components/ChartPage/WeightGraph/WeightGraph"
import NutrientChartGraph from "../components/ChartPage/NutrientChartGraph/NutrientChartGraph"

import { useState } from "react"

function ChartPage() {
  const [date, setDate] = useState(undefined)
  const [term, setTerm] = useState(0)
  // term 0 (일 단위), 1 (주 단위)
  return (
    <div>
      <div id="top_nav_area">
        <TopNavDate
          setValue={(value) => {
            setDate(value)
          }}
        />
      </div>
      <div style={{ margin: "11vh 5vw" }}>
        <SelectBtn
          data={["일 단위", "주 단위"]}
          setValue={(value) => {
            setTerm(value)
          }}
        />
        <div
          style={{
            height: "70vh",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
          }}
        >
          <WeightGraph />
          <NutrientChartGraph />
        </div>
      </div>
    </div>
  )
}

export default ChartPage
