import classes from "./UserFoodItem.module.css"

function UserFoodItem(props) {
  const foodInfo = props.food
  return (
    <div className={classes.food_item}>
      <div className={classes.top_area}>
        <span>{foodInfo.food.name}</span>
        <div className={classes.calorie_btn}>
          <span>{foodInfo.food.calorie * foodInfo.count}kcal</span>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div className={classes.food_cnt}>{foodInfo.count}개</div>
    </div>
  )
}
export default UserFoodItem
