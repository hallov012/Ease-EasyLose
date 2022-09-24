import classes from "./MealCardItem.module.css"
import { NavLink } from "react-router-dom"
import * as React from "react"
import LinearProgress from "@mui/material/LinearProgress"

function MealCardItem(props) {
  const data = props.meal
  const MealName = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
    SNACK: "간식",
  }
  return (
    <NavLink to={`/main/meal/${props.meal.type}`}>
      <div className={`${classes.meal_item__box} box_shadow`}>
        <div className={classes.item__top}>
          <i className={`fa-solid ${data.icon}`}></i>
        </div>
        <div className={classes.item__middle}>
          <span>{MealName[data.type]}</span>
          <span>{data.calorieSum}kcal</span>
        </div>
        <div className={classes.item__bottom}>
          <span>{data.percent}%</span>
          <LinearProgress
            variant="determinate"
            value={data.percent}
            color="inherit"
          />
        </div>
      </div>
    </NavLink>
  )
}
export default MealCardItem
