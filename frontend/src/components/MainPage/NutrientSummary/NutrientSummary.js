import classes from "./NutrientSummary.module.css"
import ProgressCircular from "../ProgressCircular/ProgressCircular"
import ProgressLinear from "../ProgressLinear/ProgressLinear"

import { NavLink } from "react-router-dom"

function NutrientSummary() {
  const now_calorie = 1100
  const plan_calorie = 1520
  return (
    <div className={classes.summary_area}>
      <div className={classes.nav_box}>
        <NavLink to="main/summary">
          <div className={classes.summary_link}>상세보기</div>
        </NavLink>
      </div>
      <div
        className={`${classes.summary_box} box_shadow gradient_color__vertical`}
      >
        <div className={classes.calorie_box}>
          <div className={classes.calorie_text}>
            <span>현재</span>
            <span>{now_calorie}kcal</span>
          </div>
          <ProgressCircular />
          <div className={classes.calorie_text}>
            <span>목표</span>
            <span>{plan_calorie}kcal</span>
          </div>
        </div>
        <ProgressLinear />
      </div>
    </div>
  )
}
export default NutrientSummary
