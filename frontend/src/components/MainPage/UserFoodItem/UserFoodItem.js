import classes from "./UserFoodItem.module.css"

function UserFoodItem(props) {
  const food = props.food
  return (
    <div className={classes.food_item}>
      <div className={classes.top_area}>
        <span>{food.name}</span>
        <div className={classes.calorie_btn}>
          <span>{food.calorie}kcal</span>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div className={classes.food_cnt}>{food.cnt}개</div>
    </div>
  )
}
export default UserFoodItem
