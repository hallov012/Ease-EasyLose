import classes from "./MealNutrientInfo.module.css"
import { useState, useEffect } from "react"

function MealNutrientInfo(props) {
  const [value, setValue] = useState({
    carb: 0,
    calorie: 0,
    protein: 0,
    fat: 0,
  })

  useEffect(() => {
    if (props.dietSum) {
      setValue(props.dietSum)
    }
  }, [props.dietSum])

  return (
    <div className={`${classes.info_box} box_shadow gradient_color__vertical`}>
      <div className={classes.info_item}>
        <span>{Math.round(value.calorie)}kcal</span>
        <span>열량</span>
      </div>
      <div className={classes.info_item}>
        <span>{Math.round(value.carb)}g</span>
        <span>탄수화물</span>
      </div>
      <div className={classes.info_item}>
        <span>{Math.round(value.protein)}g</span>
        <span>단백질</span>
      </div>
      <div className={classes.info_item}>
        <span>{Math.round(value.fat)}g</span>
        <span>지방</span>
      </div>
    </div>
  )
}
export default MealNutrientInfo
