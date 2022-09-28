import classes from "./MealCardList.module.css"
import { useEffect, useState } from "react"

import MealCardItem from "../MealCardItem/MealCardItem"

function MealCardList(props) {
  const userInfo = props.userInfo
  const userDailyDiet = props.userDailyDiet
  const [planCal, setPlanCal] = useState(0)
  useEffect(() => {
    if (userInfo) {
      setPlanCal(userInfo.dailyCalorie)
    }
  }, [userInfo])

  const meal = [
    { type: "BREAKFAST", icon: "fa-cloud-sun" },
    { type: "LUNCH", icon: "fa-sun" },
    { type: "DINNER", icon: "fa-moon" },
    { type: "SNACK", icon: "fa-cookie-bite" },
  ]
  const mealCardList = meal.map((data, idx) => (
    <MealCardItem meal={data} planCal={planCal} userDailyDiet={userDailyDiet} />
  ))
  return <div className={classes.meal_card__area}>{mealCardList}</div>
}
export default MealCardList
