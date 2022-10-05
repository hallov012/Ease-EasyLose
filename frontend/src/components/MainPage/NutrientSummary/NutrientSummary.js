import classes from "./NutrientSummary.module.css"
import ProgressCircular from "../ProgressCircular/ProgressCircular"
import ProgressList from "../ProgressList/ProgressList"

import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

function NutrientSummary(props) {
  const userInfo = props.userInfo
  const userDailyDiet = props.userDailyDiet

  const [nowCal, setNowCal] = useState(0)
  const [planCal, setPlanCal] = useState(0)
  const [calPercent, setCalPercent] = useState(0)
  const [nutPercent, setNutPercent] = useState([0, 0, 0])

  useEffect(() => {
    if (userInfo) {
      setPlanCal(Math.round(userInfo.dailyCalorie))
    }
  }, [userInfo])

  useEffect(() => {
    if (userDailyDiet) {
      setNowCal(Math.round(userDailyDiet[0].total.calorie))
    }
  }, [userDailyDiet])

  useEffect(() => {
    if (userInfo && userDailyDiet) {
      setCalPercent(Math.ceil((nowCal / planCal) * 100))
      const temp = [0, 0, 0]
      temp[0] = Math.ceil(
        (userDailyDiet[0].total.carb / userInfo.dailyCarb) * 100
      )
      temp[1] = Math.ceil(
        (userDailyDiet[0].total.protein / userInfo.dailyProtein) * 100
      )
      temp[2] = Math.ceil(
        (userDailyDiet[0].total.fat / userInfo.dailyFat) * 100
      )
      setNutPercent(temp)
    }
  }, [userInfo, userDailyDiet, nowCal, planCal])

  return (
    <NavLink to={`${props.path}/summary`}>
      <div className={classes.summary_area}>
        <div className={classes.nav_box}>
          <div className={classes.summary_link}>상세보기</div>
        </div>
        <div
          className={`${classes.summary_box} box_shadow gradient_color__vertical`}
        >
          <div className={classes.calorie_box}>
            <div className={classes.calorie_text}>
              <span>현재</span>
              <span>{nowCal}kcal</span>
            </div>
            <ProgressCircular percent={calPercent} />
            <div className={classes.calorie_text}>
              <span>목표</span>
              <span>{planCal}kcal</span>
            </div>
          </div>
          <div className={classes.progress_area}>
            <ProgressList percent={nutPercent} />
          </div>
        </div>
      </div>
    </NavLink>
  )
}
export default NutrientSummary
