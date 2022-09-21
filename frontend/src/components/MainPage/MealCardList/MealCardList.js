import classes from "./MealCardList.module.css"

import MealCardItem from "../MealCardItem/MealCardItem"

function MealCardList() {
  const meal = [
    { type: "breakfast", calorieSum: 360, icon: "fa-cloud-sun", percent: 24 },
    { type: "lunch", calorieSum: 740, icon: "fa-sun", percent: 48 },
    { type: "dinner", calorieSum: 0, icon: "fa-moon", percent: 0 },
    { type: "snack", calorieSum: 0, icon: "fa-cookie-bite", percent: 0 },
  ]
  const mealCardList = meal.map((data) => <MealCardItem meal={data} />)
  return <div className={classes.meal_card__area}>{mealCardList}</div>
}
export default MealCardList
