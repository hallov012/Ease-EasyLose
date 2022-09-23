import classes from "./MealCardList.module.css"

import MealCardItem from "../MealCardItem/MealCardItem"

function MealCardList() {
  const meal = [
    { type: "BREAKFAST", calorieSum: 360, icon: "fa-cloud-sun", percent: 24 },
    { type: "LUNCH", calorieSum: 740, icon: "fa-sun", percent: 48 },
    { type: "DINNER", calorieSum: 0, icon: "fa-moon", percent: 0 },
    { type: "SNACK", calorieSum: 0, icon: "fa-cookie-bite", percent: 0 },
  ]
  const mealCardList = meal.map((data, idx) => <MealCardItem meal={data} />)
  return <div className={classes.meal_card__area}>{mealCardList}</div>
}
export default MealCardList
