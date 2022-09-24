import classes from "./MealNutrientInfo.module.css"

function MealNutrientInfo() {
  return (
    <div className={`${classes.info_box} box_shadow gradient_color__vertical`}>
      <div className={classes.info_item}>
        <span>320kcal</span>
        <span>열량</span>
      </div>
      <div className={classes.info_item}>
        <span>130g</span>
        <span>탄수화물</span>
      </div>
      <div className={classes.info_item}>
        <span>26g</span>
        <span>단백질</span>
      </div>
      <div className={classes.info_item}>
        <span>19.5g</span>
        <span>지방</span>
      </div>
    </div>
  )
}
export default MealNutrientInfo
