import classes from "./UserFoodList.module.css"
import UserFoodItem from "../UserFoodItem/UserFoodItem"

function UserFoodList() {
  const foodList = [
    { name: "바나나", calorie: 130, cnt: 1 },
    { name: "삶은 계란", calorie: 180, cnt: 2 },
  ]

  const foodComponent = foodList.map((data, idx) => (
    <UserFoodItem food={data} />
  ))

  return (
    <div className={classes.user_food_box}>
      <div className={classes.top_area}>
        <span className={classes.box_name}>목록</span>
        <div className={classes.add_btn}>
          <span>추가하기</span>
          <i class="fa-solid fa-circle-plus"></i>
        </div>
      </div>
      <div className={classes.food_list_box}>{foodComponent}</div>
    </div>
  )
}
export default UserFoodList
