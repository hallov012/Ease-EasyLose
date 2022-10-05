import classes from "./MealCardItem.module.css"
import { NavLink } from "react-router-dom"
import * as React from "react"
import { useEffect, useState } from "react"
import LinearProgress from "@mui/material/LinearProgress"

function MealCardItem(props) {
  const meal = props.meal
  const [value, setValue] = useState({ calSum: 0, percent: 0 })
  const MealName = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
    SNACK: "간식",
  }

  const mealType = meal.type

  useEffect(() => {
    if (props.userDailyDiet) {
      const temp = { calSum: 0, percent: 0 }
      temp.calSum = props.userDailyDiet[0].sums[mealType].calorie
      temp.percent = Math.ceil(
        (props.userDailyDiet[0].sums[mealType].calorie / props.planCal) * 100
      )
      setValue(temp)
    }
  }, [props.userDailyDiet, props.planCal])

  return (
    <NavLink to={`${props.path}/meal/${props.meal.type}`}>
      <div className={`${classes.meal_item__box} box_shadow`}>
        <div className={classes.item__top}>
          <i className={`fa-solid ${meal.icon}`}></i>
        </div>
        <div className={classes.item__middle}>
          <span>{MealName[meal.type]}</span>
          <span>{Math.round(value.calSum)}kcal</span>
        </div>
        <div className={classes.item__bottom}>
          <span>{value.percent}%</span>
          <LinearProgress
            variant="determinate"
            value={value.percent > 100 ? 100 : value.percent}
            color="inherit"
          />
        </div>
      </div>
    </NavLink>
  )
}
export default MealCardItem
