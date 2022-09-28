import classes from "./UserFoodList.module.css"
import UserFoodItem from "../UserFoodItem/UserFoodItem"
import { useHistory, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

function UserFoodList(props) {
  const foodList = props.foodList
  const history = useHistory()
  const location = useLocation()
  const [foodItems, setFoodItems] = useState(<div></div>)

  useEffect(() => {
    if (foodList) {
      const foodComponent = foodList.map((data, idx) => (
        <UserFoodItem food={data} />
      ))
      setFoodItems(foodComponent)
    }
  }, [foodList])

  return (
    <div className={classes.user_food_box}>
      <div className={classes.top_area}>
        <span className={classes.box_name}>식사 목록</span>
      </div>
      <div className={classes.food_list_box}>{foodItems}</div>
      <div
        className={`${classes.add_btn} box_shadow`}
        onClick={() => {
          history.push("/add/search", { from: location })
        }}
      >
        <span>먹은 음식 추가하기</span>
      </div>
    </div>
  )
}
export default UserFoodList
