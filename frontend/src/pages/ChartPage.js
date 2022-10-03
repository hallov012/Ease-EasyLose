import TopNavDate from "../components/TopNav/TopNavDate"
import { useDispatch, useSelector } from "react-redux"
import { registerTargetDate } from "../store/statusSlice"
import dateFormat, { masks } from "dateformat"
import { instance } from "../api/index"

import SelectBtn from "../components/ChartPage/SelectBtn/SelectBtn"
import WeightGraph from "../components/ChartPage/WeightGraph/WeightGraph"
import NutrientChartGraph from "../components/ChartPage/NutrientChartGraph/NutrientChartGraph"
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  ConstructionOutlined,
  ContactSupportOutlined,
} from "@mui/icons-material"

function ChartPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [nutData, setNutData] = useState(undefined)
  const [weightData, setWeightData] = useState(undefined)
  const temp = JSON.parse(localStorage.getItem("target_date"))
  useEffect(() => {
    if (temp) {
      if (typeof temp !== "number")
        dispatch(registerTargetDate(JSON.stringify(temp)))
      else {
        localStorage.setItem("target_date", JSON.stringify(new Date()))
        dispatch(registerTargetDate(JSON.stringify(new Date())))
      }
    } else {
      localStorage.setItem("target_date", JSON.stringify(new Date()))
      dispatch(registerTargetDate(JSON.stringify(new Date())))
    }
  }, [])

  const target_date = JSON.parse(
    useSelector((state) => state.status.targetDate)
  )

  useEffect(() => {
    if (typeof temp !== "number") {
      // 영양소 정보
      instance
        .get("/analysis/dailyChart", {
          params: { date: dateFormat(target_date, "yyyy-mm-dd") },
        })
        .then((response) => {
          setNutData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      // 몸무게 정보
      instance
        .get("/analysis/weight", {
          params: { date: dateFormat(target_date, "yyyy-mm-dd") },
        })
        .then((response) => {
          setWeightData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [target_date, dispatch])

  return (
    <div>
      <div id="top_nav_area">
        <TopNavDate />
      </div>
      <div style={{ margin: "11vh 5vw" }}>
        <div
          style={{
            height: "70vh",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
          }}
        >
          {nutData ? <NutrientChartGraph nutData={nutData} /> : null}
          {weightData ? <WeightGraph weightData={weightData} /> : null}
        </div>
      </div>
    </div>
  )
}

export default ChartPage
